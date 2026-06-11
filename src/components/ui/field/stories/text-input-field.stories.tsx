import type { Meta, StoryObj } from "@storybook/react-vite";
import { ShootingStar } from "phosphor-strokes-icons";

import { cn } from "@/lib/utils";

import { ArmenifyIcon } from "../../icon";
import { TextInputInnerContent } from "../text-input-inner-content";
import { textInputFieldTextClassName, textInputRootVariants, type TextInputColor, type TextInputSize } from "../text-input";
import { TextInputChrome, TextInputField, type TextInputFieldVisualState } from "../text-input-field";

const meta = {
  title: "UI/Field/TextInputField",
  component: TextInputField,
  tags: ["!autodocs"],
  parameters: { layout: "centered", controls: { disable: true } },
} satisfies Meta<typeof TextInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

type TextInputFieldSpecimen = {
  color: TextInputColor;
  size: TextInputSize;
  visualState: TextInputFieldVisualState;
};

const colors: TextInputColor[] = ["ntrl", "brand"];
const visualStates: TextInputFieldVisualState[] = ["default", "hover", "focus", "error", "success", "disabled"];
const sizes: TextInputSize[] = ["sm", "md", "lg"];

const specimenOrder: TextInputFieldSpecimen[] = colors.flatMap((color) =>
  visualStates.flatMap((visualState) =>
    sizes.map((size) => ({
      color,
      size,
      visualState,
    })),
  ),
);

const figmaCompareBorderColor = "#8b5cf6";
const comparisonFrameStyle = { width: "19.875rem", borderColor: figmaCompareBorderColor } as const;

const textSizeClassName: Record<TextInputSize, string> = {
  sm: "text-font-size-sm leading-[var(--font-font-height-sm)]",
  md: "text-font-size-base leading-[var(--font-font-height-base)]",
  lg: "text-font-size-lg leading-[var(--font-font-height-lg)]",
};

function NeutralDisabledWithIcon({ size }: { size: TextInputSize }) {
  return (
    <TextInputChrome size={size} color="ntrl" tone="default" disabled visualState="disabled">
      <div className={cn(textInputRootVariants({ size }), "w-full min-w-0 items-center gap-1")}>
        <ArmenifyIcon icon={ShootingStar} size="x-small" strokeWeight="slim" className="text-semantic-text-ntrl-disabled" aria-hidden />
        <span className={cn("truncate", textSizeClassName[size], textInputFieldTextClassName("ntrl", "disabled", false))}>There is no one who</span>
      </div>
    </TextInputChrome>
  );
}

function TextInputFieldSpecimenRow({ color, size, visualState }: TextInputFieldSpecimen) {
  if (color === "ntrl" && visualState === "disabled") {
    return <NeutralDisabledWithIcon size={size} />;
  }

  return (
    <TextInputChrome size={size} color={color} tone="default" disabled={visualState === "disabled"} visualState={visualState}>
      <TextInputInnerContent
        layout="default"
        color={color}
        disabled={visualState === "disabled"}
        size={size}
        pretext={false}
        valueText="There is no one who"
      />
    </TextInputChrome>
  );
}

function ComparisonFrame() {
  return (
    <div className="rounded border border-dashed bg-white p-1.5" style={comparisonFrameStyle}>
      <div className="flex flex-col gap-1">
        {specimenOrder.map(({ color, size, visualState }) => {
          const key = `${color}-${visualState}-${size}`;
          return <TextInputFieldSpecimenRow key={key} color={color} size={size} visualState={visualState} />;
        })}
      </div>
    </div>
  );
}

export const Comparison: Story = {
  render: () => <ComparisonFrame />,
};
