import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ToggleGroup, type ToggleGroupSize } from "../toggle-group";

const meta = {
  title: "UI/ToggleGroup",
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("login");
    return (
      <div className="mx-auto flex max-w-xl flex-col gap-4 p-4">
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
          Макет:{" "}
          <a
            className="underline"
            href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=403-14953"
            rel="noreferrer"
            target="_blank"
          >
            403:14953
          </a>
          . Невыбранные: <code className="font-mono">tertiary</code> + <code className="font-mono">unchecked</code>. Все сегменты
          доступны по Tab; стрелки / Home / End — от фокуса. <code className="font-mono">role=&quot;group&quot;</code>,{" "}
          <code className="font-mono">aria-pressed</code> на пунктах. Controlled: значение не сбрасывается в пустую строку.
        </p>
        <ToggleGroup.Root value={value} onValueChange={setValue} size="md">
          <ToggleGroup.Item value="login">Вход</ToggleGroup.Item>
          <ToggleGroup.Item value="register">Регистрация</ToggleGroup.Item>
          <ToggleGroup.Item value="other">Другое</ToggleGroup.Item>
        </ToggleGroup.Root>
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">value: {value}</p>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const sizes: ToggleGroupSize[] = ["xs", "sm", "md", "lg", "x-lg"];
    return (
      <div className="flex flex-col gap-8 bg-semantic-bg-ntrl-secondary-inverse p-6">
        {sizes.map((size) => (
          <ToggleGroup.Root key={size} defaultValue="a" size={size}>
            <ToggleGroup.Item value="a">Сегмент A</ToggleGroup.Item>
            <ToggleGroup.Item value="b">Сегмент B</ToggleGroup.Item>
            <ToggleGroup.Item value="c">Сегмент C</ToggleGroup.Item>
          </ToggleGroup.Root>
        ))}
      </div>
    );
  },
};
