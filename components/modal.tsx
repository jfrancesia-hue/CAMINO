import type { ReactNode } from "react";
import { Button } from "@/components/button";

type ModalProps = {
  title: string;
  description?: string;
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
};

export function Modal({ title, description, children, open, onClose }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#08111f]/78 p-4 backdrop-blur-md">
      <section
        aria-modal="true"
        className="w-full max-w-lg rounded-lg border border-white/14 bg-[#101b2e] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.42)]"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <h2 className="text-xl font-semibold text-[#fffaf0]">{title}</h2>
            {description ? <p className="mt-2 text-sm text-white/68">{description}</p> : null}
          </div>
          {onClose ? (
            <Button aria-label="Cerrar modal" onClick={onClose} size="sm" variant="ghost">
              X
            </Button>
          ) : null}
        </div>
        <div className="mt-6">{children}</div>
      </section>
    </div>
  );
}
