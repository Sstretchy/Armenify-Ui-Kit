import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Typography } from "../typography";

const bubbleVariants = cva(
  "inline-flex max-w-full min-w-0 items-end [--bubble-meta-fill:var(--components-tags-bg-default)] [--bubble-meta-text-color:var(--components-tags-text-default)]",
  {
    variants: {
      speaker: {
        bot: "",
        user: "",
      },
      state: {
        default: "",
        success: "",
        error: "",
      },
    },
    compoundVariants: [
      {
        speaker: "bot",
        class:
          "[--bubble-body-fill:var(--semantic-bg-brand-primary)] [--bubble-tail-fill:var(--semantic-bg-brand-primary)] [--bubble-text-color:var(--components-typography-brand-light-content)] [--bubble-meta-fill:var(--components-tags-bg-default)] [--bubble-meta-text-color:var(--components-tags-text-default)]",
      },
      {
        speaker: "user",
        state: "default",
        class:
          "[--bubble-body-fill:var(--primitive-colors-brand-500)] [--bubble-tail-fill:var(--primitive-colors-brand-500)] [--bubble-text-color:var(--components-typography-brand-dark-content)]",
      },
      {
        speaker: "user",
        state: "success",
        class:
          "[--bubble-body-fill:linear-gradient(69.8823382924deg,var(--semantic-status-success-default)_0%,var(--primitive-colors-brand-500)_50%)] [--bubble-tail-fill:var(--primitive-colors-brand-500)] [--bubble-text-color:var(--components-typography-brand-dark-content)]",
      },
      {
        speaker: "user",
        state: "error",
        class:
          "[--bubble-body-fill:linear-gradient(69.8823382924deg,var(--semantic-status-error-default)_0%,var(--primitive-colors-brand-500)_50%)] [--bubble-tail-fill:var(--primitive-colors-brand-500)] [--bubble-text-color:var(--components-typography-brand-dark-content)]",
      },
    ],
    defaultVariants: {
      speaker: "bot",
      state: "default",
    },
  },
);

const bubbleBodyVariants = cva(
  "relative z-[1] inline-flex max-w-full min-w-0 items-center rounded-border-xx-lg px-4 py-3 [background:var(--bubble-body-fill)] text-[var(--bubble-text-color)]",
  {
    variants: {
      speaker: {
        bot: "gap-7",
        user: "gap-4",
      },
    },
    defaultVariants: {
      speaker: "bot",
    },
  },
);

export type BubbleSpeaker = NonNullable<VariantProps<typeof bubbleVariants>["speaker"]>;
export type BubbleState = NonNullable<VariantProps<typeof bubbleVariants>["state"]>;

export type BubbleProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof bubbleVariants> & {
    bodyClassName?: string;
    meta?: React.ReactNode;
    metaClassName?: string;
  };

function BubbleTail({
  className,
  speaker,
}: {
  className?: string;
  speaker: BubbleSpeaker;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 36 21"
      className={cn("h-[1.3125rem] w-9 shrink-0 fill-[var(--bubble-tail-fill)]", className)}
    >
      {speaker === "bot" ? (
        <path d="M0 21H36L20 0C20 0 20.0846 8.5 14 14.5C7.91544 20.5 0 21 0 21Z" />
      ) : (
        <path d="M36 21H0L16 0C16 0 15.9154 8.5 22 14.5C28.0846 20.5 36 21 36 21Z" />
      )}
    </svg>
  );
}

function BubbleMeta({ children, className }: { children: React.ReactNode; className?: string }) {
  const content =
    typeof children === "string" || typeof children === "number" ? (
      <Typography
        as="span"
        variant="sm"
        weight="medium"
        className="whitespace-nowrap leading-[0.875rem] text-current"
      >
        {children}
      </Typography>
    ) : (
      children
    );

  return (
    <span
      data-slot="bubble-meta"
      className={cn(
        "inline-flex shrink-0 items-center rounded-border-sm bg-[var(--bubble-meta-fill)] px-2 py-1.5 text-[var(--bubble-meta-text-color)]",
        className,
      )}
    >
      {content}
    </span>
  );
}

const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(function Bubble(
  {
    className,
    bodyClassName,
    meta,
    metaClassName,
    speaker = "bot",
    state = "default",
    children,
    ...props
  },
  ref,
) {
  const textContent =
    typeof children === "string" || typeof children === "number" ? (
      <Typography as="span" variant="lg" className="min-w-0 break-words text-current">
        {children}
      </Typography>
    ) : (
      children
    );

  const bubbleBody = (
    <div
      data-slot="bubble-body"
      className={cn(
        bubbleBodyVariants({ speaker }),
        speaker === "bot" ? "-ml-4" : "",
        bodyClassName,
      )}
    >
      <div className={cn("min-w-0", meta != null ? "flex-1 basis-0" : "")}>{textContent}</div>
      {meta != null ? <BubbleMeta className={metaClassName}>{meta}</BubbleMeta> : null}
    </div>
  );

  return (
    <div
      ref={ref}
      data-slot="bubble"
      data-bubble-speaker={speaker}
      data-bubble-state={state}
      className={cn(bubbleVariants({ speaker, state }), className)}
      {...props}
    >
      {speaker === "bot" ? <BubbleTail speaker="bot" /> : null}
      {bubbleBody}
      {speaker === "user" ? <BubbleTail speaker="user" className="-ml-4" /> : null}
    </div>
  );
});

export { Bubble, bubbleVariants };
