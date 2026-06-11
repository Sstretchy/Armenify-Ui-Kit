import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { MenuItem, type MenuItemColor, type MenuItemSize, type MenuItemVisualState } from "../menu-item";

const meta = {
  title: "UI/Field/MenuItem",
  component: MenuItem,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
  args: { children: "Armenify.am", size: "md" as const, color: "ntrl" as const },
} satisfies Meta<typeof MenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

const visualStates: MenuItemVisualState[] = ["default", "hover", "disabled", "selected"];
const menuItemColumnClassName = "min-w-56 max-w-64";

function MatrixRow({
  size,
  color,
  label,
}: {
  size: MenuItemSize;
  color: MenuItemColor;
  label: string;
}) {
  return (
    <div className="flex flex-wrap items-stretch gap-2">
      <span className="flex w-14 shrink-0 items-center text-font-size-xs text-semantic-text-ntrl-tertiary">{label}</span>
      {visualStates.map((visualState) => (
        <MenuItem
          key={visualState}
          size={size}
          color={color}
          visualState={visualState}
          selected={visualState === "selected"}
          disabled={visualState === "disabled"}
          prefixText="Https://"
          className={menuItemColumnClassName}
        >
          Armenify.am
        </MenuItem>
      ))}
    </div>
  );
}

export const Matrix: Story = {
  render: () => (
    <div className="pointer-events-none flex flex-col gap-10 p-4">
      <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
        Узел Figma «Menu item»: размеры sm / md / lg, ntrl / brand, состояния default / hover / disabled / selected (справа Check при
        selected).
      </p>
      <div className="flex flex-wrap gap-2 text-font-size-xs text-semantic-text-ntrl-tertiary">
        <span className="w-14 shrink-0" aria-hidden />
        {visualStates.map((s) => (
          <span key={s} className={`${menuItemColumnClassName} capitalize`}>
            {s}
          </span>
        ))}
      </div>
      <section className="flex flex-col gap-6">
        <p className="text-font-size-xs font-medium text-semantic-text-ntrl-secondary">neutral</p>
        {(["sm", "md", "lg"] as const).map((size) => (
          <MatrixRow key={size} size={size} color="ntrl" label={size} />
        ))}
      </section>
      <section className="flex flex-col gap-6">
        <p className="text-font-size-xs font-medium text-semantic-text-ntrl-secondary">brand</p>
        {(["sm", "md", "lg"] as const).map((size) => (
          <MatrixRow key={size} size={size} color="brand" label={size} />
        ))}
      </section>
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [selected, setSelected] = React.useState<string | null>("b");
    return (
      <div className="flex max-w-md flex-col gap-1 p-4">
        <p className="mb-2 text-font-size-sm text-semantic-text-ntrl-secondary">Клик переключает selected; hover через CSS.</p>
        {(["a", "b", "c"] as const).map((id) => (
          <MenuItem
            key={id}
            size="md"
            color="ntrl"
            selected={selected === id}
            prefixText="Https://"
            onClick={() => setSelected(id)}
          >
            Option {id.toUpperCase()}
          </MenuItem>
        ))}
      </div>
    );
  },
};
