import * as React from "react";
import { X } from "phosphor-strokes-icons";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { ArmenifyIcon, type ArmenifyIconSize } from "../icon";
import type { TextInputSize } from "./text-input";

const inputTagVariants = cva(
  "inline-flex items-center justify-center font-sans font-normal antialiased",
  {
    variants: {
      disabled: {
        true: "border-0 bg-semantic-bg-brand-disabled text-semantic-text-brand-disabled",
        false: "",
      },
      color: {
        brand: "",
        "brand-inverse": "",
        gradient: "",
      },
      bordered: {
        true: "border border-solid",
        false: "border-0",
      },
      size: {
        xs: "h-4 gap-1.5 rounded-border-xxs px-1.5 text-font-size-xxs-input leading-[var(--font-font-height-xxs-input)]",
        sm: "h-5 gap-2 rounded-border-xs px-2 text-font-size-xs-input leading-[var(--font-font-height-xs-input)]",
        lg: "h-6 gap-2.5 rounded-border-sm px-2 text-font-size-sm leading-[var(--font-font-height-sm)]",
      },
    },
    compoundVariants: [
      {
        disabled: true,
        class: "!border-0",
      },
      {
        disabled: false,
        color: "brand",
        bordered: false,
        class: "bg-components-tags-bg-default text-components-tags-text-default",
      },
      {
        disabled: false,
        color: "brand",
        bordered: true,
        class: "border-components-tags-text-default bg-components-tags-bg-default text-components-tags-text-default",
      },
      {
        disabled: false,
        color: "brand-inverse",
        bordered: false,
        class: "bg-components-tags-bg-default-light text-components-tags-text-default-light",
      },
      {
        disabled: false,
        color: "brand-inverse",
        bordered: true,
        class: "border-components-tags-text-default-light bg-components-tags-bg-default-light text-components-tags-text-default-light",
      },
      {
        disabled: false,
        color: "gradient",
        bordered: false,
        class: "bg-[image:var(--gradient-brand-primary-inverse)] text-components-tags-text-default-light",
      },
      {
        disabled: false,
        color: "gradient",
        bordered: true,
        class:
          "border-components-tags-text-default-light bg-[image:var(--gradient-brand-primary-inverse)] text-components-tags-text-default-light",
      },
    ],
    defaultVariants: {
      disabled: false,
      color: "brand",
      bordered: false,
      size: "xs",
    },
  },
);

type InputTagSize = NonNullable<VariantProps<typeof inputTagVariants>["size"]>;

/** Размер тега под размер поля: sm → xs, md → sm, lg → lg. */
function inputTagSizeForTextInputField(size: TextInputSize | null | undefined): InputTagSize {
  switch (size ?? "md") {
    case "sm":
      return "xs";
    case "lg":
      return "lg";
    default:
      return "sm";
  }
}

const tagCloseIconSize: Record<NonNullable<VariantProps<typeof inputTagVariants>["size"]>, ArmenifyIconSize> = {
  xs: "xxxx-small",
  sm: "xxx-small",
  lg: "xx-small",
};

export type InputTagProps = Omit<React.ComponentPropsWithoutRef<"span">, "children"> &
  VariantProps<typeof inputTagVariants> & {
    children: React.ReactNode;
    /** Крестик: при `onRemove` весь тег — одна кнопка удаления; без крестика тег не интерактивен. */
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
    size = "xs",
    children,
    showRemove = true,
    onRemove,
    removeLabel = "Удалить",
    ...rest
  },
  ref,
) {
  const iconSize = tagCloseIconSize[size ?? "xs"];
  const merged = cn(inputTagVariants({ disabled, color, bordered, size }), className);

  const withIcon = showRemove ? (
    <span className="inline-flex shrink-0 text-current" aria-hidden>
      <ArmenifyIcon icon={X} size={iconSize} strokeWeight="bold" className="text-current" />
    </span>
  ) : null;

  if (showRemove && onRemove) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        disabled={Boolean(disabled)}
        aria-label={removeLabel}
        data-slot="input-tag"
        data-input-tag-interactive="true"
        className={cn(
          merged,
          "cursor-pointer text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-current disabled:cursor-not-allowed",
        )}
        onClick={(event) => {
          event.stopPropagation();
          onRemove(event);
        }}
        {...(rest as React.ComponentPropsWithoutRef<"button">)}
      >
        <span>{children}</span>
        {withIcon}
      </button>
    );
  }

  return (
    <span ref={ref as React.Ref<HTMLSpanElement>} data-slot="input-tag" data-input-tag-interactive="false" className={merged} {...rest}>
      <span>{children}</span>
      {withIcon}
    </span>
  );
});

export { InputTag, inputTagVariants, inputTagSizeForTextInputField, type InputTagSize };
