import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SealCheck } from "phosphor-strokes-icons";

import { ArmenifyIcon, ghostButtonSizeToArmenifyIconSize } from "../../icon";
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
        <div className="flex flex-wrap items-end gap-4 rounded-border-md bg-semantic-bg-ntrl-primary p-4">
          {(["primary", "secondary"] as const).map((v) => (
            <div key={v} className="flex flex-col items-center gap-1">
              <GhostButton
                variant={v}
                size="lg"
                type="button"
                pressed={pressed[v] ? true : undefined}
                onClick={() => {
                  flip(v);
                }}
                icon={
                  <ArmenifyIcon icon={SealCheck} size={ghostButtonSizeToArmenifyIconSize.lg} strokeWeight="bold" />
                }
              />
              <span className="text-font-size-xs text-semantic-text-ntrl-secondary">{v}</span>
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
              onClick={() => {
                flip("tertiary");
              }}
              icon={
                <ArmenifyIcon icon={SealCheck} size={ghostButtonSizeToArmenifyIconSize.lg} strokeWeight="bold" />
              }
            />
            <span className="text-font-size-xs text-components-controls-text-secondary">tertiary</span>
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
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">Primary / secondary (светлый фон)</p>
        <div className="grid grid-cols-[6rem_repeat(7,max-content)] items-center gap-x-3 gap-y-3 rounded-border-md bg-semantic-bg-ntrl-primary p-4">
          <div />
          {states.map((state) => (
            <span
              key={state}
              className="text-center text-font-size-sm capitalize text-semantic-text-ntrl-secondary"
            >
              {state}
            </span>
          ))}
          {(["primary", "secondary"] as const).map((variant) => (
            <React.Fragment key={variant}>
              <span className="text-font-size-sm capitalize text-semantic-text-ntrl-secondary">{variant}</span>
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
                  icon={
                    <ArmenifyIcon icon={SealCheck} size={ghostButtonSizeToArmenifyIconSize.lg} strokeWeight="bold" />
                  }
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">Tertiary (тёмный фон)</p>
        <div className="grid grid-cols-[6rem_repeat(7,max-content)] items-center gap-x-3 gap-y-3 rounded-border-md bg-components-controls-bg-secondary-default p-4">
          <div />
          {states.map((state) => (
            <span
              key={state}
              className="text-center text-font-size-sm capitalize text-semantic-text-ntrl-secondary text-components-controls-text-secondary"
            >
              {state}
            </span>
          ))}
          <span className="text-font-size-sm capitalize text-components-controls-text-secondary">tertiary</span>
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
              icon={
                <ArmenifyIcon icon={SealCheck} size={ghostButtonSizeToArmenifyIconSize.lg} strokeWeight="bold" />
              }
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">Размеры (primary / secondary, светлый фон)</p>
        <div className="flex flex-col gap-4 rounded-border-md bg-semantic-bg-ntrl-primary p-4">
          {(["primary", "secondary"] as const).map((variant) => (
            <div key={variant} className="flex flex-wrap items-end gap-3">
              {(["info", "xxxs", "xxs", "xs", "sm", "md", "lg"] as const).map((size) => (
                <div key={`${variant}-${size}`} className="flex flex-col items-center gap-1">
                  <GhostButton
                    variant={variant}
                    size={size}
                    icon={
                      <ArmenifyIcon icon={SealCheck} size={ghostButtonSizeToArmenifyIconSize[size]} strokeWeight="bold" />
                    }
                  />
                  <span className="text-font-size-xs text-semantic-text-ntrl-secondary">{variant} {size}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">Размеры (tertiary, на тёмном)</p>
        <div className="flex flex-wrap items-end gap-3 rounded-border-md bg-components-controls-bg-secondary-default p-4">
          {(["info", "xxxs", "xxs", "xs", "sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-1">
              <GhostButton
                variant="tertiary"
                size={size}
                icon={
                  <ArmenifyIcon icon={SealCheck} size={ghostButtonSizeToArmenifyIconSize[size]} strokeWeight="bold" />
                }
              />
              <span className="text-font-size-xs text-components-controls-text-secondary">{size}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">Только текст (primary)</p>
        <div className="rounded-border-md bg-semantic-bg-ntrl-primary p-4">
          <GhostButton variant="primary" size="lg">
            23
          </GhostButton>
        </div>
      </div>
    </div>
  ),
};
