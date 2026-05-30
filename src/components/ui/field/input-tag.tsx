import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { Tag, tagVariants, type TagSize } from "../tag";
import type { TextInputSize } from "./text-input";

const inputTagVariants = tagVariants;

type InputTagSize = NonNullable<VariantProps<typeof tagVariants>["size"]>;

function inputTagSizeForTextInputField(size: TextInputSize | null | undefined): InputTagSize {
  switch (size ?? "md") {
    case "lg":
      return "lg";
    default:
      return "sm";
  }
}

export type InputTagProps = Omit<React.ComponentPropsWithoutRef<"span">, "children"> &
  VariantProps<typeof tagVariants> & {
    children: React.ReactNode;
    showRemove?: boolean;
    onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    removeLabel?: string;
  };

const InputTag = React.forwardRef<HTMLButtonElement | HTMLSpanElement, InputTagProps>(function InputTag(
  {
    className,
    color = "brand",
    bordered = false,
    disabled = false,
    size = "sm",
    children,
    showRemove = true,
    onRemove,
    removeLabel = "Удалить",
    ...rest
  },
  ref,
) {
  return (
    <Tag
      ref={ref as React.Ref<HTMLButtonElement & HTMLSpanElement>}
      className={className}
      color={color}
      bordered={bordered}
      disabled={disabled}
      size={(size ?? "sm") as TagSize}
      showRemove={showRemove}
      onRemove={
        onRemove
          ? (event) => {
              event.stopPropagation();
              onRemove(event);
            }
          : undefined
      }
      removeLabel={removeLabel}
      data-slot="input-tag"
      data-input-tag-interactive={showRemove && onRemove ? "true" : "false"}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export { InputTag, inputTagVariants, inputTagSizeForTextInputField, type InputTagSize };
