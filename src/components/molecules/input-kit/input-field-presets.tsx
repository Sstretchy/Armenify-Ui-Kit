import * as React from "react";
import { CaretDown, TelegramLogo, WhatsappLogo } from "phosphor-strokes-icons";

import { cn } from "@/lib/utils";

import { ArmenifyIcon } from "../../ui/icon";
import { controlDropdownEnterClassName } from "../../ui/control-transition";

import { InputBase } from "../../ui/field/input-base";
import { InputFieldIcon } from "../../ui/field/input-field-icon";
import { MenuItem, type MenuItemColor } from "../../ui/field/menu-item";
import { SelectMenu } from "../../ui/field/select-menu";
import { InputTag, inputTagSizeForTextInputField } from "../../ui/field/input-tag";
import { inputBaseColorToFieldColor, type FieldKitBaseProps } from "./field-kit-shared";
import { TextInputInnerContent } from "../../ui/field/text-input-inner-content";
import { TextInput, textInputFieldTextClassName, type TextInputProps, type TextInputTone } from "../../ui/field/text-input";
import { TextInputChrome } from "../../ui/field/text-input-field";

type InnerLayout = React.ComponentProps<typeof TextInputInnerContent>["layout"];

export type TextKitProps = FieldKitBaseProps &
  Omit<TextInputProps, "color" | "tone"> & {
    inputTone?: TextInputTone;
  };

type FieldChromeProps = FieldKitBaseProps & { size?: TextInputProps["size"]; inputTone?: TextInputTone };

function splitTextKit(props: TextKitProps): { shell: FieldChromeProps; input: Omit<TextInputProps, "color" | "tone"> } {
  const {
    label,
    labelText,
    helper,
    helperText,
    htmlFor,
    disabled,
    sideLabel,
    helperSpace,
    size,
    color,
    tone,
    inputTone,
    visualState,
    fieldClassName,
    className,
    innerClassName,
    ...input
  } = props;
  return {
    shell: {
      label,
      labelText,
      helper,
      helperText,
      htmlFor,
      disabled,
      sideLabel,
      helperSpace,
      size,
      color,
      tone,
      inputTone,
      visualState,
      fieldClassName,
      className,
      innerClassName,
    },
    input,
  };
}

type ShellProps = FieldChromeProps & {
  layout: InnerLayout;
  innerProps?: Omit<
    React.ComponentProps<typeof TextInputInnerContent>,
    "layout" | "color" | "disabled" | "size" | "field" | "className"
  >;
  field: React.ReactNode;
};

function FieldInputShell({ layout, innerProps, field, ...p }: ShellProps) {
  const fc = inputBaseColorToFieldColor(p.color ?? "ntrl");
  const it = p.inputTone ?? p.tone ?? "default";
  const sz = p.size ?? "md";

  return (
    <InputBase
      className={p.className}
      size={sz}
      color={p.color}
      tone={p.tone}
      disabled={p.disabled}
      label={p.label}
      labelText={p.labelText}
      helper={p.helper}
      helperText={p.helperText}
      htmlFor={p.htmlFor}
      sideLabel={p.sideLabel}
      helperSpace={p.helperSpace}
    >
      <TextInputChrome size={sz} color={fc} tone={it} disabled={p.disabled} visualState={p.visualState} fieldClassName={p.fieldClassName}>
        <TextInputInnerContent
          layout={layout}
          color={fc}
          disabled={Boolean(p.disabled)}
          size={sz}
          className={p.innerClassName}
          field={field}
          {...innerProps}
        />
      </TextInputChrome>
    </InputBase>
  );
}

const PlainTextInputField = React.forwardRef<HTMLInputElement, TextKitProps>(function PlainTextInputField(props, ref) {
  const { shell, input } = splitTextKit(props);
  const sz = shell.size ?? "md";
  const fc = inputBaseColorToFieldColor(shell.color ?? "ntrl");
  const it = shell.inputTone ?? shell.tone ?? "default";
  return (
    <FieldInputShell
      {...shell}
      layout="default"
      field={<TextInput ref={ref} size={sz} color={fc} tone={it} {...input} />}
    />
  );
});

const IconLeftTextInputField = React.forwardRef<HTMLInputElement, TextKitProps>(function IconLeftTextInputField(props, ref) {
  const { shell, input } = splitTextKit(props);
  const sz = shell.size ?? "md";
  const fc = inputBaseColorToFieldColor(shell.color ?? "ntrl");
  const it = shell.inputTone ?? shell.tone ?? "default";
  return (
    <FieldInputShell
      {...shell}
      layout="iconLeft"
      field={<TextInput ref={ref} size={sz} color={fc} tone={it} {...input} />}
    />
  );
});

const IconRightTextInputField = React.forwardRef<HTMLInputElement, TextKitProps>(function IconRightTextInputField(props, ref) {
  const { shell, input } = splitTextKit(props);
  const sz = shell.size ?? "md";
  const fc = inputBaseColorToFieldColor(shell.color ?? "ntrl");
  const it = shell.inputTone ?? shell.tone ?? "default";
  return (
    <FieldInputShell
      {...shell}
      layout="iconRight"
      field={<TextInput ref={ref} size={sz} color={fc} tone={it} {...input} />}
    />
  );
});

const IconBothTextInputField = React.forwardRef<HTMLInputElement, TextKitProps>(function IconBothTextInputField(props, ref) {
  const { shell, input } = splitTextKit(props);
  const sz = shell.size ?? "md";
  const fc = inputBaseColorToFieldColor(shell.color ?? "ntrl");
  const it = shell.inputTone ?? shell.tone ?? "default";
  return (
    <FieldInputShell
      {...shell}
      layout="iconBoth"
      field={<TextInput ref={ref} size={sz} color={fc} tone={it} {...input} />}
    />
  );
});

export type ClearableTextInputFieldProps = TextKitProps & { onClear: () => void };

const ClearableTextInputField = React.forwardRef<HTMLInputElement, ClearableTextInputFieldProps>(function ClearableTextInputField(
  { onClear, ...props },
  ref,
) {
  const { shell, input } = splitTextKit(props);
  const sz = shell.size ?? "md";
  const fc = inputBaseColorToFieldColor(shell.color ?? "ntrl");
  const it = shell.inputTone ?? shell.tone ?? "default";
  return (
    <FieldInputShell
      {...shell}
      layout="clear"
      innerProps={{ onClear }}
      field={<TextInput ref={ref} size={sz} color={fc} tone={it} {...input} />}
    />
  );
});

const CurrencyTextInputField = React.forwardRef<HTMLInputElement, TextKitProps>(function CurrencyTextInputField(props, ref) {
  const { shell, input } = splitTextKit(props);
  const sz = shell.size ?? "md";
  const fc = inputBaseColorToFieldColor(shell.color ?? "ntrl");
  const it = shell.inputTone ?? shell.tone ?? "default";
  return (
    <FieldInputShell
      {...shell}
      layout="currency"
      field={<TextInput ref={ref} size={sz} color={fc} tone={it} {...input} inputMode={input.inputMode ?? "decimal"} />}
    />
  );
});

export type SearchTextInputFieldProps = TextKitProps & { onSearchIconClick?: () => void };

const SearchTextInputField = React.forwardRef<HTMLInputElement, SearchTextInputFieldProps>(function SearchTextInputField(
  { onSearchIconClick, ...props },
  ref,
) {
  const { shell, input } = splitTextKit(props);
  const sz = shell.size ?? "md";
  const fc = inputBaseColorToFieldColor(shell.color ?? "ntrl");
  const it = shell.inputTone ?? shell.tone ?? "default";
  return (
    <FieldInputShell
      {...shell}
      layout="search"
      innerProps={onSearchIconClick ? { onSearchIconClick } : undefined}
      field={<TextInput ref={ref} size={sz} color={fc} tone={it} {...input} />}
    />
  );
});

export type ContactChannel = "telegram" | "whatsapp";

export const channelPattern: Record<ContactChannel, RegExp> = {
  telegram: /^@[A-Za-z0-9_]{4,}$/,
  whatsapp: /^\+?[0-9][\d\s-]{6,}$/,
};

export const channelPlaceholder: Record<ContactChannel, string> = {
  telegram: "@username",
  whatsapp: "+374 …",
};

const channelMenuLabel: Record<ContactChannel, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
};

export type ChannelComboTextInputFieldProps = TextKitProps & {
  channel: ContactChannel;
  onChannelChange: (channel: ContactChannel) => void;
};

const ChannelComboTextInputField = React.forwardRef<HTMLInputElement, ChannelComboTextInputFieldProps>(
  function ChannelComboTextInputField({ channel, onChannelChange, value, onChange, ...kitProps }, ref) {
    const { shell, input } = splitTextKit(kitProps);
    const size = shell.size ?? "md";
    const color = shell.color ?? "ntrl";
    const fc = inputBaseColorToFieldColor(color);
    const it = shell.inputTone ?? shell.tone ?? "default";
    const disabled = Boolean(shell.disabled);
    const ic = disabled ? "disable" : fc === "brand" ? "brand" : "ntrl";
    const channelTriggerId = React.useId();
    const channelListId = React.useId();
    const rootRef = React.useRef<HTMLDivElement>(null);
    const channelTriggerRef = React.useRef<HTMLButtonElement>(null);
    const channelOptionRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
    const pendingChannelFocusIndexRef = React.useRef<number | null>(null);
    const [channelMenuOpen, setChannelMenuOpen] = React.useState(false);
    const channelOptions = ["telegram", "whatsapp"] as const;
    const selectedChannelIndex = channelOptions.indexOf(channel);
    const [activeChannelIndex, setActiveChannelIndex] = React.useState<number>(selectedChannelIndex === -1 ? 0 : selectedChannelIndex);

    const str = value !== undefined ? String(value) : undefined;
    const invalid = str != null && str.length > 0 && !channelPattern[channel].test(str);
    const fieldTone: TextInputTone = invalid ? "error" : it;

    const leftIcon = channel === "telegram" ? TelegramLogo : WhatsappLogo;
    const menuColor: MenuItemColor = fc === "brand" ? "brand" : "ntrl";

    React.useEffect(() => {
      if (!channelMenuOpen || disabled) return;
      const onPointerDown = (event: PointerEvent) => {
        const node = rootRef.current;
        if (!node || node.contains(event.target as Node)) return;
        setChannelMenuOpen(false);
      };
      document.addEventListener("pointerdown", onPointerDown, true);
      return () => document.removeEventListener("pointerdown", onPointerDown, true);
    }, [channelMenuOpen, disabled]);

    React.useEffect(() => {
      if (disabled) {
        pendingChannelFocusIndexRef.current = null;
        setChannelMenuOpen(false);
        return;
      }

      if (!channelMenuOpen) {
        setActiveChannelIndex(selectedChannelIndex === -1 ? 0 : selectedChannelIndex);
        return;
      }

      if (pendingChannelFocusIndexRef.current == null) {
        return;
      }

      const rafId = window.requestAnimationFrame(() => {
        const nextIndex = pendingChannelFocusIndexRef.current;
        if (nextIndex == null) {
          return;
        }

        const nextOption = channelOptionRefs.current[nextIndex];
        nextOption?.focus();
        pendingChannelFocusIndexRef.current = null;
      });

      return () => window.cancelAnimationFrame(rafId);
    }, [channelMenuOpen, disabled, selectedChannelIndex]);

    const focusChannelOption = React.useCallback((index: number) => {
      setActiveChannelIndex(index);
      channelOptionRefs.current[index]?.focus();
    }, []);

    const queueOpenWithChannelFocus = React.useCallback((index: number) => {
      pendingChannelFocusIndexRef.current = index;
      setActiveChannelIndex(index);
      setChannelMenuOpen(true);
    }, []);

    const moveChannelIndex = React.useCallback(
      (currentIndex: number, direction: 1 | -1): number => {
        const nextIndex = currentIndex + direction;
        if (nextIndex < 0) {
          return channelOptions.length - 1;
        }
        if (nextIndex >= channelOptions.length) {
          return 0;
        }

        return nextIndex;
      },
      [channelOptions.length],
    );

    const handleChannelTriggerKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            if (channelMenuOpen) {
              focusChannelOption(moveChannelIndex(activeChannelIndex, 1));
              return;
            }
            queueOpenWithChannelFocus(activeChannelIndex);
            return;
          case "ArrowUp":
            event.preventDefault();
            if (channelMenuOpen) {
              focusChannelOption(moveChannelIndex(activeChannelIndex, -1));
              return;
            }
            queueOpenWithChannelFocus(activeChannelIndex);
            return;
          case "Home":
            event.preventDefault();
            if (channelMenuOpen) {
              focusChannelOption(0);
              return;
            }
            queueOpenWithChannelFocus(0);
            return;
          case "End":
            event.preventDefault();
            if (channelMenuOpen) {
              focusChannelOption(channelOptions.length - 1);
              return;
            }
            queueOpenWithChannelFocus(channelOptions.length - 1);
            return;
          case "Enter":
          case " ":
            event.preventDefault();
            if (channelMenuOpen) {
              focusChannelOption(activeChannelIndex);
              return;
            }
            queueOpenWithChannelFocus(activeChannelIndex);
            return;
          case "Escape":
            if (channelMenuOpen) {
              event.preventDefault();
              setChannelMenuOpen(false);
            }
        }
      },
      [activeChannelIndex, channelMenuOpen, channelOptions.length, focusChannelOption, moveChannelIndex, queueOpenWithChannelFocus],
    );

    const handleChannelOptionKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>, optionIndex: number) => {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            focusChannelOption(moveChannelIndex(optionIndex, 1));
            return;
          case "ArrowUp":
            event.preventDefault();
            focusChannelOption(moveChannelIndex(optionIndex, -1));
            return;
          case "Home":
            event.preventDefault();
            focusChannelOption(0);
            return;
          case "End":
            event.preventDefault();
            focusChannelOption(channelOptions.length - 1);
            return;
          case "Escape":
            event.preventDefault();
            setChannelMenuOpen(false);
            channelTriggerRef.current?.focus();
            return;
          case "Enter":
          case " ":
            event.preventDefault();
            channelOptionRefs.current[optionIndex]?.click();
            return;
          case "Tab":
            setChannelMenuOpen(false);
        }
      },
      [channelOptions.length, focusChannelOption, moveChannelIndex],
    );

    return (
      <InputBase
        className={shell.className}
        size={size}
        color={color}
        tone={shell.tone}
        disabled={disabled}
        label={shell.label}
        labelText={shell.labelText}
        helper={shell.helper}
        helperText={shell.helperText}
        htmlFor={shell.htmlFor}
        sideLabel={shell.sideLabel}
        helperSpace={shell.helperSpace}
      >
        <div
          ref={rootRef}
          className="relative w-full min-w-0"
          onBlur={(event) => {
            const nextFocusedNode = event.relatedTarget as Node | null;
            if (rootRef.current?.contains(nextFocusedNode)) {
              return;
            }

            setChannelMenuOpen(false);
          }}
        >
          <TextInputChrome size={size} color={fc} tone={fieldTone} disabled={disabled} visualState={shell.visualState} fieldClassName={shell.fieldClassName}>
            <div className="flex w-full min-w-0 items-center gap-2">
              <InputFieldIcon icon={leftIcon} size={size} color={ic} weight={fc === "brand" && !disabled ? "bold" : "slim"} />
              <TextInput
                ref={ref}
                size={size}
                color={fc}
                tone={fieldTone}
                placeholder={channelPlaceholder[channel]}
                value={value}
                onChange={onChange}
                className="min-w-0 flex-1"
                {...input}
              />
              <label className="sr-only" htmlFor={channelTriggerId}>
                Тип связи
              </label>
              <div className="relative min-w-0 max-w-[42%] shrink-0">
                <button
                  ref={channelTriggerRef}
                  id={channelTriggerId}
                  type="button"
                  disabled={disabled}
                  aria-expanded={channelMenuOpen}
                  aria-haspopup="listbox"
                  aria-controls={channelListId}
                  className={cn(
                    "relative w-full min-w-22 max-w-full cursor-pointer truncate border-0 bg-transparent py-0 pl-0 pr-5 text-left font-sans outline-none",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-semantic-border-ntrl-default-focused",
                    textInputFieldTextClassName(fc, disabled ? "disabled" : "default", false),
                  )}
                  onClick={() => !disabled && setChannelMenuOpen((o) => !o)}
                  onKeyDown={handleChannelTriggerKeyDown}
                >
                  {channelMenuLabel[channel]}
                </button>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center leading-none" aria-hidden>
                  <ArmenifyIcon
                    icon={CaretDown}
                    size="xx-small"
                    strokeWidthToken="var(--bold-caret-12)"
                    className={cn(
                      "origin-center transition-transform duration-150 ease-out",
                      channelMenuOpen && "rotate-180",
                      ic === "disable" && "text-semantic-text-ntrl-disabled",
                      ic === "brand" && "text-components-typography-brand-light-inp-text",
                      ic === "ntrl" && "text-components-typography-ntrl-light-inp-text",
                    )}
                  />
                </span>
              </div>
            </div>
          </TextInputChrome>
          {channelMenuOpen && !disabled ? (
            <div
              id={channelListId}
              className={cn("absolute right-0 top-full z-10 mt-1 min-w-0 origin-top-right", controlDropdownEnterClassName)}
            >
              <SelectMenu size={size} color={menuColor} role="listbox" aria-label="Тип связи" className="min-w-36 w-max max-w-48">
                {channelOptions.map((ch, index) => (
                  <MenuItem
                    key={ch}
                    size={size}
                    color={menuColor}
                    id={`${channelListId}-option-${index}`}
                    role="option"
                    selected={channel === ch}
                    tabIndex={activeChannelIndex === index ? 0 : -1}
                    showIcons={false}
                    ref={(node) => {
                      channelOptionRefs.current[index] = node;
                    }}
                    onFocus={() => setActiveChannelIndex(index)}
                    onMouseMove={() => setActiveChannelIndex(index)}
                    onKeyDown={(event) => handleChannelOptionKeyDown(event, index)}
                    onClick={() => {
                      onChannelChange(ch);
                      setActiveChannelIndex(index);
                      setChannelMenuOpen(false);
                      window.requestAnimationFrame(() => {
                        channelTriggerRef.current?.focus();
                      });
                    }}
                  >
                    {channelMenuLabel[ch]}
                  </MenuItem>
                ))}
              </SelectMenu>
            </div>
          ) : null}
        </div>
      </InputBase>
    );
  },
);

export type TagMultiSelectFieldItem = { id: string; label: string };

export type TagMultiSelectFieldProps = FieldKitBaseProps & {
  size?: TextInputProps["size"];
  inputTone?: TextInputTone;
  tags: TagMultiSelectFieldItem[];
  onRemove: (id: string) => void;
  options?: TagMultiSelectFieldItem[];
  onAddTag?: (item: TagMultiSelectFieldItem) => void;
  filterInputProps?: Omit<TextInputProps, "color" | "tone" | "size" | "pretext" | "prefix">;
  menu?: React.ReactNode;
  menuOpen?: boolean;
  defaultMenuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
  closeOnSelect?: boolean;
};

const TagMultiSelectField = React.forwardRef<HTMLInputElement, TagMultiSelectFieldProps>(function TagMultiSelectField(
  {
    size = "md",
    color = "ntrl",
    tone = "default",
    inputTone,
    visualState,
    fieldClassName,
    tags,
    onRemove,
    options,
    onAddTag,
    filterInputProps,
    menu,
    menuOpen,
    defaultMenuOpen = false,
    onMenuOpenChange,
    closeOnSelect = false,
    className,
    ...baseRest
  },
  ref,
) {
  const sz = size ?? "md";
  const fc = inputBaseColorToFieldColor(color);
  const it = inputTone ?? tone;
  const disabled = Boolean(baseRest.disabled);
  const tagSize = inputTagSizeForTextInputField(sz);
  const menuColor: MenuItemColor = fc === "brand" ? "brand" : "ntrl";
  const rootRef = React.useRef<HTMLDivElement>(null);
  const filterInputId = React.useId();
  const availableOptions = options ?? [];
  const [internalOpen, setInternalOpen] = React.useState(defaultMenuOpen);
  const isMenuOpenControlled = menuOpen !== undefined;
  const open = isMenuOpenControlled ? Boolean(menuOpen) : internalOpen;
  const hasMenu = menu != null || availableOptions.length > 0;
  const selectedTagIds = new Set(tags.map((tag) => tag.id));
  const { className: filterInputClassName, onFocus: onFilterFocus, ...restFilterInputProps } = filterInputProps ?? {};

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

  React.useEffect(() => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled, setOpen]);

  const tagsNode = (
    <>
      {tags.map((t) => (
        <InputTag key={t.id} size={tagSize} color="brand" disabled={disabled} onRemove={disabled ? undefined : () => onRemove(t.id)}>
          {t.label}
        </InputTag>
      ))}
      {filterInputProps ? (
        <TextInput
          ref={ref}
          id={filterInputId}
          size={sz}
          color={fc}
          tone={it}
          pretext={false}
          className={cn("min-w-24 flex-1 basis-24", filterInputClassName)}
          disabled={disabled}
          onFocus={(event) => {
            if (hasMenu && !disabled) {
              setOpen(true);
            }
            onFilterFocus?.(event);
          }}
          {...restFilterInputProps}
        />
      ) : null}
    </>
  );

  const menuNode =
    menu != null ? (
      <SelectMenu size={sz} color={menuColor} className="w-full min-w-0">
        {menu}
      </SelectMenu>
    ) : availableOptions.length > 0 ? (
      <SelectMenu size={sz} color={menuColor} className="w-full min-w-0">
        {availableOptions.map((option) => {
          const selected = selectedTagIds.has(option.id);
          return (
            <MenuItem
              key={option.id}
              size={sz}
              color={menuColor}
              selected={selected}
              showIcons={false}
              onClick={() => {
                if (!selected) {
                  onAddTag?.(option);
                }
                if (closeOnSelect) {
                  setOpen(false);
                }
              }}
            >
              {option.label}
            </MenuItem>
          );
        })}
      </SelectMenu>
    ) : null;

  return (
    <div
      ref={rootRef}
      className={cn("relative w-full min-w-0", className)}
      onFocusCapture={() => {
        if (hasMenu && !disabled) {
          setOpen(true);
        }
      }}
    >
      <InputBase {...baseRest} size={sz} color={color} tone={tone} disabled={disabled}>
        <TextInputChrome size={sz} color={fc} tone={it} disabled={disabled} visualState={visualState} fieldClassName={fieldClassName}>
          <TextInputInnerContent layout="multiselect" color={fc} disabled={disabled} size={sz} tags={tagsNode} showCaret={false} />
        </TextInputChrome>
      </InputBase>
      {open && menuNode ? (
        <div className={cn("absolute left-0 top-full z-10 mt-1 w-full min-w-0", controlDropdownEnterClassName)}>
          {menuNode}
        </div>
      ) : null}
    </div>
  );
});

export {
  ChannelComboTextInputField,
  ClearableTextInputField,
  CurrencyTextInputField,
  IconBothTextInputField,
  IconLeftTextInputField,
  IconRightTextInputField,
  PlainTextInputField,
  SearchTextInputField,
  TagMultiSelectField,
};
