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

function inputColorForBase(color: "ntrl" | "brand" | "ntrl-inverse" | "brand-inverse") {
  return color === "brand" || color === "brand-inverse" ? "brand" : "ntrl";
}

export const Stack: Story = {
  render: function StackRender() {
    const id = React.useId();

    return (
      <div className="space-y-8 p-4">
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
          Base input layout from Figma node{" "}
          <a
            className="text-components-typography-brand-light-label underline"
            href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=182-1988"
            rel="noreferrer"
            target="_blank"
          >
            182:1988
          </a>
          : label, field, and helper in a vertical stack.
        </p>

        {(["ntrl", "brand"] as const).map((color) => (
          <section key={color} className="max-w-md space-y-4">
            <p className="text-font-size-xs font-medium uppercase tracking-wide text-semantic-text-ntrl-secondary">
              {color}
            </p>
            {(["sm", "md", "lg"] as const).map((size) => (
              <InputBase
                key={`${color}-${size}`}
                size={size}
                color={color}
                labelText="Label"
                htmlFor={`${id}-${color}-${size}`}
                helperText="Help text"
              >
                <TextInputField
                  id={`${id}-${color}-${size}`}
                  size={size}
                  color={inputColorForBase(color)}
                  defaultValue="There is no one who"
                  aria-label={`${color} ${size}`}
                />
              </InputBase>
            ))}
          </section>
        ))}

        <section className="max-w-md space-y-4 rounded-border-lg bg-semantic-bg-brand-primary-inverse p-4">
          <p className="text-font-size-xs font-medium uppercase tracking-wide text-components-typography-ntrl-dark-content-light">
            inverse
          </p>
          {(["ntrl-inverse", "brand-inverse"] as const).map((color) => (
            <InputBase
              key={color}
              size="md"
              color={color}
              labelText="Label"
              htmlFor={`${id}-${color}`}
              helperText="Help text"
            >
              <TextInputField
                id={`${id}-${color}`}
                size="md"
                color={inputColorForBase(color)}
                defaultValue="There is no one who"
                aria-label={color}
              />
            </InputBase>
          ))}
        </section>
      </div>
    );
  },
};

export const SideLabel: Story = {
  render: function SideLabelRender() {
    const id = React.useId();

    return (
      <div className="space-y-6 p-4">
        {(["ntrl", "brand"] as const).map((color) => (
          <section key={color} className="max-w-xl space-y-4">
            <p className="text-font-size-xs font-medium uppercase tracking-wide text-semantic-text-ntrl-secondary">
              {color}
            </p>
            {(["sm", "md", "lg"] as const).map((size) => (
              <InputBase
                key={`${color}-${size}`}
                size={size}
                color={color}
                sideLabel
                helperSpace
                labelText="Label"
                htmlFor={`${id}-side-${color}-${size}`}
                helperText="Help text"
              >
                <TextInputField
                  id={`${id}-side-${color}-${size}`}
                  size={size}
                  color={inputColorForBase(color)}
                  defaultValue="There is no one who"
                  aria-label={`${color} ${size} side`}
                />
              </InputBase>
            ))}
          </section>
        ))}

        <section className="max-w-xl space-y-4 rounded-border-lg bg-semantic-bg-brand-primary-inverse p-4">
          <p className="text-font-size-xs font-medium uppercase tracking-wide text-components-typography-ntrl-dark-content-light">
            inverse
          </p>
          {(["ntrl-inverse", "brand-inverse"] as const).map((color) => (
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
              <TextInputField
                id={`${id}-side-${color}`}
                size="md"
                color={inputColorForBase(color)}
                defaultValue="There is no one who"
                aria-label={`${color} side`}
              />
            </InputBase>
          ))}
        </section>
      </div>
    );
  },
};
