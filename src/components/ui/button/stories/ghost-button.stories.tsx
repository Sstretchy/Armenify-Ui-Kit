import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SealCheck } from "phosphor-strokes-icons";

import { ArmenifyIcon, ghostButtonSizeToArmenifyIconSize } from "../../icon";
import { Typography } from "../../typography";
import { GhostButton } from "../ghost-button";

const meta = {
  title: "UI/Buttons/GhostButton",
  component: GhostButton,
  tags: ["!autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
} satisfies Meta<typeof GhostButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = ["primary", "secondary", "tertiary"] as const;
const states = ["default", "hover", "active", "focused", "pressed", "disabled", "unchecked"] as const;

const stateClassNames: Record<
  (typeof variants)[number],
  Record<(typeof states)[number], string>
> = {
  primary: {
    default: "",
    hover: "!border-0 !bg-transparent !text-components-controls-text-ghost-primary-hover !shadow-none",
    active: "!border-0 !bg-transparent !text-components-controls-text-ghost-primary-active !shadow-none",
    focused: "",
    pressed: "",
    disabled: "",
    unchecked: "",
  },
  secondary: {
    default: "",
    hover: "!border-0 !bg-transparent !text-components-controls-text-ghost-secondary-hover !shadow-none",
    active: "!border-0 !bg-transparent !text-components-controls-text-ghost-secondary-active !shadow-none",
    focused: "",
    pressed: "",
    disabled: "",
    unchecked: "",
  },
  tertiary: {
    default: "",
    hover: "!text-components-controls-text-ghost-tertiary-hover !shadow-none",
    active: "!text-components-controls-text-ghost-tertiary-active !shadow-none",
    focused: "",
    pressed: "",
    disabled: "",
    unchecked: "",
  },
};

function GhostButtonIcon({ size }: { size: keyof typeof ghostButtonSizeToArmenifyIconSize }) {
  return <ArmenifyIcon icon={SealCheck} size={ghostButtonSizeToArmenifyIconSize[size]} strokeWeight="bold" />;
}

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [pressed, setPressed] = React.useState<Partial<Record<(typeof variants)[number], boolean>>>({});
    const flip = (v: (typeof variants)[number]) => {
      setPressed((m) => ({ ...m, [v]: !m[v] }));
    };

    return (
      <div className="flex flex-col gap-6 p-4">
        <Typography variant="sm" tone="muted">
          Click toggles the `pressed` state. Hold the mouse button to inspect the native `:active` state separately.
        </Typography>
        <div className="flex flex-wrap items-end gap-4 rounded-border-md bg-semantic-bg-ntrl-primary p-4">
          {(["primary", "secondary"] as const).map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-1">
              <GhostButton
                variant={variant}
                size="lg"
                type="button"
                pressed={pressed[variant] ? true : undefined}
                onClick={() => flip(variant)}
                icon={<GhostButtonIcon size="lg" />}
              />
              <Typography variant="xs" tone="muted">
                {variant}
              </Typography>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-4 rounded-border-md bg-components-controls-bg-secondary-default p-4">
          <div className="flex flex-col items-center gap-1">
            <GhostButton
              variant="tertiary"
              size="lg"
              type="button"
              pressed={pressed.tertiary ? true : undefined}
              onClick={() => flip("tertiary")}
              icon={<GhostButtonIcon size="lg" />}
            />
            <Typography variant="xs" className="text-components-controls-text-secondary">
              tertiary
            </Typography>
          </div>
        </div>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-10 p-4">
      <div className="flex flex-col gap-4">
        <Typography variant="sm" tone="muted">
          Primary and secondary on a light surface
        </Typography>
        <div className="grid grid-cols-[6rem_repeat(7,max-content)] items-center gap-x-3 gap-y-3 rounded-border-md bg-semantic-bg-ntrl-primary p-4">
          <div />
          {states.map((state) => (
            <Typography key={state} variant="sm" tone="muted" align="center" className="capitalize">
              {state}
            </Typography>
          ))}
          {(["primary", "secondary"] as const).map((variant) => (
            <React.Fragment key={variant}>
              <Typography variant="sm" tone="muted" className="capitalize">
                {variant}
              </Typography>
              {states.map((state) => (
                <GhostButton
                  key={`${variant}-${state}`}
                  variant={variant}
                  size="lg"
                  disabled={state === "disabled"}
                  unchecked={state === "unchecked"}
                  pressed={state === "pressed" ? true : undefined}
                  data-story-state={state}
                  className={stateClassNames[variant][state]}
                  icon={<GhostButtonIcon size="lg" />}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Typography variant="sm" className="text-components-controls-text-secondary">
          Tertiary on a dark surface
        </Typography>
        <div className="grid grid-cols-[6rem_repeat(7,max-content)] items-center gap-x-3 gap-y-3 rounded-border-md bg-components-controls-bg-secondary-default p-4">
          <div />
          {states.map((state) => (
            <Typography
              key={state}
              variant="sm"
              align="center"
              className="capitalize text-components-controls-text-secondary"
            >
              {state}
            </Typography>
          ))}
          <Typography variant="sm" className="capitalize text-components-controls-text-secondary">
            tertiary
          </Typography>
          {states.map((state) => (
            <GhostButton
              key={`tertiary-${state}`}
              variant="tertiary"
              size="lg"
              disabled={state === "disabled"}
              unchecked={state === "unchecked"}
              pressed={state === "pressed" ? true : undefined}
              data-story-state={state}
              className={stateClassNames.tertiary[state]}
              icon={<GhostButtonIcon size="lg" />}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Typography variant="sm" tone="muted">
          Sizes for primary and secondary on a light surface
        </Typography>
        <div className="flex flex-col gap-4 rounded-border-md bg-semantic-bg-ntrl-primary p-4">
          {(["primary", "secondary"] as const).map((variant) => (
            <div key={variant} className="flex flex-wrap items-end gap-3">
              {(["info", "xxxs", "xxs", "xs", "sm", "md", "lg"] as const).map((size) => (
                <div key={`${variant}-${size}`} className="flex flex-col items-center gap-1">
                  <GhostButton variant={variant} size={size} icon={<GhostButtonIcon size={size} />} />
                  <Typography variant="xs" tone="muted">
                    {variant} {size}
                  </Typography>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Typography variant="sm" className="text-components-controls-text-secondary">
          Sizes for tertiary on a dark surface
        </Typography>
        <div className="flex flex-wrap items-end gap-3 rounded-border-md bg-components-controls-bg-secondary-default p-4">
          {(["info", "xxxs", "xxs", "xs", "sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-1">
              <GhostButton variant="tertiary" size={size} icon={<GhostButtonIcon size={size} />} />
              <Typography variant="xs" className="text-components-controls-text-secondary">
                {size}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Typography variant="sm" tone="muted">
          Text-only ghost button
        </Typography>
        <div className="rounded-border-md bg-semantic-bg-ntrl-primary p-4">
          <GhostButton variant="primary" size="lg">
            23
          </GhostButton>
        </div>
      </div>
    </div>
  ),
};
