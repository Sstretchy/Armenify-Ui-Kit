import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { MenuItem, type MenuItemColor, type MenuItemSize } from "./menu-item";

const selectMenuRootVariants = cva(
  cn(
    "box-border flex w-full min-w-0 flex-col font-sans inner-border inner-border-1_5",
    "[--inner-border-color:var(--semantic-border-ntrl-default)]",
    "shadow-input-shadow-outer antialiased",
  ),
  {
    variants: {
      color: {
        ntrl: "bg-semantic-bg-ntrl-primary",
        brand: "bg-semantic-bg-brand-primary",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    compoundVariants: [
      { color: "ntrl", size: "sm", class: "rounded-border-sm p-2.5" },
      { color: "ntrl", size: "md", class: "rounded-border-md p-3" },
      { color: "ntrl", size: "lg", class: "rounded-border-lg p-3.5" },
      { color: "brand", size: "sm", class: "rounded-border-sm p-2.5" },
      { color: "brand", size: "md", class: "rounded-border-sm p-2.5" },
      { color: "brand", size: "lg", class: "rounded-border-lg p-3.5" },
    ],
    defaultVariants: { color: "ntrl", size: "sm" },
  },
);

export type SelectMenuDividerTone = "ntrl" | "brand";

const selectMenuDividerToneClass: Record<SelectMenuDividerTone, string> = {
  ntrl: "bg-semantic-border-ntrl-delicate",
  brand: "bg-semantic-border-brand-delicate",
};

export type SelectMenuDividerProps = React.ComponentPropsWithoutRef<"div"> & {
  tone?: SelectMenuDividerTone;
};

function SelectMenuDivider({ tone = "ntrl", className, ...rest }: SelectMenuDividerProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      data-slot="select-menu-divider"
      className={cn("h-[0.0625rem] w-full shrink-0", selectMenuDividerToneClass[tone], className)}
      {...rest}
    />
  );
}

function selectMenuDividerTone(menuColor: MenuItemColor, menuSize: MenuItemSize): SelectMenuDividerTone {
  if (menuColor === "brand" && menuSize === "sm") return "brand";
  return "ntrl";
}

export type SelectMenuProps = Omit<React.ComponentPropsWithoutRef<"div">, "children"> & {
  size?: MenuItemSize;
  color?: MenuItemColor;
  children?: React.ReactNode;
  /** Без `children`: какой из четырёх пунктов с меткой «Text» показать выбранным (как в макете селекта). */
  defaultSelectedIndex?: number;
};

const SelectMenu = React.forwardRef<HTMLDivElement, SelectMenuProps>(function SelectMenu(
  { size = "sm", color = "ntrl", children, defaultSelectedIndex, className, ...rest },
  ref,
) {
  const dividerTone = selectMenuDividerTone(color, size);
  const defaultSlot = (
    <>
      {[0, 1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          {i > 0 ? <SelectMenuDivider tone={dividerTone} /> : null}
          <MenuItem size={size} color={color} prefixText="Https//" selected={defaultSelectedIndex === i}>
            Text
          </MenuItem>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div
      ref={ref}
      data-slot="select-menu"
      data-select-menu-size={size}
      data-select-menu-color={color}
      className={cn(selectMenuRootVariants({ color, size }), className)}
      {...rest}
    >
      <div className="flex w-full min-w-0 flex-col gap-0.5">{children ?? defaultSlot}</div>
    </div>
  );
});

export { SelectMenu, selectMenuRootVariants, SelectMenuDivider };
