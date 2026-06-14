import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  RainbowCard,
  type RainbowCardShadowVariant,
  type RainbowCardSize,
  type RainbowCardType,
} from "../rainbow-card";

const meta = {
  title: "UI/RainbowCard",
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const title = "Умное повторение";
const description = "Задай свой темп и ограничения — мы построим учебный план вокруг них.";

const types: RainbowCardType[] = ["rainbow1", "rainbow2", "rainbow3"];
const sizes: RainbowCardSize[] = ["x-lg", "lg", "md", "sm"];
const shadowModes: ReadonlyArray<{
  shadow: boolean;
  shadowVariant: RainbowCardShadowVariant;
}> = [
  { shadow: true, shadowVariant: "default" },
  { shadow: true, shadowVariant: "glow" },
  { shadow: false, shadowVariant: "default" },
];

function SlotPreview() {
  return (
    <>
      <RainbowCard.Title>{title}</RainbowCard.Title>
      <RainbowCard.Description>{description}</RainbowCard.Description>
    </>
  );
}

export const FigmaReference: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="min-h-screen overflow-x-auto bg-[#757575] p-6">
      <div className="grid w-fit grid-cols-6 gap-5">
        {sizes.flatMap((size) =>
          shadowModes.flatMap(({ shadow, shadowVariant }) =>
            types.map((type) => (
              <RainbowCard.Root
                key={`${size}-${shadow}-${shadowVariant}-${type}`}
                type={type}
                size={size}
                shadow={shadow}
                shadowVariant={shadowVariant}
              >
                <SlotPreview />
              </RainbowCard.Root>
            )),
          ),
        )}
      </div>
    </div>
  ),
};

export const Default: Story = {
  render: () => (
    <div className="flex justify-center bg-semantic-bg-ntrl-secondary-inverse p-8">
      <RainbowCard.Root type="rainbow1" size="x-lg">
        <SlotPreview />
      </RainbowCard.Root>
    </div>
  ),
};

export const GlowShadow: Story = {
  render: () => (
    <div className="flex justify-center bg-semantic-bg-ntrl-secondary-inverse p-8">
      <RainbowCard.Root type="rainbow1" size="x-lg" shadowVariant="glow">
        <SlotPreview />
      </RainbowCard.Root>
    </div>
  ),
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
