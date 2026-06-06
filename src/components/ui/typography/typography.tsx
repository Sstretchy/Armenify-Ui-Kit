import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const typographyVariantsList = [
  "xxxs",
  "xxs",
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
] as const;

const typographyVariants = cva("m-0 tracking-normal antialiased", {
  variants: {
    variant: {
      xxxs: "text-font-size-xxxs",
      xxs: "text-font-size-xxs",
      xs: "text-font-size-xs",
      sm: "text-font-size-sm",
      base: "text-font-size-base",
      lg: "text-font-size-lg",
      xl: "text-font-size-xl",
      "2xl": "text-font-size-2xl",
      "3xl": "text-font-size-3xl",
      "4xl": "text-font-size-4xl",
      "5xl": "text-font-size-5xl",
      "6xl": "text-font-size-6xl",
      "7xl": "text-font-size-7xl",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
    },
    font: {
      sans: "font-sans",
      display: "font-serif",
    },
    align: {
      start: "text-left",
      center: "text-center",
      end: "text-right",
    },
    tone: {
      default: "",
      muted: "text-semantic-text-ntrl-secondary",
      inverse: "text-semantic-text-ntrl-primary-inverse",
    },
  },
  defaultVariants: {
    variant: "base",
    weight: "regular",
    font: "sans",
    align: "start",
    tone: "default",
  },
});

export type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>;

export type TypographyProps = React.ComponentPropsWithoutRef<"p"> &
  VariantProps<typeof typographyVariants> & {
    as?: React.ElementType;
    asChild?: boolean;
  };

const Typography = React.forwardRef<HTMLElement, TypographyProps>(function Typography(
  { className, variant, weight, font, align, tone, as: Comp = "p", asChild = false, ...props },
  ref,
) {
  const Root = asChild ? Slot : Comp;

  return (
    <Root
      ref={ref}
      data-slot="typography"
      className={cn(typographyVariants({ variant, weight, font, align, tone }), className)}
      {...props}
    />
  );
});

export { Typography, typographyVariants };
