import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Slider, type SliderVariant } from "../slider";

const meta = {
  title: "UI/Slider",
  component: Slider,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants: SliderVariant[] = ["primary", "secondary"];
const sizes = ["sm", "md"] as const;

export const Matrix: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-10 p-4">
      <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
        Слайдер по{" "}
        <a
          className="text-components-typography-brand-light-label underline"
          href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=115-3786"
          rel="noreferrer"
          target="_blank"
        >
          макету 115:3786
        </a>
        : primary / secondary, sm / md; клавишный фокус на ручке — как у кнопок.
      </p>
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-4">
          <p className="text-font-size-sm font-medium capitalize text-semantic-text-ntrl-primary">{variant}</p>
          {sizes.map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <span className="text-font-size-xxs-input text-components-typography-ntrl-light-sub-label">{size}</span>
              <div className="flex flex-col gap-3">
                <Slider variant={variant} size={size} defaultValue={0} aria-label={`${variant} ${size} 0`} />
                <Slider variant={variant} size={size} defaultValue={40} aria-label={`${variant} ${size} 40`} />
                <Slider variant={variant} size={size} defaultValue={100} aria-label={`${variant} ${size} 100`} />
                <Slider variant={variant} size={size} defaultValue={55} disabled aria-label={`${variant} ${size} disabled`} />
                <Slider variant={variant} size={size} defaultValue={0} storyFocused aria-label={`${variant} ${size} focus demo`} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: function Controlled() {
    const [v, setV] = React.useState(35);
    return (
      <div className="flex max-w-md flex-col gap-4 p-4">
        <Slider value={v} onValueChange={setV} aria-label="Громкость" />
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">{v}</p>
      </div>
    );
  },
};
