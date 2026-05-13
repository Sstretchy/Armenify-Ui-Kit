import type { Icon as PhosphorIconComponent, IconProps } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

export const armenifyIconSizes = [
  "xxxx-small",
  "xxx-small",
  "xx-small",
  "x-small",
  "small",
  "base",
  "large",
  "x-large",
  "xx-large",
  "xxx-large",
  "xxxx-large",
] as const;

export type ArmenifyIconSize = (typeof armenifyIconSizes)[number];

export type ArmenifyIconStrokeWeight = "slim" | "bold";

/** @deprecated Используйте rem через `ArmenifyIcon`; карта в px для совместимости (Phosphor `size` как number). */
export const SIZE_PX: Record<ArmenifyIconSize, number> = {
  "xxxx-small": 10,
  "xxx-small": 12,
  "xx-small": 14,
  "x-small": 16,
  small: 18,
  base: 20,
  large: 22,
  "x-large": 24,
  "xx-large": 28,
  "xxx-large": 32,
  "xxxx-large": 36,
};

/** Box size passed to Phosphor `size` (string rem, scales with root font-size). */
const SIZE_REM: Record<ArmenifyIconSize, string> = {
  "xxxx-small": "0.625rem",
  "xxx-small": "0.75rem",
  "xx-small": "0.875rem",
  "x-small": "1rem",
  small: "1.125rem",
  base: "1.25rem",
  large: "1.375rem",
  "x-large": "1.5rem",
  "xx-large": "1.75rem",
  "xxx-large": "2rem",
  "xxxx-large": "2.25rem",
};

const STROKE_SLIM: Record<ArmenifyIconSize, string> = {
  "xxxx-small": "var(--slim-xxxx-sm-10)",
  "xxx-small": "var(--slim-xxx-sm-12)",
  "xx-small": "var(--slim-xx-sm-14)",
  "x-small": "var(--slim-x-sm-16)",
  small: "var(--slim-sm-18)",
  base: "var(--slim-base-20)",
  large: "var(--slim-lg-22)",
  "x-large": "var(--slim-x-lg-24)",
  "xx-large": "var(--slim-xx-lg-28)",
  "xxx-large": "var(--slim-xxx-lg-32)",
  "xxxx-large": "var(--slim-xxxx-lg-36)",
};

const STROKE_BOLD: Record<ArmenifyIconSize, string> = {
  "xxxx-small": "var(--bold-xxxx-sm-10)",
  "xxx-small": "var(--bold-xxx-sm-12)",
  "xx-small": "var(--bold-xx-sm-14)",
  "x-small": "var(--bold-x-sm-16)",
  small: "var(--bold-sm-18)",
  base: "var(--bold-base-20)",
  large: "var(--bold-lg-22)",
  "x-large": "var(--bold-x-lg-24)",
  "xx-large": "var(--bold-xx-lg-28)",
  "xxx-large": "var(--bold-xxx-lg-32)",
  "xxxx-large": "var(--bold-xxxx-lg-36)",
};

export type ArmenifyIconProps = Omit<IconProps, "size" | "weight"> & {
  icon: PhosphorIconComponent;
  size?: ArmenifyIconSize;
  strokeWeight?: ArmenifyIconStrokeWeight;
};

/** Figma Button (type=base): icon box per size. */
export const buttonSizeToArmenifyIconSize: Record<
  "xs" | "sm" | "md" | "lg" | "xl",
  ArmenifyIconSize
> = {
  xs: "x-small",
  sm: "large",
  md: "large",
  lg: "base",
  xl: "x-large",
};

/** Figma Square Button (square-icon): 22 / 24 / 28 / 32px box. */
export const squareButtonSizeToArmenifyIconSize: Record<"xs" | "sm" | "md" | "lg", ArmenifyIconSize> = {
  xs: "large",
  sm: "x-large",
  md: "xx-large",
  lg: "xxx-large",
};

/** Figma Ghost Button (ghost-icon): 16–36px icon box by size. */
export const ghostButtonSizeToArmenifyIconSize: Record<
  "info" | "xxxs" | "xxs" | "xs" | "sm" | "md" | "lg",
  ArmenifyIconSize
> = {
  info: "x-small",
  xxxs: "small",
  xxs: "base",
  xs: "x-large",
  sm: "xx-large",
  md: "xxx-large",
  lg: "xxxx-large",
};

function ArmenifyIcon({
  icon: Glyph,
  size = "large",
  strokeWeight = "slim",
  className,
  style,
  ...rest
}: ArmenifyIconProps) {
  const sizeRem = SIZE_REM[size];
  const strokeVar = strokeWeight === "bold" ? STROKE_BOLD[size] : STROKE_SLIM[size];

  return (
    <Glyph
      size={sizeRem}
      weight={strokeWeight === "bold" ? "bold" : "regular"}
      className={cn("shrink-0", className)}
      style={{
        strokeWidth: strokeVar,
        ...style,
      }}
      {...rest}
    />
  );
}

export { ArmenifyIcon };
