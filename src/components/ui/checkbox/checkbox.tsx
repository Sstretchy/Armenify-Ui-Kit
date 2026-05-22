import * as React from "react";
import { CheckFat } from "phosphor-strokes-icons";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { controlInteractiveTransitionClassName } from "../control-transition";
import { ArmenifyIcon, type ArmenifyIconSize } from "../icon";

type BoxState = "unchecked" | "checked" | "indeterminate" | "disabled";

const checkboxBoxVariants = cva(
  cn(
    "relative box-border flex shrink-0 items-center justify-center border-[0.09375rem] border-solid",
    controlInteractiveTransitionClassName,
    "transition-[background-color,background-image,border-color,box-shadow] duration-200 ease-out",
    "group-focus-visible:outline-none group-focus-visible:shadow-control-shadow-outer-focused",
  ),
  {
    variants: {
      size: {
        xs: "h-[var(--space-space-4-5)] w-[var(--space-space-4-5)] rounded-border-xxs",
        sm: "h-[var(--space-space-5)] w-[var(--space-space-5)] rounded-border-xxs",
        md: "h-[var(--space-space-6)] w-[var(--space-space-6)] rounded-border-xs",
      },
      variant: {
        primary: "",
        secondary: "",
        tertiary: "",
      },
      boxState: {
        unchecked: "",
        checked: "",
        indeterminate: "",
        disabled: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        boxState: "unchecked",
        class:
          "border-primitive-colors-brand-150 bg-components-controls-bg-primary shadow-control-shadow-outer group-hover:border-primitive-colors-brand-150",
      },
      {
        variant: "primary",
        boxState: "checked",
        class:
          "border-transparent bg-[image:var(--gradient-brand-primary)] shadow-control-shadow-outer group-hover:shadow-[0px_1px_1px_0_var(--components-controls-shadows-default),inset_4px_4px_4px_0_var(--components-controls-shadows-hover)] group-active:shadow-[0px_1px_2px_0_var(--components-controls-shadows-default),inset_4px_4px_4px_0_var(--components-controls-shadows-active)]",
      },
      {
        variant: "primary",
        boxState: "indeterminate",
        class:
          "border-transparent bg-[image:var(--gradient-brand-primary)] shadow-control-shadow-outer group-hover:shadow-[0px_1px_1px_0_var(--components-controls-shadows-default),inset_4px_4px_4px_0_var(--components-controls-shadows-hover)] group-active:shadow-[0px_1px_2px_0_var(--components-controls-shadows-default),inset_4px_4px_4px_0_var(--components-controls-shadows-active)]",
      },
      {
        variant: "primary",
        boxState: "disabled",
        class:
          "border-[1.5px] border-semantic-border-ntrl-disabled bg-components-controls-bg-disabled shadow-control-shadow-outer",
      },

      {
        variant: "secondary",
        boxState: "unchecked",
        class:
          "border-primitive-colors-brand-150 bg-components-controls-bg-primary shadow-control-shadow-outer group-hover:border-primitive-colors-brand-150",
      },
      {
        variant: "secondary",
        boxState: "checked",
        class:
          "border-transparent bg-components-controls-bg-secondary-default shadow-control-shadow-outer group-hover:bg-components-controls-bg-secondary-hover group-hover:shadow-control-shadow-hover group-active:bg-components-controls-bg-secondary-active group-active:shadow-control-shadow-active",
      },
      {
        variant: "secondary",
        boxState: "indeterminate",
        class:
          "border-transparent bg-components-controls-bg-secondary-default shadow-control-shadow-outer group-hover:bg-components-controls-bg-secondary-hover group-hover:shadow-control-shadow-hover group-active:bg-components-controls-bg-secondary-active group-active:shadow-control-shadow-active",
      },
      {
        variant: "secondary",
        boxState: "disabled",
        class:
          "border-[1.5px] border-semantic-border-ntrl-disabled bg-components-controls-bg-disabled shadow-control-shadow-outer",
      },

      {
        variant: "tertiary",
        boxState: "unchecked",
        class:
          "border-components-controls-border-outlined bg-components-controls-bg-tertiary shadow-control-shadow-outer group-hover:shadow-control-shadow-hover group-active:shadow-control-shadow-active",
      },
      {
        variant: "tertiary",
        boxState: "checked",
        class:
          "border-components-controls-border-outlined bg-components-controls-bg-tertiary shadow-control-shadow-outer group-hover:shadow-control-shadow-hover group-active:shadow-control-shadow-active",
      },
      {
        variant: "tertiary",
        boxState: "indeterminate",
        class:
          "border-components-controls-border-outlined bg-components-controls-bg-tertiary shadow-control-shadow-outer group-hover:shadow-control-shadow-hover group-active:shadow-control-shadow-active",
      },
      {
        variant: "tertiary",
        boxState: "disabled",
        class: "border-components-controls-border-disabled bg-components-controls-bg-disabled shadow-control-shadow-outer",
      },
    ],
    defaultVariants: {
      size: "sm",
      variant: "primary",
      boxState: "unchecked",
    },
  },
);

export type CheckboxSize = NonNullable<VariantProps<typeof checkboxBoxVariants>["size"]>;
export type CheckboxVariant = NonNullable<VariantProps<typeof checkboxBoxVariants>["variant"]>;

const iconSizeByCheckbox: Record<CheckboxSize, ArmenifyIconSize> = {
  xs: "xx-small",
  sm: "x-small",
  md: "small",
};

function resolveBoxState(disabled: boolean | undefined, indeterminate: boolean | undefined, checked: boolean): BoxState {
  if (disabled) return "disabled";
  if (indeterminate) return "indeterminate";
  return checked ? "checked" : "unchecked";
}

export type CheckboxProps = Omit<React.ComponentPropsWithoutRef<"input">, "type" | "size"> & {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  indeterminate?: boolean;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, size = "sm", variant = "primary", indeterminate, disabled, checked, defaultChecked, onChange, ...inputProps },
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

  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(Boolean(defaultChecked));
  const isControlled = checked !== undefined;
  const resolvedChecked = isControlled ? Boolean(checked) : uncontrolledChecked;
  const isIndeterminate = Boolean(indeterminate);

  React.useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    el.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  const boxState = resolveBoxState(disabled, indeterminate, resolvedChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledChecked(e.target.checked);
    }
    onChange?.(e);
  };

  const iconClass =
    variant === "tertiary" && boxState !== "disabled"
      ? "text-components-controls-border-outlined"
      : boxState === "disabled"
        ? "text-components-controls-text-disabled"
        : "text-components-controls-text-primary";

  const indeterminateClass =
    variant === "tertiary" && boxState !== "disabled"
      ? "bg-components-controls-border-outlined"
      : boxState === "disabled"
        ? "bg-components-controls-text-disabled"
        : "bg-components-controls-text-primary";

  const sz = size ?? "sm";
  const showCheck = !isIndeterminate && resolvedChecked;
  const showIndeterminate = isIndeterminate;

  return (
    <label
      data-slot="checkbox"
      data-checkbox-variant={variant}
      data-checkbox-size={sz}
      className={cn(
        "group inline-flex cursor-pointer select-none items-center gap-[var(--space-space-2)] has-[:disabled]:cursor-not-allowed",
        className,
      )}
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
      <span className={checkboxBoxVariants({ size: sz, variant, boxState })} aria-hidden>
        {showCheck ? (
          <ArmenifyIcon icon={CheckFat} size={iconSizeByCheckbox[sz]} strokeWeight="bold" className={iconClass} />
        ) : null}
        {showIndeterminate ? <span className={cn("block h-2.5 w-2.5 shrink-0 rounded-[3px]", indeterminateClass)} /> : null}
      </span>
    </label>
  );
});

export { Checkbox, checkboxBoxVariants };
