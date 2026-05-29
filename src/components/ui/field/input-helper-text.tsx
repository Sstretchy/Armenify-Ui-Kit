import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { SealCheck, SealQuestion, WarningDiamond } from "phosphor-strokes-icons";

import { ArmenifyIcon } from "../icon";
import { cn } from "@/lib/utils";

const inputHelperTextRootVariants = cva(
  "flex min-w-0 items-center gap-1 font-sans font-medium antialiased",
  {
    variants: {
      size: {
        sm: "text-font-size-xs leading-[var(--font-font-size-xs)]",
        md: "text-font-size-xs-input leading-[var(--font-font-size-xs-input)]",
        lg: "text-font-size-sm leading-[var(--font-font-size-sm)]",
      },
    },
    defaultVariants: { size: "sm" },
  },
);

export type InputHelperTextSize = NonNullable<VariantProps<typeof inputHelperTextRootVariants>["size"]>;
export type InputHelperTextColor = "ntrl" | "brand" | "ntrl-inverse" | "brand-inverse";
export type InputHelperTextTone = "default" | "success" | "error" | "disabled";

function helperTextColorClass(color: InputHelperTextColor, tone: InputHelperTextTone): string {
  if (tone === "error") {
    if (color === "ntrl") return "text-semantic-status-error-dark";
    return "text-semantic-status-error-bright";
  }
  if (tone === "success") {
    if (color === "ntrl") return "text-semantic-status-success-dark";
    return "text-semantic-status-success-bright";
  }
  if (tone === "disabled") {
    return color === "brand" || color === "brand-inverse"
      ? "text-semantic-text-brand-disabled"
      : "text-semantic-text-ntrl-disabled";
  }
  switch (color) {
    case "brand":
      return "text-components-typography-brand-light-sub-label";
    case "brand-inverse":
      return "text-components-typography-brand-dark-content-light";
    case "ntrl-inverse":
      return "text-components-typography-ntrl-dark-content-light";
    default:
      return "text-components-typography-ntrl-light-sub-label";
  }
}

function helperIcon(tone: InputHelperTextTone) {
  switch (tone) {
    case "error":
      return WarningDiamond;
    case "success":
    case "disabled":
      return SealCheck;
    default:
      return SealQuestion;
  }
}

export type InputHelperTextProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof inputHelperTextRootVariants> & {
    show?: boolean;
    showIcon?: boolean;
    color?: InputHelperTextColor;
    tone?: InputHelperTextTone;
  };

const InputHelperText = React.forwardRef<HTMLDivElement, InputHelperTextProps>(function InputHelperText(
  {
    className,
    size = "sm",
    show = true,
    showIcon = true,
    color = "ntrl",
    tone = "default",
    children,
    role,
    ...rest
  },
  ref,
) {
  if (!show) {
    return null;
  }

  const Glyph = helperIcon(tone);
  const colorClass = helperTextColorClass(color, tone);
  const resolvedRole = role ?? (tone === "error" ? "alert" : "status");

  return (
    <div
      ref={ref}
      {...rest}
      data-slot="input-helper-text"
      data-helper-tone={tone}
      data-helper-color={color}
      role={resolvedRole}
      className={cn(inputHelperTextRootVariants({ size }), colorClass, className)}
    >
      {showIcon ? (
        <ArmenifyIcon icon={Glyph} size="xx-small" strokeWeight="bold" className="shrink-0" aria-hidden />
      ) : null}
      <span className="min-w-0">{children}</span>
    </div>
  );
});

export { InputHelperText, inputHelperTextRootVariants };
