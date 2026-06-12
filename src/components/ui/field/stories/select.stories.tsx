import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputBase } from "../input-base";
import { InputHelperText, type InputHelperTextTone } from "../input-helper-text";
import { InputTag } from "../input-tag";
import { MenuItem } from "../menu-item";
import { SelectMenuDivider } from "../select-menu";
import { Select } from "../select";
import { TextInputChrome, type TextInputFieldVisualState } from "../text-input-field";
import { TextInputInnerContent, type TextInputInnerLayout } from "../text-input-inner-content";
import type { TextInputColor } from "../text-input";

const meta = {
  title: "UI/Field/Select",
  component: Select,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
  args: { size: "md" as const, color: "ntrl" as const, labelText: "Label" },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

type FigmaSelectsRow = {
  color: TextInputColor;
  disabled?: boolean;
  helper?: boolean;
  helperTone?: InputHelperTextTone;
  label?: boolean;
  layout?: TextInputInnerLayout;
  valueText?: string;
  visualState?: TextInputFieldVisualState;
  fieldClassName?: string;
  tags?: React.ReactNode;
};

const frameWidthClassName = "w-[27.3125rem]";
const fieldWidthClassName = "w-[24.8125rem]";

const figmaSelectRows: FigmaSelectsRow[] = [
  { color: "ntrl", valueText: "There is no one who" },
  { color: "brand", label: true, helper: true, valueText: "There is no one who" },
  { color: "ntrl", label: true, helper: true, valueText: "There is no one who" },
  { color: "brand", label: true, helper: true, layout: "search", valueText: "Text" },
  {
    color: "ntrl",
    disabled: true,
    label: true,
    helper: true,
    helperTone: "disabled",
    valueText: "There is no one who",
  },
  {
    color: "ntrl",
    label: true,
    helper: true,
    helperTone: "error",
    valueText: "There is no one who",
    visualState: "error",
  },
  {
    color: "brand",
    label: true,
    helper: true,
    valueText: "There is no one who",
    visualState: "focus",
  },
  { color: "ntrl", label: true, helper: true, valueText: "There is no one who" },
  { color: "ntrl", label: true, helper: true, valueText: "There is no one who" },
  { color: "ntrl", label: true, helper: true, valueText: "There is no one who" },
  {
    color: "ntrl",
    label: true,
    helper: true,
    layout: "multiselect",
    fieldClassName: "px-2.5 py-2",
    tags: (
      <>
        {["a", "b", "c", "d"].map((key) => (
          <InputTag key={key} size="sm" color="brand">
            tag text
          </InputTag>
        ))}
      </>
    ),
  },
];

function FigmaSelectsHelper({
  color,
  tone = "default",
}: {
  color: TextInputColor;
  tone?: InputHelperTextTone;
}) {
  return (
    <InputHelperText size="sm" color={color} tone={tone} showIcon>
      Help text
    </InputHelperText>
  );
}

function FigmaSelectsRow({
  color,
  disabled = false,
  helper = false,
  helperTone = "default",
  label = false,
  layout = "default",
  valueText = "There is no one who",
  visualState,
  fieldClassName,
  tags,
}: FigmaSelectsRow) {
  const tone = helperTone === "error" ? "error" : "default";

  return (
    <InputBase
      className={fieldWidthClassName}
      size="sm"
      color={color}
      tone={tone}
      disabled={disabled}
      labelText={label ? "Label" : undefined}
      helper={helper ? <FigmaSelectsHelper color={color} tone={helperTone} /> : undefined}
    >
      <TextInputChrome
        size="sm"
        color={color}
        disabled={disabled}
        visualState={visualState}
        fieldClassName={fieldClassName}
      >
        <TextInputInnerContent
          layout={layout}
          size="sm"
          color={color}
          disabled={disabled}
          valueText={valueText}
          pretext={false}
          tags={tags}
        />
      </TextInputChrome>
    </InputBase>
  );
}

function FigmaSelectsFrame() {
  return (
    <div className={`pointer-events-none box-border flex ${frameWidthClassName} flex-col gap-2.5 bg-white p-5`}>
      {figmaSelectRows.map((row, index) => (
        <FigmaSelectsRow key={`${row.layout ?? "default"}-${row.color}-${row.visualState ?? "default"}-${index}`} {...row} />
      ))}
    </div>
  );
}

export const FigmaSpecimen: Story = {
  parameters: { layout: "centered" },
  render: () => <FigmaSelectsFrame />,
};

export const Matrix: Story = {
  render: () => (
    <div className="pointer-events-none flex flex-col gap-12 p-4">
      <p className="max-w-xl text-font-size-sm text-semantic-text-ntrl-secondary">
        Селект по{" "}
        <a
          className="text-components-typography-brand-light-label underline"
          href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=234-24878"
          rel="noreferrer"
          target="_blank"
        >
          Figma 234:24878
        </a>
        : InputBase + поле как TextInputField (рамка, тень) + стрелка, под ним SelectMenu; sm/md/lg × ntrl/brand.
      </p>
      <div className="flex flex-wrap gap-10">
        {(["ntrl", "brand"] as const).map((color) => (
          <div key={color} className="flex flex-col gap-4">
            <p className="text-font-size-xs font-medium capitalize text-semantic-text-ntrl-secondary">{color}</p>
            <div className="flex flex-wrap items-start gap-8">
              {(["sm", "md", "lg"] as const).map((size) => (
                <div key={size} className="flex w-full min-w-44 max-w-96 flex-col gap-1">
                  <span className="text-font-size-xs text-semantic-text-ntrl-tertiary">{size}</span>
                  <Select size={size} color={color} defaultMenuOpen menuDefaultSelectedIndex={1} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [open, setOpen] = React.useState(true);
    const [label, setLabel] = React.useState("There is no one who");
    const pick = (next: string) => {
      setLabel(next);
      setOpen(false);
    };
    return (
      <div className="max-w-md p-4">
        <Select
          menuOpen={open}
          onMenuOpenChange={setOpen}
          placeholder={label}
          menu={
            <>
              <MenuItem prefixText="Https://" onClick={() => pick("Option one")}>
                Option one
              </MenuItem>
              <SelectMenuDivider tone="ntrl" />
              <MenuItem prefixText="Https://" selected={label === "Option two"} onClick={() => pick("Option two")}>
                Option two
              </MenuItem>
              <SelectMenuDivider tone="ntrl" />
              <MenuItem prefixText="Https://" onClick={() => pick("Option three")}>
                Option three
              </MenuItem>
            </>
          }
        />
      </div>
    );
  },
};
