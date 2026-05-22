import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { controlInteractiveTransitionClassName } from "../control-transition";

const switchTrackVariants = cva(
  cn(
    "relative box-border shrink-0 overflow-hidden rounded-full border-[1.5px] border-solid shadow-control-shadow-outer",
    controlInteractiveTransitionClassName,
    "transition-[background-color,background-image,border-color,opacity,box-shadow] duration-[var(--control-transition-duration,250ms)] ease-[var(--control-transition-timing,cubic-bezier(0.4,0,0.2,1))]",
    "peer-focus-visible:outline-none peer-focus-visible:shadow-control-shadow-outer-focused",
  ),
  {
    variants: {
      size: {
        md: "h-[18px] w-[var(--space-space-10)]",
        lg: "h-[var(--space-space-5)] w-[var(--space-space-11)]",
      },
      variant: {
        primary: "",
        secondary: "",
      },
      on: {
        true: "",
        false: "",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        on: false,
        disabled: false,
        class:
          "border-primitive-colors-brand-150 bg-components-controls-bg-primary shadow-[var(--control-shadow-outer),var(--control-shadow-inner)]",
      },
      {
        variant: "primary",
        on: true,
        disabled: false,
        class:
          "border-primitive-colors-brand-150 bg-[image:var(--gradient-brand-primary)] shadow-[var(--control-shadow-outer),var(--control-shadow-inner)]",
      },
      {
        variant: "primary",
        on: false,
        disabled: true,
        class: "border-components-controls-border-disabled bg-components-controls-bg-disabled shadow-control-shadow-outer",
      },
      {
        variant: "primary",
        on: true,
        disabled: true,
        class:
          "border-primitive-colors-brand-150 bg-components-controls-bg-primary shadow-[var(--control-shadow-outer),var(--control-shadow-inner)]",
      },

      {
        variant: "secondary",
        on: false,
        disabled: false,
        class:
          "border-transparent bg-components-controls-bg-primary shadow-[var(--control-shadow-outer),var(--control-shadow-inner)]",
      },
      {
        variant: "secondary",
        on: true,
        disabled: false,
        class:
          "border-transparent bg-components-controls-bg-secondary-default shadow-[var(--control-shadow-outer),var(--control-shadow-inner)]",
      },
      {
        variant: "secondary",
        on: false,
        disabled: true,
        class: "border-transparent bg-components-controls-bg-disabled shadow-control-shadow-outer",
      },
      {
        variant: "secondary",
        on: true,
        disabled: true,
        class:
          "border-transparent bg-components-controls-bg-secondary-default opacity-40 shadow-[var(--control-shadow-outer),var(--control-shadow-inner)]",
      },
    ],
    defaultVariants: {
      size: "md",
      variant: "primary",
      on: false,
      disabled: false,
    },
  },
);

const switchThumbVariants = cva(
  cn(
    "pointer-events-none absolute top-1/2 z-[1] box-border -translate-y-1/2 rounded-full border-[1.5px] border-solid shadow-control-shadow-outer",
    "transition-[left,background-color,border-color,box-shadow] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
  ),
  {
    variants: {
      size: {
        md: "h-[18px] w-[var(--space-space-4-5)]",
        lg: "h-[var(--space-space-5)] w-[var(--space-space-5)]",
      },
      variant: {
        primary: "",
        secondary: "",
      },
      on: {
        true: "",
        false: "",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { size: "md", on: false, class: "left-0" },
      { size: "md", on: true, class: "left-[calc(100%-var(--space-space-4-5))]" },
      { size: "lg", on: false, class: "left-0" },
      { size: "lg", on: true, class: "left-[calc(100%-var(--space-space-5))]" },

      {
        variant: "primary",
        on: false,
        disabled: false,
        class: "border-primitive-colors-brand-150 bg-components-controls-bg-primary",
      },
      {
        variant: "primary",
        on: true,
        disabled: false,
        class: "border-primitive-colors-brand-150 bg-components-controls-bg-primary",
      },
      {
        variant: "primary",
        on: false,
        disabled: true,
        class: "border-components-controls-border-disabled bg-components-controls-bg-primary",
      },
      {
        variant: "primary",
        on: true,
        disabled: true,
        class: "border-components-controls-border-disabled bg-components-controls-bg-primary",
      },

      {
        variant: "secondary",
        on: false,
        disabled: false,
        class: "border-components-controls-bg-primary bg-components-controls-bg-secondary-default",
      },
      {
        variant: "secondary",
        on: true,
        disabled: false,
        class: "border-components-controls-bg-secondary-default bg-components-controls-bg-primary",
      },
      {
        variant: "secondary",
        on: false,
        disabled: true,
        class: "border-components-controls-border-disabled bg-components-controls-bg-primary",
      },
      {
        variant: "secondary",
        on: true,
        disabled: true,
        class: "border-components-controls-border-disabled bg-components-controls-bg-primary",
      },
    ],
    defaultVariants: {
      size: "md",
      variant: "primary",
      on: false,
      disabled: false,
    },
  },
);

export type SwitchSize = NonNullable<VariantProps<typeof switchTrackVariants>["size"]>;
export type SwitchVariant = NonNullable<VariantProps<typeof switchTrackVariants>["variant"]>;

export type SwitchProps = Omit<React.ComponentPropsWithoutRef<"input">, "size" | "type"> & {
  size?: SwitchSize;
  variant?: SwitchVariant;
};

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { className, size = "md", variant = "primary", disabled, checked, defaultChecked, onChange, ...inputProps },
  ref,
) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(Boolean(defaultChecked));
  const isControlled = checked !== undefined;
  const resolvedOn = isControlled ? Boolean(checked) : uncontrolledChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledChecked(e.target.checked);
    }
    onChange?.(e);
  };

  const sz = size ?? "md";
  const v = variant ?? "primary";
  const isDisabled = Boolean(disabled);

  return (
    <label
      data-slot="switch"
      data-switch-variant={v}
      data-switch-size={sz}
      className={cn(
        "inline-flex cursor-pointer select-none items-center has-[:disabled]:cursor-not-allowed",
        className,
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        disabled={disabled}
        checked={isControlled ? checked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        onChange={handleChange}
        className="peer sr-only"
        aria-checked={resolvedOn}
        {...inputProps}
      />
      <span
        className={switchTrackVariants({ size: sz, variant: v, on: resolvedOn, disabled: isDisabled })}
        aria-hidden
      >
        {isDisabled && resolvedOn && v === "primary" ? (
          <span
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[image:var(--gradient-brand-primary)] opacity-20"
            aria-hidden
          />
        ) : null}
        <span
          className={switchThumbVariants({ size: sz, variant: v, on: resolvedOn, disabled: isDisabled })}
          aria-hidden
        />
      </span>
    </label>
  );
});

export { Switch, switchTrackVariants, switchThumbVariants };
