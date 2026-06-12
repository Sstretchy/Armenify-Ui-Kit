import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { cn } from "@/lib/utils";

import { Switch, type SwitchSize, type SwitchVariant } from "../switch";

const meta = {
  title: "UI/Switch",
  component: Switch,
  tags: ["!autodocs"],
  parameters: {
    layout: "centered",
    controls: { disable: true },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

function noop() {}

function StaticSwitch({
  checked,
  disabled = false,
  size = "md",
  variant = "primary",
  className,
}: {
  checked: boolean;
  disabled?: boolean;
  size?: SwitchSize;
  variant?: SwitchVariant;
  className?: string;
}) {
  return (
    <Switch
      checked={checked}
      disabled={disabled}
      size={size}
      variant={variant}
      onChange={noop}
      tabIndex={-1}
      aria-label={[variant, size, checked ? "Checked" : "Unchecked", disabled ? "disabled" : "default"].join(" ")}
      className={cn("pointer-events-none", className)}
    />
  );
}

const specimenSwitches = [
  { checked: false, variant: "primary", className: "left-5 top-5" },
  { checked: true, variant: "primary", className: "left-20 top-5" },
  { checked: false, disabled: true, variant: "primary", className: "left-[8.75rem] top-5" },
  { checked: true, disabled: true, variant: "primary", className: "left-[12.5rem] top-5" },
  { checked: false, variant: "secondary", className: "left-5 top-[3.625rem]" },
  { checked: true, variant: "secondary", className: "left-20 top-[3.625rem]" },
  { checked: false, disabled: true, variant: "secondary", className: "left-[8.75rem] top-[3.625rem]" },
  { checked: true, disabled: true, variant: "secondary", className: "left-[12.5rem] top-[3.625rem]" },
  { checked: true, disabled: true, size: "lg", variant: "secondary", className: "left-5 top-24" },
  { checked: false, size: "lg", variant: "primary", className: "left-[5.25rem] top-24" },
  { checked: true, size: "lg", variant: "primary", className: "left-[9.25rem] top-24" },
  { checked: false, disabled: true, size: "lg", variant: "primary", className: "left-5 top-[8.5rem]" },
  { checked: true, disabled: true, size: "lg", variant: "primary", className: "left-[5.25rem] top-[8.5rem]" },
  { checked: false, size: "lg", variant: "secondary", className: "left-[9.25rem] top-[8.5rem]" },
  { checked: true, size: "lg", variant: "secondary", className: "left-5 top-44" },
  { checked: false, disabled: true, size: "lg", variant: "secondary", className: "left-[5.25rem] top-44" },
] as const;

export const Specimen: Story = {
  render: () => (
    <div className="relative h-[13.5rem] w-[16.5625rem]">
      {specimenSwitches.map(({ className, ...switchProps }) => (
        <StaticSwitch key={className} className={cn("absolute", className)} {...switchProps} />
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  parameters: {
    layout: "padded",
  },
  render: function InteractiveRender() {
    const [primaryMdChecked, setPrimaryMdChecked] = React.useState(false);
    const [secondaryLgChecked, setSecondaryLgChecked] = React.useState(true);

    return (
      <div className="flex items-center gap-4 p-4">
        <Switch
          checked={primaryMdChecked}
          onChange={(event) => {
            setPrimaryMdChecked(event.target.checked);
          }}
          aria-label="Interactive primary medium switch"
        />
        <Switch
          checked={secondaryLgChecked}
          size="lg"
          variant="secondary"
          onChange={(event) => {
            setSecondaryLgChecked(event.target.checked);
          }}
          aria-label="Interactive secondary large switch"
        />
      </div>
    );
  },
};
