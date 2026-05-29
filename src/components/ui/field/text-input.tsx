import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textInputRootVariants = cva(
  "flex min-w-0 items-center gap-1 font-sans antialiased",
  {
    variants: {
      size: {
        sm: "text-font-size-sm leading-[var(--font-font-height-sm)]",
        md: "text-font-size-base leading-[var(--font-font-height-base)]",
        lg: "text-font-size-lg leading-[var(--font-font-height-lg)]",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type TextInputSize = NonNullable<VariantProps<typeof textInputRootVariants>["size"]>;
export type TextInputColor = "ntrl" | "brand";
export type TextInputTone = "default" | "success" | "error";

/** Стили текста значения / placeholder: пустое — только ntrl/brand placeholder; при заполнении success/error — цвет статуса. */
export function textInputFieldTextClassName(
  color: TextInputColor,
  tone: TextInputTone | "disabled",
  isEmpty: boolean,
): string {
  if (tone === "disabled") {
    return color === "brand"
      ? "font-medium text-semantic-text-brand-disabled"
      : "font-normal text-semantic-text-ntrl-disabled";
  }
  if (isEmpty) {
    return color === "brand"
      ? "font-medium text-components-typography-brand-light-placeholder"
      : "font-normal text-components-typography-ntrl-light-placeholder";
  }
  if (tone === "success") {
    return color === "brand"
      ? "font-medium text-semantic-status-success-bright"
      : "font-normal text-semantic-status-success-dark";
  }
  if (tone === "error") {
    return color === "brand"
      ? "font-medium text-semantic-status-error-bright"
      : "font-normal text-semantic-status-error-dark";
  }
  if (color === "brand") {
    return "font-medium text-components-typography-brand-light-inp-text";
  }
  return "font-normal text-components-typography-ntrl-light-inp-text";
}

export type TextInputProps = Omit<React.ComponentPropsWithoutRef<"input">, "size"> &
  VariantProps<typeof textInputRootVariants> & {
    /** Префикс слева (как «Https//» в макете). */
    pretext?: boolean;
    /** Содержимое префикса; при `pretext` без `prefix` показывается «Https//». */
    prefix?: React.ReactNode;
    color?: TextInputColor;
    tone?: TextInputTone;
  };

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    className,
    size = "md",
    pretext = false,
    prefix,
    color = "ntrl",
    tone = "default",
    disabled,
    value,
    defaultValue,
    onChange,
    ...inputProps
  },
  ref,
) {
  const [internalValue, setInternalValue] = React.useState(String(defaultValue ?? ""));
  const isControlled = value !== undefined;
  const current = isControlled ? String(value ?? "") : internalValue;
  const isEmpty = current.length === 0;
  const effectiveTone: TextInputTone | "disabled" = disabled ? "disabled" : tone;

  React.useEffect(() => {
    if (isControlled) return;
    setInternalValue(String(defaultValue ?? ""));
  }, [defaultValue, isControlled]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
    onChange?.(event);
  };

  const prefixContent = prefix === undefined ? "Https//" : prefix;

  return (
    <div className={cn(textInputRootVariants({ size }), "w-full min-w-0", className)} data-slot="text-input">
      {pretext ? (
        <span className="shrink-0 select-none text-components-typography-ntrl-light-sub-label" aria-hidden>
          {prefixContent}
        </span>
      ) : null}
      <input
        ref={ref}
        {...inputProps}
        {...(isControlled ? { value: value ?? "" } : defaultValue !== undefined ? { defaultValue } : {})}
        disabled={disabled}
        onChange={handleChange}
        className={cn(
          "min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none outline-none ring-0",
          "focus-visible:outline-none disabled:cursor-not-allowed",
          textInputFieldTextClassName(color, effectiveTone, isEmpty),
        )}
      />
    </div>
  );
});

export { TextInput, textInputRootVariants };
