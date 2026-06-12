import type { Meta, StoryObj } from "@storybook/react-vite";
import { X } from "phosphor-strokes-icons";

import { cn } from "@/lib/utils";

import { ArmenifyIcon } from "../../icon";
import { TextInputInnerContent, type TextInputInnerLayout } from "../text-input-inner-content";
import type { TextInputColor } from "../text-input";

const meta = {
  title: "UI/Field/TextInputInnerContent",
  component: TextInputInnerContent,
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen", controls: { disable: true } },
  args: { layout: "default" as const, color: "ntrl" as const, disabled: false, size: "sm" as const },
} satisfies Meta<typeof TextInputInnerContent>;

export default meta;

type Story = StoryObj<typeof meta>;

type TextInputInnerContentSpecimen = {
  color: TextInputColor;
  disabled: boolean;
  layout: TextInputInnerLayout;
};

const layoutOrder: TextInputInnerLayout[] = [
  "default",
  "iconLeft",
  "iconRight",
  "iconBoth",
  "currency",
  "clear",
  "search",
  "comboBox",
  "select",
  "multiselect",
];

const specimenOrder: TextInputInnerContentSpecimen[] = ([
  { color: "ntrl", disabled: false },
  { color: "ntrl", disabled: true },
  { color: "brand", disabled: false },
  { color: "brand", disabled: true },
] as const).flatMap(({ color, disabled }) =>
  layoutOrder.map((layout) => ({
    color,
    disabled,
    layout,
  })),
);

const figmaCompareBorderColor = "#8b5cf6";
const comparisonFrameStyle = { width: "21.6875rem", borderColor: figmaCompareBorderColor } as const;

function FigmaDemoTags({ disabled }: { disabled: boolean }) {
  const chipClassName = cn(
    "inline-flex h-4 shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-border-xxs px-1.5",
    disabled
      ? "bg-semantic-bg-brand-disabled text-semantic-text-brand-disabled"
      : "bg-components-tags-bg-default text-components-tags-text-default",
  );

  return (
    <>
      {["a", "b", "c", "d"].map((key) => (
        <span key={key} className={chipClassName}>
          <span className="whitespace-nowrap text-font-size-xxs-input leading-[var(--font-font-height-xxs-input)]">tag text</span>
          <ArmenifyIcon icon={X} size="xxxx-small" strokeWeight="bold" className="text-current" aria-hidden />
        </span>
      ))}
    </>
  );
}

function TextInputInnerContentSpecimenRow({ color, disabled, layout }: TextInputInnerContentSpecimen) {
  const hidePrefix = layout === "default" && color === "ntrl" && !disabled;

  return (
    <div className="w-full">
      <TextInputInnerContent
        layout={layout}
        color={color}
        disabled={disabled}
        size="sm"
        valueText="Text"
        className="w-full"
        tags={layout === "multiselect" ? <FigmaDemoTags disabled={disabled} /> : undefined}
        {...(hidePrefix ? { pretext: false } : {})}
      />
    </div>
  );
}

function ComparisonFrame() {
  return (
    <div className="rounded border border-dashed bg-white px-4 py-2" style={comparisonFrameStyle}>
      <div className="flex flex-col gap-6">
        {[0, 10, 20, 30].map((startIndex) => (
          <div key={startIndex} className="flex flex-col gap-5">
            {specimenOrder.slice(startIndex, startIndex + 10).map((specimen) => {
              const key = `${specimen.color}-${specimen.disabled ? "disabled" : "default"}-${specimen.layout}`;
              return <TextInputInnerContentSpecimenRow key={key} {...specimen} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export const AllVariants: Story = {
  render: () => <ComparisonFrame />,
};
