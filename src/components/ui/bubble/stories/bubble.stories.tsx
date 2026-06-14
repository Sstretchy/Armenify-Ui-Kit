import type { Meta, StoryObj } from "@storybook/react-vite";

import { Bubble } from "../bubble";

const meta = {
  title: "UI/Bubble",
  component: Bubble,
  tags: ["!autodocs"],
  parameters: {
    layout: "centered",
    controls: { disable: true },
  },
} satisfies Meta<typeof Bubble>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Specimen: Story = {
  render: () => (
    <div className="flex w-[43.625rem] flex-col gap-6 rounded-[0.3125rem] bg-primitive-colors-neutral-800 p-5">
      <Bubble className="w-full" speaker="bot" meta="1/10">
        В камине в шесть утра, фотография твоя Горят воспоминания
      </Bubble>
      <Bubble className="w-full" speaker="user">
        В камине в шесть утра, фотография твоя Горят воспоминания
      </Bubble>
      <Bubble className="w-full" speaker="user" state="success">
        Пододеяльник
      </Bubble>
      <Bubble className="w-full" speaker="user" state="error">
        Пододеяльник
      </Bubble>
    </div>
  ),
};
