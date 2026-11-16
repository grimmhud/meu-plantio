"use client";
import { useEffect, useRef, useId, type ReactNode } from "react";
import { ListenButton } from "@/frontend/audio/ListenButton";
import { X } from "lucide-react";
export function Sheet({
  title,
  onClose,
  children,
  narration,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  narration?: string;
}) {
  const titleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      element?.close();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="sheet"
      aria-labelledby={titleId}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="sheet-inner">
        <div className="sheet-handle" />
        <header className="sheet-heading">
          <h2 id={titleId}>{title}</h2>
          <div className="sheet-header-actions">
          {narration && <ListenButton text={narration} iconOnly className="icon-button" />}
          <button type="button" className="icon-button" aria-label="Close" onClick={onClose}>
            <X size={24} />
          </button>
          </div>
        </header>
        {children}
      </div>
    </dialog>
  );
}
