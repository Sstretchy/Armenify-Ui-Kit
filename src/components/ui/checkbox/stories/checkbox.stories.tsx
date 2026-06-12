import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Typography } from "../../typography";
import { Checkbox, type CheckboxSize, type CheckboxStoryState, type CheckboxVariant } from "../checkbox";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["!autodocs"],
  parameters: {
    layout: "centered",
    controls: { disable: true },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const specimenStates = ["default", "hover", "active", "focused", "disabled"] as const;
type SpecimenState = (typeof specimenStates)[number];

function noop() {}

function resolveStoryState(state: SpecimenState): CheckboxStoryState | undefined {
  return state === "default" || state === "disabled" ? undefined : state;
}

function StaticCheckbox({
  checked,
  size,
  state,
  variant,
}: {
  checked: boolean;
  size: CheckboxSize;
  state: SpecimenState;
  variant: CheckboxVariant;
}) {
  return (
    <Checkbox
      checked={checked}
      disabled={state === "disabled"}
      size={size}
      variant={variant}
      storyState={resolveStoryState(state)}
      onChange={noop}
      tabIndex={-1}
      aria-label={`${variant} ${checked ? "checked" : "unchecked"} ${size} ${state}`}
      className="pointer-events-none"
    />
  );
}

const specimenRows = [
  { variant: "primary" as const, size: "xs" as const },
  { variant: "secondary" as const, size: "xs" as const },
  { variant: "tertiary" as const, size: "xs" as const },
  { variant: "primary" as const, size: "sm" as const },
  { variant: "secondary" as const, size: "sm" as const },
  { variant: "tertiary" as const, size: "sm" as const },
  { variant: "primary" as const, size: "md" as const },
  { variant: "secondary" as const, size: "md" as const },
  { variant: "tertiary" as const, size: "md" as const },
] satisfies ReadonlyArray<{ variant: CheckboxVariant; size: CheckboxSize }>;

function CheckboxSpecimen({ checked }: { checked: boolean }) {
  return (
    <div className="relative flex h-[28.125rem] w-[15.3125rem] flex-col gap-5 p-5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[0.3125rem] before:border-[0.0625rem] before:border-dashed before:border-[#9747FF] before:content-['']">
      {specimenRows.map(({ variant, size }) => (
        <div key={`${variant}-${size}`} className="flex items-center gap-5">
          {specimenStates.map((state) => (
            <StaticCheckbox
              key={`${checked ? "checked" : "unchecked"}-${variant}-${size}-${state}`}
              checked={checked}
              size={size}
              state={state}
              variant={variant}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function BehaviorRow({
  checkbox,
  title,
  note,
}: {
  checkbox: React.ReactNode;
  title: string;
  note: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="pt-[0.0625rem]">{checkbox}</div>
      <div className="flex flex-col gap-1">
        <Typography variant="sm" weight="medium">
          {title}
        </Typography>
        <Typography variant="xs" tone="muted">
          {note}
        </Typography>
      </div>
    </div>
  );
}

export const FigmaSpecimen: Story = {
  render: () => <CheckboxSpecimen checked />,
};

export const Behavior: Story = {
  parameters: {
    layout: "padded",
  },
  render: function BehaviorRender() {
    const [controlled, setControlled] = React.useState(true);
    const [mixedChecked, setMixedChecked] = React.useState(false);
    const [mixed, setMixed] = React.useState(true);

    return (
      <div className="flex max-w-xl flex-col gap-4 p-4">
        <BehaviorRow
          title="Controlled"
          note="Uses `checked` plus `onChange`, while preserving the native checkbox input for keyboard and screen readers."
          checkbox={
            <Checkbox
              aria-label="Controlled checkbox"
              checked={controlled}
              onChange={(e) => {
                setControlled(e.target.checked);
              }}
            />
          }
        />

        <BehaviorRow
          title="Uncontrolled"
          note="Uses `defaultChecked`; the component tracks the native state and keeps the visual box in sync."
          checkbox={<Checkbox defaultChecked aria-label="Uncontrolled checkbox" />}
        />

        <BehaviorRow
          title="Indeterminate"
          note="The mixed state is set through the native `indeterminate` property and clears after the first toggle."
          checkbox={
            <Checkbox
              aria-label="Indeterminate checkbox"
              checked={mixedChecked}
              indeterminate={mixed}
              onChange={(e) => {
                setMixed(false);
                setMixedChecked(e.target.checked);
              }}
            />
          }
        />

        <BehaviorRow
          title="Disabled"
          note="Disabled checkboxes stay non-interactive and do not expose hover or focus visuals."
          checkbox={<Checkbox checked disabled onChange={noop} aria-label="Disabled checkbox" />}
        />
      </div>
    );
  },
};
