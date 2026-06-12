import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { TextInput, type TextInputProps } from "./text-input";

const textInputFieldRootVariants = cva(
  "box-border flex w-full min-w-0 items-center overflow-hidden font-sans antialiased transition-[background-color,box-shadow] duration-200 ease-out [box-shadow:inset_0_0_0_0.125rem_var(--input-border-color),var(--input-outer-shadow)]",
  {
    variants: {
      size: {
        sm: "rounded-border-sm px-2.5 py-2.5",
        md: "rounded-border-md px-3 py-2.5",
        lg: "rounded-border-lg px-3.5 py-3",
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
        ? "[--input-border-color:var(--semantic-status-error-bright)] [--input-outer-shadow:var(--input-error-shadow-outer)] bg-semantic-bg-brand-primary"
        : "[--input-border-color:var(--semantic-status-error-dark)] [--input-outer-shadow:var(--input-error-shadow-outer)] bg-semantic-bg-ntrl-secondary";
    }
    if (tone === "success") {
      return color === "brand"
        ? "[--input-border-color:var(--semantic-status-success-bright)] [--input-outer-shadow:var(--input-success-shadow-outer)] bg-semantic-bg-brand-primary"
        : "[--input-border-color:var(--semantic-status-success-dark)] [--input-outer-shadow:var(--input-success-shadow-outer)] bg-semantic-bg-ntrl-secondary";
    }
    if (color === "brand") {
      return cn(
        "[--input-border-color:var(--semantic-border-brand-default)] [--input-outer-shadow:var(--input-shadow-outer)] bg-semantic-bg-brand-primary",
        "hover:[--input-border-color:var(--semantic-border-brand-default-hover)]",
        "focus-within:[--input-border-color:var(--primitive-colors-brand-150)]",
      );
    }
    return cn(
      "[--input-border-color:var(--semantic-border-ntrl-default)] [--input-outer-shadow:var(--input-shadow-outer)] bg-semantic-bg-ntrl-secondary",
      "hover:[--input-border-color:var(--semantic-border-ntrl-default-hover)]",
      "focus-within:[--input-border-color:var(--semantic-border-ntrl-default-focused)]",
    );
  }

  if (color === "brand") {
    switch (vs) {
      case "disabled":
        return "[--input-border-color:var(--semantic-border-brand-default)] [--input-outer-shadow:var(--input-shadow-outer)] bg-semantic-bg-brand-primary";
      case "success":
        return "[--input-border-color:var(--semantic-status-success-bright)] [--input-outer-shadow:var(--input-success-shadow-outer)] bg-semantic-bg-brand-primary";
      case "error":
        return "[--input-border-color:var(--semantic-status-error-bright)] [--input-outer-shadow:var(--input-error-shadow-outer)] bg-semantic-bg-brand-primary";
      case "focus":
        return "[--input-border-color:var(--primitive-colors-brand-150)] [--input-outer-shadow:var(--input-shadow-outer)] bg-semantic-bg-brand-primary";
      case "hover":
        return "[--input-border-color:var(--semantic-border-brand-default-hover)] [--input-outer-shadow:var(--input-shadow-outer)] bg-semantic-bg-brand-primary";
      default:
        return "[--input-border-color:var(--semantic-border-brand-default)] [--input-outer-shadow:var(--input-shadow-outer)] bg-semantic-bg-brand-primary";
    }
  }

  switch (vs) {
    case "disabled":
      return "[--input-border-color:var(--semantic-border-ntrl-disabled)] [--input-outer-shadow:0_0_#0000] bg-semantic-bg-ntrl-secondary";
    case "success":
      return "[--input-border-color:var(--semantic-status-success-dark)] [--input-outer-shadow:var(--input-success-shadow-outer)] bg-semantic-bg-ntrl-secondary";
    case "error":
      return "[--input-border-color:var(--semantic-status-error-dark)] [--input-outer-shadow:var(--input-error-shadow-outer)] bg-semantic-bg-ntrl-secondary";
    case "focus":
      return "[--input-border-color:var(--semantic-border-ntrl-default-focused)] [--input-outer-shadow:var(--input-shadow-outer)] bg-semantic-bg-ntrl-secondary";
    case "hover":
      return "[--input-border-color:var(--semantic-border-ntrl-default-hover)] [--input-outer-shadow:var(--input-shadow-outer)] bg-semantic-bg-ntrl-secondary";
    default:
      return "[--input-border-color:var(--semantic-border-ntrl-default)] [--input-outer-shadow:var(--input-shadow-outer)] bg-semantic-bg-ntrl-secondary";
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
