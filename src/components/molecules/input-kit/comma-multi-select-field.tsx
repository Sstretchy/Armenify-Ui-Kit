import * as React from "react";
import { CaretDown } from "phosphor-strokes-icons";

import { cn } from "@/lib/utils";

import { ArmenifyIcon } from "../../ui/icon";
import { controlDropdownEnterClassName } from "../../ui/control-transition";
import { InputBase, type InputBaseProps } from "../../ui/field/input-base";
import { inputBaseColorToFieldColor, type FieldKitBaseProps } from "./field-kit-shared";
import { MenuItem, type MenuItemColor } from "../../ui/field/menu-item";
import { SelectMenu } from "../../ui/field/select-menu";
import { textInputFieldTextClassName } from "../../ui/field/text-input";
import { TextInputChrome, type TextInputFieldVisualState } from "../../ui/field/text-input-field";
import { textInputRootVariants, type TextInputColor, type TextInputSize, type TextInputTone } from "../../ui/field/text-input";

const selectStackGapClass: Record<TextInputSize, string> = {
  sm: "gap-1",
  md: "gap-1.5",
  lg: "gap-2",
};

function SelectCaret({ color, disabled, open }: { color: TextInputColor; disabled: boolean; open: boolean }) {
  const c = disabled ? "disable" : color === "brand" ? "brand" : "ntrl";
  return (
    <span className="inline-flex shrink-0 leading-none" aria-hidden>
      <ArmenifyIcon
        icon={CaretDown}
        size="xx-small"
        strokeWidthToken="var(--bold-caret-12)"
        className={cn(
          "origin-center transition-transform duration-150 ease-out",
          open && "rotate-180",
          c === "disable" && "text-semantic-text-ntrl-disabled",
          c === "brand" && "text-components-typography-brand-light-inp-text",
          c === "ntrl" && "text-components-typography-ntrl-light-inp-text",
        )}
      />
    </span>
  );
}

export type CommaMultiSelectOption = { value: string; label: string };

export type CommaMultiSelectFieldProps = Omit<React.ComponentPropsWithoutRef<"div">, "children" | "onChange"> &
  FieldKitBaseProps & {
    size?: TextInputSize;
    color?: InputBaseProps["color"];
    tone?: TextInputTone;
    inputTone?: TextInputTone;
    visualState?: TextInputFieldVisualState;
    placeholder?: string;
    options: CommaMultiSelectOption[];
    value: string[];
    onChange: (next: string[]) => void;
    menu?: React.ReactNode;
    menuOpen?: boolean;
    defaultMenuOpen?: boolean;
    onMenuOpenChange?: (open: boolean) => void;
    /** Если `false`, меню не закрывается при выборе пункта (как мультиселект). По умолчанию `false`. */
    closeOnSelect?: boolean;
  };

const CommaMultiSelectField = React.forwardRef<HTMLDivElement, CommaMultiSelectFieldProps>(function CommaMultiSelectField(
  {
    size = "md",
    color: colorProp = "ntrl",
    tone = "default",
    inputTone,
    disabled = false,
    visualState,
    labelText = "Label",
    helperText,
    htmlFor: htmlForProp,
    placeholder = "Выберите…",
    options,
    value,
    onChange,
    menu,
    menuOpen,
    defaultMenuOpen = false,
    onMenuOpenChange,
    closeOnSelect = false,
    className,
    fieldClassName,
    ...rest
  },
  ref,
) {
  const sz = size ?? "md";
  const fieldColor = inputBaseColorToFieldColor(colorProp);
  const effectiveInputTone: TextInputTone = inputTone ?? tone;
  const autoId = React.useId();
  const controlId = htmlForProp ?? autoId;
  const listboxId = `${controlId}-listbox`;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const optionRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const pendingFocusIndexRef = React.useRef<number | null>(null);

  const assignRootRef = React.useCallback(
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

  const [internalOpen, setInternalOpen] = React.useState(defaultMenuOpen);
  const isMenuOpenControlled = menuOpen !== undefined;
  const open = isMenuOpenControlled ? Boolean(menuOpen) : internalOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      onMenuOpenChange?.(next);
      if (!isMenuOpenControlled) {
        setInternalOpen(next);
      }
    },
    [isMenuOpenControlled, onMenuOpenChange],
  );

  const selectedOptionIndices = React.useMemo(
    () => options.map((option, index) => (value.includes(option.value) ? index : null)).filter((index): index is number => index != null),
    [options, value],
  );
  const firstSelectedIndex = selectedOptionIndices[0] ?? null;
  const firstOptionIndex = options.length > 0 ? 0 : null;
  const lastOptionIndex = options.length > 0 ? options.length - 1 : null;
  const [activeIndex, setActiveIndex] = React.useState<number | null>(firstSelectedIndex ?? firstOptionIndex);

  React.useEffect(() => {
    if (!open || disabled) return;
    const onPointerDown = (event: PointerEvent) => {
      const node = rootRef.current;
      if (!node || node.contains(event.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [open, disabled, setOpen]);

  React.useEffect(() => {
    if (disabled) {
      pendingFocusIndexRef.current = null;
      setOpen(false);
      return;
    }

    if (!open) {
      setActiveIndex(firstSelectedIndex ?? firstOptionIndex);
      return;
    }

    if (pendingFocusIndexRef.current == null) {
      return;
    }

    const rafId = window.requestAnimationFrame(() => {
      const nextIndex = pendingFocusIndexRef.current;
      if (nextIndex == null) {
        return;
      }

      const nextOption = optionRefs.current[nextIndex];
      nextOption?.focus();
      nextOption?.scrollIntoView({ block: "nearest" });
      pendingFocusIndexRef.current = null;
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [disabled, firstOptionIndex, firstSelectedIndex, open, setOpen]);

  const effectiveTone: TextInputTone | "disabled" = disabled ? "disabled" : effectiveInputTone;
  const labels = value
    .map((v) => options.find((o) => o.value === v)?.label ?? v)
    .filter(Boolean);
  const display = labels.length ? labels.join(", ") : "";
  const isValueEmpty = !display;

  const menuColor: MenuItemColor = fieldColor === "brand" ? "brand" : "ntrl";

  const focusOption = React.useCallback((index: number | null) => {
    if (index == null) {
      return;
    }

    setActiveIndex(index);
    const option = optionRefs.current[index];
    option?.focus();
    option?.scrollIntoView({ block: "nearest" });
  }, []);

  const queueOpenWithFocus = React.useCallback(
    (index: number | null) => {
      pendingFocusIndexRef.current = index;
      if (index != null) {
        setActiveIndex(index);
      }
      setOpen(true);
    },
    [setOpen],
  );

  const moveIndex = React.useCallback(
    (currentIndex: number | null, direction: 1 | -1): number | null => {
      if (options.length === 0) {
        return null;
      }

      if (currentIndex == null) {
        return direction === 1 ? firstOptionIndex : lastOptionIndex;
      }

      const nextIndex = currentIndex + direction;
      if (nextIndex < 0) {
        return lastOptionIndex;
      }
      if (nextIndex >= options.length) {
        return firstOptionIndex;
      }

      return nextIndex;
    },
    [firstOptionIndex, lastOptionIndex, options.length],
  );

  const handleTriggerKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const currentIndex = activeIndex ?? firstSelectedIndex ?? firstOptionIndex;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (open) {
            focusOption(moveIndex(currentIndex, 1));
            return;
          }
          queueOpenWithFocus(currentIndex ?? firstOptionIndex);
          return;
        case "ArrowUp":
          event.preventDefault();
          if (open) {
            focusOption(moveIndex(currentIndex, -1));
            return;
          }
          queueOpenWithFocus(currentIndex ?? lastOptionIndex);
          return;
        case "Home":
          event.preventDefault();
          if (open) {
            focusOption(firstOptionIndex);
            return;
          }
          queueOpenWithFocus(firstOptionIndex);
          return;
        case "End":
          event.preventDefault();
          if (open) {
            focusOption(lastOptionIndex);
            return;
          }
          queueOpenWithFocus(lastOptionIndex);
          return;
        case "Enter":
        case " ":
          event.preventDefault();
          if (open) {
            focusOption(currentIndex);
            return;
          }
          queueOpenWithFocus(currentIndex);
          return;
        case "Escape":
          if (open) {
            event.preventDefault();
            setOpen(false);
          }
      }
    },
    [activeIndex, firstOptionIndex, firstSelectedIndex, focusOption, lastOptionIndex, moveIndex, open, queueOpenWithFocus, setOpen],
  );

  const handleOptionKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, optionIndex: number) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          focusOption(moveIndex(optionIndex, 1));
          return;
        case "ArrowUp":
          event.preventDefault();
          focusOption(moveIndex(optionIndex, -1));
          return;
        case "Home":
          event.preventDefault();
          focusOption(firstOptionIndex);
          return;
        case "End":
          event.preventDefault();
          focusOption(lastOptionIndex);
          return;
        case "Escape":
          event.preventDefault();
          setOpen(false);
          triggerRef.current?.focus();
          return;
        case "Enter":
        case " ":
          event.preventDefault();
          optionRefs.current[optionIndex]?.click();
          return;
        case "Tab":
          setOpen(false);
      }
    },
    [firstOptionIndex, focusOption, lastOptionIndex, moveIndex, setOpen],
  );

  const menuNode =
    menu != null ? (
      <SelectMenu id={listboxId} size={sz} color={menuColor} role="listbox" className="w-full min-w-0">
        {menu}
      </SelectMenu>
    ) : (
      <SelectMenu id={listboxId} size={sz} color={menuColor} role="listbox" className="w-full min-w-0">
        {options.map((opt, index) => (
          <MenuItem
            key={opt.value}
            size={sz}
            color={menuColor}
            id={`${listboxId}-option-${index}`}
            role="option"
            selected={value.includes(opt.value)}
            tabIndex={activeIndex === index ? 0 : -1}
            showIcons={false}
            ref={(node) => {
              optionRefs.current[index] = node;
            }}
            onFocus={() => setActiveIndex(index)}
            onMouseMove={() => setActiveIndex(index)}
            onKeyDown={(event) => handleOptionKeyDown(event, index)}
            onClick={() => {
              const next = value.includes(opt.value) ? value.filter((x) => x !== opt.value) : [...value, opt.value];
              onChange(next);
              setActiveIndex(index);
              if (closeOnSelect) {
                setOpen(false);
                window.requestAnimationFrame(() => {
                  triggerRef.current?.focus();
                });
              }
            }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </SelectMenu>
    );

  return (
    <div
      ref={assignRootRef}
      data-slot="comma-multi-select-field"
      className={cn("flex min-w-0 flex-col items-stretch", selectStackGapClass[sz], className)}
      onBlur={(event) => {
        const nextFocusedNode = event.relatedTarget as Node | null;
        if (rootRef.current?.contains(nextFocusedNode)) {
          return;
        }

        setOpen(false);
      }}
      {...rest}
    >
      <div className="relative w-full min-w-0">
        <InputBase
          size={sz}
          color={colorProp}
          tone={tone}
          disabled={disabled}
          labelText={labelText}
          helperText={helperText}
          htmlFor={controlId}
          helperSpace={false}
        >
          <TextInputChrome
            size={sz}
            color={fieldColor}
            tone={effectiveInputTone}
            disabled={disabled}
            visualState={visualState}
            fieldClassName={fieldClassName}
          >
            <button
              ref={triggerRef}
              id={controlId}
              type="button"
              disabled={disabled}
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-controls={listboxId}
              className={cn(
                textInputRootVariants({ size: sz }),
                "flex w-full min-w-0 cursor-pointer items-center justify-between gap-1 border-0 bg-transparent p-0 text-left outline-none",
                "focus-visible:outline-none disabled:cursor-not-allowed",
              )}
              onClick={() => !disabled && setOpen(!open)}
              onKeyDown={handleTriggerKeyDown}
            >
              <span className={cn("min-w-0 truncate", textInputFieldTextClassName(fieldColor, effectiveTone, isValueEmpty))}>
                {isValueEmpty ? placeholder : display}
              </span>
              <SelectCaret color={fieldColor} disabled={disabled} open={open} />
            </button>
          </TextInputChrome>
        </InputBase>
        {open ? (
          <div className={cn("absolute left-0 top-full z-10 mt-1 w-full min-w-0", controlDropdownEnterClassName)}>
            {menuNode}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export { CommaMultiSelectField };
