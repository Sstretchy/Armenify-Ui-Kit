import * as React from "react";
import { CaretDown } from "phosphor-strokes-icons";

import { cn } from "@/lib/utils";

import { ArmenifyIcon } from "../icon";
import { InputBase } from "./input-base";
import { SelectMenu } from "./select-menu";
import { textInputFieldChrome, textInputFieldRootVariants, type TextInputFieldVisualState } from "./text-input-field";
import { textInputFieldTextClassName, textInputRootVariants, type TextInputColor, type TextInputSize, type TextInputTone } from "./text-input";

const selectStackGapClass: Record<TextInputSize, string> = {
  sm: "gap-[var(--space-space-1)]",
  md: "gap-[var(--space-space-1-5)]",
  lg: "gap-[var(--space-space-2)]",
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

export type SelectProps = Omit<React.ComponentPropsWithoutRef<"div">, "children"> & {
  size?: TextInputSize;
  color?: TextInputColor;
  tone?: TextInputTone;
  disabled?: boolean;
  visualState?: TextInputFieldVisualState;
  labelText?: string;
  helperText?: string;
  htmlFor?: string;
  /** Подпись поля при открытом списке (как в макете). */
  placeholder?: string;
  fieldClassName?: string;
  /** Слот меню; без него — встроенный `SelectMenu` с четырьмя пунктами. */
  menu?: React.ReactNode;
  menuOpen?: boolean;
  defaultMenuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
  /** Второй пункт выбран по умолчанию (как ntrl в Figma); `undefined` — ни один. */
  menuDefaultSelectedIndex?: number;
};

const Select = React.forwardRef<HTMLDivElement, SelectProps>(function Select(
  {
    size = "md",
    color = "ntrl",
    tone = "default",
    disabled = false,
    visualState,
    labelText = "Label",
    helperText,
    htmlFor: htmlForProp,
    placeholder = "There is no one who",
    fieldClassName,
    menu,
    menuOpen,
    defaultMenuOpen = true,
    onMenuOpenChange,
    menuDefaultSelectedIndex = 1,
    className,
    ...rest
  },
  ref,
) {
  const autoId = React.useId();
  const controlId = htmlForProp ?? autoId;
  const rootRef = React.useRef<HTMLDivElement>(null);

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

  const chrome = textInputFieldChrome(color, tone, visualState, disabled);
  const effectiveTone: TextInputTone | "disabled" = disabled ? "disabled" : tone;
  const isValueEmpty = !placeholder;

  const menuNode =
    menu != null ? (
      <SelectMenu size={size} color={color} className="w-full min-w-0">
        {menu}
      </SelectMenu>
    ) : (
      <SelectMenu size={size} color={color} defaultSelectedIndex={menuDefaultSelectedIndex} className="w-full min-w-0" />
    );

  return (
    <div
      ref={assignRootRef}
      data-slot="select"
      data-select-size={size}
      data-select-color={color}
      className={cn("flex min-w-0 flex-col items-stretch", selectStackGapClass[size], className)}
      {...rest}
    >
      <InputBase
        size={size}
        color={color}
        tone={tone}
        disabled={disabled}
        labelText={labelText}
        helperText={helperText}
        htmlFor={controlId}
        helperSpace={false}
      >
        <div
          className={cn(textInputFieldRootVariants({ size }), chrome, fieldClassName)}
          data-slot="select-trigger-field"
        >
          <button
            id={controlId}
            type="button"
            disabled={disabled}
            aria-expanded={open}
            aria-haspopup="listbox"
            className={cn(
              textInputRootVariants({ size }),
              "flex w-full min-w-0 cursor-pointer items-center justify-between gap-[var(--space-space-1)] border-0 bg-transparent p-0 text-left outline-none",
              "focus-visible:outline-none disabled:cursor-not-allowed",
            )}
            onClick={() => !disabled && setOpen(!open)}
          >
            <span className={cn("min-w-0 truncate", textInputFieldTextClassName(color, effectiveTone, isValueEmpty))}>
              {placeholder}
            </span>
            <SelectCaret color={color} disabled={disabled} open={open} />
          </button>
        </div>
      </InputBase>
      {open ? menuNode : null}
    </div>
  );
});

export { Select };
