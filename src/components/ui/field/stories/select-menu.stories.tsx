import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { MenuItem } from "../menu-item";
import { SelectMenu, SelectMenuDivider } from "../select-menu";

const meta = {
  title: "UI/Field/SelectMenu",
  component: SelectMenu,
  tags: ["!autodocs"],
  parameters: { layout: "centered", controls: { disable: true } },
  args: { size: "md" as const, color: "ntrl" as const },
} satisfies Meta<typeof SelectMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

type FigmaSpecimen = {
  color: "ntrl" | "brand";
  size: "sm" | "md" | "lg";
};

const figmaSpecimens: FigmaSpecimen[] = [
  { color: "ntrl", size: "sm" },
  { color: "ntrl", size: "md" },
  { color: "ntrl", size: "lg" },
  { color: "brand", size: "sm" },
  { color: "brand", size: "md" },
  { color: "brand", size: "lg" },
];

const menuWidthClassName = "w-[15rem]";

function specimenId({ color, size }: FigmaSpecimen) {
  return `select-menu-${color}-${size}`;
}

function ComparisonFrame() {
  return (
    <div className="pointer-events-none box-border flex w-[13.8125rem] flex-col gap-5 rounded border border-dashed border-semantic-border-brand-default bg-white p-5">
      {figmaSpecimens.map((specimen) => (
        <SelectMenu key={specimenId(specimen)} className={menuWidthClassName} size={specimen.size} color={specimen.color} />
      ))}
    </div>
  );
}

export const Comparison: Story = {
  render: () => <ComparisonFrame />,
};

export const CustomItems: Story = {
  render: function CustomItemsRender() {
    const [value, setValue] = React.useState("a");
    return (
      <div className="w-[11.3125rem]">
        <SelectMenu size="md" color="ntrl">
          <MenuItem prefixText="Https//" selected={value === "a"} onClick={() => setValue("a")}>
            Option A
          </MenuItem>
          <SelectMenuDivider tone="ntrl" />
          <MenuItem prefixText="Https//" disabled>
            Disabled
          </MenuItem>
          <SelectMenuDivider tone="ntrl" />
          <MenuItem prefixText="Https//" selected={value === "b"} onClick={() => setValue("b")}>
            Option B
          </MenuItem>
        </SelectMenu>
      </div>
    );
  },
};
