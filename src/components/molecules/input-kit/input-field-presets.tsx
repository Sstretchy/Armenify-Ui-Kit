import * as React from "react";
import { CaretDown, TelegramLogo, WhatsappLogo } from "phosphor-strokes-icons";

import { cn } from "@/lib/utils";

import { ArmenifyIcon } from "../../ui/icon";

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
    const [channelMenuOpen, setChannelMenuOpen] = React.useState(false);

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
      if (disabled) setChannelMenuOpen(false);
    }, [disabled]);

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
        <div ref={rootRef} className="relative w-full min-w-0">
          <TextInputChrome size={size} color={fc} tone={fieldTone} disabled={disabled} visualState={shell.visualState} fieldClassName={shell.fieldClassName}>
            <div className="flex w-full min-w-0 items-center gap-[var(--space-space-2)]">
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
              <div className="relative max-w-[42%] min-w-0 shrink-0">
                <button
                  id={channelTriggerId}
                  type="button"
                  disabled={disabled}
                  aria-expanded={channelMenuOpen}
                  aria-haspopup="listbox"
                  aria-controls={channelMenuOpen ? channelListId : undefined}
                  className={cn(
                    "relative w-full min-w-[5.5rem] max-w-full cursor-pointer truncate border-0 bg-transparent py-0 pl-0 pr-[var(--space-space-5)] text-left font-sans outline-none",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-semantic-border-ntrl-default-focused",
                    textInputFieldTextClassName(fc, disabled ? "disabled" : "default", false),
                  )}
                  onClick={() => !disabled && setChannelMenuOpen((o) => !o)}
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
            <div id={channelListId} className="absolute right-0 top-full z-10 mt-[var(--space-space-1)] min-w-0">
              <SelectMenu size={size} color={menuColor} className="min-w-[9rem] w-max max-w-[12rem]">
                {(["telegram", "whatsapp"] as const).map((ch) => (
                  <MenuItem
                    key={ch}
                    size={size}
                    color={menuColor}
                    selected={channel === ch}
                    showIcons={false}
                    onClick={() => {
                      onChannelChange(ch);
                      setChannelMenuOpen(false);
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
  filterInputProps?: Omit<TextInputProps, "color" | "tone" | "size" | "pretext" | "prefix">;
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
    filterInputProps,
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
          size={sz}
          color={fc}
          tone={it}
          pretext={false}
          className="min-w-[6rem] flex-[1_1_6rem]"
          disabled={disabled}
          {...filterInputProps}
        />
      ) : null}
    </>
  );

  const growChrome = cn("h-auto min-h-0", fieldClassName);

  return (
    <InputBase className={className} {...baseRest} size={sz} color={color} tone={tone} disabled={disabled}>
      <TextInputChrome size={sz} color={fc} tone={it} disabled={disabled} visualState={visualState} fieldClassName={growChrome}>
        <TextInputInnerContent layout="multiselect" color={fc} disabled={disabled} size={sz} tags={tagsNode} showCaret={false} />
      </TextInputChrome>
    </InputBase>
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
