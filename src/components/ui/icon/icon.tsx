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

/** @deprecated Используйте rem через `ArmenifyIcon`; карта в px для совместимости. */
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

/** Толщина в px при `font-size: 16px` на `:root` — те же rem, что в `tokens/icons.css`. */
const ROOT_PX = 16;

const STROKE_SLIM_PX: Record<ArmenifyIconSize, number> = {
  "xxxx-small": 0.05 * ROOT_PX,
  "xxx-small": 0.06 * ROOT_PX,
  "xx-small": 0.07 * ROOT_PX,
  "x-small": 0.08 * ROOT_PX,
  small: 0.09 * ROOT_PX,
  base: 0.1 * ROOT_PX,
  large: 0.11 * ROOT_PX,
  "x-large": 0.12 * ROOT_PX,
  "xx-large": 0.14 * ROOT_PX,
  "xxx-large": 0.16 * ROOT_PX,
  "xxxx-large": 0.18 * ROOT_PX,
};

const STROKE_BOLD_PX: Record<ArmenifyIconSize, number> = {
  "xxxx-small": 0.067594 * ROOT_PX,
  "xxx-small": 0.080719 * ROOT_PX,
  "xx-small": 0.0945 * ROOT_PX,
  "x-small": 0.107625 * ROOT_PX,
  small: 0.12075 * ROOT_PX,
  base: 0.134531 * ROOT_PX,
  large: 0.147656 * ROOT_PX,
  "x-large": 0.161438 * ROOT_PX,
  "xx-large": 0.188344 * ROOT_PX,
  "xxx-large": 0.191625 * ROOT_PX,
  "xxxx-large": 0.21525 * ROOT_PX,
};

/** CSS `stroke-width` для произвольного токена (без пересчёта absoluteStroke). */
export const STROKE_SLIM: Record<ArmenifyIconSize, string> = {
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

export const STROKE_BOLD: Record<ArmenifyIconSize, string> = {
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

export type ArmenifyIconProps = Omit<StrokeIconProps, "size" | "strokeWidth" | "absoluteStrokeWidth"> & {
  icon: StrokeIcon;
  size?: ArmenifyIconSize;
  strokeWeight?: ArmenifyIconStrokeWeight;
  /** Произвольный CSS для `stroke-width` (например `var(--bold-caret-12)` из Figma в px). */
  strokeWidthToken?: string;
  /** Зарезервировано; stroke-иконки не используют веса Phosphor. */
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

  if (strokeWidthToken !== undefined) {
    return (
      <Icon
        size={sizeRem}
        strokeWidth={strokeWidthToken}
        color={color}
        absoluteStrokeWidth={false}
        className={cn("shrink-0", className)}
        style={style}
        {...rest}
      />
    );
  }

  const strokeWidthPx = strokeWeight === "bold" ? STROKE_BOLD_PX[size] : STROKE_SLIM_PX[size];

  return (
    <Icon
      size={sizePx}
      strokeWidth={strokeWidthPx}
      color={color}
      absoluteStrokeWidth
      className={cn("shrink-0", className)}
      style={style}
      {...rest}
    />
  );
}

export { ArmenifyIcon };
