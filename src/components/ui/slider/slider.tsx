import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { controlInteractiveTransitionClassName } from "../control-transition";

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function roundToStep(value: number, min: number, step: number): number {
  if (step <= 0) return value;
  const steps = Math.round((value - min) / step);
  return min + steps * step;
}

const sliderTrackVariants = cva(
  cn(
    "relative block w-full grow overflow-hidden rounded-full shadow-[var(--control-shadow-outer),var(--control-shadow-inner)]",
    controlInteractiveTransitionClassName,
    "transition-[height,opacity] duration-[var(--control-transition-duration,250ms)] ease-[var(--control-transition-timing,cubic-bezier(0.4,0,0.2,1))]",
  ),
  {
    variants: {
      size: {
        sm: "h-[var(--space-space-1)]",
        md: "h-[var(--space-space-1-5)]",
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
  cn(
    "pointer-events-none absolute inset-y-0 block rounded-l-[var(--border-xxs)]",
    controlInteractiveTransitionClassName,
  ),
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
      full: {
        true: "rounded-full",
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
    defaultVariants: { variant: "primary", disabled: false, full: false },
  },
);

const sliderThumbVariants = cva(
  cn(
    "z-[1] box-border block rounded-full border-[1.5px] border-solid shadow-control-shadow-outer",
    controlInteractiveTransitionClassName,
    "transition-[background-color,border-color,box-shadow] duration-[var(--control-transition-duration,250ms)] ease-[var(--control-transition-timing,cubic-bezier(0.4,0,0.2,1))]",
    "touch-none outline-none focus-visible:outline-none",
  ),
  {
    variants: {
      size: {
        sm: "h-[var(--space-space-3-5)] w-[var(--space-space-3-5)] min-h-[var(--space-space-3-5)] min-w-[var(--space-space-3-5)]",
        md: "h-[var(--space-space-4)] w-[var(--space-space-4)] min-h-[var(--space-space-4)] min-w-[var(--space-space-4)]",
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
        class: "border-primitive-colors-brand-150 bg-components-controls-bg-primary",
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
  "value" | "defaultValue" | "onValueChange"
> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  size?: SliderSize;
  variant?: SliderVariant;
  /** Для Storybook: имитация клавишного фокуса как у кнопок */
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
    size = "sm",
    variant = "primary",
    disabled = false,
    storyFocused = false,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ...rest
  },
  ref,
) {
  const minV = min;
  const maxV = max;
  const stepV = step > 0 ? step : 1;

  const isControlled = valueProp !== undefined;

  const uncontrolledInitialRef = React.useRef<number | null>(null);
  if (!isControlled && uncontrolledInitialRef.current === null) {
    const seed = Number(defaultValue ?? minV);
    uncontrolledInitialRef.current = clamp(roundToStep(Number.isFinite(seed) ? seed : minV, minV, stepV), minV, maxV);
  }

  const numeric = isControlled ? Number(valueProp) : (uncontrolledInitialRef.current ?? minV);
  const safe = Number.isFinite(numeric) ? numeric : minV;
  const snapped = clamp(roundToStep(safe, minV, stepV), minV, maxV);
  const pct = maxV === minV ? 0 : (snapped - minV) / (maxV - minV);
  const isFull = pct >= 1 - 1e-6;

  const handleValueChange = React.useCallback(
    (vals: number[]) => {
      const raw = vals[0] ?? minV;
      const next = clamp(roundToStep(raw, minV, stepV), minV, maxV);
      onValueChange?.(next);
    },
    [maxV, minV, onValueChange, stepV],
  );

  const rootControlledProps: { value: number[]; defaultValue?: undefined } | { defaultValue: number[]; value?: undefined } =
    isControlled ? { value: [snapped] } : { defaultValue: [uncontrolledInitialRef.current ?? minV] };

  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider-root"
      className={cn(
        "relative flex w-full min-w-[8rem] touch-none select-none items-center",
        size === "sm" ? "min-h-[1.125rem] py-px" : "min-h-5 py-px",
        className,
      )}
      min={minV}
      max={maxV}
      step={stepV}
      disabled={disabled}
      orientation="horizontal"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...rest}
      onValueChange={handleValueChange}
      {...rootControlledProps}
    >
      <SliderPrimitive.Track className={cn(sliderTrackVariants({ size, disabled }), "relative flex w-full grow")}>
        <SliderPrimitive.Range
          className={sliderFillVariants({ variant, disabled, full: isFull })}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={sliderThumbVariants({ size, variant, disabled })}
        data-slot="slider"
        data-slider-variant={variant}
        data-slider-size={size}
        data-story-state={storyFocused ? "focused" : undefined}
      />
    </SliderPrimitive.Root>
  );
});

export { Slider, sliderFillVariants, sliderThumbVariants, sliderTrackVariants };
