import type { UserRole } from "@/types/roles";

export type Profile = {
  age: number | null;
  city: string | null;
  country: string | null;
  created_at: string;
  emotional_state: string | null;
  faith_status: string | null;
  full_name: string | null;
  id: string;
  main_topics: string[] | null;
  onboarding_completed: boolean;
  role: UserRole;
  user_id: string;
};
