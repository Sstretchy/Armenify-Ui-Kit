import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { TextInput, type TextInputProps } from "./text-input";

const textInputFieldRootVariants = cva(
  "box-border flex w-full min-w-0 flex-col justify-center overflow-hidden border-[0.09375rem] border-solid font-sans antialiased transition-[border-color,box-shadow] duration-200 ease-out",
  {
    variants: {
      size: {
        sm: "max-h-[2.25rem] rounded-border-sm px-2.5 py-2",
        md: "max-h-[2.5rem] rounded-border-md px-3 py-2.5",
        lg: "max-h-[2.875rem] rounded-border-lg px-3.5 py-3",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type TextInputFieldVisualState = "default" | "hover" | "focus" | "error" | "success" | "disabled";

type TextInputFieldChromeMode = TextInputFieldVisualState | "interactive";

export function textInputFieldChrome(
  color: NonNullable<TextInputProps["color"]>,
  tone: NonNullable<TextInputProps["tone"]>,
  visualState: TextInputFieldVisualState | undefined,
  disabled: boolean,
): string {
  const vs: TextInputFieldChromeMode = disabled ? "disabled" : (visualState ?? "interactive");

  if (vs === "interactive") {
    if (tone === "error") {
      return color === "brand"
        ? "border-semantic-status-error-bright bg-semantic-bg-brand-primary shadow-input-error-shadow-outer"
        : "border-semantic-status-error-dark bg-semantic-bg-ntrl-secondary shadow-input-error-shadow-outer";
    }
    if (tone === "success") {
      return color === "brand"
        ? "border-semantic-status-success-bright bg-semantic-bg-brand-primary shadow-input-success-shadow-outer"
        : "border-semantic-status-success-dark bg-semantic-bg-ntrl-secondary shadow-input-success-shadow-outer";
    }
    if (color === "brand") {
      return cn(
        "border-semantic-border-brand-default bg-semantic-bg-brand-primary shadow-input-shadow-outer",
        "hover:border-semantic-border-brand-default-hover",
        "focus-within:border-primitive-colors-brand-150",
      );
    }
    return cn(
      "border-semantic-border-ntrl-default bg-semantic-bg-ntrl-secondary shadow-input-shadow-outer",
      "hover:border-semantic-border-ntrl-default-hover",
      "focus-within:border-semantic-border-ntrl-default-focused",
    );
  }

  if (color === "brand") {
    switch (vs) {
      case "disabled":
        return "border-semantic-border-brand-default bg-semantic-bg-brand-primary shadow-input-shadow-outer";
      case "success":
        return "border-semantic-status-success-bright bg-semantic-bg-brand-primary shadow-input-success-shadow-outer";
      case "error":
        return "border-semantic-status-error-bright bg-semantic-bg-brand-primary shadow-input-error-shadow-outer";
      case "focus":
        return "border-primitive-colors-brand-150 bg-semantic-bg-brand-primary shadow-input-shadow-outer";
      case "hover":
        return "border-semantic-border-brand-default-hover bg-semantic-bg-brand-primary shadow-input-shadow-outer";
      default:
        return "border-semantic-border-brand-default bg-semantic-bg-brand-primary shadow-input-shadow-outer";
    }
  }

  switch (vs) {
    case "disabled":
      return "border-semantic-border-ntrl-disabled bg-semantic-bg-ntrl-secondary";
    case "success":
      return "border-semantic-status-success-dark bg-semantic-bg-ntrl-secondary shadow-input-success-shadow-outer";
    case "error":
      return "border-semantic-status-error-dark bg-semantic-bg-ntrl-secondary shadow-input-error-shadow-outer";
    case "focus":
      return "border-semantic-border-ntrl-default-focused bg-semantic-bg-ntrl-secondary shadow-input-shadow-outer";
    case "hover":
      return "border-semantic-border-ntrl-default-hover bg-semantic-bg-ntrl-secondary shadow-input-shadow-outer";
    default:
      return "border-semantic-border-ntrl-default bg-semantic-bg-ntrl-secondary shadow-input-shadow-outer";
  }
}

export type TextInputFieldProps = TextInputProps & {
  fieldClassName?: string;
  /** Для демо/матрицы: зафиксированное состояние оболочки. Без него — hover/focus через CSS (tone error/success фиксирует рамку). */
  visualState?: TextInputFieldVisualState;
};

export type TextInputChromeProps = {
  size?: TextInputProps["size"];
  color?: TextInputProps["color"];
  tone?: TextInputProps["tone"];
  disabled?: boolean;
  visualState?: TextInputFieldVisualState;
  fieldClassName?: string;
  className?: string;
  /** По умолчанию `text-input-chrome`. */
  slotName?: string;
  children: React.ReactNode;
};

const TextInputChrome = React.forwardRef<HTMLDivElement, TextInputChromeProps>(function TextInputChrome(
  { size = "md", color = "ntrl", tone = "default", disabled, visualState, fieldClassName, className, slotName = "text-input-chrome", children },
  ref,
) {
  const chrome = textInputFieldChrome(color, tone, visualState, Boolean(disabled));

  return (
    <div
      ref={ref}
      data-slot={slotName}
      data-field-color={color}
      data-field-tone={tone}
      data-field-visual-state={visualState ?? (disabled ? "disabled" : "interactive")}
      className={cn(textInputFieldRootVariants({ size }), chrome, fieldClassName, className)}
    >
      {children}
    </div>
  );
});

const TextInputField = React.forwardRef<HTMLInputElement, TextInputFieldProps>(function TextInputField(
  { fieldClassName, visualState, className, color = "ntrl", tone = "default", disabled, size = "md", ...textInputProps },
  ref,
) {
  return (
    <TextInputChrome slotName="text-input-field" size={size} color={color} tone={tone} disabled={disabled} visualState={visualState} fieldClassName={fieldClassName}>
      <TextInput ref={ref} color={color} tone={tone} disabled={disabled} size={size} className={cn("w-full min-w-0", className)} {...textInputProps} />
    </TextInputChrome>
  );
});

export { TextInputField, TextInputChrome, textInputFieldRootVariants };
