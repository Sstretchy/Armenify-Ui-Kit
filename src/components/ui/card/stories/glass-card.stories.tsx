import type { Meta, StoryObj } from "@storybook/react-vite";

import { GlassCardRoot, type GlassCardSize } from "../glass-card";

const meta = {
  title: "UI/GlassCard",
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function SlotPreview() {
  return (
    <div className="flex w-full flex-col gap-[var(--space-space-4)] text-center">
      <p className="font-medium text-font-size-xl leading-[var(--font-font-height-xl)] text-components-typography-brand-dark-content">
        Слот контента
      </p>
      <p className="text-font-size-sm leading-[var(--font-font-height-sm)] text-components-typography-brand-light-content-light">
        Макет:{" "}
        <a
          className="underline"
          href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=416-13734"
          rel="noreferrer"
          target="_blank"
        >
          416:13734
        </a>
        . Оболочка: стекло + бордер, три ширины sm / md / lg.
      </p>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <div className="flex justify-center bg-semantic-bg-ntrl-secondary-inverse p-8">
      <GlassCardRoot size="lg">
        <SlotPreview />
      </GlassCardRoot>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => {
    const sizes: GlassCardSize[] = ["sm", "md", "lg"];
    return (
      <div className="flex flex-col items-center gap-8 bg-semantic-bg-ntrl-secondary-inverse p-8">
        {sizes.map((size) => (
          <GlassCardRoot key={size} size={size}>
            <SlotPreview />
          </GlassCardRoot>
        ))}
      </div>
    );
  },
};
