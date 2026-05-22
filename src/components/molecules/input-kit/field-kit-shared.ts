import type { InputBaseColor, InputBaseProps } from "../../ui/field/input-base";
import type { TextInputFieldVisualState } from "../../ui/field/text-input-field";
import type { TextInputColor, TextInputProps, TextInputTone } from "../../ui/field/text-input";

export type FieldKitBaseProps = Pick<
  InputBaseProps,
  "label" | "labelText" | "helper" | "helperText" | "htmlFor" | "disabled" | "sideLabel" | "helperSpace"
> & {
  size?: TextInputProps["size"];
  /** Цвет оболочки поля и `InputBase`. */
  color?: InputBaseColor;
  tone?: InputBaseProps["tone"];
  inputTone?: TextInputTone;
  visualState?: TextInputFieldVisualState;
  fieldClassName?: string;
  className?: string;
  innerClassName?: string;
};

export function inputBaseColorToFieldColor(color: InputBaseColor | undefined): TextInputColor {
  if (color === "brand" || color === "brand-inverse") return "brand";
  return "ntrl";
}
