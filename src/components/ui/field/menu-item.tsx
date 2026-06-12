import * as React from "react";
import { Check, ShootingStar } from "phosphor-strokes-icons";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { controlInteractiveTransitionClassName } from "../control-transition";
import { ArmenifyIcon, type ArmenifyIconSize, type ArmenifyIconStrokeWeight } from "../icon";
import {
  InputFieldIcon,
  type InputFieldIconColor,
  type InputFieldIconProps,
} from "./input-field-icon";
import type { TextInputSize } from "./text-input";

export type MenuItemSize = TextInputSize;
export type MenuItemColor = "ntrl" | "brand";
export type MenuItemVisualState = "default" | "hover" | "disabled" | "selected";

const menuItemRootVariants = cva(
  cn(
    "box-border flex w-full min-w-0 cursor-pointer items-center justify-between gap-1 rounded-border-xxs border-0 font-sans outline-none",
    controlInteractiveTransitionClassName,
  ),
  {
    variants: {
      size: {
        sm: "p-1.5",
        md: "px-2 py-1.5",
        lg: "px-2.5 py-2",
      },
    },
    defaultVariants: { size: "md" },
  },
);

function menuItemIconColor(color: MenuItemColor, disabled: boolean): InputFieldIconColor {
  if (disabled) return "disable";
  return color === "brand" ? "brand" : "ntrl";
}

function menuItemRightIconWeight(color: MenuItemColor, disabled: boolean): NonNullable<InputFieldIconProps["weight"]> {
  if (disabled) return "slim";
  return color === "brand" ? "bold" : "slim";
}

function menuItemLeftIconWeight(color: MenuItemColor, disabled: boolean): NonNullable<InputFieldIconProps["weight"]> {
  if (disabled) return "slim";
  return color === "brand" ? "bold" : "slim";
}

const menuItemSelectedIconSize: Record<MenuItemSize, ArmenifyIconSize> = {
  sm: "xxx-small",
  md: "xx-small",
  lg: "x-small",
};

const menuItemSelectedIconStrokeToken: Record<ArmenifyIconStrokeWeight, Record<MenuItemSize, string>> = {
  slim: {
    sm: "var(--slim-check-12)",
    md: "var(--slim-check-14)",
    lg: "var(--slim-check-16)",
  },
  bold: {
    sm: "var(--bold-check-12)",
    md: "var(--bold-check-14)",
    lg: "var(--bold-check-16)",
  },
};

function menuItemSelectedIconWeight(color: MenuItemColor, disabled: boolean): ArmenifyIconStrokeWeight {
  if (disabled) return "slim";
  return color === "brand" ? "bold" : "slim";
}

function menuItemBackground(
  color: MenuItemColor,
  {
    disabled,
    selected,
    visualState,
  }: { disabled: boolean; selected: boolean; visualState: MenuItemVisualState | undefined },
): string {
  const vs: MenuItemVisualState | "live" =
    visualState ?? (disabled ? "disabled" : selected ? "selected" : "live");

  if (vs === "live") {
    if (disabled) {
      return color === "brand" ? "bg-semantic-bg-brand-disabled" : "bg-semantic-bg-ntrl-disabled";
    }
    if (selected) {
      return color === "brand" ? "bg-semantic-bg-brand-primary-pressed" : "bg-semantic-bg-ntrl-secondary-pressed";
    }
    return cn(
      "bg-transparent",
      color === "brand" ? "hover:bg-semantic-bg-brand-primary-hover" : "hover:bg-semantic-bg-ntrl-secondary-hover",
    );
  }

  switch (vs) {
    case "disabled":
      return color === "brand" ? "bg-semantic-bg-brand-disabled" : "bg-semantic-bg-ntrl-disabled";
    case "selected":
      return color === "brand" ? "bg-semantic-bg-brand-primary-pressed" : "bg-semantic-bg-ntrl-secondary-pressed";
    case "hover":
      return color === "brand" ? "bg-semantic-bg-brand-primary-hover" : "bg-semantic-bg-ntrl-secondary-hover";
    default:
      return "bg-transparent";
  }
}

function menuItemTextSizeClass(size: MenuItemSize): string {
  switch (size) {
    case "sm":
      return "text-font-size-sm leading-[var(--font-font-height-sm)]";
    case "lg":
      return "text-font-size-lg leading-[var(--font-font-height-lg)]";
    default:
      return "text-font-size-base leading-[var(--font-font-height-base)]";
  }
}

export type MenuItemProps = Omit<React.ComponentPropsWithoutRef<"button">, "children"> & {
  size?: MenuItemSize;
  color?: MenuItemColor;
  /** Selected row: pressed background and right-side Check icon. */
  selected?: boolean;
  prefixText?: string;
  /** Decorative left and right ShootingStar icons, as in the Figma kit. */
  showIcons?: boolean;
  /** Separate weight override for the selected Check icon. */
  selectedIconWeight?: ArmenifyIconStrokeWeight;
  /** Fixed visual state for demos such as Storybook comparison matrices. */
  visualState?: MenuItemVisualState;
  children: React.ReactNode;
};

const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  {
    type = "button",
    size = "md",
    color = "ntrl",
    selected = false,
    disabled,
    prefixText,
    showIcons = true,
    selectedIconWeight,
    visualState,
    className,
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = Boolean(disabled);
  const iconColor = menuItemIconColor(color, isDisabled);
  const leftIconWeight = menuItemLeftIconWeight(color, isDisabled);
  const rightIconWeight = menuItemRightIconWeight(color, isDisabled);
  const checkIconWeight = selectedIconWeight ?? menuItemSelectedIconWeight(color, isDisabled);
  const bg = menuItemBackground(color, { disabled: isDisabled, selected, visualState });
  const rowTypography = menuItemTextSizeClass(size);
  const leftClusterClass = cn("flex min-w-0 flex-1 items-center gap-1", rowTypography);
  const prefixClass = "shrink-0 select-none text-components-typography-ntrl-light-sub-label";
  const mainClass = cn(
    "min-w-0 truncate",
    isDisabled
      ? color === "brand"
        ? "font-medium text-semantic-text-brand-disabled"
        : "font-normal text-semantic-text-ntrl-disabled"
      : color === "brand"
        ? "font-medium text-components-typography-brand-light-inp-text"
        : "font-normal text-components-typography-ntrl-light-inp-text",
  );
  const checkClass = cn(
    isDisabled
      ? "text-semantic-text-ntrl-disabled"
      : color === "brand"
        ? "text-components-typography-brand-light-inp-text"
        : "text-components-typography-ntrl-light-inp-text",
  );

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-selected={selected}
      data-slot="menu-item"
      data-menu-item-size={size}
      data-menu-item-color={color}
      data-menu-item-visual-state={visualState ?? (isDisabled ? "disabled" : selected ? "selected" : "default")}
      className={cn(
        menuItemRootVariants({ size }),
        bg,
        "text-left antialiased transition-[background-color] duration-200 ease-out",
        isDisabled && "cursor-not-allowed",
        className,
      )}
      {...rest}
    >
      <span className={leftClusterClass}>
        {showIcons ? (
          <InputFieldIcon icon={ShootingStar} size={size} color={iconColor} weight={leftIconWeight} aria-hidden />
        ) : null}
        <span className="flex min-w-0 flex-1 items-center gap-0 whitespace-nowrap">
          {prefixText ? (
            <span className={prefixClass} aria-hidden>
              {prefixText}
            </span>
          ) : null}
          <span className={mainClass}>{children}</span>
        </span>
      </span>
      {showIcons ? (
        <span className="inline-flex shrink-0 items-center justify-center leading-none">
          {selected ? (
            <ArmenifyIcon
              icon={Check}
              size={menuItemSelectedIconSize[size]}
              strokeWidthToken={menuItemSelectedIconStrokeToken[checkIconWeight][size]}
              className={checkClass}
              aria-hidden
            />
          ) : (
            <InputFieldIcon icon={ShootingStar} size={size} color={iconColor} weight={rightIconWeight} aria-hidden />
          )}
        </span>
      ) : null}
    </button>
  );
});

export { MenuItem, menuItemRootVariants };
