import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputTag } from "../input-tag";
import { textInputRootVariants } from "../text-input";
import { cn } from "@/lib/utils";

const meta = {
  title: "UI/Field/InputTag",
  component: InputTag,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
  args: { children: "tag text", onRemove: () => undefined },
} satisfies Meta<typeof InputTag>;

export default meta;

type Story = StoryObj<typeof meta>;

const colors = ["brand", "brand-inverse", "gradient"] as const;

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
        Теги по макету (узел 182:435) — позже слот внутри инпута; сейчас отдельный компонент.
      </p>
      {(["sm", "lg"] as const).map((size) => (
        <section key={size} className="flex flex-col gap-3">
          <p className="text-font-size-xs font-medium text-semantic-text-ntrl-secondary">size: {size}</p>
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <div key={color} className="flex flex-wrap items-center gap-3">
                <span className="w-28 text-font-size-xs text-semantic-text-ntrl-tertiary">{color}</span>
                <InputTag size={size} color={color} bordered={false} onRemove={() => undefined}>
                  tag text
                </InputTag>
                <InputTag size={size} color={color} bordered onRemove={() => undefined}>
                  tag text
                </InputTag>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const InInputRow: Story = {
  render: function InInputRowRender() {
    const [tags, setTags] = React.useState(["React", "TypeScript", "Figma"]);
    return (
      <div className="p-4">
        <p className="mb-2 text-font-size-xs text-semantic-text-ntrl-secondary">Имитация строки инпута с чипами</p>
        <div
          className={cn(
            textInputRootVariants({ size: "md" }),
            "min-h-10 flex-wrap rounded-border-md border border-semantic-border-ntrl-default px-2 py-1",
          )}
        >
          {tags.map((t) => (
            <InputTag key={t} size="sm" color="brand" onRemove={() => setTags((s) => s.filter((x) => x !== t))}>
              {t}
            </InputTag>
          ))}
          <input
            type="text"
            placeholder="Добавить…"
            className="min-w-[6rem] flex-1 border-0 bg-transparent p-0 text-font-size-base text-components-typography-ntrl-light-inp-text outline-none placeholder:text-components-typography-ntrl-light-placeholder"
            aria-label="Новый тег"
          />
        </div>
      </div>
    );
  },
};
