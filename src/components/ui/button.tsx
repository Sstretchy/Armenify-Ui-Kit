import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { controlInteractiveTransitionClassName } from "@/components/ui/control-transition";

const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center font-bold tracking-normal antialiased",
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
          "disabled:border-2 disabled:border-components-controls-border-disabled disabled:bg-[image:none] disabled:bg-components-controls-bg-disabled disabled:text-components-controls-text-disabled disabled:shadow-control-shadow-outer",
        ],
        secondary: [
          "border-0 bg-components-controls-bg-secondary-default text-components-controls-text-secondary shadow-control-shadow-outer",
          "hover:bg-components-controls-bg-secondary-hover hover:shadow-control-shadow-hover",
          "active:bg-components-controls-bg-secondary-active active:shadow-control-shadow-active",
          "disabled:bg-components-controls-bg-disabled disabled:text-components-controls-text-disabled disabled:shadow-control-shadow-outer",
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
        xs: "min-h-9 gap-[var(--space-space-1-5)] rounded-border-md px-[var(--space-space-4-5)] py-[var(--space-space-2-5)] text-font-size-sm leading-[var(--font-font-height-sm)]",
        sm: "min-h-10.5 gap-[var(--space-space-2)] rounded-border-md px-[var(--space-space-6)] py-[var(--space-space-2-5)] text-font-size-base leading-[var(--font-font-height-base)]",
        md: "min-h-[2.875rem] gap-[var(--space-space-3)] rounded-border-lg px-[var(--space-space-10)] py-[var(--space-space-3)] text-font-size-lg leading-[var(--font-font-height-lg)]",
        lg: "min-h-12 gap-[var(--space-space-2-5)] rounded-border-md px-[var(--space-space-8)] py-[var(--space-space-3)] text-font-size-xl leading-[var(--font-font-height-xl)]",
        xl: "min-h-[3.25rem] gap-[var(--space-space-3-5)] rounded-border-x-lg px-[var(--space-space-12)] py-[var(--space-space-3-5)] text-font-size-xl leading-[var(--font-font-height-xl)]",
      },
      bainsley: {
        true: "font-serif",
        false: "font-sans",
      },
      zeroCorner: {
        true: "!rounded-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      bainsley: false,
      zeroCorner: false,
    },
  },
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

const buttonPressedClassName: Record<ButtonVariant, string> = {
  primary: "shadow-control-shadow-pressed",
  secondary: "bg-components-controls-bg-secondary-pressed shadow-control-shadow-pressed",
  tertiary: "shadow-control-shadow-pressed",
  outlined: "shadow-control-shadow-pressed",
};

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Выкл. визуал (прозрачность от дефолта), напр. toggle unchecked */
    unchecked?: boolean;
    pressed?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  };

function Button({
  className,
  variant,
  size,
  bainsley = false,
  zeroCorner = false,
  asChild = false,
  type = "button",
  unchecked = false,
  pressed,
  disabled,
  iconLeft,
  iconRight,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const dataVariant = variant ?? "primary";
  const pressedClass =
    Boolean(pressed) && !disabled ? buttonPressedClassName[dataVariant] : undefined;

  if (asChild) {
    return (
      <Comp
        data-slot="button"
        data-button-variant={dataVariant}
        data-button-unchecked={unchecked ? "" : undefined}
        data-button-pressed={Boolean(pressed) && !disabled ? "" : undefined}
        aria-pressed={pressed === undefined ? undefined : pressed}
        className={cn(buttonVariants({ variant, size, bainsley, zeroCorner }), pressedClass, className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      data-slot="button"
      data-button-variant={dataVariant}
      data-button-unchecked={unchecked ? "" : undefined}
      data-button-pressed={Boolean(pressed) && !disabled ? "" : undefined}
      aria-pressed={pressed === undefined ? undefined : pressed}
      className={cn(buttonVariants({ variant, size, bainsley, zeroCorner }), pressedClass, className)}
      type={type}
      disabled={disabled}
      {...props}
    >
      {iconLeft != null ? (
        <span className="inline-flex shrink-0 items-center justify-center">{iconLeft}</span>
      ) : null}
      {children != null && children !== false ? (
        <span className="inline-flex shrink-0 whitespace-nowrap">{children}</span>
      ) : null}
      {iconRight != null ? (
        <span className="inline-flex shrink-0 items-center justify-center">{iconRight}</span>
      ) : null}
    </Comp>
  );
}

export { Button, buttonVariants };
