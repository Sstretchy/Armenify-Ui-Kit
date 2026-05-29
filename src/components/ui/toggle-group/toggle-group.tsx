import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Button, type ButtonAsButtonProps, type ButtonSize } from "../button";

export type ToggleGroupSize = "xs" | "sm" | "md" | "lg" | "x-lg";

function toggleGroupSizeToButtonSize(size: ToggleGroupSize): ButtonSize {
  return size === "x-lg" ? "xl" : size;
}

const toggleGroupRootVariants = cva(
  "flex w-full min-w-0 items-stretch overflow-hidden border-[0.09375rem] border-solid border-semantic-border-brand-default shadow-[0_0.0625rem_0.125rem_0_var(--components-controls-shadows-default)] outline-none",
  {
    variants: {
      size: {
        xs: "rounded-border-md",
        sm: "rounded-border-md",
        md: "rounded-border-lg",
        lg: "rounded-border-x-lg",
        "x-lg": "rounded-border-x-lg",
      },
    },
    defaultVariants: { size: "md" },
  },
);

type ToggleGroupContextValue = {
  value: string;
  setValue: (next: string) => void;
  disabled: boolean;
  buttonSize: ButtonSize;
  orderedValues: string[];
  registerItem: (itemValue: string) => void;
  unregisterItem: (itemValue: string) => void;
};

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null);

function useToggleGroupContext(consumer: string): ToggleGroupContextValue {
  const ctx = React.useContext(ToggleGroupContext);
  if (ctx == null) {
    throw new Error(`${consumer} must be used within ToggleGroup.Root`);
  }
  return ctx;
}

export type ToggleGroupRootProps = Omit<React.ComponentPropsWithoutRef<"div">, "defaultValue" | "onChange"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: ToggleGroupSize;
  disabled?: boolean;
};

const ToggleGroupRoot = React.forwardRef<HTMLDivElement, ToggleGroupRootProps>(function ToggleGroupRoot(
  {
    className,
    size = "md",
    disabled = false,
    value: valueProp,
    defaultValue = "",
    onValueChange,
    children,
    onKeyDown,
    ...props
  },
  ref,
) {
  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const value = isControlled ? valueProp! : uncontrolledValue;

  const [orderedValues, setOrderedValues] = React.useState<string[]>([]);

  const registerItem = React.useCallback((itemValue: string) => {
    setOrderedValues((prev) => (prev.includes(itemValue) ? prev : [...prev, itemValue]));
  }, []);

  const unregisterItem = React.useCallback((itemValue: string) => {
    setOrderedValues((prev) => prev.filter((v) => v !== itemValue));
  }, []);

  const setValue = React.useCallback(
    (next: string) => {
      if (next === "") return;
      if (!isControlled) {
        setUncontrolledValue(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const buttonSize = React.useMemo(() => toggleGroupSizeToButtonSize(size), [size]);

  const rootRef = React.useRef<HTMLDivElement | null>(null);

  const setRootRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref],
  );

  const getActiveSegmentIndex = React.useCallback((): number => {
    const root = rootRef.current;
    if (root == null) return 0;
    const active = document.activeElement;
    if (active instanceof HTMLButtonElement && root.contains(active)) {
      const buttons = [...root.querySelectorAll("button[data-toggle-group-item]")] as HTMLButtonElement[];
      const i = buttons.indexOf(active);
      if (i >= 0) return i;
    }
    const fromValue = orderedValues.indexOf(value);
    return fromValue >= 0 ? fromValue : 0;
  }, [orderedValues, value]);

  const focusItemByIndex = React.useCallback((index: number) => {
    const root = rootRef.current;
    if (root == null) return;
    const buttons = root.querySelectorAll("button[data-toggle-group-item]");
    const btn = buttons.item(index);
    if (btn instanceof HTMLElement) {
      btn.focus();
    }
  }, []);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || disabled || orderedValues.length === 0) return;

      const idx = getActiveSegmentIndex();
      const len = orderedValues.length;

      const move = (delta: number) => {
        event.preventDefault();
        const nextIdx = (idx + delta + len) % len;
        const next = orderedValues[nextIdx];
        if (next == null) return;
        setValue(next);
        queueMicrotask(() => {
          focusItemByIndex(nextIdx);
        });
      };

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          move(1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          move(-1);
          break;
        case "Home": {
          event.preventDefault();
          const first = orderedValues[0];
          if (first == null) return;
          setValue(first);
          queueMicrotask(() => focusItemByIndex(0));
          break;
        }
        case "End": {
          event.preventDefault();
          const last = orderedValues[orderedValues.length - 1];
          if (last == null) return;
          setValue(last);
          queueMicrotask(() => focusItemByIndex(len - 1));
          break;
        }
        default:
          break;
      }
    },
    [disabled, focusItemByIndex, getActiveSegmentIndex, onKeyDown, orderedValues, setValue],
  );

  const ctx = React.useMemo(
    () => ({
      value,
      setValue,
      disabled,
      buttonSize,
      orderedValues,
      registerItem,
      unregisterItem,
    }),
    [value, setValue, disabled, buttonSize, orderedValues, registerItem, unregisterItem],
  );

  return (
    <ToggleGroupContext.Provider value={ctx}>
      <div
        ref={setRootRef}
        role="group"
        data-slot="toggle-group"
        data-toggle-group-size={size}
        className={cn(toggleGroupRootVariants({ size }), className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
});

export type ToggleGroupItemProps = Omit<
  ButtonAsButtonProps,
  "variant" | "size" | "zeroCorner" | "pressed" | "unchecked" | "type" | "href"
> & {
  value: string;
};

function ToggleGroupItem({ className, value: itemValue, disabled: itemDisabled, onClick, ...props }: ToggleGroupItemProps) {
  const { value, setValue, disabled: groupDisabled, buttonSize, orderedValues, registerItem, unregisterItem } =
    useToggleGroupContext("ToggleGroup.Item");

  React.useLayoutEffect(() => {
    registerItem(itemValue);
    return () => {
      unregisterItem(itemValue);
    };
  }, [itemValue, registerItem, unregisterItem]);

  const hasSelection = value !== "" && orderedValues.includes(value);
  const selected = value === itemValue && hasSelection;

  const disabled = Boolean(groupDisabled || itemDisabled);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (disabled) return;
    setValue(itemValue);
    onClick?.(event);
  };

  return (
    <Button
      type="button"
      aria-pressed={selected}
      variant={selected ? "primary" : "tertiary"}
      size={buttonSize}
      zeroCorner
      unchecked={!selected}
      disabled={disabled}
      className={cn("min-w-0 flex-1 !shrink", className)}
      data-toggle-group-item=""
      onClick={handleClick}
      {...props}
    />
  );
}

const ToggleGroup = {
  Root: ToggleGroupRoot,
  Item: ToggleGroupItem,
};

export { ToggleGroup, ToggleGroupRoot, ToggleGroupItem, toggleGroupRootVariants };
export type ToggleGroupRootVariantProps = VariantProps<typeof toggleGroupRootVariants>;
