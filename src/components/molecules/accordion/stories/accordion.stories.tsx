import type { Meta, StoryObj } from "@storybook/react-vite";

import { Accordion, type AccordionColor } from "../accordion";

const meta = {
  title: "Molecules/Accordion",
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const demoBody =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.";

function AccordionDemo({ color, size }: { color: AccordionColor; size: "sm" | "md" }) {
  return (
    <Accordion.Root type="single" collapsible defaultValue="1" color={color} size={size} className="max-w-xl">
      <Accordion.Item value="1">
        <Accordion.Trigger>What is your level of armenian language?</Accordion.Trigger>
        <Accordion.Content>{demoBody}</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="2">
        <Accordion.Trigger>Second section</Accordion.Trigger>
        <Accordion.Content>{demoBody}</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="3">
        <Accordion.Trigger>Third section</Accordion.Trigger>
        <Accordion.Content>{demoBody}</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export const BrandSmall: Story = {
  render: () => <AccordionDemo color="brand" size="sm" />,
};

export const BrandMedium: Story = {
  render: () => <AccordionDemo color="brand" size="md" />,
};

export const Colors: Story = {
  render: () => {
    const colors: AccordionColor[] = ["brand", "brand-dark", "ntrl", "ntrl-dark"];
    return (
      <div className="flex max-w-2xl flex-col gap-10 p-4">
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
          Макеты:{" "}
          <a
            className="text-components-typography-brand-light-label underline"
            href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=133-1935"
            rel="noreferrer"
            target="_blank"
          >
            133:1935
          </a>
          ,{" "}
          <a
            className="text-components-typography-brand-light-label underline"
            href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=133-1757"
            rel="noreferrer"
            target="_blank"
          >
            133:1757
          </a>
          ,{" "}
          <a
            className="text-components-typography-brand-light-label underline"
            href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=142-5945"
            rel="noreferrer"
            target="_blank"
          >
            142:5945
          </a>
          . Поведение и a11y —{" "}
          <a className="underline" href="https://www.radix-ui.com/primitives/docs/components/accordion" rel="noreferrer" target="_blank">
            Radix Accordion
          </a>
          .
        </p>
        {colors.map((color) => (
          <div key={color} className="flex flex-col gap-2">
            <span className="text-font-size-xxs-input font-medium capitalize text-semantic-text-ntrl-primary">{color}</span>
            <AccordionDemo color={color} size="sm" />
          </div>
        ))}
      </div>
    );
  },
};
