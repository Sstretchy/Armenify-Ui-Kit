import type { Meta, StoryObj } from "@storybook/react-vite";

import { ComponentTokenPreview } from "./component-token-preview";

const meta = {
  title: "Foundations/Component Tokens",
  component: ComponentTokenPreview,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      disable: true,
    },
  },
} satisfies Meta<typeof ComponentTokenPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => <ComponentTokenPreview />,
};
