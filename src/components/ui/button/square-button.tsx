import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { controlInteractiveTransitionClassName } from "../control-transition";

const squareButtonVariants = cva(
  [
    "relative inline-flex aspect-square shrink-0 cursor-pointer items-center justify-center overflow-hidden p-0 font-bold tracking-normal antialiased",
    controlInteractiveTransitionClassName,
    "focus-visible:outline-none",
    "disabled:pointer-events-none disabled:cursor-default",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "border-0 bg-[image:var(--gradient-brand-primary)] text-components-controls-text-primary shadow-control-shadow-outer",
          "hover:shadow-control-shadow-hover active:shadow-control-shadow-active",
          "disabled:border-[0.09375rem] disabled:border-components-controls-bg-disabled disabled:bg-[image:none] disabled:bg-components-controls-bg-disabled disabled:text-components-controls-text-disabled disabled:shadow-control-shadow-outer",
        ],
        secondary: [
          "border-0 bg-components-controls-bg-secondary-default text-components-controls-text-secondary shadow-control-shadow-outer",
          "hover:bg-components-controls-bg-secondary-hover hover:shadow-control-shadow-hover",
          "active:bg-components-controls-bg-secondary-active active:shadow-control-shadow-active",
          "disabled:border-[0.09375rem] disabled:border-components-controls-bg-disabled disabled:bg-components-controls-bg-disabled disabled:text-components-controls-text-disabled disabled:shadow-control-shadow-outer",
        ],
        tertiary: [
          "border-0 bg-components-controls-bg-tertiary text-components-controls-text-tertiary shadow-control-shadow-outer",
          "hover:shadow-control-shadow-hover active:shadow-control-shadow-active",
          "disabled:bg-components-controls-bg-disabled disabled:text-components-controls-text-disabled disabled:shadow-control-shadow-outer",
        ],
        outlined: [
          "border-2 border-solid border-components-controls-text-tertiary bg-components-controls-bg-outlined text-components-controls-text-outlined shadow-control-shadow-outer",
          "hover:shadow-control-shadow-hover active:shadow-control-shadow-active",
          "disabled:border-components-controls-border-disabled disabled:bg-components-controls-bg-disabled disabled:text-components-controls-text-disabled disabled:shadow-none",
        ],
      },
      size: {
        xs: "size-9 text-font-size-base leading-[var(--font-font-height-base)]",
        sm: "size-10 text-font-size-lg leading-[var(--font-font-height-lg)]",
        md: "size-11 text-font-size-xl leading-[var(--font-font-height-xl)]",
        lg: "size-12 text-font-size-2xl leading-[var(--font-font-height-2xl)]",
      },
      shape: {
        square: "rounded-border-md",
        round: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
      shape: "square",
    },
  },
);

export type SquareButtonVariant = NonNullable<VariantProps<typeof squareButtonVariants>["variant"]>;
export type SquareButtonSize = NonNullable<VariantProps<typeof squareButtonVariants>["size"]>;
export type SquareButtonShape = NonNullable<VariantProps<typeof squareButtonVariants>["shape"]>;

const squareButtonPressedClassName: Record<SquareButtonVariant, string> = {
  primary: "shadow-control-shadow-pressed",
  secondary: "bg-components-controls-bg-secondary-pressed shadow-control-shadow-pressed",
  tertiary: "shadow-control-shadow-pressed",
  outlined: "shadow-control-shadow-pressed",
};

type SquareButtonBase = React.ComponentProps<"button"> &
  VariantProps<typeof squareButtonVariants> & {
    asChild?: boolean;
    unchecked?: boolean;
    pressed?: boolean;
  };

export type SquareButtonProps = SquareButtonBase &
  (
    | { icon: React.ReactNode; children?: never }
    | { icon?: undefined; children?: React.ReactNode }
  );

function SquareButton({
  className,
  variant,
  size,
  shape,
  asChild = false,
  type = "button",
  unchecked = false,
  pressed,
  disabled,
  icon,
  children,
  ...props
}: SquareButtonProps) {
  const Comp = asChild ? Slot : "button";
  const dataVariant = variant ?? "primary";
  const dataShape = shape ?? "square";
  const pressedClass = Boolean(pressed) && !disabled ? squareButtonPressedClassName[dataVariant] : undefined;

  const shared = {
    "data-slot": "square-button" as const,
    "data-square-button-variant": dataVariant,
    "data-square-button-shape": dataShape,
    "data-square-button-unchecked": unchecked ? ("" as const) : undefined,
    "data-square-button-pressed": Boolean(pressed) && !disabled ? ("" as const) : undefined,
    "aria-pressed": pressed === undefined ? undefined : pressed,
    className: cn(squareButtonVariants({ variant, size, shape }), pressedClass, className),
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
        <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>
      ) : children != null && children !== false ? (
        <span className="inline-flex min-w-0 shrink whitespace-nowrap">{children}</span>
      ) : null}
    </Comp>
  );
}

export { SquareButton, squareButtonVariants };
