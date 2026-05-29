import * as React from "react";

import { cn } from "@/lib/utils";

import { InputHelperText, type InputHelperTextColor, type InputHelperTextSize, type InputHelperTextTone } from "./input-helper-text";
import { InputLabel, type InputLabelColor, type InputLabelSize, type InputLabelTone } from "./input-label";
import type { TextInputTone } from "./text-input";

export type InputBaseSize = "sm" | "md" | "lg";

export type InputBaseColor = "ntrl" | "brand" | "ntrl-inverse" | "brand-inverse";

export type InputBaseProps = Omit<React.ComponentPropsWithoutRef<"div">, "children"> & {
  size?: InputBaseSize;
  color?: InputBaseColor;
  /** Подпись: свой узел или `labelText`. */
  label?: React.ReactNode;
  labelText?: string;
  htmlFor?: string;
  /** Слот подсказки под полем (готовый `InputHelperText` и т.д.). */
  helper?: React.ReactNode;
  /** Короткая подсказка — оборачивается в `InputHelperText`. */
  helperText?: string;
  /** Резерв высоты под колонкой лейбла при `sideLabel` (выравнивание по макету). */
  helperSpace?: boolean;
  /** Лейбл слева от поля и helper. */
  sideLabel?: boolean;
  tone?: TextInputTone;
  disabled?: boolean;
  /** Слот поля: `TextInputField`, кастомная обёртка и т.д. */
  children: React.ReactNode;
};

const labelSizeByBase: Record<InputBaseSize, InputLabelSize> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

const helperSizeByBase: Record<InputBaseSize, InputHelperTextSize> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

const sideGapBySize: Record<InputBaseSize, string> = {
  sm: "gap-2",
  md: "gap-2.5",
  lg: "gap-3",
};

function InputBase({
  className,
  size = "md",
  color = "ntrl",
  label,
  labelText,
  htmlFor,
  helper,
  helperText,
  helperSpace = false,
  sideLabel = false,
  tone = "default",
  disabled = false,
  children,
  ...rest
}: InputBaseProps) {
  const labelSize = labelSizeByBase[size];
  const helperSize = helperSizeByBase[size];
  const labelColor = color as InputLabelColor;
  const helperColor = color as InputHelperTextColor;
  const labelTone = tone as InputLabelTone;
  const helperTone: InputHelperTextTone = disabled ? "disabled" : (tone as InputHelperTextTone);

  const labelEl =
    label ??
    (labelText != null ? (
      <InputLabel htmlFor={htmlFor} size={labelSize} color={labelColor} tone={labelTone} disabled={disabled}>
        {labelText}
      </InputLabel>
    ) : null);

  const defaultHelper =
    helperText != null ? (
      <InputHelperText size={helperSize} color={helperColor} tone={helperTone}>
        {helperText}
      </InputHelperText>
    ) : null;

  const helperBelowField = helper ?? defaultHelper;

  const spacer =
    helperSpace && sideLabel ? (
      <div className="min-h-[1rem] w-0 shrink-0" aria-hidden />
    ) : null;

  if (sideLabel) {
    return (
      <div
        data-slot="input-base"
        data-input-base-layout="side"
        data-input-base-size={size}
        data-input-base-color={color}
        className={cn("flex min-w-0 items-start", sideGapBySize[size], className)}
        {...rest}
      >
        <div className="flex min-w-0 shrink-0 flex-col justify-center gap-1 self-stretch">
          {labelEl}
          {spacer}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {children}
          {helperBelowField}
        </div>
      </div>
    );
  }

  return (
    <div
      data-slot="input-base"
      data-input-base-layout="stack"
      data-input-base-size={size}
      data-input-base-color={color}
      className={cn("flex min-w-0 flex-col gap-1", className)}
      {...rest}
    >
      {labelEl}
      {children}
      {helperBelowField}
    </div>
  );
}

export { InputBase };
