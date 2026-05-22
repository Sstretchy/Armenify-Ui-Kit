import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, buttonVariants } from "@/components/ui/button";
import { Modal, type ModalColor } from "../modal";
import { cn } from "@/lib/utils";

const meta = {
  title: "Molecules/Modal",
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const demoBody =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.";

function ModalFooterActions({ color }: { color: ModalColor }) {
  switch (color) {
    case "brand":
      return (
        <>
          <Button variant="secondary" size="sm">
            Отмена
          </Button>
          <Button variant="primary" size="sm">
            Готово
          </Button>
        </>
      );
    case "brand-dark":
      return (
        <>
          <Button variant="tertiary" size="sm">
            Отмена
          </Button>
          <Button variant="primary" size="sm">
            Принять
          </Button>
        </>
      );
    case "ntrl":
      return (
        <>
          <Button variant="outlined" size="sm">
            Отмена
          </Button>
          <Button variant="secondary" size="sm">
            Далее
          </Button>
        </>
      );
    case "ntrl-dark":
      return (
        <>
          <Button variant="tertiary" size="sm">
            Отмена
          </Button>
          <Button variant="primary" size="sm">
            Сохранить
          </Button>
        </>
      );
    default:
      return null;
  }
}

function ModalDemo({ color }: { color: ModalColor }) {
  const [open, setOpen] = useState(false);
  return (
    <Modal.Root open={open} onOpenChange={setOpen} color={color}>
      <Modal.Trigger
        type="button"
        className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
      >
        Открыть модалку
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <div className="min-w-0 flex-1">
              <Modal.Title>Заголовок модалки</Modal.Title>
              <Modal.Description>Краткое пояснение к действию</Modal.Description>
            </div>
            <Modal.Close />
          </Modal.Header>
          <Modal.Body>{demoBody}</Modal.Body>
          <Modal.Footer>
            <ModalFooterActions color={color} />
          </Modal.Footer>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
}

export const Brand: Story = {
  render: () => <ModalDemo color="brand" />,
};

export const Colors: Story = {
  render: () => {
    const colors: ModalColor[] = ["brand", "brand-dark", "ntrl", "ntrl-dark"];
    return (
      <div className="flex max-w-2xl flex-col gap-10 p-4">
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
          Макеты:{" "}
          <a
            className="text-components-typography-brand-light-label underline"
            href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=137-5534"
            rel="noreferrer"
            target="_blank"
          >
            137:5534
          </a>
          , оверлей:{" "}
          <a
            className="text-components-typography-brand-light-label underline"
            href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=250-12534"
            rel="noreferrer"
            target="_blank"
          >
            250:12534
          </a>
          . Разметка и a11y —{" "}
          <a className="underline" href="https://www.radix-ui.com/primitives/docs/components/dialog" rel="noreferrer" target="_blank">
            Radix Dialog
          </a>
          .
        </p>
        {colors.map((color) => (
          <div key={color} className="flex flex-col gap-2">
            <span className="text-font-size-xxs-input font-medium capitalize text-semantic-text-ntrl-primary">{color}</span>
            <ModalDemo color={color} />
          </div>
        ))}
      </div>
    );
  },
};
