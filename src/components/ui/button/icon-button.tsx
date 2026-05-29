import * as React from "react";

import { SquareButton, squareButtonVariants } from "./square-button";
import type { SquareButtonProps, SquareButtonShape, SquareButtonSize, SquareButtonVariant } from "./square-button";

type IconButtonAccessibleName =
  | {
      "aria-label": string;
      "aria-labelledby"?: never;
    }
  | {
      "aria-label"?: never;
      "aria-labelledby": string;
    };

type IconButtonBaseProps = Omit<SquareButtonProps, "asChild" | "children" | "icon"> & {
  icon: React.ReactNode;
};

export type IconButtonVariant = SquareButtonVariant;
export type IconButtonSize = SquareButtonSize;
export type IconButtonShape = SquareButtonShape;
export type IconButtonProps = IconButtonBaseProps & IconButtonAccessibleName;

const iconButtonVariants = squareButtonVariants;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, ...props },
  ref,
) {
  if (
    process.env.NODE_ENV !== "production" &&
    props["aria-label"] == null &&
    props["aria-labelledby"] == null
  ) {
    console.warn("IconButton requires either `aria-label` or `aria-labelledby`.");
  }

  return (
    <SquareButton
      ref={ref}
      {...props}
      data-slot="icon-button"
      icon={<span aria-hidden="true">{icon}</span>}
    />
  );
});

export { IconButton, iconButtonVariants };
