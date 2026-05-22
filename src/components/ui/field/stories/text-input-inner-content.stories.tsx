import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextInputInnerContent, type TextInputInnerLayout } from "../text-input-inner-content";

const layouts: TextInputInnerLayout[] = [
  "default",
  "iconLeft",
  "iconRight",
  "iconBoth",
  "currency",
  "clear",
  "comboBox",
  "select",
  "search",
  "multiselect",
];

const meta = {
  title: "UI/Field/TextInputInnerContent",
  component: TextInputInnerContent,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
  args: { layout: "default" as const, color: "ntrl" as const, disabled: false, size: "sm" as const },
} satisfies Meta<typeof TextInputInnerContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-4">
      <p className="max-w-xl text-font-size-sm text-semantic-text-ntrl-secondary">
        Содержимое строки поля по{" "}
        <a
          className="text-components-typography-brand-light-label underline"
          href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=145-6199"
          rel="noreferrer"
          target="_blank"
        >
          макету 145:6199
        </a>
        : все типы × ntrl/brand × active/disabled.
      </p>
      {(["ntrl", "brand"] as const).map((color) => (
        <section key={color} className="flex flex-col gap-4">
          <h3 className="text-font-size-xs font-medium uppercase tracking-wide text-semantic-text-ntrl-secondary">
            color: {color}
          </h3>
          {([false, true] as const).map((disabled) => (
            <div key={String(disabled)} className="flex flex-col gap-2">
              <p className="text-font-size-xs text-semantic-text-ntrl-tertiary">{disabled ? "disabled" : "default"}</p>
              <div className="flex flex-col gap-2 rounded-border-md border border-semantic-border-ntrl-default bg-semantic-bg-ntrl-primary p-3">
                {layouts.map((layout) => (
                  <div
                    key={layout}
                    className="rounded-border-sm border border-dashed border-semantic-border-ntrl-default px-2 py-1.5"
                  >
                    <div className="mb-1 text-font-size-xxs text-semantic-text-ntrl-tertiary">{layout}</div>
                    <TextInputInnerContent layout={layout} color={color} disabled={disabled} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
};
