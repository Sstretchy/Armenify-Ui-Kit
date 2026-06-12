import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Typography } from "../../typography";
import { Slider, type SliderSize, type SliderVariant } from "../slider";

const meta = {
  title: "UI/Slider",
  component: Slider,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

const PRIMARY_ON_VALUE = (165 / 231) * 100;
const MID_ON_VALUE = (100 / 231) * 100;
const SPECIMEN_STEP = 0.01;
const SPECIMEN_FRAME_CLASS_NAME = "flex w-[16.9375rem] flex-col gap-5 p-5";
const SPECIMEN_SLIDER_CLASS_NAME = "min-h-0 py-0";

type SpecimenRow = {
  ariaLabel: string;
  disabled?: boolean;
  size: SliderSize;
  value: number;
  variant: SliderVariant;
};

const specimenRows: readonly SpecimenRow[] = [
  { ariaLabel: "Primary off small", variant: "primary", size: "sm", value: 0 },
  { ariaLabel: "Primary on small", variant: "primary", size: "sm", value: PRIMARY_ON_VALUE },
  { ariaLabel: "Primary active small", variant: "primary", size: "sm", value: PRIMARY_ON_VALUE },
  { ariaLabel: "Primary off small disabled", variant: "primary", size: "sm", value: 0, disabled: true },
  { ariaLabel: "Primary on small disabled", variant: "primary", size: "sm", value: MID_ON_VALUE, disabled: true },
  { ariaLabel: "Secondary off small", variant: "secondary", size: "sm", value: 0 },
  { ariaLabel: "Secondary on small", variant: "secondary", size: "sm", value: MID_ON_VALUE },
  { ariaLabel: "Secondary off small disabled", variant: "secondary", size: "sm", value: 0, disabled: true },
  { ariaLabel: "Secondary on small disabled", variant: "secondary", size: "sm", value: MID_ON_VALUE, disabled: true },
  { ariaLabel: "Primary off medium", variant: "primary", size: "md", value: 0 },
  { ariaLabel: "Primary on medium", variant: "primary", size: "md", value: PRIMARY_ON_VALUE },
  { ariaLabel: "Primary off medium disabled", variant: "primary", size: "md", value: 0, disabled: true },
  { ariaLabel: "Primary on medium disabled", variant: "primary", size: "md", value: MID_ON_VALUE, disabled: true },
  { ariaLabel: "Secondary off medium", variant: "secondary", size: "md", value: 0 },
  { ariaLabel: "Secondary on medium", variant: "secondary", size: "md", value: MID_ON_VALUE },
  { ariaLabel: "Secondary off medium disabled", variant: "secondary", size: "md", value: 0, disabled: true },
  { ariaLabel: "Secondary on medium disabled", variant: "secondary", size: "md", value: MID_ON_VALUE, disabled: true },
];

const focusRows: readonly SpecimenRow[] = [
  { ariaLabel: "Primary focus small", variant: "primary", size: "sm", value: PRIMARY_ON_VALUE },
  { ariaLabel: "Secondary focus small", variant: "secondary", size: "sm", value: MID_ON_VALUE },
  { ariaLabel: "Primary focus medium", variant: "primary", size: "md", value: PRIMARY_ON_VALUE },
  { ariaLabel: "Secondary focus medium", variant: "secondary", size: "md", value: MID_ON_VALUE },
];

export const Matrix: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <div className={SPECIMEN_FRAME_CLASS_NAME}>
      {specimenRows.map((row) => (
        <Slider
          key={row.ariaLabel}
          aria-label={row.ariaLabel}
          className={SPECIMEN_SLIDER_CLASS_NAME}
          defaultValue={row.value}
          disabled={row.disabled}
          size={row.size}
          step={SPECIMEN_STEP}
          variant={row.variant}
        />
      ))}
    </div>
  ),
};

export const FocusVisible: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <div className={SPECIMEN_FRAME_CLASS_NAME}>
      {focusRows.map((row) => (
        <Slider
          key={row.ariaLabel}
          aria-label={row.ariaLabel}
          className={SPECIMEN_SLIDER_CLASS_NAME}
          defaultValue={row.value}
          size={row.size}
          step={SPECIMEN_STEP}
          storyFocused
          variant={row.variant}
        />
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: function Controlled() {
    const [value, setValue] = React.useState(35);

    return (
      <div className="flex w-[14.4375rem] flex-col gap-4 p-4">
        <Slider aria-label="Volume" size="md" value={value} onValueChange={setValue} />
        <Typography variant="sm" tone="muted">
          {value}
        </Typography>
      </div>
    );
  },
};
