import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  InputHelperText,
  type InputHelperTextColor,
  type InputHelperTextSize,
  type InputHelperTextTone,
} from "../input-helper-text";
import { TextInput } from "../text-input";

const meta = {
  title: "UI/Field/InputHelperText",
  component: InputHelperText,
  tags: ["!autodocs"],
  parameters: { layout: "centered", controls: { disable: true } },
} satisfies Meta<typeof InputHelperText>;

export default meta;

type Story = StoryObj<typeof meta>;

type FigmaSpecimen = {
  color: InputHelperTextColor;
  size: InputHelperTextSize;
  tone: InputHelperTextTone;
  showIcon?: boolean;
};

const sizesAscending: InputHelperTextSize[] = ["sm", "md", "lg"];

const figmaRows: FigmaSpecimen[][] = [
  sizesAscending.map((size) => ({ size, color: "ntrl", tone: "default" })),
  sizesAscending.map((size) => ({ size, color: "ntrl-inverse", tone: "default" })),
  sizesAscending.map((size) => ({ size, color: "brand", tone: "default" })),
  sizesAscending.map((size) => ({ size, color: "brand-inverse", tone: "default" })),
  sizesAscending.map((size) => ({ size, color: "ntrl", tone: "error" })),
  sizesAscending.map((size) => ({ size, color: "ntrl", tone: "success" })),
  sizesAscending.map((size) => ({ size, color: "ntrl", tone: "disabled" })),
  sizesAscending.map((size) => ({ size, color: "brand", tone: "error" })),
  sizesAscending.map((size) => ({ size, color: "brand", tone: "success" })),
  sizesAscending.map((size) => ({ size, color: "brand", tone: "disabled" })),
];

const figmaCompareBorderColor = "#8b5cf6";
const comparisonFrameStyle = { width: "17.3125rem", borderColor: figmaCompareBorderColor } as const;

function FigmaRow({ specimens }: { specimens: FigmaSpecimen[] }) {
  return (
    <div className="flex w-full items-start justify-between">
      {specimens.map((specimen, index) => (
        <InputHelperText
          key={`${specimen.color}-${specimen.tone}-${specimen.size}-${index}`}
          className="shrink-0"
          color={specimen.color}
          size={specimen.size}
          tone={specimen.tone}
          showIcon={specimen.showIcon}
        >
          Help text
        </InputHelperText>
      ))}
    </div>
  );
}

function ComparisonFrame() {
  return (
    <div className="flex justify-center">
      <div className="rounded border border-dashed bg-white p-4" style={comparisonFrameStyle}>
        <div className="flex flex-col gap-2">
          {figmaRows.map((row, index) => (
            <FigmaRow key={index} specimens={row} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const Comparison: Story = {
  render: () => <ComparisonFrame />,
};

export const WithTextInput: Story = {
  render: function WithTextInputRender() {
    const [tone, setTone] = React.useState<Exclude<InputHelperTextTone, "disabled">>("error");
    const [value, setValue] = React.useState("");

    return (
      <div className="flex max-w-md flex-col gap-2 p-4">
        <div className="flex gap-2 text-font-size-xs">
          {(["default", "success", "error"] as const).map((nextTone) => (
            <button
              key={nextTone}
              type="button"
              className="rounded-border-sm border border-semantic-border-ntrl-default px-2 py-1 capitalize"
              onClick={() => setTone(nextTone)}
            >
              {nextTone}
            </button>
          ))}
        </div>
        <TextInput
          pretext
          prefix="https://"
          placeholder="домен"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          tone={tone}
          aria-invalid={tone === "error"}
          aria-describedby="demo-helper"
        />
        <InputHelperText id="demo-helper" tone={tone} color="ntrl">
          {tone === "error" ? "Введите корректный адрес" : tone === "success" ? "Сохранено" : "Подсказка под полем"}
        </InputHelperText>
      </div>
    );
  },
};
