import type { Meta, StoryObj } from "@storybook/react-vite";

import { RainbowCard, type RainbowCardSize, type RainbowCardType } from "../rainbow-card";

const meta = {
  title: "UI/RainbowCard",
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const title = "Умное повторение";
const description = "Задай свой темп и ограничения — мы построим учебный план вокруг них.";

export const Default: Story = {
  render: () => (
    <div className="flex justify-center bg-semantic-bg-ntrl-secondary-inverse p-8">
      <RainbowCard.Root type="rainbow1" title={title} description={description} />
    </div>
  ),
};

export const Matrix: Story = {
  render: () => {
    const types: RainbowCardType[] = ["rainbow1", "rainbow2", "rainbow3"];
    const sizes: RainbowCardSize[] = ["sm", "md", "lg", "x-lg"];
    return (
      <div className="flex flex-col gap-10 p-4">
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
          Макет:{" "}
          <a
            className="text-components-typography-brand-light-label underline"
            href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=297-12878"
            rel="noreferrer"
            target="_blank"
          >
            297:12878
          </a>
          . Три градиента (blend), размеры sm–x-lg, тень on/off.
        </p>
        <div className="flex flex-wrap justify-center gap-6 bg-semantic-bg-ntrl-secondary-inverse p-8">
          {types.flatMap((type) =>
            sizes.flatMap((size) =>
              [false, true].map((shadow) => (
                <RainbowCard.Root
                  key={`${type}-${size}-${shadow}`}
                  type={type}
                  size={size}
                  shadow={shadow}
                  title={title}
                  description={description}
                />
              )),
            ),
          )}
        </div>
      </div>
    );
  },
};

export const Compound: Story = {
  render: () => (
    <div className="flex justify-center bg-semantic-bg-ntrl-secondary-inverse p-8">
      <RainbowCard.Root type="rainbow2" size="md" shadow={false}>
        <RainbowCard.Title>Произвольный слот</RainbowCard.Title>
        <RainbowCard.Description>Через Title + Description внутри Root.</RainbowCard.Description>
      </RainbowCard.Root>
    </div>
  ),
};
