import * as React from "react";

import { cn } from "@/lib/utils";

import { InputBase } from "../../ui/field/input-base";
import { inputBaseColorToFieldColor, type FieldKitBaseProps } from "./field-kit-shared";
import { TextInputChrome } from "../../ui/field/text-input-field";
import { textInputFieldTextClassName, textInputRootVariants, type TextInputProps, type TextInputTone } from "../../ui/field/text-input";

export type TextAreaFieldProps = FieldKitBaseProps &
  Omit<React.ComponentPropsWithoutRef<"textarea">, "size" | "color"> & {
    size?: TextInputProps["size"];
    inputTone?: TextInputTone;
    rows?: number;
  };

const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(function TextAreaField(props, ref) {
  const {
    label,
    labelText,
    helper,
    helperText,
    htmlFor,
    sideLabel,
    helperSpace,
    size = "md",
    color = "ntrl",
    tone = "default",
    inputTone,
    visualState,
    fieldClassName,
    innerClassName: _innerClassIgnored,
    className,
    disabled,
    rows = 3,
    value,
    defaultValue,
    onChange,
    id,
    ...textareaProps
  } = props;

  const fc = inputBaseColorToFieldColor(color);
  const it = inputTone ?? tone;
  const effectiveTone: TextInputTone | "disabled" = disabled ? "disabled" : it;
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(String(defaultValue ?? ""));
  const current = isControlled ? String(value ?? "") : internal;
  const isEmpty = current.length === 0;
  const sz = size ?? "md";

  React.useEffect(() => {
    if (isControlled) return;
    setInternal(String(defaultValue ?? ""));
  }, [defaultValue, isControlled]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) setInternal(e.target.value);
    onChange?.(e);
  };

  const controlId = id ?? htmlFor;

  return (
    <InputBase
      size={sz}
      color={color}
      tone={tone}
      disabled={disabled}
      label={label}
      labelText={labelText}
      helper={helper}
      helperText={helperText}
      htmlFor={htmlFor}
      sideLabel={sideLabel}
      helperSpace={helperSpace}
    >
      <TextInputChrome size={sz} color={fc} tone={it} disabled={disabled} visualState={visualState} fieldClassName={fieldClassName}>
        <div className={cn(textInputRootVariants({ size: sz }), "w-full min-w-0")}>
          <textarea
            ref={ref}
            id={controlId}
            rows={rows}
            disabled={disabled}
            {...textareaProps}
            {...(isControlled ? { value: value ?? "" } : defaultValue !== undefined ? { defaultValue } : {})}
            onChange={handleChange}
            className={cn(
              "box-border w-full min-w-0 resize-y border-0 bg-transparent p-0 font-sans shadow-none outline-none ring-0",
              "focus-visible:outline-none disabled:cursor-not-allowed",
              textInputFieldTextClassName(fc, effectiveTone, isEmpty),
              className,
            )}
          />
        </div>
      </TextInputChrome>
    </InputBase>
  );
});

export { TextAreaField };
