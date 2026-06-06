import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { controlInteractiveTransitionClassName } from "../control-transition";

const ghostButtonVariants = cva(
  [
    "relative isolate inline-flex aspect-square shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-0 bg-transparent p-0 font-medium tracking-normal antialiased",
    controlInteractiveTransitionClassName,
    "focus-visible:outline-none [&[data-ghost-button-unchecked]]:opacity-[0.45] [&[data-story-state=unchecked]]:opacity-[0.45]",
    "disabled:pointer-events-none disabled:cursor-default",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-current",
  ],
  {
    variants: {
      variant: {
        primary: [
          "border-0 border-solid bg-transparent text-components-controls-text-ghost-primary-default shadow-none focus-visible:border-3 focus-visible:border-primitive-colors-brand-600 focus-visible:bg-transparent focus-visible:bg-none focus-visible:shadow-[0_0.0625rem_0.125rem_0_rgba(42,52,134,0.35)] data-[story-state=focused]:border-3 data-[story-state=focused]:border-primitive-colors-brand-600 data-[story-state=focused]:bg-transparent data-[story-state=focused]:bg-none data-[story-state=focused]:shadow-[0_0.0625rem_0.125rem_0_rgba(42,52,134,0.35)]",
          "hover:text-components-controls-text-ghost-primary-hover",
          "active:text-components-controls-text-ghost-primary-active active:shadow-none",
          "disabled:border-0 disabled:bg-transparent disabled:text-components-controls-text-ghost-primary-disabled disabled:shadow-none",
        ],
        secondary: [
          "border-0 border-solid bg-transparent text-components-controls-text-ghost-secondary-default shadow-none focus-visible:border-3 focus-visible:border-primitive-colors-brand-600 focus-visible:bg-transparent focus-visible:bg-none focus-visible:shadow-[0_0.0625rem_0.125rem_0_rgba(42,52,134,0.35)] data-[story-state=focused]:border-3 data-[story-state=focused]:border-primitive-colors-brand-600 data-[story-state=focused]:bg-transparent data-[story-state=focused]:bg-none data-[story-state=focused]:shadow-[0_0.0625rem_0.125rem_0_rgba(42,52,134,0.35)]",
          "hover:text-components-controls-text-ghost-secondary-hover",
          "active:text-components-controls-text-ghost-secondary-active active:shadow-none",
          "disabled:border-0 disabled:bg-transparent disabled:text-components-controls-text-ghost-secondary-disabled disabled:shadow-none",
        ],
        tertiary: [
          "border-0 border-solid bg-transparent text-components-controls-text-ghost-tertiary-default shadow-none focus-visible:border-3 focus-visible:border-primitive-colors-brand-600 focus-visible:bg-transparent focus-visible:bg-none focus-visible:shadow-[0_0.0625rem_0.125rem_0_rgba(42,52,134,0.35)] data-[story-state=focused]:border-3 data-[story-state=focused]:border-primitive-colors-brand-600 data-[story-state=focused]:bg-transparent data-[story-state=focused]:bg-none data-[story-state=focused]:shadow-[0_0.0625rem_0.125rem_0_rgba(42,52,134,0.35)]",
          "hover:text-components-controls-text-ghost-tertiary-hover",
          "active:text-components-controls-text-ghost-tertiary-active active:shadow-none",
          "disabled:bg-transparent disabled:text-components-controls-text-ghost-tertiary-disabled disabled:shadow-none",
        ],
      },
      size: {
        info: "size-5 text-font-size-xs leading-[var(--font-font-height-xs)]",
        xxxs: "size-6 text-font-size-xs leading-[var(--font-font-height-xs)]",
        xxs: "size-7 text-font-size-sm leading-[var(--font-font-height-sm)]",
        xs: "size-9 text-font-size-base leading-[var(--font-font-height-base)]",
        sm: "size-10 text-font-size-lg leading-[var(--font-font-height-lg)]",
        md: "size-11 text-font-size-xl leading-[var(--font-font-height-xl)]",
        lg: "size-12 text-font-size-2xl leading-[var(--font-font-height-2xl)]",
      },
    },
    defaultVariants: {
      variant: "tertiary",
      size: "lg",
    },
  },
);

export type GhostButtonVariant = NonNullable<VariantProps<typeof ghostButtonVariants>["variant"]>;
export type GhostButtonSize = NonNullable<VariantProps<typeof ghostButtonVariants>["size"]>;

const ghostButtonPressedClassName: Record<GhostButtonVariant, string> = {
  primary:
    "bg-semantic-bg-ntrl-primary-pressed text-components-controls-text-ghost-primary-default shadow-control-shadow-pressed",
  secondary:
    "bg-semantic-bg-ntrl-primary-pressed text-components-controls-text-ghost-secondary-default shadow-control-shadow-pressed",
  tertiary:
    "bg-components-controls-bg-ghost-tertiary-pressed text-components-controls-text-ghost-tertiary-default shadow-none",
};

type GhostButtonBase = React.ComponentProps<"button"> &
  VariantProps<typeof ghostButtonVariants> & {
    asChild?: boolean;
    unchecked?: boolean;
    pressed?: boolean;
  };

export type GhostButtonProps = GhostButtonBase &
  (
    | { icon: React.ReactNode; children?: never }
    | { icon?: undefined; children?: React.ReactNode }
  );

function GhostButton({
  className,
  variant,
  size,
  asChild = false,
  type = "button",
  unchecked = false,
  pressed,
  disabled,
  icon,
  children,
  ...props
}: GhostButtonProps) {
  const Comp = asChild ? Slot : "button";
  const dataVariant = variant ?? "tertiary";
  const pressedClass = Boolean(pressed) && !disabled ? ghostButtonPressedClassName[dataVariant] : undefined;

  const shared = {
    "data-slot": "ghost-button" as const,
    "data-ghost-button-variant": dataVariant,
    "data-ghost-button-unchecked": unchecked ? ("" as const) : undefined,
    "data-ghost-button-pressed": Boolean(pressed) && !disabled ? ("" as const) : undefined,
    "aria-pressed": pressed === undefined ? undefined : pressed,
    className: cn(ghostButtonVariants({ variant, size }), pressedClass, className),
    disabled,
    ...props,
  };

  if (asChild) {
    return (
      <Comp {...shared}>
        {children}
      </Comp>
    );
  }

  return (
    <Comp {...shared} type={type}>
      {icon != null ? (
        <span className="relative z-[1] inline-flex shrink-0 items-center justify-center">{icon}</span>
      ) : children != null && children !== false ? (
        <span className="relative z-[1] inline-flex min-w-0 shrink whitespace-nowrap">{children}</span>
      ) : null}
    </Comp>
  );
}

export { GhostButton, ghostButtonVariants };
