import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MagnifyingGlass, ShootingStar } from "phosphor-strokes-icons";

import { InputFieldIcon } from "../input-field-icon";
import { textInputRootVariants } from "../text-input";
import { cn } from "@/lib/utils";

const meta = {
  title: "UI/Field/InputFieldIcon",
  component: InputFieldIcon,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
  args: { icon: ShootingStar },
} satisfies Meta<typeof InputFieldIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
        Иконка для слота внутри поля (Figma 242:1244): rem-based размеры как у TextInput, цвета ntrl / brand /
        disable, обводка slim / bold.
      </p>
      {(["slim", "bold"] as const).map((weight) => (
        <section key={weight} className="flex flex-col gap-3">
          <p className="text-font-size-xs font-medium text-semantic-text-ntrl-secondary">{weight}</p>
          <div className="flex flex-col gap-2">
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="w-8 text-font-size-xs text-semantic-text-ntrl-tertiary">{size}</span>
                <InputFieldIcon icon={ShootingStar} size={size} color="ntrl" weight={weight} />
                <InputFieldIcon icon={ShootingStar} size={size} color="brand" weight={weight} />
                <InputFieldIcon icon={ShootingStar} size={size} color="disable" weight={weight} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const InsideRow: Story = {
  render: function InsideRowRender() {
    const [size, setSize] = React.useState<"sm" | "md" | "lg">("md");
    return (
      <div className="flex max-w-md flex-col gap-4 p-4">
        <div className="flex gap-2 text-font-size-xs">
          {(["sm", "md", "lg"] as const).map((s) => (
            <button
              key={s}
              type="button"
              className="rounded-border-sm border border-semantic-border-ntrl-default px-2 py-1 capitalize"
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className={cn(textInputRootVariants({ size }), "rounded-border-md border border-semantic-border-ntrl-default px-2")}>
          <InputFieldIcon icon={MagnifyingGlass} size={size} color="ntrl" />
          <input
            type="search"
            placeholder="Поиск"
            className="min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 text-components-typography-ntrl-light-inp-text outline-none placeholder:text-components-typography-ntrl-light-placeholder"
          />
        </div>
      </div>
    );
  },
};
