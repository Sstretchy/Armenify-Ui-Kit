import * as React from "react";
import { CaretDown } from "phosphor-strokes-icons";

import { cn } from "@/lib/utils";

import { ArmenifyIcon } from "../icon";
import { InputBase } from "./input-base";
import { inputBaseHelperId, inputBaseLabelId } from "./input-base-context";
import { MenuItem } from "./menu-item";
import { SelectMenu, SelectMenuDivider } from "./select-menu";
import { textInputFieldChrome, textInputFieldRootVariants, type TextInputFieldVisualState } from "./text-input-field";
import { textInputFieldTextClassName, textInputRootVariants, type TextInputColor, type TextInputSize, type TextInputTone } from "./text-input";

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

type SelectOptionRecord =
  | {
      kind: "node";
      node: React.ReactNode;
    }
  | {
      kind: "option";
      node: SelectMenuChildElement;
      optionIndex: number;
      disabled: boolean;
      id: string;
      label: string;
      selected: boolean;
    };

type SelectMenuChildElement = React.ReactElement<Record<string, unknown>>;

function asSelectMenuChildElement(node: React.ReactNode): SelectMenuChildElement | null {
  return React.isValidElement(node) ? (node as SelectMenuChildElement) : null;
}

function flattenMenuChildren(children: React.ReactNode): React.ReactNode[] {
  const items: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    const childElement = asSelectMenuChildElement(child);
    if (childElement != null && childElement.type === React.Fragment) {
      items.push(...flattenMenuChildren(childElement.props.children as React.ReactNode));
      return;
    }

    if (child != null && child !== false) {
      items.push(child);
    }
  });

  return items;
}

function extractTextContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractTextContent).join("");
  }

  const nodeElement = asSelectMenuChildElement(node);
  if (nodeElement != null) {
    return extractTextContent(nodeElement.props.children as React.ReactNode);
  }

  return "";
}

function isSelectMenuDividerNode(node: React.ReactNode): boolean {
  const nodeElement = asSelectMenuChildElement(node);
  if (nodeElement == null) {
    return false;
  }

  return (
    nodeElement.type === SelectMenuDivider ||
    nodeElement.props.role === "separator" ||
    nodeElement.props["data-slot"] === "select-menu-divider"
  );
}

function isPrintableKey(event: React.KeyboardEvent): boolean {
  return event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey;
}

function composeEventHandlers<E extends { defaultPrevented: boolean }>(
  theirHandler: ((event: E) => void) | undefined,
  ourHandler: ((event: E) => void) | undefined,
): (event: E) => void {
  return (event) => {
    theirHandler?.(event);
    if (!event.defaultPrevented) {
      ourHandler?.(event);
    }
  };
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
    defaultMenuOpen = false,
    onMenuOpenChange,
    menuDefaultSelectedIndex = 1,
    className,
    onBlur,
    ...rest
  },
  ref,
) {
  const autoId = React.useId();
  const controlId = htmlForProp ?? autoId;
  const listboxId = `${controlId}-listbox`;
  const labelId = labelText != null ? inputBaseLabelId(controlId) : undefined;
  const helperId = helperText != null ? inputBaseHelperId(controlId) : undefined;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const optionRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const pendingFocusIndexRef = React.useRef<number | null>(null);
  const typeaheadBufferRef = React.useRef("");
  const typeaheadTimeoutRef = React.useRef<number | null>(null);

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

  const defaultMenuChildren = React.useMemo(() => {
    const dividerTone = color === "brand" && size === "sm" ? "brand" : "ntrl";

    return (
      <>
        {[0, 1, 2, 3].map((i) => (
          <React.Fragment key={i}>
            {i > 0 ? <SelectMenuDivider tone={dividerTone} /> : null}
            <MenuItem size={size} color={color} prefixText="Https//" selected={menuDefaultSelectedIndex === i}>
              Text
            </MenuItem>
          </React.Fragment>
        ))}
      </>
    );
  }, [color, menuDefaultSelectedIndex, size]);

  const menuChildren = menu ?? defaultMenuChildren;
  const flatMenuChildren = React.useMemo(() => flattenMenuChildren(menuChildren), [menuChildren]);
  const optionRecords = React.useMemo<SelectOptionRecord[]>(() => {
    let optionIndex = 0;

    return flatMenuChildren.map((child) => {
      const childElement = asSelectMenuChildElement(child);
      if (childElement == null || isSelectMenuDividerNode(childElement)) {
        return { kind: "node", node: child };
      }

      const selected =
        childElement.props.selected === true ||
        childElement.props["aria-selected"] === true ||
        childElement.props["aria-selected"] === "true";
      const disabledOption = Boolean(childElement.props.disabled ?? childElement.props["aria-disabled"]);
      const record: SelectOptionRecord = {
        kind: "option",
        node: childElement,
        optionIndex,
        disabled: disabledOption,
        id: typeof childElement.props.id === "string" ? childElement.props.id : `${listboxId}-option-${optionIndex}`,
        label: extractTextContent(childElement.props.children as React.ReactNode).trim(),
        selected,
      };

      optionIndex += 1;
      return record;
    });
  }, [flatMenuChildren, listboxId]);
  const options = React.useMemo(
    () => optionRecords.filter((record): record is Extract<SelectOptionRecord, { kind: "option" }> => record.kind === "option"),
    [optionRecords],
  );
  const enabledOptionIndices = React.useMemo(
    () => options.filter((option) => !option.disabled).map((option) => option.optionIndex),
    [options],
  );
  const firstEnabledIndex = enabledOptionIndices[0] ?? null;
  const lastEnabledIndex = enabledOptionIndices.at(-1) ?? null;
  const selectedIndex = options.find((option) => option.selected && !option.disabled)?.optionIndex ?? firstEnabledIndex;

  const [internalOpen, setInternalOpen] = React.useState(defaultMenuOpen);
  const isMenuOpenControlled = menuOpen !== undefined;
  const open = isMenuOpenControlled ? Boolean(menuOpen) : internalOpen;
  const [activeIndex, setActiveIndex] = React.useState<number | null>(selectedIndex);

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
    if (disabled) {
      pendingFocusIndexRef.current = null;
      setOpen(false);
    }
  }, [disabled, setOpen]);

  React.useEffect(() => {
    if (!open) {
      setActiveIndex(selectedIndex);
      typeaheadBufferRef.current = "";
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
  }, [open, selectedIndex]);

  React.useEffect(
    () => () => {
      if (typeaheadTimeoutRef.current != null) {
        window.clearTimeout(typeaheadTimeoutRef.current);
      }
    },
    [],
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

  const moveActiveIndex = React.useCallback(
    (currentIndex: number | null, direction: 1 | -1): number | null => {
      if (enabledOptionIndices.length === 0) {
        return null;
      }

      const currentPosition = currentIndex == null ? -1 : enabledOptionIndices.indexOf(currentIndex);
      if (currentPosition === -1) {
        return direction === 1 ? firstEnabledIndex : lastEnabledIndex;
      }

      const nextPosition = (currentPosition + direction + enabledOptionIndices.length) % enabledOptionIndices.length;
      return enabledOptionIndices[nextPosition] ?? null;
    },
    [enabledOptionIndices, firstEnabledIndex, lastEnabledIndex],
  );

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

  const findTypeaheadMatch = React.useCallback(
    (search: string, currentIndex: number | null): number | null => {
      if (!search) {
        return null;
      }

      const searchable = options.filter((option) => !option.disabled && option.label.length > 0);
      if (searchable.length === 0) {
        return null;
      }

      const currentPosition = currentIndex == null ? -1 : searchable.findIndex((option) => option.optionIndex === currentIndex);
      const startPosition = currentPosition === -1 ? 0 : (currentPosition + 1) % searchable.length;
      const normalizedSearch = search.toLocaleLowerCase();

      for (let offset = 0; offset < searchable.length; offset += 1) {
        const candidate = searchable[(startPosition + offset) % searchable.length];
        if (candidate.label.toLocaleLowerCase().startsWith(normalizedSearch)) {
          return candidate.optionIndex;
        }
      }

      return null;
    },
    [options],
  );

  const handleTypeahead = React.useCallback(
    (event: React.KeyboardEvent, currentIndex: number | null) => {
      if (!isPrintableKey(event)) {
        return;
      }

      const nextSearch = `${typeaheadBufferRef.current}${event.key}`.toLocaleLowerCase();
      typeaheadBufferRef.current = nextSearch;

      if (typeaheadTimeoutRef.current != null) {
        window.clearTimeout(typeaheadTimeoutRef.current);
      }

      typeaheadTimeoutRef.current = window.setTimeout(() => {
        typeaheadBufferRef.current = "";
      }, 500);

      const matchIndex = findTypeaheadMatch(nextSearch, currentIndex);
      if (matchIndex == null) {
        return;
      }

      event.preventDefault();

      if (open) {
        focusOption(matchIndex);
        return;
      }

      queueOpenWithFocus(matchIndex);
    },
    [findTypeaheadMatch, focusOption, open, queueOpenWithFocus],
  );

  const handleOptionKeyDown = React.useCallback(
    (event: React.KeyboardEvent, optionIndex: number) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          focusOption(moveActiveIndex(optionIndex, 1));
          return;
        case "ArrowUp":
          event.preventDefault();
          focusOption(moveActiveIndex(optionIndex, -1));
          return;
        case "Home":
          event.preventDefault();
          focusOption(firstEnabledIndex);
          return;
        case "End":
          event.preventDefault();
          focusOption(lastEnabledIndex);
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
          return;
        default:
          handleTypeahead(event, optionIndex);
      }
    },
    [firstEnabledIndex, focusOption, handleTypeahead, lastEnabledIndex, moveActiveIndex, setOpen],
  );

  const renderedMenuChildren = React.useMemo(
    () =>
      optionRecords.map((record) => {
        if (record.kind !== "option") {
          return record.node;
        }

        const child = record.node;

        return React.cloneElement(child, {
          id: record.id,
          role: "option",
          tabIndex: activeIndex === record.optionIndex ? 0 : -1,
          "aria-selected": record.selected,
          ref: (node: HTMLButtonElement | null) => {
            optionRefs.current[record.optionIndex] = node;
          },
          onClick: composeEventHandlers(
            child.props.onClick as ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined,
            () => {
              setOpen(false);
              window.requestAnimationFrame(() => {
                triggerRef.current?.focus();
              });
            },
          ),
          onFocus: composeEventHandlers(
            child.props.onFocus as ((event: React.FocusEvent<HTMLButtonElement>) => void) | undefined,
            () => setActiveIndex(record.optionIndex),
          ),
          onMouseMove: composeEventHandlers(
            child.props.onMouseMove as ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined,
            () => setActiveIndex(record.optionIndex),
          ),
          onKeyDown: composeEventHandlers(
            child.props.onKeyDown as ((event: React.KeyboardEvent<HTMLButtonElement>) => void) | undefined,
            (event: React.KeyboardEvent<HTMLButtonElement>) => handleOptionKeyDown(event, record.optionIndex),
          ),
        });
      }),
    [activeIndex, handleOptionKeyDown, optionRecords, setOpen],
  );

  const handleTriggerKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const currentIndex = activeIndex ?? selectedIndex ?? firstEnabledIndex;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (open) {
            focusOption(moveActiveIndex(currentIndex, 1));
            return;
          }
          queueOpenWithFocus(currentIndex ?? firstEnabledIndex);
          return;
        case "ArrowUp":
          event.preventDefault();
          if (open) {
            focusOption(moveActiveIndex(currentIndex, -1));
            return;
          }
          queueOpenWithFocus(currentIndex ?? lastEnabledIndex);
          return;
        case "Home":
          event.preventDefault();
          if (open) {
            focusOption(firstEnabledIndex);
            return;
          }
          queueOpenWithFocus(firstEnabledIndex);
          return;
        case "End":
          event.preventDefault();
          if (open) {
            focusOption(lastEnabledIndex);
            return;
          }
          queueOpenWithFocus(lastEnabledIndex);
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
          return;
        default:
          handleTypeahead(event, currentIndex);
      }
    },
    [
      activeIndex,
      firstEnabledIndex,
      focusOption,
      handleTypeahead,
      lastEnabledIndex,
      moveActiveIndex,
      open,
      queueOpenWithFocus,
      selectedIndex,
      setOpen,
    ],
  );

  const handleRootBlur = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const nextFocusedNode = event.relatedTarget as Node | null;
      if (rootRef.current?.contains(nextFocusedNode)) {
        return;
      }

      setOpen(false);
    },
    [setOpen],
  );

  return (
    <div
      ref={assignRootRef}
      data-slot="select"
      data-select-size={size}
      data-select-color={color}
      className={cn("flex min-w-0 flex-col items-stretch", selectStackGapClass[size], className)}
      onBlur={composeEventHandlers(onBlur, handleRootBlur)}
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
            ref={triggerRef}
            id={controlId}
            type="button"
            disabled={disabled}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-describedby={helperId}
            aria-invalid={effectiveTone === "error" ? true : undefined}
            className={cn(
              textInputRootVariants({ size }),
              "flex w-full min-w-0 cursor-pointer items-center justify-between gap-1 border-0 bg-transparent p-0 text-left outline-none",
              "focus-visible:outline-none disabled:cursor-not-allowed",
            )}
            onClick={() => !disabled && setOpen(!open)}
            onKeyDown={handleTriggerKeyDown}
          >
            <span className={cn("min-w-0 truncate", textInputFieldTextClassName(color, effectiveTone, isValueEmpty))}>
              {placeholder}
            </span>
            <SelectCaret color={color} disabled={disabled} open={open} />
          </button>
        </div>
      </InputBase>
      {open ? (
        <SelectMenu
          id={listboxId}
          size={size}
          color={color}
          role="listbox"
          aria-labelledby={labelId ?? controlId}
          className="w-full min-w-0"
        >
          {renderedMenuChildren}
        </SelectMenu>
      ) : null}
    </div>
  );
});

export { Select };
