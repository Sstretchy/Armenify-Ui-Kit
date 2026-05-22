import type { Meta, StoryObj } from "@storybook/react-vite";
import { SealCheck } from "phosphor-strokes-icons";

import { ArmenifyIcon, armenifyIconSizes } from "..";

const meta = {
  title: "UI/ArmenifyIcon",
  component: ArmenifyIcon,
  tags: ["autodocs"],
  args: {
    icon: SealCheck,
    size: "large",
    strokeWeight: "slim",
  },
  argTypes: {
    icon: { control: false },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ArmenifyIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const ScaleAndStroke: Story = {
  render: () => (
    <div className="text-semantic-text-ntrl-primary flex flex-col gap-8">
      <div>
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary mb-3">slim (regular)</p>
        <div className="flex flex-wrap items-end gap-3">
          {armenifyIconSizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-1">
              <ArmenifyIcon icon={SealCheck} size={size} strokeWeight="slim" />
              <span className="text-font-size-xxxs text-semantic-text-ntrl-secondary">{size}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary mb-3">bold</p>
        <div className="flex flex-wrap items-end gap-3">
          {armenifyIconSizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-1">
              <ArmenifyIcon icon={SealCheck} size={size} strokeWeight="bold" />
              <span className="text-font-size-xxxs text-semantic-text-ntrl-secondary">{size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
