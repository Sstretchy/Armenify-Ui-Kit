import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SealCheck } from "phosphor-strokes-icons";

import { ArmenifyIcon, buttonSizeToArmenifyIconSize } from "../../icon";
import { Typography } from "../../typography";
import { ToggleGroup, ToggleGroupRoot, type ToggleGroupSize } from "../toggle-group";

const meta = {
  title: "UI/ToggleGroup",
  component: ToggleGroupRoot,
  tags: ["!autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
} satisfies Meta<typeof ToggleGroupRoot>;

export default meta;

type Story = StoryObj<typeof meta>;

type StoryOption = {
  value: string;
  label: string;
  disabled?: boolean;
  className?: string;
  storyState?: "focused";
};

type ToggleGroupPreviewProps = {
  ariaLabel: string;
  defaultValue?: string;
  disabled?: boolean;
  options: StoryOption[];
  rootStoryState?: "focused";
  showIcons?: boolean;
  size: ToggleGroupSize;
  value?: string;
  onValueChange?: (value: string) => void;
};

const figmaUrl = "https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=403-14953";
const specimenSizes: ToggleGroupSize[] = ["xs", "sm", "md", "lg", "x-lg"];

const iconSizeByToggleGroupSize = {
  xs: buttonSizeToArmenifyIconSize.xs,
  sm: buttonSizeToArmenifyIconSize.sm,
  md: buttonSizeToArmenifyIconSize.md,
  lg: buttonSizeToArmenifyIconSize.lg,
  "x-lg": buttonSizeToArmenifyIconSize.xl,
} satisfies Record<ToggleGroupSize, (typeof buttonSizeToArmenifyIconSize)[keyof typeof buttonSizeToArmenifyIconSize]>;

const defaultHoverClassName = "!shadow-control-shadow-hover";
const defaultActiveClassName = "!shadow-control-shadow-active";
const selectedHoverClassName = "!bg-components-controls-bg-secondary-hover !shadow-control-shadow-hover";

function buildToggleGroupIcon(size: ToggleGroupSize) {
  return <ArmenifyIcon icon={SealCheck} size={iconSizeByToggleGroupSize[size]} strokeWeight="bold" />;
}

function ToggleGroupPreview({
  ariaLabel,
  defaultValue,
  disabled = false,
  options,
  rootStoryState,
  showIcons = false,
  size,
  value,
  onValueChange,
}: ToggleGroupPreviewProps) {
  const iconLeft = showIcons ? buildToggleGroupIcon(size) : undefined;
  const iconRight = showIcons ? buildToggleGroupIcon(size) : undefined;

  return (
    <ToggleGroup.Root
      aria-label={ariaLabel}
      className="w-full"
      data-story-state={rootStoryState}
      defaultValue={defaultValue}
      disabled={disabled}
      size={size}
      value={value}
      onValueChange={onValueChange}
    >
      {options.map((option) => (
        <ToggleGroup.Item
          key={option.value}
          className={option.className}
          data-story-state={option.storyState}
          disabled={option.disabled}
          iconLeft={iconLeft}
          iconRight={iconRight}
          value={option.value}
        >
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}

function StateCard({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <section className="flex flex-col gap-3 rounded-border-lg bg-semantic-bg-ntrl-secondary p-4">
      <Typography variant="xs" weight="medium" tone="muted">
        {title}
      </Typography>
      {children}
    </section>
  );
}

export const FigmaSpecimen: Story = {
  parameters: {
    layout: "centered",
  },
  render: () => (
    <div className="w-[46rem] p-5">
      <div className="flex flex-col gap-4">
        {specimenSizes.map((size) => (
          <ToggleGroupPreview
            key={size}
            ariaLabel={`Toggle group ${size}`}
            defaultValue=""
            options={[
              { value: "left", label: "Button" },
              { value: "center", label: "Button" },
              { value: "right", label: "Button" },
            ]}
            showIcons
            size={size}
          />
        ))}
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [value, setValue] = React.useState("register");

    return (
      <div className="mx-auto flex max-w-xl flex-col gap-4 p-4">
        <Typography variant="sm" tone="muted">
          Radiogroup semantics with roving tab stop: Tab enters once, arrow keys move the selection, Home and End jump
          to the edges, and click or keyboard activation keeps one segment selected at a time.
        </Typography>
        <ToggleGroupPreview
          ariaLabel="Auth mode"
          options={[
            { value: "login", label: "Login" },
            { value: "register", label: "Register" },
            { value: "review", label: "Review" },
          ]}
          size="md"
          value={value}
          onValueChange={setValue}
        />
        <Typography as="p" variant="xs" tone="muted">
          value: {value}
        </Typography>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="flex max-w-5xl flex-col gap-6 p-4">
      <Typography variant="sm" tone="muted">
        Visual state checks for the segmented-control primitive after aligning it with the Figma size specimen.
      </Typography>

      <div className="grid gap-4 md:grid-cols-2">
        <StateCard title="No selection">
          <ToggleGroupPreview
            ariaLabel="No selection example"
            defaultValue=""
            options={[
              { value: "a", label: "Browse" },
              { value: "b", label: "Practice" },
              { value: "c", label: "Review" },
            ]}
            size="md"
          />
        </StateCard>

        <StateCard title="Selected">
          <ToggleGroupPreview
            ariaLabel="Selected example"
            options={[
              { value: "a", label: "Browse" },
              { value: "b", label: "Practice" },
              { value: "c", label: "Review" },
            ]}
            size="md"
            value="b"
          />
        </StateCard>

        <StateCard title="Focus visible">
          <ToggleGroupPreview
            ariaLabel="Focus visible example"
            options={[
              { value: "a", label: "Browse" },
              { value: "b", label: "Practice", storyState: "focused" },
              { value: "c", label: "Review" },
            ]}
            rootStoryState="focused"
            size="md"
            value="b"
          />
        </StateCard>

        <StateCard title="Hover and active">
          <ToggleGroupPreview
            ariaLabel="Hover and active example"
            options={[
              { value: "a", label: "Browse", className: defaultHoverClassName },
              { value: "b", label: "Practice", className: defaultActiveClassName },
              { value: "c", label: "Review", className: selectedHoverClassName },
            ]}
            size="md"
            value="c"
          />
        </StateCard>

        <StateCard title="Disabled item">
          <ToggleGroupPreview
            ariaLabel="Disabled item example"
            options={[
              { value: "a", label: "Browse" },
              { value: "b", label: "Practice", disabled: true },
              { value: "c", label: "Review" },
            ]}
            size="md"
            value="a"
          />
        </StateCard>

        <StateCard title="Disabled group">
          <ToggleGroupPreview
            ariaLabel="Disabled group example"
            disabled
            options={[
              { value: "a", label: "Browse" },
              { value: "b", label: "Practice" },
              { value: "c", label: "Review" },
            ]}
            size="md"
            value="b"
          />
        </StateCard>
      </div>

      <Typography as="p" variant="xs" tone="muted">
        Figma specimen reference:{" "}
        <a className="underline" href={figmaUrl} rel="noreferrer" target="_blank">
          403:14953
        </a>
      </Typography>
    </div>
  ),
};
