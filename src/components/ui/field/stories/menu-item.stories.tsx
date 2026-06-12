import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { MenuItem, type MenuItemColor, type MenuItemSize, type MenuItemVisualState } from "../menu-item";

const meta = {
  title: "UI/Field/MenuItem",
  component: MenuItem,
  tags: ["!autodocs"],
  parameters: { layout: "centered", controls: { disable: true } },
  args: { children: "Text", size: "sm" as const, color: "ntrl" as const },
} satisfies Meta<typeof MenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

type FigmaSpecimen = {
  color: MenuItemColor;
  size: MenuItemSize;
  visualState: MenuItemVisualState;
};

const figmaSpecimens: FigmaSpecimen[] = [
  { color: "ntrl", size: "sm", visualState: "default" },
  { color: "ntrl", size: "sm", visualState: "hover" },
  { color: "ntrl", size: "sm", visualState: "selected" },
  { color: "ntrl", size: "sm", visualState: "disabled" },
  { color: "ntrl", size: "md", visualState: "default" },
  { color: "ntrl", size: "md", visualState: "hover" },
  { color: "ntrl", size: "md", visualState: "selected" },
  { color: "ntrl", size: "md", visualState: "disabled" },
  { color: "ntrl", size: "lg", visualState: "default" },
  { color: "ntrl", size: "lg", visualState: "hover" },
  { color: "ntrl", size: "lg", visualState: "selected" },
  { color: "ntrl", size: "lg", visualState: "disabled" },
  { color: "brand", size: "sm", visualState: "default" },
  { color: "brand", size: "sm", visualState: "hover" },
  { color: "brand", size: "sm", visualState: "selected" },
  { color: "brand", size: "sm", visualState: "disabled" },
  { color: "brand", size: "md", visualState: "default" },
  { color: "brand", size: "md", visualState: "hover" },
  { color: "brand", size: "md", visualState: "selected" },
  { color: "brand", size: "md", visualState: "disabled" },
  { color: "brand", size: "lg", visualState: "default" },
  { color: "brand", size: "lg", visualState: "hover" },
  { color: "brand", size: "lg", visualState: "selected" },
  { color: "brand", size: "lg", visualState: "disabled" },
];

const specimenWidthClassName = "w-[11.3125rem]";

function specimenId({ color, size, visualState }: FigmaSpecimen) {
  return `menu-item-${color}-${size}-${visualState}`;
}

function ComparisonFrame() {
  return (
    <div className="pointer-events-none box-border flex w-[13.8125rem] flex-col gap-2.5 rounded border border-dashed border-semantic-border-brand-default bg-white p-5">
      {figmaSpecimens.map((specimen) => (
        <MenuItem
          key={specimenId(specimen)}
          className={specimenWidthClassName}
          size={specimen.size}
          color={specimen.color}
          visualState={specimen.visualState}
          selected={specimen.visualState === "selected"}
          disabled={specimen.visualState === "disabled"}
          prefixText="Https//"
        >
          Text
        </MenuItem>
      ))}
    </div>
  );
}

export const Comparison: Story = {
  render: () => <ComparisonFrame />,
};

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [selected, setSelected] = React.useState<string | null>("b");
    return (
      <div className="flex w-[11.3125rem] flex-col gap-0.5">
        {(["a", "b", "c"] as const).map((id) => (
          <MenuItem
            key={id}
            size="sm"
            color="ntrl"
            selected={selected === id}
            prefixText="Https//"
            onClick={() => setSelected(id)}
          >
            Option {id.toUpperCase()}
          </MenuItem>
        ))}
      </div>
    );
  },
};
