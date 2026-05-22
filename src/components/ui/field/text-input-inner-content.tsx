import * as React from "react";
import { CaretDown, CurrencyRub, MagnifyingGlass, ShootingStar, XCircle } from "phosphor-strokes-icons";

import { cn } from "@/lib/utils";

import { ArmenifyIcon } from "../icon";
import { InputFieldIcon, type InputFieldIconColor, type InputFieldIconProps } from "./input-field-icon";
import { InputTag, inputTagSizeForTextInputField } from "./input-tag";
import { textInputFieldTextClassName, textInputRootVariants, type TextInputColor, type TextInputSize } from "./text-input";

export type TextInputInnerLayout =
  | "default"
  | "iconLeft"
  | "iconRight"
  | "iconBoth"
  | "currency"
  | "clear"
  | "comboBox"
  | "select"
  | "search"
  | "multiselect";

export type TextInputInnerContentProps = Omit<React.ComponentPropsWithoutRef<"div">, "children"> & {
  layout: TextInputInnerLayout;
  color?: TextInputColor;
  disabled?: boolean;
  size?: TextInputSize;
  /** Для `layout="clear"`: кнопка очистки вместо декоративной иконки. */
  onClear?: () => void;
  /** Для `layout="search"`: клик по иконке лупы (например сабмит поиска). */
  onSearchIconClick?: () => void;
  prefix?: React.ReactNode;
  /**
   * В макете у `default` + ntrl + активного поля префикса нет.
   * По умолчанию: скрыт только в этом сочетании.
   */
  pretext?: boolean;
  valueText?: string;
  field?: React.ReactNode;
  tags?: React.ReactNode;
  /** Только для `layout="multiselect"`. По умолчанию `true`. */
  showCaret?: boolean;
};

function iconColor(color: TextInputColor, disabled: boolean): InputFieldIconColor {
  if (disabled) return "disable";
  return color === "brand" ? "brand" : "ntrl";
}

function shootingWeight(color: TextInputColor, disabled: boolean, bold: boolean): NonNullable<InputFieldIconProps["weight"]> {
  if (disabled) return "slim";
  return color === "brand" && bold ? "bold" : "slim";
}

function defaultShowPrefix(layout: TextInputInnerLayout, color: TextInputColor, disabled: boolean, explicit: boolean | undefined): boolean {
  if (explicit !== undefined) return explicit;
  return !(layout === "default" && color === "ntrl" && !disabled);
}

function PrefixAndValue({
  color,
  disabled,
  showPrefix,
  prefixContent,
  valueText,
  field,
  fontWeightClass,
}: {
  color: TextInputColor;
  disabled: boolean;
  showPrefix: boolean;
  prefixContent: React.ReactNode;
  valueText: string;
  field?: React.ReactNode;
  fontWeightClass: string;
}) {
  const tone = disabled ? "disabled" : "default";
  const isEmpty = !valueText;
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-[var(--space-space-2-5)] text-font-size-sm leading-[var(--font-font-height-sm)]",
        field ? "min-w-0 flex-1" : "whitespace-nowrap",
      )}
    >
      {showPrefix ? (
        <span className="shrink-0 select-none text-components-typography-ntrl-light-sub-label" aria-hidden>
          {prefixContent}
        </span>
      ) : null}
      {field ? (
        <div className="min-w-0 flex-1 [&_[data-slot=text-input]]:w-full">{field}</div>
      ) : (
        <span className={cn("min-w-0 truncate", fontWeightClass, textInputFieldTextClassName(color, tone, isEmpty))}>{valueText}</span>
      )}
    </div>
  );
}

function DemoTags({ disabled, size }: { disabled: boolean; size: TextInputSize }) {
  const tagSize = inputTagSizeForTextInputField(size);
  return (
    <>
      {["a", "b", "c", "d"].map((k) => (
        <InputTag key={k} size={tagSize} color="brand" disabled={disabled} onRemove={disabled ? undefined : () => undefined}>
          tag text
        </InputTag>
      ))}
    </>
  );
}

function CaretIcon({ color, disabled }: { color: TextInputColor; disabled: boolean }) {
  const c = iconColor(color, disabled);
  return (
    <span className="inline-flex shrink-0 leading-none">
      <ArmenifyIcon
        icon={CaretDown}
        size="xxx-small"
        strokeWidthToken="var(--bold-caret-12)"
        className={cn(
          c === "disable" && "text-semantic-text-ntrl-disabled",
          c === "brand" && "text-components-typography-brand-light-inp-text",
          c === "ntrl" && "text-components-typography-ntrl-light-inp-text",
        )}
        aria-hidden
      />
    </span>
  );
}

const TextInputInnerContent = React.forwardRef<HTMLDivElement, TextInputInnerContentProps>(
  function TextInputInnerContent(
    {
      className,
      layout,
      color = "ntrl",
      disabled = false,
      size = "sm",
      prefix,
      pretext,
      valueText = "Text",
      field,
      tags,
      onClear,
      onSearchIconClick,
      showCaret = true,
      ...rest
    },
    ref,
  ) {
    const prefixContent = prefix === undefined ? "Https//" : prefix;
    const showPrefix = defaultShowPrefix(layout, color, disabled, pretext);
    const ic = iconColor(color, disabled);
    const fontWeightClass = color === "brand" ? "font-medium" : "font-normal";

    const pv = (show: boolean) => (
      <PrefixAndValue
        color={color}
        disabled={disabled}
        showPrefix={show}
        prefixContent={prefixContent}
        valueText={valueText}
        field={field}
        fontWeightClass={fontWeightClass}
      />
    );

    const star = (bold: boolean) => (
      <InputFieldIcon icon={ShootingStar} size={size} color={ic} weight={shootingWeight(color, disabled, bold)} />
    );
    const rub = <InputFieldIcon icon={CurrencyRub} size={size} color={ic} weight="slim" />;
    const clearI = (
      <InputFieldIcon icon={XCircle} size={size} color={ic} weight={color === "brand" && !disabled ? "bold" : "slim"} />
    );
    const searchI = (
      <InputFieldIcon icon={MagnifyingGlass} size={size} color={ic} weight={color === "brand" && !disabled ? "bold" : "slim"} />
    );

    let body: React.ReactNode = null;

    switch (layout) {
      case "default":
        body = pv(showPrefix);
        break;
      case "iconLeft":
        body = (
          <>
            {star(layout === "iconLeft" && color === "brand" && !disabled)}
            {pv(showPrefix)}
          </>
        );
        break;
      case "iconRight":
        body = (
          <>
            {pv(showPrefix)}
            {star(true)}
          </>
        );
        break;
      case "iconBoth":
        body =
          color === "brand" && disabled ? (
            <div className="flex min-w-0 flex-1 items-center justify-between gap-[var(--space-space-1)]">
              <div className="flex min-w-0 items-center gap-[var(--space-space-1)]">
                <InputFieldIcon icon={ShootingStar} size={size} color="disable" weight="slim" />
                {pv(showPrefix)}
              </div>
              <InputFieldIcon icon={ShootingStar} size={size} color="disable" weight="slim" />
            </div>
          ) : (
            <>
              {star(false)}
              {pv(showPrefix)}
              {star(true)}
            </>
          );
        break;
      case "currency":
        body = (
          <>
            {rub}
            {pv(showPrefix)}
          </>
        );
        break;
      case "clear":
        body = (
          <>
            {pv(showPrefix)}
            {onClear && !disabled ? (
              <button
                type="button"
                className="inline-flex shrink-0 cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-semantic-border-ntrl-default-focused"
                aria-label="Очистить"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
              >
                {clearI}
              </button>
            ) : (
              clearI
            )}
          </>
        );
        break;
      case "search":
        body = (
          <>
            {pv(showPrefix)}
            {onSearchIconClick && !disabled ? (
              <button
                type="button"
                className="inline-flex shrink-0 cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-semantic-border-ntrl-default-focused"
                aria-label="Поиск"
                onClick={(e) => {
                  e.stopPropagation();
                  onSearchIconClick();
                }}
              >
                {searchI}
              </button>
            ) : (
              searchI
            )}
          </>
        );
        break;
      case "select":
        body = (
          <>
            {pv(showPrefix)}
            <CaretIcon color={color} disabled={disabled} />
          </>
        );
        break;
      case "comboBox":
        body = (
          <>
            <div className="flex min-w-0 flex-1 items-center gap-[var(--space-space-0-5)]">
              {rub}
              {pv(showPrefix)}
            </div>
            <div className="flex shrink-0 items-center gap-[var(--space-space-1)]">
              <PrefixAndValue
                color={color}
                disabled={disabled}
                showPrefix={color === "brand"}
                prefixContent={prefixContent}
                valueText={valueText}
                field={field}
                fontWeightClass={fontWeightClass}
              />
              <CaretIcon color={color} disabled={disabled} />
            </div>
          </>
        );
        break;
      case "multiselect":
        body = (
          <>
            <div className="flex min-w-0 flex-1 flex-wrap content-start items-start gap-[var(--space-space-1)]">
              {tags ?? <DemoTags disabled={disabled} size={size} />}
            </div>
            {showCaret ? <CaretIcon color={color} disabled={disabled} /> : null}
          </>
        );
        break;
      default:
        body = pv(showPrefix);
    }

    const justifyBetween =
      (layout === "multiselect" && showCaret) ||
      layout === "select" ||
      layout === "search" ||
      layout === "clear" ||
      (layout === "iconRight" && color === "brand") ||
      (layout === "iconBoth" && color === "brand");

    const rootClass = cn(
      textInputRootVariants({ size }),
      "min-w-0 items-center gap-[var(--space-space-1)]",
      justifyBetween && "justify-between",
      layout === "comboBox" && "gap-[var(--space-space-2)]",
      layout === "currency" && "gap-[var(--space-space-0-5)]",
      layout === "iconLeft" && color === "brand" && "gap-[var(--space-space-1)]",
      className,
    );

    return (
      <div ref={ref} data-slot="text-input-inner-content" data-inner-layout={layout} className={rootClass} {...rest}>
        {body}
      </div>
    );
  },
);

export { TextInputInnerContent };
