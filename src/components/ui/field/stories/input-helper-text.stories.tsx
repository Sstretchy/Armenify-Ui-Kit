import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputHelperText } from "../input-helper-text";
import { TextInput } from "../text-input";

const meta = {
  title: "UI/Field/InputHelperText",
  component: InputHelperText,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta<typeof InputHelperText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-4">
      <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
        Узел Figma «Input help text» (под полем): иконка + текст, тона default / success / error / disabled.
      </p>
      <section className="flex flex-col gap-4">
        <p className="text-font-size-xs font-medium text-semantic-text-ntrl-secondary">ntrl / brand · светлый фон</p>
        <div className="flex flex-col gap-2">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="w-8 text-font-size-xs text-semantic-text-ntrl-tertiary">{size}</span>
              <InputHelperText size={size} color="ntrl" tone="default">
                Help text
              </InputHelperText>
              <InputHelperText size={size} color="brand" tone="default">
                Help text
              </InputHelperText>
              <InputHelperText size={size} color="ntrl" tone="success">
                Help text
              </InputHelperText>
              <InputHelperText size={size} color="brand" tone="success">
                Help text
              </InputHelperText>
              <InputHelperText size={size} color="ntrl" tone="error">
                Help text
              </InputHelperText>
              <InputHelperText size={size} color="brand" tone="error">
                Help text
              </InputHelperText>
              <InputHelperText size={size} color="ntrl" tone="disabled">
                Help text
              </InputHelperText>
              <InputHelperText size={size} color="brand" tone="disabled">
                Help text
              </InputHelperText>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4 rounded-border-lg bg-semantic-bg-brand-primary-inverse p-4">
        <p className="text-font-size-xs font-medium text-components-typography-ntrl-dark-content-light">
          ntrl-inverse / brand-inverse
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <InputHelperText color="ntrl-inverse" tone="default">
            Help text
          </InputHelperText>
          <InputHelperText color="brand-inverse" tone="default">
            Help text
          </InputHelperText>
          <InputHelperText color="ntrl-inverse" tone="error">
            Error
          </InputHelperText>
          <InputHelperText color="brand-inverse" tone="success">
            OK
          </InputHelperText>
        </div>
      </section>
      <section>
        <InputHelperText showIcon={false} tone="error">
          Только текст, без иконки
        </InputHelperText>
      </section>
    </div>
  ),
};

export const WithTextInput: Story = {
  render: function WithTextInputRender() {
    const [tone, setTone] = React.useState<"default" | "success" | "error">("error");
    const [v, setV] = React.useState("");
    return (
      <div className="flex max-w-md flex-col gap-2 p-4">
        <div className="flex gap-2 text-font-size-xs">
          {(["default", "success", "error"] as const).map((t) => (
            <button
              key={t}
              type="button"
              className="rounded-border-sm border border-semantic-border-ntrl-default px-2 py-1 capitalize"
              onClick={() => setTone(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <TextInput
          pretext
          prefix="https://"
          placeholder="домен"
          value={v}
          onChange={(e) => setV(e.target.value)}
          tone={tone}
          aria-invalid={tone === "error"}
          aria-describedby="demo-helper"
        />
        <InputHelperText id="demo-helper" tone={tone === "default" ? "default" : tone} color="ntrl">
          {tone === "error" ? "Введите корректный адрес" : tone === "success" ? "Сохранено" : "Подсказка под полем"}
        </InputHelperText>
      </div>
    );
  },
};
