import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputLabel } from "../input-label";
import { TextInput } from "../text-input";

const meta = {
  title: "UI/Field/InputLabel",
  component: InputLabel,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta<typeof InputLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-4">
      <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
        Узел Figma «Input title»: над полем (или сбоку в ряду), размеры sm / md / lg / x-lg, тона default / success / error и
        disabled.
      </p>
      <section className="flex flex-col gap-4">
        <p className="text-font-size-xs font-medium text-semantic-text-ntrl-secondary">ntrl / brand · светлый фон</p>
        <div className="flex flex-col gap-2">
          {(["sm", "md", "lg", "x-lg"] as const).map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="w-10 text-font-size-xs text-semantic-text-ntrl-tertiary">{size}</span>
              <InputLabel size={size} color="ntrl" tone="default">
                Label
              </InputLabel>
              <InputLabel size={size} color="brand" tone="default">
                Label
              </InputLabel>
              <InputLabel size={size} color="ntrl" tone="success">
                Label
              </InputLabel>
              <InputLabel size={size} color="brand" tone="success">
                Label
              </InputLabel>
              <InputLabel size={size} color="ntrl" tone="error">
                Label
              </InputLabel>
              <InputLabel size={size} color="brand" tone="error">
                Label
              </InputLabel>
              <InputLabel size={size} color="ntrl" disabled>
                Label
              </InputLabel>
              <InputLabel size={size} color="brand" disabled>
                Label
              </InputLabel>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4 rounded-border-lg bg-semantic-bg-brand-primary-inverse p-4">
        <p className="text-font-size-xs font-medium text-components-typography-ntrl-dark-content-light">
          ntrl-inverse / brand-inverse
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <InputLabel color="ntrl-inverse" tone="default">
            Label
          </InputLabel>
          <InputLabel color="brand-inverse" tone="default">
            Label
          </InputLabel>
          <InputLabel color="ntrl-inverse" tone="error">
            Error
          </InputLabel>
          <InputLabel color="brand-inverse" tone="success">
            OK
          </InputLabel>
        </div>
      </section>
      <section>
        <p className="mb-2 text-font-size-xs text-semantic-text-ntrl-secondary">Подпись сбоку (flex row)</p>
        <div className="flex max-w-md items-center gap-3">
          <InputLabel className="shrink-0">Сайт</InputLabel>
          <div className="min-h-10 flex-1 rounded-border-md border border-semantic-border-ntrl-default bg-semantic-bg-ntrl-primary" />
        </div>
      </section>
    </div>
  ),
};

export const WithTextInput: Story = {
  render: function WithTextInputRender() {
    const id = React.useId();
    const [tone, setTone] = React.useState<"default" | "success" | "error">("default");
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
        <InputLabel htmlFor={id} color="ntrl" tone={tone} disabled={false}>
          Название поля
        </InputLabel>
        <TextInput
          id={id}
          placeholder="Ввод"
          value={v}
          onChange={(e) => setV(e.target.value)}
          tone={tone}
          aria-invalid={tone === "error"}
        />
      </div>
    );
  },
};
