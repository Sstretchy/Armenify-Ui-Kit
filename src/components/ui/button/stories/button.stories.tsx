import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SealCheck } from "phosphor-strokes-icons";

import { ArmenifyIcon, buttonSizeToArmenifyIconSize } from "../../icon";
import { Typography } from "../../typography";
import { Button } from "../button";

const meta = {
  title: "UI/Buttons/Button",
  component: Button,
  tags: ["!autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = ["primary", "secondary", "tertiary", "outlined"] as const;
const states = ["default", "hover", "active", "focused", "unchecked", "pressed", "disabled"] as const;

const stateClassNames: Record<
  (typeof variants)[number],
  Record<(typeof states)[number], string>
> = {
  primary: {
    default: "",
    hover: "!shadow-control-shadow-hover",
    active: "!shadow-control-shadow-active",
    focused: "",
    unchecked: "",
    pressed: "",
    disabled: "",
  },
  secondary: {
    default: "",
    hover: "!bg-components-controls-bg-secondary-hover !shadow-control-shadow-hover",
    active: "!bg-components-controls-bg-secondary-active !shadow-control-shadow-active",
    focused: "",
    unchecked: "",
    pressed: "",
    disabled: "",
  },
  tertiary: {
    default: "",
    hover: "!shadow-control-shadow-hover",
    active: "!shadow-control-shadow-active",
    focused: "",
    unchecked: "",
    pressed: "",
    disabled: "",
  },
  outlined: {
    default: "",
    hover: "!shadow-control-shadow-hover",
    active: "!shadow-control-shadow-active",
    focused: "",
    unchecked: "",
    pressed: "",
    disabled: "",
  },
};

function iconFor() {
  return <ArmenifyIcon icon={SealCheck} size={buttonSizeToArmenifyIconSize.md} strokeWeight="bold" />;
}

export const AsAnchor: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <Typography variant="sm" tone="muted">
        Passing <code className="font-mono">href</code> renders the component as <code className="font-mono">&lt;a&gt;</code>{" "}
        with the same visual styles. In Next.js, wrap it with <code className="font-mono">Link</code> only when you need
        route-prefetch behavior.
      </Typography>
      <div className="flex flex-wrap items-center gap-3">
        <Button href="https://example.com" variant="primary" rel="noopener noreferrer" target="_blank">
          External
        </Button>
        <Button href="/tokens" variant="outlined">
          Internal path
        </Button>
        <Button href="#" variant="secondary" disabled>
          Disabled link
        </Button>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [pressed, setPressed] = React.useState<Partial<Record<(typeof variants)[number], boolean>>>({});
    const flip = (variant: (typeof variants)[number]) => {
      setPressed((map) => ({ ...map, [variant]: !map[variant] }));
    };

    return (
      <div className="flex flex-col gap-4 p-4">
        <Typography variant="sm" tone="muted">
          Click toggles the `pressed` state. Hold the mouse button to inspect the native `:active` state separately.
        </Typography>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              size="md"
              type="button"
              pressed={pressed[variant] ? true : undefined}
              onClick={() => {
                flip(variant);
              }}
              iconLeft={iconFor()}
            >
              {variant}
            </Button>
          ))}
        </div>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-4">
        <Typography variant="sm" tone="muted">
          States (md)
        </Typography>
        <div className="grid grid-cols-[6rem_repeat(7,max-content)] items-center gap-x-3 gap-y-3">
          <div />
          {states.map((state) => (
            <Typography
              key={state}
              variant="sm"
              tone="muted"
              align="center"
              className="capitalize"
            >
              {state}
            </Typography>
          ))}
          {variants.map((variant) => (
            <React.Fragment key={variant}>
              <Typography variant="sm" tone="muted" className="capitalize">
                {variant}
              </Typography>
              {states.map((state) => (
                <Button
                  key={`${variant}-${state}`}
                  variant={variant}
                  size="md"
                  disabled={state === "disabled"}
                  pressed={state === "pressed" ? true : undefined}
                  data-story-state={state}
                  className={stateClassNames[variant][state]}
                  iconLeft={iconFor()}
                  iconRight={iconFor()}
                >
                  Button
                </Button>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Typography variant="sm" tone="muted">
          `zeroCorner` + `unchecked` examples for each variant
        </Typography>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button
              key={`zc-${variant}`}
              variant={variant}
              size="md"
              zeroCorner
              unchecked
              iconLeft={iconFor()}
              iconRight={iconFor()}
            >
              Button
            </Button>
          ))}
        </div>
      </div>
    </div>
  ),
};
