import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Button, type ButtonAsButtonProps, type ButtonSize } from '../button';
import { controlInteractiveTransitionClassName } from '../control-transition';

export type ToggleGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'x-lg';

function toggleGroupSizeToButtonSize(size: ToggleGroupSize): ButtonSize {
  return size === 'x-lg' ? 'xl' : size;
}

type ToggleGroupItemSnapshot = {
  enabledValues: string[];
};

function areStringArraysEqual(left: string[], right: string[]): boolean {
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

function getToggleGroupButtons(
  root: HTMLDivElement | null,
  selector = 'button[data-toggle-group-item]',
): HTMLButtonElement[] {
  if (root == null) return [];
  return [...root.querySelectorAll<HTMLButtonElement>(selector)];
}

function getToggleGroupItemValue(button: HTMLButtonElement): string | null {
  const value = button.dataset.toggleGroupValue;
  return value != null && value.length > 0 ? value : null;
}

function getToggleGroupItemSnapshot(
  root: HTMLDivElement | null,
): ToggleGroupItemSnapshot {
  const buttons = getToggleGroupButtons(root);
  const enabledValues = buttons
    .filter((button) => !button.disabled)
    .map(getToggleGroupItemValue)
    .filter((value): value is string => value != null);

  return { enabledValues };
}

const toggleGroupRootVariants = cva(
  cn(
    'flex w-full min-w-0 items-stretch shadow-control-shadow-outer outline-none inner-border inner-border-1 [--inner-border-color:var(--semantic-border-brand-default)]',
    controlInteractiveTransitionClassName,
    'hover:[--inner-border-color:var(--semantic-border-brand-default-hover)] has-[:focus-visible]:[--inner-border-color:var(--semantic-border-brand-default-focused)] data-[story-state=focused]:[--inner-border-color:var(--semantic-border-brand-default-focused)]',
  ),
  {
    variants: {
      size: {
        xs: 'rounded-border-md',
        sm: 'rounded-border-md',
        md: 'rounded-border-lg',
        lg: 'rounded-border-x-lg',
        'x-lg': 'rounded-border-x-lg',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

type ToggleGroupContextValue = {
  value: string;
  selectValue: (next: string) => void;
  disabled: boolean;
  buttonSize: ButtonSize;
  tabStopValue: string | null;
};

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(
  null,
);

function useToggleGroupContext(consumer: string): ToggleGroupContextValue {
  const ctx = React.useContext(ToggleGroupContext);
  if (ctx == null) {
    throw new Error(`${consumer} must be used within ToggleGroup.Root`);
  }
  return ctx;
}

export type ToggleGroupRootProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'defaultValue' | 'onChange'
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: ToggleGroupSize;
  disabled?: boolean;
};

const ToggleGroupRoot = React.forwardRef<HTMLDivElement, ToggleGroupRootProps>(
  function ToggleGroupRoot(
    {
      className,
      size = 'md',
      disabled = false,
      value: valueProp,
      defaultValue = '',
      onValueChange,
      children,
      onKeyDown,
      ...props
    },
    ref,
  ) {
    const isControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] =
      React.useState(defaultValue);
    const value = isControlled ? (valueProp ?? '') : uncontrolledValue;
    const [itemSnapshot, setItemSnapshot] =
      React.useState<ToggleGroupItemSnapshot>({
        enabledValues: [],
      });

    const selectValue = React.useCallback(
      (next: string) => {
        if (next === '' || next === value) return;
        if (!isControlled) {
          setUncontrolledValue(next);
        }
        onValueChange?.(next);
      },
      [isControlled, onValueChange, value],
    );

    const buttonSize = React.useMemo(
      () => toggleGroupSizeToButtonSize(size),
      [size],
    );

    const rootRef = React.useRef<HTMLDivElement | null>(null);

    const setRootRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref != null) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );

    React.useLayoutEffect(() => {
      const nextSnapshot = getToggleGroupItemSnapshot(rootRef.current);
      setItemSnapshot((prev) =>
        areStringArraysEqual(prev.enabledValues, nextSnapshot.enabledValues)
          ? prev
          : nextSnapshot,
      );
    });

    const { enabledValues } = itemSnapshot;

    const tabStopValue = React.useMemo(() => {
      if (enabledValues.includes(value)) {
        return value;
      }
      return enabledValues[0] ?? null;
    }, [enabledValues, value]);

    const getActiveSegmentIndex = React.useCallback((): number => {
      const buttons = getToggleGroupButtons(
        rootRef.current,
        'button[data-toggle-group-item]:not(:disabled)',
      );
      if (buttons.length === 0) return -1;

      const active = document.activeElement;
      if (active instanceof HTMLButtonElement) {
        const activeIndex = buttons.indexOf(active);
        if (activeIndex >= 0) {
          return activeIndex;
        }
      }

      if (tabStopValue != null) {
        const tabStopIndex = buttons.findIndex(
          (button) => getToggleGroupItemValue(button) === tabStopValue,
        );
        if (tabStopIndex >= 0) {
          return tabStopIndex;
        }
      }

      return 0;
    }, [tabStopValue]);

    const focusItemByIndex = React.useCallback((index: number) => {
      const buttons = getToggleGroupButtons(
        rootRef.current,
        'button[data-toggle-group-item]:not(:disabled)',
      );
      const btn = buttons[index];
      if (btn instanceof HTMLElement) {
        btn.focus();
      }
    }, []);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || disabled || enabledValues.length === 0)
          return;

        const idx = getActiveSegmentIndex();
        if (idx < 0) return;

        const len = enabledValues.length;
        const isRtl =
          rootRef.current != null &&
          getComputedStyle(rootRef.current).direction === 'rtl';
        const nextHorizontalKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
        const previousHorizontalKey = isRtl ? 'ArrowRight' : 'ArrowLeft';

        const move = (delta: number) => {
          event.preventDefault();
          const nextIdx = (idx + delta + len) % len;
          const next = enabledValues[nextIdx];
          if (next == null) return;
          selectValue(next);
          queueMicrotask(() => {
            focusItemByIndex(nextIdx);
          });
        };

        switch (event.key) {
          case nextHorizontalKey:
          case 'ArrowDown':
            move(1);
            break;
          case previousHorizontalKey:
          case 'ArrowUp':
            move(-1);
            break;
          case 'Home': {
            event.preventDefault();
            const first = enabledValues[0];
            if (first == null) return;
            selectValue(first);
            queueMicrotask(() => focusItemByIndex(0));
            break;
          }
          case 'End': {
            event.preventDefault();
            const last = enabledValues[enabledValues.length - 1];
            if (last == null) return;
            selectValue(last);
            queueMicrotask(() => focusItemByIndex(len - 1));
            break;
          }
          default:
            break;
        }
      },
      [
        disabled,
        enabledValues,
        focusItemByIndex,
        getActiveSegmentIndex,
        onKeyDown,
        selectValue,
      ],
    );

    const ctx = React.useMemo(
      () => ({
        value,
        selectValue,
        disabled,
        buttonSize,
        tabStopValue,
      }),
      [value, selectValue, disabled, buttonSize, tabStopValue],
    );

    return (
      <ToggleGroupContext.Provider value={ctx}>
        <div
          ref={setRootRef}
          role='radiogroup'
          aria-disabled={disabled || undefined}
          aria-orientation='horizontal'
          data-slot='toggle-group'
          data-toggle-group-size={size}
          data-disabled={disabled ? '' : undefined}
          className={cn(toggleGroupRootVariants({ size }), className)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    );
  },
);

export type ToggleGroupItemProps = Omit<
  ButtonAsButtonProps,
  'variant' | 'size' | 'zeroCorner' | 'pressed' | 'unchecked' | 'type' | 'href'
> & {
  value: string;
};

function ToggleGroupItem({
  className,
  value: itemValue,
  disabled: itemDisabled,
  onClick,
  ...props
}: ToggleGroupItemProps) {
  const {
    value,
    selectValue,
    disabled: groupDisabled,
    buttonSize,
    tabStopValue,
  } = useToggleGroupContext('ToggleGroup.Item');

  const disabled = Boolean(groupDisabled || itemDisabled);
  const selected = value !== '' && value === itemValue;
  const focusSurfaceClassName = selected
    ? cn(
        'focus-visible:bg-components-controls-bg-secondary-default focus-visible:bg-[image:none]',
        'data-[story-state=focused]:bg-components-controls-bg-secondary-default data-[story-state=focused]:bg-[image:none]',
        'focus-visible:hover:bg-components-controls-bg-secondary-hover focus-visible:active:bg-components-controls-bg-secondary-active',
      )
    : cn(
        'focus-visible:bg-components-controls-bg-secondary-default focus-visible:bg-[image:var(--gradient-brand-primary)]',
        'data-[story-state=focused]:bg-components-controls-bg-secondary-default data-[story-state=focused]:bg-[image:var(--gradient-brand-primary)]',
      );
  const tabIndex =
    disabled || tabStopValue == null
      ? disabled
        ? -1
        : undefined
      : tabStopValue === itemValue
        ? 0
        : -1;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || disabled) return;
    selectValue(itemValue);
  };

  return (
    <Button
      type='button'
      role='radio'
      aria-checked={selected}
      tabIndex={tabIndex}
      variant={selected ? 'secondary' : 'primary'}
      size={buttonSize}
      zeroCorner
      disabled={disabled}
      className={cn(
        'min-w-0 flex-1 !shrink focus-visible:z-[1] focus-visible:border-0 data-[story-state=focused]:z-[1] data-[story-state=focused]:border-0',
        '[&:first-child]:![border-top-left-radius:inherit]',
        '[&:first-child]:![border-bottom-left-radius:inherit]',
        '[&:last-child]:![border-top-right-radius:inherit]',
        '[&:last-child]:![border-bottom-right-radius:inherit]',
        focusSurfaceClassName,
        className,
      )}
      data-toggle-group-item=''
      data-toggle-group-value={itemValue}
      data-state={selected ? 'on' : 'off'}
      onClick={handleClick}
      {...props}
    />
  );
}

const ToggleGroup = {
  Root: ToggleGroupRoot,
  Item: ToggleGroupItem,
};

export {
  ToggleGroup,
  ToggleGroupRoot,
  ToggleGroupItem,
  toggleGroupRootVariants,
};
export type ToggleGroupRootVariantProps = VariantProps<
  typeof toggleGroupRootVariants
>;
