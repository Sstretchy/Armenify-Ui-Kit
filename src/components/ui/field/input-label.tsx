import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputLabelVariants = cva("min-w-0 font-sans font-medium antialiased", {
  variants: {
    size: {
      sm: "text-font-size-xs leading-[var(--font-font-height-xs)]",
      md: "text-font-size-sm leading-[var(--font-font-height-sm)]",
      lg: "text-font-size-base leading-[var(--font-font-height-base)]",
      "x-lg": "text-font-size-lg leading-[var(--font-font-height-lg)]",
    },
  },
  defaultVariants: { size: "sm" },
});

export type InputLabelSize = NonNullable<VariantProps<typeof inputLabelVariants>["size"]>;
export type InputLabelColor = "ntrl" | "brand" | "ntrl-inverse" | "brand-inverse";
export type InputLabelTone = "default" | "success" | "error";

function inputLabelColorClass(color: InputLabelColor, tone: InputLabelTone, disabled: boolean): string {
  if (disabled) {
    return color === "brand" || color === "brand-inverse"
      ? "text-semantic-text-brand-disabled"
      : "text-semantic-text-ntrl-disabled";
  }
  if (tone === "error") {
    return color === "brand" || color === "brand-inverse"
      ? "text-semantic-status-error-bright"
      : "text-semantic-status-error-dark";
  }
  if (tone === "success") {
    return color === "brand" || color === "brand-inverse"
      ? "text-semantic-status-success-bright"
      : "text-semantic-status-success-dark";
  }
  switch (color) {
    case "brand":
      return "text-components-typography-brand-light-label";
    case "brand-inverse":
      return "text-components-typography-brand-dark-content";
    case "ntrl-inverse":
      return "text-components-typography-ntrl-dark-content";
    default:
      return "text-components-typography-ntrl-light-label";
  }
}

export type InputLabelProps = Omit<React.ComponentPropsWithoutRef<"label">, "color"> &
  VariantProps<typeof inputLabelVariants> & {
    color?: InputLabelColor;
    tone?: InputLabelTone;
    disabled?: boolean;
    /** Если задан — рендерится `<label htmlFor={htmlFor}>`, иначе `<span>` (без привязки к контролу). */
    htmlFor?: string;
  };

const InputLabel = React.forwardRef<HTMLLabelElement | HTMLSpanElement, InputLabelProps>(function InputLabel(
  {
    className,
    size = "sm",
    color = "ntrl",
    tone = "default",
    disabled = false,
    htmlFor,
    children,
    ...rest
  },
  ref,
) {
  const colorClass = inputLabelColorClass(color, tone, disabled);
  const merged = cn(inputLabelVariants({ size }), colorClass, className);

  if (htmlFor != null) {
    return (
      <label
        ref={ref as React.Ref<HTMLLabelElement>}
        htmlFor={htmlFor}
        data-slot="input-label"
        data-label-color={color}
        data-label-tone={tone}
        data-label-disabled={disabled ? "" : undefined}
        className={merged}
        {...rest}
      >
        {children}
      </label>
    );
  }

  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      data-slot="input-label"
      data-label-color={color}
      data-label-tone={tone}
      data-label-disabled={disabled ? "" : undefined}
      className={merged}
      {...(rest as React.ComponentPropsWithoutRef<"span">)}
    >
      {children}
    </span>
  );
});

export { InputLabel, inputLabelVariants };
