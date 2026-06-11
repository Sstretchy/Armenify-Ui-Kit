import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { MenuItem } from "../menu-item";
import { SelectMenu, SelectMenuDivider } from "../select-menu";

const meta = {
  title: "UI/Field/SelectMenu",
  component: SelectMenu,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
  args: { size: "md" as const, color: "ntrl" as const },
} satisfies Meta<typeof SelectMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const figmaSelectMenuWidthStyle = { width: "11.3125rem" } as const;

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-4">
      <p className="max-w-xl text-font-size-sm text-semantic-text-ntrl-secondary">
        Готовое меню из{" "}
        <a
          className="text-components-typography-brand-light-label underline"
          href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=234-24025"
          rel="noreferrer"
          target="_blank"
        >
          Figma «Select menu»
        </a>
        : три размера (sm / md / lg) × ntrl / brand, разделители и четыре пункта по умолчанию.
      </p>
      <div className="flex flex-wrap gap-8">
        {(["ntrl", "brand"] as const).map((color) => (
          <div key={color} className="flex flex-col gap-4">
            <p className="text-font-size-xs font-medium capitalize text-semantic-text-ntrl-secondary">{color}</p>
            <div className="flex flex-wrap items-start gap-6">
              {(["sm", "md", "lg"] as const).map((size) => (
                <div key={size} className="flex flex-col gap-1">
                  <span className="text-font-size-xs text-semantic-text-ntrl-tertiary">{size}</span>
                  <SelectMenu size={size} color={color} style={figmaSelectMenuWidthStyle} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const CustomItems: Story = {
  render: function CustomItemsRender() {
    const [value, setValue] = React.useState("a");
    return (
      <div className="max-w-xs p-4">
        <SelectMenu size="md" color="ntrl">
          <MenuItem prefixText="Https://" selected={value === "a"} onClick={() => setValue("a")}>
            Option A
          </MenuItem>
          <SelectMenuDivider tone="ntrl" />
          <MenuItem prefixText="Https://" disabled>
            Disabled
          </MenuItem>
          <SelectMenuDivider tone="ntrl" />
          <MenuItem prefixText="Https://" selected={value === "b"} onClick={() => setValue("b")}>
            Option B
          </MenuItem>
        </SelectMenu>
      </div>
    );
  },
};
