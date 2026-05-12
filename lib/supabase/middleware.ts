import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { getPublicEnv, hasPublicSupabaseEnv } from "@/lib/env";

const protectedPrefixes = ["/app", "/admin", "/onboarding"];
const authRoutes = ["/login", "/register"];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  if (!hasPublicSupabaseEnv()) {
    return response;
  }

  const env = getPublicEnv();
  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, options, value }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
  const isAuthRoute = authRoutes.includes(pathname);

  if (!user && isProtected) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && isAuthRoute) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed, role")
      .eq("user_id", user.id)
      .maybeSingle();

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = profile?.onboarding_completed ? "/app" : "/onboarding";
    return NextResponse.redirect(redirectUrl);
  }

  if (user && pathname.startsWith("/app")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profile && !profile.onboarding_completed) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/onboarding";
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (user && pathname.startsWith("/admin")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!profile || !["admin", "superadmin"].includes(profile.role)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/app";
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}
