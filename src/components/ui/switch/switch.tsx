import * as React from "react";

import { cn } from "@/lib/utils";

type SwitchState = "off" | "on" | "disabled-off" | "disabled-on";
export type SwitchSize = "md" | "lg";
export type SwitchVariant = "primary" | "secondary";

const switchTrackBaseClassName = "relative isolate block shrink-0 overflow-hidden rounded-[0.625rem] shadow-control-shadow-inner";

const switchTrackInteractiveClassName = cn(
  "group-has-[:focus-visible]:shadow-[var(--control-shadow-outer-focused),var(--control-shadow-inner)]",
);

const switchFillBaseClassName =
  "pointer-events-none absolute inset-y-0 left-0 rounded-[inherit] transition-[width,opacity,background-color,background-image] duration-[var(--control-transition-duration,250ms)] ease-[var(--control-transition-timing,cubic-bezier(0.4,0,0.2,1))]";

const switchThumbBaseClassName =
  "pointer-events-none absolute left-0 top-0 z-[1] block rounded-full transition-[translate,background-color,background-image] duration-[var(--control-transition-duration,250ms)] ease-[var(--control-transition-timing,cubic-bezier(0.4,0,0.2,1))]";

const switchThumbFillBaseClassName =
  "absolute inset-0.5 rounded-full bg-components-controls-bg-primary shadow-control-shadow-inner transition-[background-color] duration-[var(--control-transition-duration,250ms)] ease-[var(--control-transition-timing,cubic-bezier(0.4,0,0.2,1))]";

const switchTrackSizeClassNameBySize: Record<SwitchSize, string> = {
  md: "h-4.5 w-10",
  lg: "h-5 w-11",
};

const switchTrackClassNameByVariantAndState: Record<SwitchVariant, Record<SwitchState, string>> = {
  primary: {
    off: "bg-components-controls-bg-primary",
    on: "bg-components-controls-bg-primary",
    "disabled-off": "bg-components-controls-bg-disabled",
    "disabled-on": "bg-components-controls-bg-disabled",
  },
  secondary: {
    off: "bg-components-controls-bg-primary",
    on: "bg-components-controls-bg-primary",
    "disabled-off": "bg-components-controls-bg-disabled",
    "disabled-on": "bg-components-controls-bg-disabled",
  },
};

const switchThumbSizeClassNameBySize: Record<SwitchSize, string> = {
  md: "size-4.5",
  lg: "size-5",
};

const switchFillClassNameByVariantAndState: Record<SwitchVariant, Record<SwitchState, string>> = {
  primary: {
    off: "w-0 bg-[image:var(--gradient-brand-primary)] opacity-100",
    on: "w-full bg-[image:var(--gradient-brand-primary)] opacity-100",
    "disabled-off": "w-0 bg-[image:var(--gradient-brand-primary)] opacity-20",
    "disabled-on": "w-full bg-[image:var(--gradient-brand-primary)] opacity-20",
  },
  secondary: {
    off: "w-0 bg-components-controls-bg-secondary-default opacity-100",
    on: "w-full bg-components-controls-bg-secondary-default opacity-100",
    "disabled-off": "w-0 bg-components-controls-bg-secondary-default opacity-20",
    "disabled-on": "w-full bg-components-controls-bg-secondary-default opacity-20",
  },
};

const switchThumbShellClassNameByVariantAndState: Record<SwitchVariant, Record<SwitchState, string>> = {
  primary: {
    off: "bg-[image:var(--gradient-brand-primary)]",
    on: "bg-[image:var(--gradient-brand-primary)]",
    "disabled-off": "bg-components-controls-border-disabled",
    "disabled-on": "bg-components-controls-border-disabled",
  },
  secondary: {
    off: "bg-components-controls-bg-primary",
    on: "bg-transparent",
    "disabled-off": "bg-components-controls-border-disabled",
    "disabled-on": "bg-transparent",
  },
};

const switchThumbFillClassNameByVariantAndState: Record<SwitchVariant, Record<SwitchState, string>> = {
  primary: {
    off: "bg-components-controls-bg-primary",
    on: "bg-components-controls-bg-primary",
    "disabled-off": "bg-components-controls-bg-primary",
    "disabled-on": "bg-components-controls-bg-primary",
  },
  secondary: {
    off: "bg-components-controls-bg-secondary-default",
    on: "bg-components-controls-bg-primary",
    "disabled-off": "bg-components-controls-bg-primary",
    "disabled-on": "bg-components-controls-bg-primary",
  },
};

const switchThumbTranslateClassNameBySizeAndState: Record<SwitchSize, Record<SwitchState, string>> = {
  md: {
    off: "translate-x-0",
    on: "translate-x-[1.375rem]",
    "disabled-off": "translate-x-0",
    "disabled-on": "translate-x-[1.375rem]",
  },
  lg: {
    off: "translate-x-0",
    on: "translate-x-6",
    "disabled-off": "translate-x-0",
    "disabled-on": "translate-x-6",
  },
};

function resolveSwitchState(checked: boolean, disabled: boolean): SwitchState {
  if (disabled) {
    return checked ? "disabled-on" : "disabled-off";
  }

  return checked ? "on" : "off";
}

function switchTrackVariants({
  variant,
  size,
  interactive,
  state,
}: {
  variant: SwitchVariant;
  size: SwitchSize;
  interactive: boolean;
  state: SwitchState;
}): string {
  return cn(
    switchTrackBaseClassName,
    switchTrackSizeClassNameBySize[size],
    switchTrackClassNameByVariantAndState[variant][state],
    interactive && switchTrackInteractiveClassName,
  );
}

function switchFillVariants(variant: SwitchVariant, state: SwitchState): string {
  return cn(switchFillBaseClassName, switchFillClassNameByVariantAndState[variant][state]);
}

function switchThumbVariants(variant: SwitchVariant, size: SwitchSize, state: SwitchState): string {
  return cn(
    switchThumbBaseClassName,
    switchThumbSizeClassNameBySize[size],
    switchThumbShellClassNameByVariantAndState[variant][state],
    switchThumbTranslateClassNameBySizeAndState[size][state],
  );
}

function switchThumbFillVariants(variant: SwitchVariant, state: SwitchState): string {
  return cn(switchThumbFillBaseClassName, switchThumbFillClassNameByVariantAndState[variant][state]);
}

export type SwitchProps = Omit<React.ComponentPropsWithoutRef<"input">, "type" | "size"> & {
  size?: SwitchSize;
  variant?: SwitchVariant;
};

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { className, size = "md", variant = "primary", disabled = false, checked, defaultChecked, onChange, ...inputProps },
  ref,
) {
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(() => Boolean(defaultChecked));
  const isControlled = checked !== undefined;
  const resolvedChecked = isControlled ? Boolean(checked) : uncontrolledChecked;
  const state = resolveSwitchState(resolvedChecked, disabled);
  const interactive = !disabled;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledChecked(event.target.checked);
    }

    onChange?.(event);
  };

  return (
    <label
      data-slot="switch"
      data-switch-size={size}
      data-switch-variant={variant}
      data-switch-state={state}
      className={cn("group inline-flex cursor-pointer select-none items-center has-[:disabled]:cursor-not-allowed", className)}
    >
      <input
        {...inputProps}
        ref={ref}
        type="checkbox"
        role="switch"
        disabled={disabled}
        checked={isControlled ? checked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        onChange={handleChange}
        aria-checked={resolvedChecked}
        className="sr-only"
      />
      <span data-slot="switch-track" className={switchTrackVariants({ variant, size, state, interactive })} aria-hidden>
        <span data-slot="switch-fill" className={switchFillVariants(variant, state)} aria-hidden />
        <span data-slot="switch-thumb" className={switchThumbVariants(variant, size, state)} aria-hidden>
          <span data-slot="switch-thumb-fill" className={switchThumbFillVariants(variant, state)} aria-hidden />
        </span>
      </span>
    </label>
  );
});

export { Switch, switchFillVariants, switchThumbFillVariants, switchThumbVariants, switchTrackVariants };
