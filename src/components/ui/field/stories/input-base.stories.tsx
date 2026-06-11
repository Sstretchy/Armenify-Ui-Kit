import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputBase, type InputBaseColor, type InputBaseSize } from "../input-base";
import { InputHelperText } from "../input-helper-text";
import { TextInputField } from "../text-input-field";

const meta = {
  title: "UI/Field/InputBase",
  component: InputBase,
  tags: ["!autodocs"],
  parameters: { layout: "centered", controls: { disable: true } },
  args: { children: <></> },
} satisfies Meta<typeof InputBase>;

export default meta;

type Story = StoryObj<typeof meta>;

type FigmaSpecimen = {
  color: InputBaseColor;
  size: InputBaseSize;
  sideLabel: boolean;
};

const figmaSizes: InputBaseSize[] = ["sm", "md", "lg"];
const figmaColorGroups: InputBaseColor[][] = [
  ["ntrl", "brand"],
  ["ntrl-inverse", "brand-inverse"],
];

const figmaSpecimens: FigmaSpecimen[] = figmaColorGroups.flatMap((colors) =>
  figmaSizes.flatMap((size) =>
    colors.flatMap((color) => [
      { color, size, sideLabel: false },
      { color, size, sideLabel: true },
    ]),
  ),
);

const specimenWidthClassName = "w-[20.875rem]";

function inputColorForBase(color: InputBaseColor) {
  return color === "brand" || color === "brand-inverse" ? "brand" : "ntrl";
}

function specimenId({ color, size, sideLabel }: FigmaSpecimen) {
  return `input-base-${color}-${size}-${sideLabel ? "side" : "stack"}`;
}

function InputBaseSpecimen(specimen: FigmaSpecimen) {
  const id = specimenId(specimen);

  return (
    <InputBase
      className={specimenWidthClassName}
      size={specimen.size}
      color={specimen.color}
      sideLabel={specimen.sideLabel}
      helperSpace={specimen.sideLabel}
      labelText="Label"
      htmlFor={id}
      helper={
        <InputHelperText size={specimen.size} color={specimen.color} tone="default" showIcon>
          Help text
        </InputHelperText>
      }
    >
      <TextInputField
        id={id}
        size={specimen.size}
        color={inputColorForBase(specimen.color)}
        defaultValue="There is no one who"
        aria-label={id}
      />
    </InputBase>
  );
}

function ComparisonFrame() {
  return (
    <div className="pointer-events-none box-border flex w-[23.375rem] flex-col gap-5 border border-dashed border-semantic-border-brand-default bg-white p-5">
      {figmaSpecimens.map((specimen) => (
        <InputBaseSpecimen key={specimenId(specimen)} {...specimen} />
      ))}
    </div>
  );
}

export const Comparison: Story = {
  render: () => <ComparisonFrame />,
};
