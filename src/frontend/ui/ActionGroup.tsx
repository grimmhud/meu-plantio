import type { ReactNode } from "react";

/** Shared spacing for related actions, without relying on button margins. */
export function ActionGroup({ children }: { children: ReactNode }) {
  return <div className="action-group">{children}</div>;
}
