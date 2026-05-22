import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Switch, type SwitchVariant } from "../switch";

const meta = {
  title: "UI/Switch",
  component: Switch,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants: SwitchVariant[] = ["primary", "secondary"];
const sizes = ["md", "lg"] as const;

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-4">
      <p className="max-w-xl text-font-size-sm text-semantic-text-ntrl-secondary">
        Тоглы по{" "}
        <a
          className="text-components-typography-brand-light-label underline"
          href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=115-3757"
          rel="noreferrer"
          target="_blank"
        >
          макету 115:3757
        </a>
        : primary / secondary, размеры md / lg, вкл / выкл / disabled.
      </p>
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-3">
          <p className="text-font-size-sm font-medium capitalize text-semantic-text-ntrl-primary">{variant}</p>
          <div className="flex flex-wrap items-end gap-8">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <span className="text-font-size-xxs-input text-components-typography-ntrl-light-sub-label">{size}</span>
                <div className="flex gap-4">
                  <Switch variant={variant} size={size} defaultChecked aria-label="Вкл" />
                  <Switch variant={variant} size={size} aria-label="Выкл" />
                  <Switch variant={variant} size={size} defaultChecked disabled aria-label="Вкл disabled" />
                  <Switch variant={variant} size={size} disabled aria-label="Выкл disabled" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: function Controlled() {
    const [on, setOn] = React.useState(true);
    return (
      <div className="flex flex-col gap-4 p-4">
        <Switch checked={on} onChange={(e) => setOn(e.target.checked)} aria-label="Уведомления" />
      </div>
    );
  },
};
