import { memo } from "react";
import { cn } from "@/components/ui/utils";

export type DropIndicatorPosition = "above" | "below";

function DropIndicatorComponent({
  position,
  visible = true,
}: {
  position: DropIndicatorPosition;
  visible?: boolean;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-2 right-2",
        position === "above" ? "-top-2" : "-bottom-2",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="h-0.5 rounded-full bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
    </div>
  );
}

export const DropIndicator = memo(DropIndicatorComponent);
