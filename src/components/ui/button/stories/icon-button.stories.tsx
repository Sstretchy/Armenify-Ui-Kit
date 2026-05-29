import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SealCheck } from "phosphor-strokes-icons";

import { ArmenifyIcon, squareButtonSizeToArmenifyIconSize } from "../../icon";
import { Typography } from "../../typography";
import { IconButton } from "../icon-button";

const meta = {
  title: "UI/Buttons/IconButton",
  component: IconButton,
  tags: ["!autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = ["primary", "secondary", "tertiary", "outlined"] as const;
const states = ["default", "hover", "active", "focused", "pressed", "disabled"] as const;
const sizes = ["xs", "sm", "md", "lg"] as const;

const stateClassNames: Record<
  (typeof variants)[number],
  Record<(typeof states)[number], string>
> = {
  primary: {
    default: "",
    hover: "!shadow-control-shadow-hover",
    active: "!shadow-control-shadow-active",
    focused: "",
    pressed: "",
    disabled: "",
  },
  secondary: {
    default: "",
    hover: "!bg-components-controls-bg-secondary-hover !shadow-control-shadow-hover",
    active: "!bg-components-controls-bg-secondary-active !shadow-control-shadow-active",
    focused: "",
    pressed: "",
    disabled: "",
  },
  tertiary: {
    default: "",
    hover: "!shadow-control-shadow-hover",
    active: "!shadow-control-shadow-active",
    focused: "",
    pressed: "",
    disabled: "",
  },
  outlined: {
    default: "",
    hover: "!shadow-control-shadow-hover",
    active: "!shadow-control-shadow-active",
    focused: "",
    pressed: "",
    disabled: "",
  },
};

function iconFor(size: (typeof sizes)[number]) {
  return <ArmenifyIcon icon={SealCheck} size={squareButtonSizeToArmenifyIconSize[size]} strokeWeight="bold" />;
}

export const Interactive: Story = {
  args: {
    "aria-label": "Primary action",
    icon: iconFor("lg"),
  },
  render: function InteractiveRender() {
    const [pressed, setPressed] = React.useState<Partial<Record<(typeof variants)[number], boolean>>>({});

    return (
      <div className="flex flex-col gap-4 p-4">
        <Typography variant="sm" tone="muted">
          Icon-only buttons require an accessible name. Use <code className="font-mono">aria-label</code> when there is
          no visible text.
        </Typography>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <IconButton
              key={variant}
              aria-label={`${variant} action`}
              variant={variant}
              size="lg"
              shape="round"
              icon={iconFor("lg")}
              pressed={pressed[variant] ? true : undefined}
              onClick={() => {
                setPressed((map) => ({ ...map, [variant]: !map[variant] }));
              }}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const States: Story = {
  args: {
    "aria-label": "Primary action",
    icon: iconFor("lg"),
  },
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-4">
        <Typography variant="sm" tone="muted">
          Square icon states (lg)
        </Typography>
        <div className="grid grid-cols-[6rem_repeat(6,max-content)] items-center gap-x-3 gap-y-3">
          <div />
          {states.map((state) => (
            <Typography key={state} variant="sm" tone="muted" align="center" className="capitalize">
              {state}
            </Typography>
          ))}
          {variants.map((variant) => (
            <React.Fragment key={variant}>
              <Typography variant="sm" tone="muted" className="capitalize">
                {variant}
              </Typography>
              {states.map((state) => (
                <IconButton
                  key={`${variant}-${state}`}
                  aria-label={`${variant} ${state}`}
                  variant={variant}
                  size="lg"
                  icon={iconFor("lg")}
                  disabled={state === "disabled"}
                  pressed={state === "pressed" ? true : undefined}
                  data-story-state={state}
                  className={stateClassNames[variant][state]}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Typography variant="sm" tone="muted">
          Round icon states (lg)
        </Typography>
        <div className="grid grid-cols-[6rem_repeat(6,max-content)] items-center gap-x-3 gap-y-3">
          <div />
          {states.map((state) => (
            <Typography key={`round-${state}`} variant="sm" tone="muted" align="center" className="capitalize">
              {state}
            </Typography>
          ))}
          {variants.map((variant) => (
            <React.Fragment key={`round-${variant}`}>
              <Typography variant="sm" tone="muted" className="capitalize">
                {variant}
              </Typography>
              {states.map((state) => (
                <IconButton
                  key={`round-${variant}-${state}`}
                  aria-label={`${variant} round ${state}`}
                  variant={variant}
                  size="lg"
                  shape="round"
                  icon={iconFor("lg")}
                  disabled={state === "disabled"}
                  pressed={state === "pressed" ? true : undefined}
                  data-story-state={state}
                  className={stateClassNames[variant][state]}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    "aria-label": "Primary action",
    icon: iconFor("lg"),
  },
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <Typography variant="sm" tone="muted">
        Sizes align with the square and round icon-button sets in Figma.
      </Typography>
      <div className="flex flex-wrap items-end gap-4">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <IconButton aria-label={`Primary ${size}`} variant="primary" size={size} icon={iconFor(size)} />
            <Typography variant="xs" tone="muted">
              {size}
            </Typography>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-4">
        {sizes.map((size) => (
          <div key={`round-${size}`} className="flex flex-col items-center gap-2">
            <IconButton
              aria-label={`Primary round ${size}`}
              variant="primary"
              size={size}
              shape="round"
              icon={iconFor(size)}
            />
            <Typography variant="xs" tone="muted">
              round {size}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  ),
};
