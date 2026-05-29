import * as React from "react";
import { Check, ShootingStar } from "phosphor-strokes-icons";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { controlInteractiveTransitionClassName } from "../control-transition";
import { ArmenifyIcon } from "../icon";
import { InputFieldIcon, textInputFieldIconSizeToArmenifyIconSize, type InputFieldIconColor } from "./input-field-icon";
import type { TextInputSize } from "./text-input";

export type MenuItemSize = TextInputSize;
export type MenuItemColor = "ntrl" | "brand";
export type MenuItemVisualState = "default" | "hover" | "disabled" | "selected";

const menuItemRootVariants = cva(
  cn(
    "box-border flex w-full min-w-0 cursor-pointer items-center justify-between gap-2.5 rounded-border-xxs border-0 font-sans outline-none",
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
  /** Выбранная строка меню: фон pressed и иконка Check справа. */
  selected?: boolean;
  prefixText?: string;
  /** Левый и правый декоративные ShootingStar, как в макете. */
  showIcons?: boolean;
  /** Зафиксированное состояние для демо (матрица Storybook). */
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
    visualState,
    className,
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = Boolean(disabled);
  const iconColor = menuItemIconColor(color, isDisabled);
  const bg = menuItemBackground(color, { disabled: isDisabled, selected, visualState });
  const rowTypography = menuItemTextSizeClass(size);
  const leftClusterClass = cn(
    "flex min-w-0 flex-1 items-center gap-2.5",
    rowTypography,
  );
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
          <InputFieldIcon icon={ShootingStar} size={size} color={iconColor} weight="bold" aria-hidden />
        ) : null}
        <span className="flex min-w-0 flex-1 items-center gap-2.5 whitespace-nowrap">
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
              size={textInputFieldIconSizeToArmenifyIconSize[size]}
              strokeWeight="bold"
              className={checkClass}
              aria-hidden
            />
          ) : (
            <InputFieldIcon icon={ShootingStar} size={size} color={iconColor} weight="bold" aria-hidden />
          )}
        </span>
      ) : null}
    </button>
  );
});

export { MenuItem, menuItemRootVariants };
