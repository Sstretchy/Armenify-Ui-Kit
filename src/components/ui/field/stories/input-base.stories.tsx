import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputBase } from "../input-base";
import { TextInputField } from "../text-input-field";

const meta = {
  title: "UI/Field/InputBase",
  component: InputBase,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
  args: { children: <React.Fragment /> },
} satisfies Meta<typeof InputBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Stack: Story = {
  render: function StackRender() {
    const id = React.useId();
    return (
      <div className="max-w-md space-y-8 p-4">
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
          Базовая разметка по{" "}
          <a
            className="text-components-typography-brand-light-label underline"
            href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=182-1988"
            rel="noreferrer"
            target="_blank"
          >
            макету 182:1988
          </a>
          : лейбл → поле → helper.
        </p>
        {(["sm", "md", "lg"] as const).map((size) => (
          <InputBase
            key={size}
            size={size}
            color="ntrl"
            labelText="Label"
            htmlFor={`${id}-${size}`}
            helperText="Help text"
            tone="default"
          >
            <TextInputField id={`${id}-${size}`} size={size} color="ntrl" defaultValue="There is no one who" aria-label="Поле" />
          </InputBase>
        ))}
      </div>
    );
  },
};

export const SideLabel: Story = {
  render: function SideLabelRender() {
    const id = React.useId();
    return (
      <div className="max-w-xl space-y-6 p-4">
        {(["ntrl", "brand"] as const).map((color) => (
          <InputBase
            key={color}
            size="md"
            color={color}
            sideLabel
            helperSpace
            labelText="Label"
            htmlFor={`${id}-side-${color}`}
            helperText="Help text"
          >
            <TextInputField id={`${id}-side-${color}`} size="md" color={color === "brand" ? "brand" : "ntrl"} defaultValue="There is no one who" aria-label="Поле" />
          </InputBase>
        ))}
      </div>
    );
  },
};
