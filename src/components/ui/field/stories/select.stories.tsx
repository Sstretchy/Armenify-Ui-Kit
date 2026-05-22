import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { MenuItem } from "../menu-item";
import { SelectMenuDivider } from "../select-menu";
import { Select } from "../select";

const meta = {
  title: "UI/Field/Select",
  component: Select,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
  args: { size: "md" as const, color: "ntrl" as const, labelText: "Label" },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Matrix: Story = {
  render: () => (
    <div className="pointer-events-none flex flex-col gap-12 p-4">
      <p className="max-w-xl text-font-size-sm text-semantic-text-ntrl-secondary">
        Селект по{" "}
        <a
          className="text-components-typography-brand-light-label underline"
          href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=234-24878"
          rel="noreferrer"
          target="_blank"
        >
          Figma 234:24878
        </a>
        : InputBase + поле как TextInputField (рамка, тень) + стрелка, под ним SelectMenu; sm/md/lg × ntrl/brand.
      </p>
      <div className="flex flex-wrap gap-10">
        {(["ntrl", "brand"] as const).map((color) => (
          <div key={color} className="flex flex-col gap-4">
            <p className="text-font-size-xs font-medium capitalize text-semantic-text-ntrl-secondary">{color}</p>
            <div className="flex flex-wrap items-start gap-8">
              {(["sm", "md", "lg"] as const).map((size) => (
                <div key={size} className="flex w-[min(24rem,100%)] min-w-[11rem] flex-col gap-1">
                  <span className="text-font-size-xs text-semantic-text-ntrl-tertiary">{size}</span>
                  <Select size={size} color={color} defaultMenuOpen menuDefaultSelectedIndex={1} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [open, setOpen] = React.useState(true);
    const [label, setLabel] = React.useState("There is no one who");
    const pick = (next: string) => {
      setLabel(next);
      setOpen(false);
    };
    return (
      <div className="max-w-md p-4">
        <Select
          menuOpen={open}
          onMenuOpenChange={setOpen}
          placeholder={label}
          menu={
            <>
              <MenuItem prefixText="Https://" onClick={() => pick("Option one")}>
                Option one
              </MenuItem>
              <SelectMenuDivider tone="ntrl" />
              <MenuItem prefixText="Https://" selected={label === "Option two"} onClick={() => pick("Option two")}>
                Option two
              </MenuItem>
              <SelectMenuDivider tone="ntrl" />
              <MenuItem prefixText="Https://" onClick={() => pick("Option three")}>
                Option three
              </MenuItem>
            </>
          }
        />
      </div>
    );
  },
};
