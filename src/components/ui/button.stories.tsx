import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SealCheck } from "@phosphor-icons/react";

import { Button } from "./button";
import { ArmenifyIcon, buttonSizeToArmenifyIconSize } from "./icon";

const meta = {
  title: "UI/Button",
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

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [pressed, setPressed] = React.useState<Partial<Record<(typeof variants)[number], boolean>>>({});
    const flip = (v: (typeof variants)[number]) => {
      setPressed((m) => ({ ...m, [v]: !m[v] }));
    };
    return (
      <div className="flex flex-col gap-4 p-4">
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
          Клик — вкл/выкл pressed. Зажми кнопку — увидишь :active.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((v) => (
            <Button
              key={v}
              variant={v}
              size="md"
              type="button"
              pressed={pressed[v] ? true : undefined}
              onClick={() => {
                flip(v);
              }}
              iconLeft={iconFor()}
            >
              {v}
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
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">States (md)</p>
        <div className="grid grid-cols-[6rem_repeat(7,max-content)] items-center gap-x-3 gap-y-3">
          <div />
          {states.map((state) => (
            <span
              key={state}
              className="text-font-size-sm text-semantic-text-ntrl-secondary text-center capitalize"
            >
              {state}
            </span>
          ))}
          {variants.map((variant) => (
            <React.Fragment key={variant}>
              <span className="text-font-size-sm text-semantic-text-ntrl-secondary capitalize">
                {variant}
              </span>
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
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
          zeroCorner + unchecked (по одной на каждый вариант)
        </p>
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
