import * as React from "react";
import { X } from "phosphor-strokes-icons";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { ArmenifyIcon, type ArmenifyIconSize } from "../icon";
import { Typography, type TypographyVariant } from "../typography";

const tagVariants = cva("inline-flex items-center justify-center font-sans font-normal antialiased", {
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
      sm: "h-5 gap-2 rounded-border-xs px-2",
      lg: "h-6 gap-2.5 rounded-border-sm px-2",
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
      class: "border-components-tags-text-default-light bg-[image:var(--gradient-brand-primary-inverse)] text-components-tags-text-default-light",
    },
  ],
  defaultVariants: {
    disabled: false,
    color: "brand",
    bordered: false,
    size: "sm",
  },
});

export type TagSize = NonNullable<VariantProps<typeof tagVariants>["size"]>;
export type TagColor = NonNullable<VariantProps<typeof tagVariants>["color"]>;

const tagCloseIconSize: Record<TagSize, ArmenifyIconSize> = {
  sm: "xxx-small",
  lg: "xx-small",
};

const tagTextVariantBySize: Record<TagSize, TypographyVariant> = {
  sm: "sm",
  lg: "base",
};

const tagTextWeightBySize: Record<TagSize, "medium" | "regular"> = {
  sm: "regular",
  lg: "regular",
};

const tagTextOffsetBySize: Record<TagSize, string> = {
  sm: "translate-y-[-0.08rem]",
  lg: "translate-y-[-0.08rem]",
};

type SharedTagProps = VariantProps<typeof tagVariants> & {
  children: React.ReactNode;
  showRemove?: boolean;
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  removeLabel?: string;
};

type TagAsButtonProps = SharedTagProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof SharedTagProps | "color">;

type TagAsSpanProps = SharedTagProps &
  Omit<React.ComponentPropsWithoutRef<"span">, keyof SharedTagProps | "color">;

export type TagProps = TagAsButtonProps | TagAsSpanProps;

const Tag = React.forwardRef<HTMLButtonElement | HTMLSpanElement, TagProps>(function Tag(
  {
    className,
    color = "brand",
    bordered = false,
    disabled = false,
    size = "sm",
    children,
    showRemove = false,
    onRemove,
    removeLabel = "Remove tag",
    ...rest
  },
  ref,
) {
  const resolvedSize = size ?? "sm";
  const iconSize = tagCloseIconSize[resolvedSize];
  const merged = cn(tagVariants({ disabled, color, bordered, size: resolvedSize }), className);

  const withIcon = showRemove ? (
    <span className="inline-flex shrink-0 text-current" aria-hidden>
      <ArmenifyIcon icon={X} size={iconSize} strokeWeight="bold" className="text-current" />
    </span>
  ) : null;

  const textNode = (
    <Typography
      as="span"
      variant={tagTextVariantBySize[resolvedSize]}
      weight={tagTextWeightBySize[resolvedSize]}
      className={cn("whitespace-nowrap leading-inherit text-current", tagTextOffsetBySize[resolvedSize])}
    >
      {children}
    </Typography>
  );

  if (showRemove && onRemove) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        disabled={Boolean(disabled)}
        aria-label={removeLabel}
        data-slot="tag"
        data-tag-interactive="true"
        className={cn(
          merged,
          "cursor-pointer text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-current disabled:cursor-not-allowed",
        )}
        onClick={onRemove}
        {...(rest as React.ComponentPropsWithoutRef<"button">)}
      >
        {textNode}
        {withIcon}
      </button>
    );
  }

  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      data-slot="tag"
      data-tag-interactive="false"
      className={merged}
      {...(rest as React.ComponentPropsWithoutRef<"span">)}
    >
      {textNode}
      {withIcon}
    </span>
  );
});

export { Tag, tagVariants };
