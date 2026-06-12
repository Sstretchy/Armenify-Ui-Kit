import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Typography } from "../../typography";
import { TextInput, type TextInputColor, type TextInputSize, type TextInputTone } from "../text-input";

const meta = {
  title: "UI/Field/TextInput",
  component: TextInput,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const sizes: TextInputSize[] = ["sm", "md", "lg"];

type StoryTone = TextInputTone | "disabled";

type TextInputSpecimen = {
  color: TextInputColor;
  size: TextInputSize;
  tone: StoryTone;
  placeholder: boolean;
};

const specimenWidthClassName = "w-50";

const specimenOrder: TextInputSpecimen[] = [
  ...buildSpecimens("ntrl", "default"),
  ...buildSpecimens("ntrl", "disabled"),
  ...buildSpecimens("ntrl", "success"),
  ...buildSpecimens("ntrl", "error"),
  ...buildSpecimens("brand", "default"),
  ...buildSpecimens("brand", "disabled"),
  ...buildSpecimens("brand", "success"),
  ...buildSpecimens("brand", "error"),
];

function buildSpecimens(color: TextInputColor, tone: StoryTone): TextInputSpecimen[] {
  return sizes.flatMap((size) => [
    { color, size, tone, placeholder: true },
    { color, size, tone, placeholder: false },
  ]);
}

function specimenText(placeholder: boolean) {
  return {
    prefix: "Https//",
    text: "Text",
    defaultValue: placeholder ? "" : "Text",
  };
}

function specimenLabel({ color, size, tone, placeholder }: TextInputSpecimen) {
  return `${color} / ${tone} / ${size} / ${placeholder ? "placeholder" : "value"}`;
}

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <Typography variant="sm" tone="muted" className="max-w-2xl">
        Aligned to Figma node{" "}
        <a
          className="text-components-typography-brand-light-label underline"
          href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=733-9111"
          rel="noreferrer"
          target="_blank"
        >
          733:9111
        </a>
        : `Select Text` states only, without the input-field chrome.
      </Typography>

      <div className="rounded-border-md border border-dashed border-semantic-border-brand-default bg-semantic-bg-ntrl-primary p-4">
        <div className="flex flex-wrap items-start gap-3">
          {specimenOrder.map(({ color, size, tone, placeholder }) => {
            const key = `${color}-${tone}-${size}-${placeholder ? "placeholder" : "value"}`;
            const { prefix, text, defaultValue } = specimenText(placeholder);
            const label = specimenLabel({ color, size, tone, placeholder });

            return (
              <div key={key} className={`${specimenWidthClassName} flex flex-col gap-1.5`}>
                <Typography variant="xs" tone="muted">
                  {label}
                </Typography>
                <TextInput
                  size={size}
                  color={color}
                  tone={tone === "disabled" ? "default" : tone}
                  pretext
                  prefix={prefix}
                  placeholder={text}
                  defaultValue={defaultValue}
                  disabled={tone === "disabled"}
                  className="w-full [&_input]:min-w-0 [&_input]:flex-1"
                  aria-label={key}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [v, setV] = React.useState("");
    return (
      <div className="flex max-w-md flex-col gap-3 p-4">
        <TextInput
          pretext
          prefix="https://"
          placeholder="example.com"
          value={v}
          onChange={(e) => setV(e.target.value)}
          aria-label="URL"
        />
        <Typography variant="sm" tone="muted">
          Value: {v || "..."}
        </Typography>
      </div>
    );
  },
};

export const WithoutPretext: Story = {
  render: () => (
    <div className="max-w-xs p-4">
      <TextInput placeholder="Text" defaultValue="" aria-label="Text input without prefix" />
    </div>
  ),
};
