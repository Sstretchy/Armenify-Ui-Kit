import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextInput, type TextInputColor, type TextInputSize, type TextInputTone } from "../text-input";

const meta = {
  title: "UI/Field/TextInput",
  component: TextInput,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const sizes: TextInputSize[] = ["sm", "md", "lg"];
const colors: TextInputColor[] = ["ntrl", "brand"];
const tones: TextInputTone[] = ["default", "success", "error"];

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
        Соответствует узлу Figma «Select text»: префикс <code className="font-mono">pretext</code>, цвет
        поля <code className="font-mono">color</code>, <code className="font-mono">tone</code>: пустое — placeholder
        ntrl/brand; при вводе success/error — цвет статуса у значения (рамка — в TextInputField).
      </p>
      {colors.map((color) => (
        <div key={color} className="flex flex-col gap-3">
          <p className="text-font-size-sm font-medium capitalize text-semantic-text-ntrl-primary">
            color={color}
          </p>
          <div className="flex flex-col gap-2">
            {sizes.map((size) => (
              <div key={`${color}-${size}`} className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <span className="w-8 text-font-size-xs text-semantic-text-ntrl-secondary">{size}</span>
                {tones.map((tone) => (
                  <label key={`${color}-${size}-${tone}`} className="flex min-w-[10rem] flex-col gap-1">
                    <span className="text-font-size-xs capitalize text-semantic-text-ntrl-tertiary">{tone}</span>
                    <TextInput
                      size={size}
                      color={color}
                      tone={tone}
                      pretext
                      placeholder="Text"
                      defaultValue=""
                      aria-label={`${color} ${size} ${tone}`}
                    />
                  </label>
                ))}
                <label className="flex min-w-[10rem] flex-col gap-1">
                  <span className="text-font-size-xs text-semantic-text-ntrl-tertiary">disabled</span>
                  <TextInput
                    size={size}
                    color={color}
                    tone="default"
                    pretext
                    placeholder="Text"
                    defaultValue=""
                    disabled
                    aria-label={`${color} ${size} disabled`}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [v, setV] = React.useState("");
    return (
      <div className="flex max-w-md flex-col gap-3 p-4">
        <TextInput
          pretext
          prefix="https://"
          placeholder="example.com"
          value={v}
          onChange={(e) => setV(e.target.value)}
          aria-label="URL"
        />
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">Значение: {v || "∅"}</p>
      </div>
    );
  },
};

export const WithoutPretext: Story = {
  render: () => (
    <div className="max-w-xs p-4">
      <TextInput placeholder="Без префикса" defaultValue="" aria-label="Поле" />
    </div>
  ),
};
