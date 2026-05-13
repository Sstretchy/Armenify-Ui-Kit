import type { Meta, StoryObj } from "@storybook/react-vite";

import { SemanticTokenPreview } from "./semantic-token-preview";

const meta = {
  title: "Foundations/Semantic Tokens",
  component: SemanticTokenPreview,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      disable: true,
    },
  },
} satisfies Meta<typeof SemanticTokenPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => <SemanticTokenPreview />,
};
