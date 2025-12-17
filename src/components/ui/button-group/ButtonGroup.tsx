import { cn } from "@/utils/cn";
import type { ButtonGroupProps } from "./button-group.types";
import { buttonGroupStyles } from "./button-group.styles";

export function ButtonGroup({
  children,
  variant,
  className,
}: ButtonGroupProps) {
  return (
    <div className={cn(buttonGroupStyles({ variant }), className)}>
      {children}
    </div>
  );
}
