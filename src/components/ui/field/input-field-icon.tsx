import * as React from "react";
import type { StrokeIcon } from "phosphor-strokes-icons";

import { cn } from "@/lib/utils";

import { ArmenifyIcon, type ArmenifyIconStrokeWeight, type ArmenifyIconSize } from "../icon";
import type { TextInputSize } from "./text-input";

/** Input icon box sizes are mapped to ArmenifyIcon rem-based tokens. */
export const textInputFieldIconSizeToArmenifyIconSize: Record<TextInputSize, ArmenifyIconSize> = {
  sm: "x-small",
  md: "base",
  lg: "large",
};

export type InputFieldIconColor = "ntrl" | "brand" | "disable";

function inputFieldIconColorClass(color: InputFieldIconColor): string {
  switch (color) {
    case "brand":
      return "text-components-typography-brand-light-inp-text";
    case "disable":
      return "text-semantic-text-ntrl-disabled";
    default:
      return "text-components-typography-ntrl-light-inp-text";
  }
}

export type InputFieldIconProps = Omit<React.ComponentPropsWithoutRef<"span">, "children"> & {
  icon: StrokeIcon;
  /** Совпадает с размером `TextInput` (sm / md / lg). */
  size?: TextInputSize;
  color?: InputFieldIconColor;
  weight?: ArmenifyIconStrokeWeight;
};

const InputFieldIcon = React.forwardRef<HTMLSpanElement, InputFieldIconProps>(function InputFieldIcon(
  { icon, size = "md", color = "ntrl", weight = "slim", className, ...rest },
  ref,
) {
  const armenifySize = textInputFieldIconSizeToArmenifyIconSize[size];
  const colorClass = inputFieldIconColorClass(color);

  return (
    <span
      ref={ref}
      data-slot="input-field-icon"
      data-input-field-icon-size={size}
      data-input-field-icon-color={color}
      className={cn("inline-flex shrink-0 items-center justify-center leading-none", className)}
      {...rest}
    >
      <ArmenifyIcon icon={icon} size={armenifySize} strokeWeight={weight} className={colorClass} aria-hidden />
    </span>
  );
});

export { InputFieldIcon };
