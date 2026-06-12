import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { controlInteractiveTransitionClassName } from "../control-transition";

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function sanitizeFiniteNumber(value: number | undefined, fallback: number): number {
  return Number.isFinite(value) ? Number(value) : fallback;
}

function roundToStep(value: number, min: number, step: number): number {
  if (step <= 0) return value;
  const steps = Math.round((value - min) / step);
  return min + steps * step;
}

function normalizeSliderValue(value: number, min: number, max: number, step: number): number {
  return clamp(roundToStep(sanitizeFiniteNumber(value, min), min, step), min, max);
}

const sliderThumbFocusClassName =
  "focus-visible:shadow-control-shadow-outer-focused data-[story-state=focused]:shadow-control-shadow-outer-focused";

const sliderTrackVariants = cva(
  cn(
    "relative block w-full grow overflow-hidden rounded-border-xxs shadow-[var(--control-shadow-outer),var(--control-shadow-inner)]",
    controlInteractiveTransitionClassName,
    "transition-[height,opacity] duration-[var(--control-transition-duration,250ms)] ease-[var(--control-transition-timing,cubic-bezier(0.4,0,0.2,1))]",
  ),
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-1.5",
      },
      disabled: {
        true: "bg-components-controls-bg-disabled",
        false: "bg-components-controls-bg-primary",
      },
    },
    defaultVariants: { size: "sm", disabled: false },
  },
);

const sliderFillVariants = cva(
  cn("pointer-events-none absolute inset-y-0 left-0 block rounded-border-xxs", controlInteractiveTransitionClassName),
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        disabled: false,
        class: "bg-[image:var(--gradient-brand-primary)]",
      },
      {
        variant: "primary",
        disabled: true,
        class: "bg-[image:var(--gradient-brand-primary)] opacity-20",
      },
      {
        variant: "secondary",
        disabled: false,
        class: "bg-components-controls-bg-secondary-default",
      },
      {
        variant: "secondary",
        disabled: true,
        class: "bg-components-controls-bg-secondary-default opacity-20",
      },
    ],
    defaultVariants: { variant: "primary", disabled: false },
  },
);

const sliderThumbVariants = cva(
  cn(
    "z-[1] box-border block rounded-full border-[0.125rem] border-solid shadow-control-shadow-outer",
    controlInteractiveTransitionClassName,
    "touch-none outline-none transition-[background-color,background-image,border-color,box-shadow] duration-[var(--control-transition-duration,250ms)] ease-[var(--control-transition-timing,cubic-bezier(0.4,0,0.2,1))]",
    "focus-visible:outline-none",
    sliderThumbFocusClassName,
  ),
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5 min-h-3.5 min-w-3.5",
        md: "h-4 w-4 min-h-4 min-w-4",
      },
      variant: {
        primary: "",
        secondary: "",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        disabled: false,
        class:
          "border-transparent bg-transparent [background-origin:padding-box,border-box] [background-clip:padding-box,border-box] bg-[image:linear-gradient(var(--components-controls-bg-primary),var(--components-controls-bg-primary)),var(--gradient-brand-primary)]",
      },
      {
        variant: "primary",
        disabled: true,
        class: "border-components-controls-border-disabled bg-components-controls-bg-primary",
      },
      {
        variant: "secondary",
        disabled: false,
        class: "border-components-controls-bg-secondary-default bg-components-controls-bg-primary",
      },
      {
        variant: "secondary",
        disabled: true,
        class: "border-components-controls-border-disabled bg-components-controls-bg-primary",
      },
    ],
    defaultVariants: { size: "sm", variant: "primary", disabled: false },
  },
);

export type SliderSize = NonNullable<VariantProps<typeof sliderTrackVariants>["size"]>;
export type SliderVariant = NonNullable<VariantProps<typeof sliderFillVariants>["variant"]>;

export type SliderProps = Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  "children" | "defaultValue" | "onValueChange" | "onValueCommit" | "orientation" | "value"
> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  onValueCommit?: (value: number) => void;
  size?: SliderSize;
  variant?: SliderVariant;
  /** Storybook-only visual focus override for static specimens. */
  storyFocused?: boolean;
};

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(function Slider(
  {
    className,
    min = 0,
    max = 100,
    step = 1,
    value: valueProp,
    defaultValue,
    onValueChange,
    onValueCommit,
    size = "sm",
    variant = "primary",
    disabled = false,
    storyFocused = false,
    ...rest
  },
  ref,
) {
  const minV = sanitizeFiniteNumber(min, 0);
  const maxV = Math.max(minV, sanitizeFiniteNumber(max, 100));
  const stepV = Number.isFinite(step) && step > 0 ? step : 1;
  const isControlled = valueProp !== undefined;

  const uncontrolledInitialRef = React.useRef<number | null>(null);
  if (!isControlled && uncontrolledInitialRef.current === null) {
    uncontrolledInitialRef.current = normalizeSliderValue(defaultValue ?? minV, minV, maxV, stepV);
  }

  const controlledValue = isControlled ? normalizeSliderValue(valueProp ?? minV, minV, maxV, stepV) : undefined;

  const handleValueChange = React.useCallback(
    (values: number[]) => {
      const next = normalizeSliderValue(values[0] ?? minV, minV, maxV, stepV);
      onValueChange?.(next);
    },
    [maxV, minV, onValueChange, stepV],
  );

  const handleValueCommit = React.useCallback(
    (values: number[]) => {
      const next = normalizeSliderValue(values[0] ?? minV, minV, maxV, stepV);
      onValueCommit?.(next);
    },
    [maxV, minV, onValueCommit, stepV],
  );

  const rootValueProps: { value: number[]; defaultValue?: undefined } | { defaultValue: number[]; value?: undefined } =
    isControlled ? { value: [controlledValue ?? minV] } : { defaultValue: [uncontrolledInitialRef.current ?? minV] };

  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider-root"
      className={cn(
        "relative flex w-full min-w-0 touch-none select-none items-center",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        size === "sm" ? "min-h-[1.125rem] py-[0.0625rem]" : "min-h-5 py-[0.0625rem]",
        className,
      )}
      min={minV}
      max={maxV}
      step={stepV}
      disabled={disabled}
      orientation="horizontal"
      {...rest}
      onValueChange={handleValueChange}
      onValueCommit={handleValueCommit}
      {...rootValueProps}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(sliderTrackVariants({ size, disabled }), "relative flex w-full grow")}
      >
        <SliderPrimitive.Range data-slot="slider-range" className={sliderFillVariants({ variant, disabled })} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        className={sliderThumbVariants({ size, variant, disabled })}
        data-slider-size={size}
        data-slider-variant={variant}
        data-story-state={storyFocused ? "focused" : undefined}
      />
    </SliderPrimitive.Root>
  );
});

export { Slider, sliderFillVariants, sliderThumbVariants, sliderTrackVariants };
