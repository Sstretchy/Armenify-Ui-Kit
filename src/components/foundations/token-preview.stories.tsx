import type { Meta, StoryObj } from "@storybook/react-vite";

import { TokenPreview } from "./token-preview";

const meta = {
  title: "Foundations/Color Tokens",
  component: TokenPreview,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      disable: true,
    },
  },
} satisfies Meta<typeof TokenPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => <TokenPreview />,
};
