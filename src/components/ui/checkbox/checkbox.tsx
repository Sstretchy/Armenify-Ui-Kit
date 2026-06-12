import * as React from "react";
import { CheckFat } from "phosphor-strokes-icons";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { controlInteractiveTransitionClassName } from "../control-transition";
import { ArmenifyIcon, type ArmenifyIconSize } from "../icon";

type BoxState = "unchecked" | "checked" | "indeterminate" | "disabled";
export type CheckboxVariant = "primary" | "secondary" | "tertiary";
export type CheckboxStoryState = "hover" | "active" | "focused";

const checkboxOuterInteractiveShadowClassName = cn(
  "group-hover:shadow-control-shadow-hover group-active:shadow-control-shadow-active",
  "group-data-[story-state=hover]:shadow-control-shadow-hover group-data-[story-state=active]:shadow-control-shadow-active",
);

const checkboxFocusClassName = cn(
  "group-has-[:focus-visible]:outline-solid group-has-[:focus-visible]:[outline-width:0.125rem] group-has-[:focus-visible]:[outline-color:var(--color-semantic-text-brand-secondary-light)] group-has-[:focus-visible]:[outline-offset:0rem]",
  "group-data-[story-state=focused]:outline-solid group-data-[story-state=focused]:[outline-width:0.125rem] group-data-[story-state=focused]:[outline-color:var(--color-semantic-text-brand-secondary-light)] group-data-[story-state=focused]:[outline-offset:0rem]",
);

const checkboxCheckedSurfaceClassName = cn(
  "absolute inset-0 rounded-[inherit] bg-[image:var(--gradient-brand-primary)]",
  controlInteractiveTransitionClassName,
  "transition-[inset,border-radius,box-shadow] duration-[var(--control-transition-duration,250ms)] ease-[var(--control-transition-timing,cubic-bezier(0.4,0,0.2,1))]",
  "group-hover:inset-0.5 group-hover:rounded-[calc(var(--radius-border-xs)-0.0625rem)] group-hover:shadow-control-shadow-hover-inner",
  "group-active:inset-0.5 group-active:rounded-[calc(var(--radius-border-xs)-0.0625rem)] group-active:shadow-control-shadow-active-inner",
  "group-data-[story-state=hover]:inset-0.5 group-data-[story-state=hover]:rounded-[calc(var(--radius-border-xs)-0.0625rem)] group-data-[story-state=hover]:shadow-control-shadow-hover-inner",
  "group-data-[story-state=active]:inset-0.5 group-data-[story-state=active]:rounded-[calc(var(--radius-border-xs)-0.0625rem)] group-data-[story-state=active]:shadow-control-shadow-active-inner",
);

const checkboxInteractiveSurfaceShadowClassName = cn(
  "group-hover:shadow-control-shadow-hover-inner group-active:shadow-control-shadow-active-inner",
  "group-data-[story-state=hover]:shadow-control-shadow-hover-inner group-data-[story-state=active]:shadow-control-shadow-active-inner",
);

const checkboxSurfaceBaseClassName = cn(
  "absolute inset-0 rounded-[inherit]",
  controlInteractiveTransitionClassName,
  "transition-[background-color,box-shadow] duration-[var(--control-transition-duration,250ms)] ease-[var(--control-transition-timing,cubic-bezier(0.4,0,0.2,1))]",
);

const checkboxSecondarySurfaceClassName = cn(
  checkboxSurfaceBaseClassName,
  checkboxInteractiveSurfaceShadowClassName,
  "group-hover:bg-components-controls-bg-secondary-hover group-active:bg-components-controls-bg-secondary-active",
  "group-data-[story-state=hover]:bg-components-controls-bg-secondary-hover group-data-[story-state=active]:bg-components-controls-bg-secondary-active",
);

const checkboxTertiarySurfaceClassName = cn(checkboxSurfaceBaseClassName, checkboxInteractiveSurfaceShadowClassName);

const checkboxBoxVariants = cva(
  cn(
    "relative isolate flex shrink-0 items-center justify-center overflow-hidden rounded-border-xs shadow-control-shadow-outer outline-none",
    controlInteractiveTransitionClassName,
    "transition-[background-color,background-image,box-shadow,outline-color,outline-width] duration-[var(--control-transition-duration,250ms)] ease-[var(--control-transition-timing,cubic-bezier(0.4,0,0.2,1))]",
  ),
  {
    variants: {
      size: {
        xs: "size-5",
        sm: "h-[1.375rem] w-[1.375rem]",
        md: "h-[1.625rem] w-[1.625rem]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export type CheckboxSize = NonNullable<VariantProps<typeof checkboxBoxVariants>["size"]>;

const iconSizeByCheckbox: Record<CheckboxSize, ArmenifyIconSize> = {
  xs: "xx-small",
  sm: "x-small",
  md: "small",
};

const indeterminateSizeClassNameByCheckbox: Record<CheckboxSize, string> = {
  xs: "h-0.5 w-2.5",
  sm: "h-0.5 w-3",
  md: "h-0.5 w-3.5",
};

function resolveBoxState({
  checked,
  disabled,
  indeterminate,
}: {
  checked: boolean;
  disabled: boolean;
  indeterminate: boolean;
}): BoxState {
  if (disabled) {
    return "disabled";
  }

  if (indeterminate) {
    return "indeterminate";
  }

  return checked ? "checked" : "unchecked";
}

function resolveCheckboxBoxClassName({
  checkedLike,
  disabled,
  variant,
}: {
  checkedLike: boolean;
  disabled: boolean;
  variant: CheckboxVariant;
}): string {
  if (disabled) {
    return "bg-components-controls-bg-disabled inner-border inner-border-2 [--inner-border-color:var(--components-controls-border-disabled)]";
  }

  if (checkedLike) {
    switch (variant) {
      case "secondary":
        return "bg-components-controls-bg-secondary-default";
      case "tertiary":
        return "bg-components-controls-bg-tertiary inner-border inner-border-2 [--inner-border-color:var(--components-controls-border-outlined)]";
      default:
        return "bg-[image:var(--gradient-brand-primary)]";
    }
  }

  return cn(
    "bg-components-controls-bg-primary inner-border inner-border-2 [--inner-border-color:var(--primitive-colors-brand-150)]",
    checkboxOuterInteractiveShadowClassName,
  );
}

function resolveCheckboxSurfaceClassName({
  checkedLike,
  disabled,
  variant,
}: {
  checkedLike: boolean;
  disabled: boolean;
  variant: CheckboxVariant;
}): string | null {
  if (!checkedLike || disabled) {
    return null;
  }

  switch (variant) {
    case "secondary":
      return checkboxSecondarySurfaceClassName;
    case "tertiary":
      return checkboxTertiarySurfaceClassName;
    default:
      return checkboxCheckedSurfaceClassName;
  }
}

function resolveCheckboxFocusClassName(disabled: boolean): string {
  return disabled ? "" : checkboxFocusClassName;
}

function resolveCheckboxIndicatorClassNames({
  disabled,
  variant,
}: {
  disabled: boolean;
  variant: CheckboxVariant;
}): {
  textClassName: string;
  fillClassName: string;
} {
  if (disabled) {
    return {
      textClassName: "text-components-controls-text-disabled",
      fillClassName: "bg-components-controls-text-disabled",
    };
  }

  if (variant === "tertiary") {
    return {
      textClassName: "text-components-controls-text-tertiary",
      fillClassName: "bg-components-controls-text-tertiary",
    };
  }

  return {
    textClassName: "text-components-controls-text-primary",
    fillClassName: "bg-components-controls-text-primary",
  };
}

export type CheckboxProps = Omit<React.ComponentPropsWithoutRef<"input">, "type" | "size"> & {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  indeterminate?: boolean;
  /** Storybook-only visual state override for static Figma specimens. */
  storyState?: CheckboxStoryState;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, size = "sm", variant = "primary", indeterminate, disabled = false, checked, defaultChecked, onChange, storyState, ...inputProps },
  ref,
) {
  const innerRef = React.useRef<HTMLInputElement>(null);
  const assignRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    },
    [ref],
  );

  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(() => Boolean(defaultChecked));
  const isControlled = checked !== undefined;
  const resolvedChecked = isControlled ? Boolean(checked) : uncontrolledChecked;
  const isIndeterminate = Boolean(indeterminate);
  const checkedLike = resolvedChecked || isIndeterminate;
  const boxState = resolveBoxState({
    checked: resolvedChecked,
    disabled,
    indeterminate: isIndeterminate,
  });

  React.useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledChecked(event.target.checked);
    }

    onChange?.(event);
  };

  const { textClassName: indicatorTextClassName, fillClassName: indicatorFillClassName } = resolveCheckboxIndicatorClassNames({
    disabled,
    variant,
  });

  const boxClassName = cn(
    checkboxBoxVariants({ size }),
    resolveCheckboxBoxClassName({ checkedLike, disabled, variant }),
    resolveCheckboxFocusClassName(disabled),
  );

  const surfaceClassName = resolveCheckboxSurfaceClassName({ checkedLike, disabled, variant });
  const showCheck = resolvedChecked && !isIndeterminate;
  const showIndeterminate = isIndeterminate;

  return (
    <label
      data-slot="checkbox"
      data-checkbox-state={boxState}
      data-checkbox-variant={variant}
      data-checkbox-size={size}
      data-story-state={storyState}
      className={cn("group inline-flex cursor-pointer select-none items-center rounded has-[:disabled]:cursor-not-allowed", className)}
    >
      <input
        ref={assignRef}
        type="checkbox"
        disabled={disabled}
        checked={isControlled ? checked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
        onChange={handleChange}
        className="sr-only"
        {...inputProps}
      />
      <span data-slot="checkbox-box" data-story-state={storyState} className={boxClassName} aria-hidden>
        {surfaceClassName ? <span data-slot="checkbox-surface" className={surfaceClassName} aria-hidden /> : null}
        <span data-slot="checkbox-indicator" className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
          {showCheck ? (
            <ArmenifyIcon
              icon={CheckFat}
              size={iconSizeByCheckbox[size]}
              strokeWeight="bold"
              className={indicatorTextClassName}
              aria-hidden
            />
          ) : null}
          {showIndeterminate ? (
            <span className={cn("rounded-full", indeterminateSizeClassNameByCheckbox[size], indicatorFillClassName)} aria-hidden />
          ) : null}
        </span>
      </span>
    </label>
  );
});

export { Checkbox, checkboxBoxVariants };
