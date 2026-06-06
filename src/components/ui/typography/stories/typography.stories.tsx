import type { Meta, StoryObj } from "@storybook/react-vite";

import { Typography, typographyVariantsList } from "..";

const meta = {
  title: "UI/Typography",
  component: Typography,
  tags: ["autodocs"],
  args: {
    children: "Almost before we knew it, we had left the ground.",
    variant: "base",
    weight: "regular",
    font: "sans",
    align: "start",
    tone: "default",
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const RobotoScale: Story = {
  render: () => (
    <div className="text-semantic-text-ntrl-primary flex max-w-3xl flex-col gap-1">
      {typographyVariantsList.map((v) => {
        const robotoEmphasisWeight = "medium" as const;
        return (
          <div key={v} className="flex gap-8 py-1">
            <Typography variant="xs" tone="muted" className="w-14 shrink-0 text-right font-sans">
              {v}
            </Typography>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <Typography variant={v} weight="regular" font="sans">
                Almost before we knew it, we had left the ground.
              </Typography>
              <Typography variant={v} weight={robotoEmphasisWeight} font="sans">
                Almost before we knew it, we had left the ground.
              </Typography>
            </div>
          </div>
        );
      })}
    </div>
  ),
};

export const BainsleyArmenian: Story = {
  render: () => (
    <div className="text-semantic-text-ntrl-primary flex max-w-3xl flex-col gap-1">
      {typographyVariantsList.map((v) => (
        <div key={v} className="flex gap-8 py-1">
          <Typography variant="xs" tone="muted" className="w-14 shrink-0 text-right font-serif">
            {v}
          </Typography>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <Typography variant={v} weight="regular" font="display">
              Անհամբեր սպասում եմ մեր հաջորդ հանդիպմանը
            </Typography>
            <Typography variant={v} weight="medium" font="display">
              Անհամբեր սպասում եմ մեր հաջորդ հանդիպմանը
            </Typography>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const SemanticHtml: Story = {
  render: () => (
    <div className="text-semantic-text-ntrl-primary flex flex-col gap-4">
      <Typography as="h1" variant="4xl" weight="medium" font="sans">
        Page title
      </Typography>
      <Typography as="h2" variant="2xl" weight="medium" font="sans">
        Section
      </Typography>
      <Typography as="p" variant="base" weight="regular" font="sans">
        Body copy uses the base step from tokens: font-size and line-height match Figma text styles.
      </Typography>
    </div>
  ),
};
