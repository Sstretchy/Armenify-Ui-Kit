import type { StrokeIcon, StrokeIconProps } from "phosphor-strokes-icons";

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

const SIZE_PX: Record<ArmenifyIconSize, number> = {
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

export const SIZE_REM: Record<ArmenifyIconSize, string> = {
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

/**
 * Unitless stroke widths in SVG user units.
 * They preserve the intended ratio while the icon box itself scales in rem.
 */
export const STROKE_SLIM: Record<ArmenifyIconSize, number> = {
  "xxxx-small": 0.8,
  "xxx-small": 0.96,
  "xx-small": 1.12,
  "x-small": 1.28,
  small: 1.44,
  base: 1.6,
  large: 1.76,
  "x-large": 1.92,
  "xx-large": 2.24,
  "xxx-large": 2.56,
  "xxxx-large": 2.88,
};

export const STROKE_BOLD: Record<ArmenifyIconSize, number> = {
  "xxxx-small": 1.02375,
  "xxx-small": 1.2285,
  "xx-small": 1.43325,
  "x-small": 1.638,
  small: 1.84275,
  base: 2.0475,
  large: 2.25225,
  "x-large": 2.457,
  "xx-large": 2.8665,
  "xxx-large": 3.276,
  "xxxx-large": 3.6855,
};

export type ArmenifyIconProps = Omit<StrokeIconProps, "size" | "strokeWidth" | "absoluteStrokeWidth"> & {
  icon: StrokeIcon;
  size?: ArmenifyIconSize;
  strokeWeight?: ArmenifyIconStrokeWeight;
  /** Arbitrary CSS `stroke-width`, preferably a rem-based token. */
  strokeWidthToken?: string;
  /** Reserved; stroke icons do not use Phosphor weight variants. */
  phosphorWeight?: undefined;
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

/** Figma Square Button (square-icon): rem-based icon box by size. */
export const squareButtonSizeToArmenifyIconSize: Record<"xs" | "sm" | "md" | "lg", ArmenifyIconSize> = {
  xs: "large",
  sm: "x-large",
  md: "xx-large",
  lg: "xxx-large",
};

/** Figma Ghost Button (ghost-icon): rem-based icon box by size. */
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
  icon: Icon,
  size = "large",
  strokeWeight = "slim",
  strokeWidthToken,
  phosphorWeight: _phosphorWeight,
  className,
  style,
  color = "currentColor",
  ...rest
}: ArmenifyIconProps) {
  const sizePx = SIZE_PX[size];
  const sizeRem = SIZE_REM[size];
  const sizedStyle = { width: sizeRem, height: sizeRem, ...style };

  if (strokeWidthToken !== undefined) {
    return (
      <Icon
        size={sizePx}
        strokeWidth={1}
        color={color}
        absoluteStrokeWidth={false}
        className={cn("shrink-0", className)}
        style={{ ...sizedStyle, strokeWidth: strokeWidthToken }}
        {...rest}
      />
    );
  }

  const strokeWidth = strokeWeight === "bold" ? STROKE_BOLD[size] : STROKE_SLIM[size];

  return (
    <Icon
      size={sizePx}
      strokeWidth={strokeWidth}
      color={color}
      absoluteStrokeWidth
      className={cn("shrink-0", className)}
      style={sizedStyle}
      {...rest}
    />
  );
}

export { ArmenifyIcon };
