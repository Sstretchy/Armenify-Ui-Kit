import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox, type CheckboxVariant } from "../checkbox";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants: CheckboxVariant[] = ["primary", "secondary", "tertiary"];
const sizes = ["xs", "sm", "md"] as const;

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-4">
      <p className="max-w-xl text-font-size-sm text-semantic-text-ntrl-secondary">
        Чекбоксы по{" "}
        <a
          className="text-components-typography-brand-light-label underline"
          href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=112-1294"
          rel="noreferrer"
          target="_blank"
        >
          макету 112:1294
        </a>
        : primary / secondary / tertiary, размеры xs / sm / md, checked / indeterminate / disabled.
      </p>
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-3">
          <p className="text-font-size-sm font-medium capitalize text-semantic-text-ntrl-primary">{variant}</p>
          <div className="flex flex-wrap items-end gap-8">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <span className="text-font-size-xxs-input text-components-typography-ntrl-light-sub-label">{size}</span>
                <div className="flex gap-3">
                  <Checkbox variant={variant} size={size} defaultChecked aria-label="Вкл" />
                  <Checkbox variant={variant} size={size} aria-label="Выкл" />
                  <Checkbox variant={variant} size={size} indeterminate aria-label="Смешанное" />
                  <Checkbox variant={variant} size={size} defaultChecked disabled aria-label="Вкл disabled" />
                  <Checkbox variant={variant} size={size} disabled aria-label="Выкл disabled" />
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
        <Checkbox checked={on} onChange={(e) => setOn(e.target.checked)} aria-label="Уведомления" />
      </div>
    );
  },
};
