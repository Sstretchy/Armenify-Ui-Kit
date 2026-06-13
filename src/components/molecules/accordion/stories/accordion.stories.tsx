import type { Meta, StoryObj } from "@storybook/react-vite";

import { Accordion, type AccordionColor, type AccordionSize } from "../accordion";

const meta = {
  title: "Molecules/Accordion",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    backgrounds: {
      default: "figma-canvas",
      values: [{ name: "figma-canvas", value: "#ffffff" }],
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type AccordionPreviewState = "default" | "hover" | "active";

const headerText = "What is your level of armenian language?";
const bodyText =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.";

const frameClassName = "w-[30.875rem] bg-white p-5";
const stackClassName = "flex flex-col gap-5";
const accordionWidthClassName = "w-[28.375rem]";

const headerSnapshots: Array<{ color: AccordionColor; size: AccordionSize; state: AccordionPreviewState }> = [
  { color: "brand", size: "sm", state: "default" },
  { color: "brand-dark", size: "sm", state: "default" },
  { color: "ntrl", size: "sm", state: "default" },
  { color: "ntrl-dark", size: "sm", state: "default" },
  { color: "brand", size: "sm", state: "hover" },
  { color: "brand-dark", size: "sm", state: "hover" },
  { color: "ntrl", size: "sm", state: "hover" },
  { color: "ntrl-dark", size: "sm", state: "hover" },
  { color: "brand", size: "sm", state: "active" },
  { color: "brand-dark", size: "sm", state: "active" },
  { color: "ntrl", size: "sm", state: "active" },
  { color: "ntrl-dark", size: "sm", state: "active" },
  { color: "ntrl-dark", size: "md", state: "active" },
  { color: "brand", size: "md", state: "default" },
  { color: "brand-dark", size: "md", state: "default" },
  { color: "ntrl", size: "md", state: "default" },
  { color: "ntrl-dark", size: "md", state: "default" },
  { color: "brand", size: "md", state: "hover" },
  { color: "brand-dark", size: "md", state: "hover" },
  { color: "ntrl", size: "md", state: "hover" },
  { color: "ntrl-dark", size: "md", state: "hover" },
  { color: "brand", size: "md", state: "active" },
  { color: "brand-dark", size: "md", state: "active" },
  { color: "ntrl", size: "md", state: "active" },
];

const accordionSnapshots: Array<{ color: AccordionColor; size: AccordionSize }> = [
  { color: "brand", size: "sm" },
  { color: "brand-dark", size: "sm" },
  { color: "ntrl", size: "sm" },
  { color: "ntrl-dark", size: "sm" },
  { color: "brand", size: "md" },
  { color: "brand-dark", size: "md" },
  { color: "ntrl", size: "md" },
  { color: "ntrl-dark", size: "md" },
];

function HeaderSnapshot({
  color,
  size,
  state,
}: {
  color: AccordionColor;
  size: AccordionSize;
  state: AccordionPreviewState;
}) {
  return (
    <Accordion.Root type="single" collapsible color={color} size={size} className={accordionWidthClassName}>
      <Accordion.Item value={`${color}-${size}-${state}`} className="shadow-none">
        <Accordion.Trigger data-story-state={state === "default" ? undefined : state}>{headerText}</Accordion.Trigger>
      </Accordion.Item>
    </Accordion.Root>
  );
}

function AccordionSnapshot({ color, size }: { color: AccordionColor; size: AccordionSize }) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue={`${color}-${size}`}
      color={color}
      size={size}
      className={accordionWidthClassName}
    >
      <Accordion.Item value={`${color}-${size}`}>
        <Accordion.Trigger>{headerText}</Accordion.Trigger>
        <Accordion.Content>{bodyText}</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

function AccordionStackSnapshot({ size }: { size: AccordionSize }) {
  return (
    <div className={size === "md" ? `${accordionWidthClassName} overflow-hidden rounded-border-md` : accordionWidthClassName}>
      <div className="flex flex-col gap-[0.0625rem]">
        {Array.from({ length: 3 }, (_, index) => (
          <AccordionSnapshot key={`${size}-${index}`} color="brand" size={size} />
        ))}
      </div>
    </div>
  );
}

export const FigmaHeaderReference: Story = {
  name: "Figma Header Reference",
  render: () => (
    <div className={frameClassName}>
      <div className={stackClassName}>
        {headerSnapshots.map((snapshot) => (
          <HeaderSnapshot
            key={`${snapshot.color}-${snapshot.size}-${snapshot.state}`}
            color={snapshot.color}
            size={snapshot.size}
            state={snapshot.state}
          />
        ))}
      </div>
    </div>
  ),
};

export const FigmaAccordionReference: Story = {
  name: "Figma Accordion Reference",
  render: () => (
    <div className={frameClassName}>
      <div className={stackClassName}>
        {accordionSnapshots.map((snapshot) => (
          <AccordionSnapshot key={`${snapshot.color}-${snapshot.size}`} color={snapshot.color} size={snapshot.size} />
        ))}
      </div>
    </div>
  ),
};

export const FigmaAccordionsReference: Story = {
  name: "Figma Accordions Reference",
  render: () => (
    <div className={frameClassName}>
      <div className={stackClassName}>
        <AccordionStackSnapshot size="sm" />
        <AccordionStackSnapshot size="md" />
      </div>
    </div>
  ),
};
