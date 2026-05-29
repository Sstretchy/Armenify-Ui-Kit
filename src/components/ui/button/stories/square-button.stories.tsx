import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SealCheck } from "phosphor-strokes-icons";

import { ArmenifyIcon, squareButtonSizeToArmenifyIconSize } from "../../icon";
import { Typography } from "../../typography";
import { SquareButton } from "../square-button";

const meta = {
  title: "UI/Buttons/SquareButton",
  component: SquareButton,
  tags: ["!autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
} satisfies Meta<typeof SquareButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants = ["primary", "secondary", "tertiary", "outlined"] as const;
const states = ["default", "hover", "active", "focused", "pressed", "disabled", "unchecked"] as const;

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
    unchecked: "",
  },
  secondary: {
    default: "",
    hover: "!bg-components-controls-bg-secondary-hover !shadow-control-shadow-hover",
    active: "!bg-components-controls-bg-secondary-active !shadow-control-shadow-active",
    focused: "",
    pressed: "",
    disabled: "",
    unchecked: "",
  },
  tertiary: {
    default: "",
    hover: "!shadow-control-shadow-hover",
    active: "!shadow-control-shadow-active",
    focused: "",
    pressed: "",
    disabled: "",
    unchecked: "",
  },
  outlined: {
    default: "",
    hover: "!shadow-control-shadow-hover",
    active: "!shadow-control-shadow-active",
    focused: "",
    pressed: "",
    disabled: "",
    unchecked: "",
  },
};

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [pressed, setPressed] = React.useState<Partial<Record<(typeof variants)[number], boolean>>>({});
    const flip = (variant: (typeof variants)[number]) => {
      setPressed((map) => ({ ...map, [variant]: !map[variant] }));
    };

    return (
      <div className="flex flex-col gap-6 p-4">
        <Typography variant="sm" tone="muted">
          Click toggles the `pressed` state. Hold the mouse button to inspect the native `:active` state separately.
        </Typography>
        <div className="flex flex-wrap items-end gap-4">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-1">
              <SquareButton
                variant={variant}
                size="lg"
                type="button"
                pressed={pressed[variant] ? true : undefined}
                onClick={() => {
                  flip(variant);
                }}
              >
                {variant.slice(0, 2)}
              </SquareButton>
              <Typography variant="xs" tone="muted">
                {variant}
              </Typography>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-4 rounded-border-md bg-semantic-bg-ntrl-primary p-4">
          {variants.map((variant) => (
            <SquareButton
              key={`icon-${variant}`}
              aria-label={`${variant} icon action`}
              variant={variant}
              size="lg"
              shape="round"
              type="button"
              pressed={pressed[variant] ? true : undefined}
              onClick={() => {
                flip(variant);
              }}
              icon={
                <ArmenifyIcon icon={SealCheck} size={squareButtonSizeToArmenifyIconSize.lg} strokeWeight="bold" />
              }
            />
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
          States (lg)
        </Typography>
        <div className="grid grid-cols-[6rem_repeat(7,max-content)] items-center gap-x-3 gap-y-3">
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
                <SquareButton
                  key={`${variant}-${state}`}
                  variant={variant}
                  size="lg"
                  disabled={state === "disabled"}
                  unchecked={state === "unchecked"}
                  pressed={state === "pressed" ? true : undefined}
                  data-story-state={state}
                  className={stateClassNames[variant][state]}
                >
                  23
                </SquareButton>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Typography variant="sm" tone="muted">
          Icon only (lg)
        </Typography>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <SquareButton
              key={`icon-only-${variant}`}
              aria-label={`${variant} icon action`}
              variant={variant}
              size="lg"
              icon={
                <ArmenifyIcon icon={SealCheck} size={squareButtonSizeToArmenifyIconSize.lg} strokeWeight="bold" />
              }
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Typography variant="sm" tone="muted">
          Round (primary, lg)
        </Typography>
        <div className="flex flex-wrap items-center gap-3">
          <SquareButton variant="primary" size="lg" shape="round">
            23
          </SquareButton>
          <SquareButton
            aria-label="Primary round icon action"
            variant="primary"
            size="lg"
            shape="round"
            icon={
              <ArmenifyIcon icon={SealCheck} size={squareButtonSizeToArmenifyIconSize.lg} strokeWeight="bold" />
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Typography variant="sm" tone="muted">
          Sizes (primary)
        </Typography>
        <div className="flex flex-wrap items-end gap-3">
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-1">
              <SquareButton variant="primary" size={size}>
                23
              </SquareButton>
              <Typography variant="xs" tone="muted">
                {size}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
