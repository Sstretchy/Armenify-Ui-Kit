import * as React from "react";
import { CaretDown } from "phosphor-strokes-icons";

import { cn } from "@/lib/utils";

import { ArmenifyIcon } from "../../ui/icon";
import { InputBase, type InputBaseProps } from "../../ui/field/input-base";
import { inputBaseColorToFieldColor, type FieldKitBaseProps } from "./field-kit-shared";
import { MenuItem, type MenuItemColor } from "../../ui/field/menu-item";
import { SelectMenu } from "../../ui/field/select-menu";
import { textInputFieldTextClassName } from "../../ui/field/text-input";
import { TextInputChrome, type TextInputFieldVisualState } from "../../ui/field/text-input-field";
import { textInputRootVariants, type TextInputColor, type TextInputSize, type TextInputTone } from "../../ui/field/text-input";

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

  const effectiveTone: TextInputTone | "disabled" = disabled ? "disabled" : effectiveInputTone;
  const labels = value
    .map((v) => options.find((o) => o.value === v)?.label ?? v)
    .filter(Boolean);
  const display = labels.length ? labels.join(", ") : "";
  const isValueEmpty = !display;

  const menuColor: MenuItemColor = fieldColor === "brand" ? "brand" : "ntrl";

  const menuNode =
    menu != null ? (
      <SelectMenu size={sz} color={menuColor} className="w-full min-w-0">
        {menu}
      </SelectMenu>
    ) : (
      <SelectMenu size={sz} color={menuColor} className="w-full min-w-0">
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            size={sz}
            color={menuColor}
            selected={value.includes(opt.value)}
            showIcons={false}
            onClick={() => {
              const next = value.includes(opt.value) ? value.filter((x) => x !== opt.value) : [...value, opt.value];
              onChange(next);
              if (closeOnSelect) setOpen(false);
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
      {...rest}
    >
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
            id={controlId}
            type="button"
            disabled={disabled}
            aria-expanded={open}
            aria-haspopup="listbox"
            className={cn(
              textInputRootVariants({ size: sz }),
              "flex w-full min-w-0 cursor-pointer items-center justify-between gap-[var(--space-space-1)] border-0 bg-transparent p-0 text-left outline-none",
              "focus-visible:outline-none disabled:cursor-not-allowed",
            )}
            onClick={() => !disabled && setOpen(!open)}
          >
            <span className={cn("min-w-0 truncate", textInputFieldTextClassName(fieldColor, effectiveTone, isValueEmpty))}>
              {isValueEmpty ? placeholder : display}
            </span>
            <SelectCaret color={fieldColor} disabled={disabled} open={open} />
          </button>
        </TextInputChrome>
      </InputBase>
      {open ? menuNode : null}
    </div>
  );
});

export { CommaMultiSelectField };
