import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Progress, type ProgressVariant } from "../progress";

const meta = {
  title: "UI/Progress",
  component: Progress,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
  args: { value: 0 },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants: ProgressVariant[] = ["primary", "secondary", "success", "error", "warning"];

export const Matrix: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-8 p-4">
      <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
        Прогресс по{" "}
        <a
          className="text-components-typography-brand-light-label underline"
          href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=142-5997"
          rel="noreferrer"
          target="_blank"
        >
          макету 142:5997
        </a>
        : варианты и 0% / 50%.
      </p>
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span className="text-font-size-xxs-input font-medium capitalize text-semantic-text-ntrl-primary">{variant}</span>
          <Progress variant={variant} value={0} aria-label={`${variant} 0`} />
          <Progress variant={variant} value={50} aria-label={`${variant} 50`} />
        </div>
      ))}
    </div>
  ),
};

export const MountAnimation: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-6 p-4">
      <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
        `animateOnMount`: полоска один раз масштабируется от 0 до значения при маунте (двойной `requestAnimationFrame` + `useLayoutEffect`, см. react.dev).
      </p>
      <Progress variant="primary" value={72} animateOnMount aria-label="Primary 72 анимация" />
      <Progress variant="secondary" value={40} animateOnMount mountAnimationDurationMs={900} aria-label="Secondary 40 медленнее" />
    </div>
  ),
};

export const Controlled: Story = {
  render: function Controlled() {
    const [v, setV] = React.useState(25);
    React.useEffect(() => {
      const t = window.setInterval(() => setV((x) => (x >= 100 ? 0 : x + 5)), 1200);
      return () => clearInterval(t);
    }, []);
    return (
      <div className="flex max-w-md flex-col gap-3 p-4">
        <Progress value={v} aria-label="Динамика" />
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">{v}%</p>
      </div>
    );
  },
};
