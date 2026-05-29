import * as React from "react";
import {
  Content as AccordionContentPrimitive,
  Header as AccordionHeaderPrimitive,
  Item as AccordionItemPrimitive,
  Root as AccordionRootPrimitive,
  Trigger as AccordionTriggerPrimitive,
} from "@radix-ui/react-accordion";
import { CaretDown } from "phosphor-strokes-icons";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import "./accordion.css";

import { ArmenifyIcon, type ArmenifyIconSize } from "@/components/ui/icon";

import { controlInteractiveTransitionClassName } from "@/components/ui/control-transition";

export type AccordionColor = "brand" | "brand-dark" | "ntrl" | "ntrl-dark";
export type AccordionSize = "sm" | "md";

type AccordionStyleContextValue = { color: AccordionColor; size: AccordionSize };

const AccordionStyleContext = React.createContext<AccordionStyleContextValue>({
  color: "brand",
  size: "sm",
});

function useAccordionStyle(): AccordionStyleContextValue {
  return React.useContext(AccordionStyleContext);
}

const accordionItemVariants = cva(
  "min-w-0 w-full overflow-hidden rounded-border-md border-0 shadow-control-shadow-outer outline-none",
  {
    variants: {
      disabled: {
        true: "pointer-events-none opacity-50",
        false: "",
      },
    },
    defaultVariants: { disabled: false },
  },
);

const accordionTriggerVariants = cva(
  cn(
    "group flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 border-0 border-b border-solid text-left font-sans font-medium outline-none",
    controlInteractiveTransitionClassName,
    "focus-visible:relative focus-visible:z-[1] focus-visible:[box-shadow:var(--control-shadow-outer-focused)]",
    "transition-[background-color,border-color,color] duration-200 ease-out",
  ),
  {
    variants: {
      color: {
        brand:
          "border-semantic-border-brand-delicate bg-semantic-bg-brand-secondary text-components-typography-brand-light-content-light hover:bg-semantic-bg-brand-secondary-hover active:bg-semantic-bg-brand-secondary-active data-[state=open]:bg-semantic-bg-brand-secondary-active",
        "brand-dark":
          "border-semantic-border-brand-delicate-inverse bg-semantic-bg-brand-secondary-inverse text-components-typography-brand-dark-content-light hover:bg-semantic-bg-brand-secondary-inverse-hover active:bg-semantic-bg-brand-secondary-inverse-active data-[state=open]:bg-semantic-bg-brand-secondary-inverse-active",
        ntrl:
          "items-center border-semantic-border-ntrl-delicate bg-semantic-bg-ntrl-secondary text-components-typography-ntrl-light-content-light hover:bg-semantic-bg-ntrl-secondary-hover active:bg-semantic-bg-ntrl-secondary-active data-[state=open]:bg-semantic-bg-ntrl-secondary-active",
        "ntrl-dark":
          "items-start border-semantic-border-ntrl-delicate-inverse bg-semantic-bg-ntrl-tertiary-inverse text-components-typography-ntrl-dark-content-light hover:bg-semantic-bg-ntrl-tertiary-inverse-hover active:bg-semantic-bg-ntrl-tertiary-inverse-active data-[state=open]:bg-semantic-bg-ntrl-tertiary-inverse-active",
      },
      size: {
        sm: "p-3 text-font-size-sm leading-[var(--font-font-height-sm)]",
        md: "p-4 text-font-size-base leading-[var(--font-font-height-base)]",
      },
    },
    defaultVariants: { color: "brand", size: "sm" },
  },
);

const contentPadding: Record<AccordionSize, string> = {
  sm: "p-3 text-font-size-xs leading-[var(--font-font-height-xs)]",
  md: "p-4 text-font-size-sm leading-[var(--font-font-height-sm)]",
};

const contentBg: Record<AccordionColor, string> = {
  brand: "bg-semantic-bg-brand-primary",
  "brand-dark": "bg-semantic-bg-brand-primary-inverse",
  ntrl: "bg-semantic-bg-ntrl-primary",
  "ntrl-dark": "bg-semantic-bg-ntrl-secondary-inverse",
};

const contentText: Record<AccordionColor, string> = {
  brand: "text-components-typography-brand-light-content",
  "brand-dark": "text-components-typography-brand-dark-content",
  ntrl: "text-components-typography-brand-light-content",
  "ntrl-dark": "text-components-typography-brand-dark-content",
};

const caretSize: Record<AccordionSize, ArmenifyIconSize> = {
  sm: "xx-small",
  md: "x-small",
};

export type AccordionRootProps = React.ComponentPropsWithoutRef<typeof AccordionRootPrimitive> & {
  color?: AccordionColor;
  size?: AccordionSize;
};

const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionRootProps>(function AccordionRoot(
  { className, color = "brand", size = "sm", children, ...props },
  ref,
) {
  const ctx = React.useMemo(() => ({ color, size }), [color, size]);
  return (
    <AccordionStyleContext.Provider value={ctx}>
      <AccordionRootPrimitive
        ref={ref}
        data-slot="accordion-root"
        data-accordion-color={color}
        data-accordion-size={size}
        className={cn("flex w-full min-w-0 flex-col gap-[0.0625rem]", className)}
        {...props}
      >
        {children}
      </AccordionRootPrimitive>
    </AccordionStyleContext.Provider>
  );
});

export type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionItemPrimitive>;

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { className, disabled, ...props },
  ref,
) {
  return (
    <AccordionItemPrimitive
      ref={ref}
      data-slot="accordion-item"
      disabled={disabled}
      className={cn(accordionItemVariants({ disabled: Boolean(disabled) }), className)}
      {...props}
    />
  );
});

export type AccordionTriggerProps = Omit<React.ComponentPropsWithoutRef<typeof AccordionTriggerPrimitive>, "children"> & {
  children: React.ReactNode;
};

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(function AccordionTrigger(
  { className, children, ...props },
  ref,
) {
  const { color, size } = useAccordionStyle();
  return (
    <AccordionHeaderPrimitive className="m-0 flex w-full min-w-0 flex-1 p-0">
      <AccordionTriggerPrimitive
        ref={ref}
        data-slot="accordion-trigger"
        className={cn(accordionTriggerVariants({ color, size }), className)}
        {...props}
      >
        <span className="min-w-0 flex-1 truncate">{children}</span>
        <span className="accordion-chevron inline-flex shrink-0 text-current" aria-hidden>
          <ArmenifyIcon
            icon={CaretDown}
            size={caretSize[size]}
            strokeWidthToken="var(--bold-caret-12)"
            className="origin-center transition-transform duration-200 ease-out group-data-[state=open]:rotate-180"
          />
        </span>
      </AccordionTriggerPrimitive>
    </AccordionHeaderPrimitive>
  );
});

export type AccordionContentProps = React.ComponentPropsWithoutRef<typeof AccordionContentPrimitive>;

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(function AccordionContent(
  { className, children, ...props },
  ref,
) {
  const { color, size } = useAccordionStyle();
  return (
    <AccordionContentPrimitive
      ref={ref}
      data-slot="accordion-content"
      className={cn(
        "min-w-0 overflow-hidden data-[state=open]:animate-[accordion-down_280ms_cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-[accordion-up_220ms_cubic-bezier(0.22,1,0.36,1)]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "font-medium antialiased",
          contentPadding[size],
          contentBg[color],
          contentText[color],
        )}
      >
        {children}
      </div>
    </AccordionContentPrimitive>
  );
});

const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};

export { Accordion, AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger, accordionTriggerVariants };
