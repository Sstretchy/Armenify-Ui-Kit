import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SealCheck } from "@phosphor-icons/react";

import { ArmenifyIcon, squareButtonSizeToArmenifyIconSize } from "./icon";
import { SquareButton } from "./square-button";

const meta = {
  title: "UI/SquareButton",
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
    const flip = (v: (typeof variants)[number]) => {
      setPressed((m) => ({ ...m, [v]: !m[v] }));
    };
    return (
      <div className="flex flex-col gap-6 p-4">
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
          Клик — вкл/выкл pressed. Зажми кнопку — увидишь :active.
        </p>
        <div className="flex flex-wrap items-end gap-4">
          {variants.map((v) => (
            <div key={v} className="flex flex-col items-center gap-1">
              <SquareButton
                variant={v}
                size="lg"
                type="button"
                pressed={pressed[v] ? true : undefined}
                onClick={() => {
                  flip(v);
                }}
              >
                {v.slice(0, 2)}
              </SquareButton>
              <span className="text-font-size-xs text-semantic-text-ntrl-secondary">{v}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-4 rounded-border-md bg-semantic-bg-ntrl-primary p-4">
          {variants.map((v) => (
            <SquareButton
              key={`icon-${v}`}
              variant={v}
              size="lg"
              shape="round"
              type="button"
              pressed={pressed[v] ? true : undefined}
              onClick={() => {
                flip(v);
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
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">States (lg)</p>
        <div className="grid grid-cols-[6rem_repeat(7,max-content)] items-center gap-x-3 gap-y-3">
          <div />
          {states.map((state) => (
            <span
              key={state}
              className="text-center text-font-size-sm capitalize text-semantic-text-ntrl-secondary"
            >
              {state}
            </span>
          ))}
          {variants.map((variant) => (
            <React.Fragment key={variant}>
              <span className="text-font-size-sm capitalize text-semantic-text-ntrl-secondary">{variant}</span>
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
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">Icon only (primary, lg)</p>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <SquareButton
              key={`icon-${variant}`}
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
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">Round (primary, lg)</p>
        <div className="flex flex-wrap items-center gap-3">
          <SquareButton variant="primary" size="lg" shape="round">
            23
          </SquareButton>
          <SquareButton
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
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">Sizes (primary)</p>
        <div className="flex flex-wrap items-end gap-3">
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-1">
              <SquareButton variant="primary" size={size}>
                23
              </SquareButton>
              <span className="text-font-size-xs text-semantic-text-ntrl-secondary">{size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
