import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type RainbowCardType = "rainbow1" | "rainbow2" | "rainbow3";
export type RainbowCardSize = "sm" | "md" | "lg" | "x-lg";

const RainbowCardSizeContext = React.createContext<RainbowCardSize>("x-lg");

function useRainbowCardSize(): RainbowCardSize {
  return React.useContext(RainbowCardSizeContext);
}

const rainbowCardRootVariants = cva(
  "relative flex w-full max-w-[15.625rem] flex-col items-center justify-center overflow-hidden rounded-border-x-lg border border-solid border-semantic-border-brand-delicate text-center",
  {
    variants: {
      size: {
        sm: "gap-0 px-[var(--space-space-4)] py-[var(--space-space-6)]",
        md: "gap-0 px-[var(--space-space-5)] py-[var(--space-space-7)]",
        lg: "gap-0 px-[var(--space-space-6)] py-[var(--space-space-8)]",
        "x-lg": "gap-0 px-[var(--space-space-8)] py-[var(--space-space-10)]",
      },
      shadow: {
        true: "shadow-[0px_0px_26.4px_6.6px_rgba(0,0,0,0.4)]",
        false: "",
      },
    },
    defaultVariants: { size: "x-lg", shadow: true },
  },
);

const rainbowOverlayClassName: Record<RainbowCardType, string> = {
  rainbow1:
    "pointer-events-none absolute inset-0 rounded-border-x-lg bg-gradient-to-b from-primitive-colors-brand-150/35 from-0% via-primitive-colors-brand-400/35 via-50% to-primitive-colors-brand-600/35 to-100% mix-blend-color-dodge backdrop-blur-[4.84px]",
  rainbow2:
    "pointer-events-none absolute inset-0 rounded-border-x-lg bg-gradient-to-b from-primitive-colors-brand-150/35 from-0% via-primitive-colors-brand-400/35 via-50% to-primitive-colors-brand-600/35 to-100% mix-blend-difference backdrop-blur-[4.84px]",
  rainbow3:
    "pointer-events-none absolute inset-0 rounded-border-x-lg bg-gradient-to-b from-primitive-colors-brand-150/35 from-0% via-primitive-colors-brand-400/35 via-50% to-primitive-colors-brand-800/35 to-100% mix-blend-plus-lighter backdrop-blur-[4.84px]",
};

const titleClassName: Record<RainbowCardSize, string> = {
  sm: "font-medium text-font-size-lg leading-[var(--font-font-height-lg)]",
  md: "font-medium text-font-size-xl leading-[var(--font-font-height-xl)]",
  lg: "font-medium text-font-size-2xl leading-[var(--font-font-height-2xl)]",
  "x-lg": "font-medium text-font-size-2xl leading-[var(--font-font-height-2xl)]",
};

const descriptionClassName: Record<RainbowCardSize, string> = {
  sm: "font-normal text-font-size-base leading-[var(--font-font-height-base)]",
  md: "font-normal text-font-size-lg leading-[var(--font-font-height-lg)]",
  lg: "font-normal text-font-size-xl leading-[var(--font-font-height-xl)]",
  "x-lg": "font-normal text-font-size-xl leading-[var(--font-font-height-xl)]",
};

const bodyGapClassName: Record<RainbowCardSize, string> = {
  sm: "gap-[var(--space-space-4)]",
  md: "gap-[18px]",
  lg: "gap-[18px]",
  "x-lg": "gap-[18px]",
};

export type RainbowCardRootProps = React.ComponentPropsWithoutRef<"div"> & {
  type?: RainbowCardType;
  size?: RainbowCardSize;
  shadow?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

const RainbowCardRoot = React.forwardRef<HTMLDivElement, RainbowCardRootProps>(function RainbowCardRoot(
  { className, type = "rainbow1", size = "x-lg", shadow = true, title, description, children, ...props },
  ref,
) {
  const showDefault = children == null && (title != null || description != null);
  const sz = size ?? "x-lg";
  return (
    <RainbowCardSizeContext.Provider value={sz}>
      <div
        ref={ref}
        data-slot="rainbow-card"
        data-rainbow-card-type={type}
        data-rainbow-card-size={sz}
        className={cn(rainbowCardRootVariants({ size: sz, shadow }), className)}
        {...props}
      >
        <div className={rainbowOverlayClassName[type]} aria-hidden />
        <div
          className={cn(
            "relative z-[1] flex w-full flex-col items-stretch text-center text-shadow-[2px_2px_2px_rgba(0,0,0,0.1)] text-components-typography-brand-dark-content",
            bodyGapClassName[sz],
          )}
        >
          {children != null ? (
            children
          ) : showDefault ? (
            <>
              {title != null ? <p className={cn("w-full", titleClassName[sz])}>{title}</p> : null}
              {description != null ? <p className={cn("w-full", descriptionClassName[sz])}>{description}</p> : null}
            </>
          ) : null}
        </div>
      </div>
    </RainbowCardSizeContext.Provider>
  );
});

export type RainbowCardTitleProps = React.ComponentPropsWithoutRef<"p">;

const RainbowCardTitle = React.forwardRef<HTMLParagraphElement, RainbowCardTitleProps>(function RainbowCardTitle(
  { className, ...props },
  ref,
) {
  const size = useRainbowCardSize();
  return (
    <p
      ref={ref}
      data-slot="rainbow-card-title"
      className={cn("w-full", titleClassName[size], className)}
      {...props}
    />
  );
});

export type RainbowCardDescriptionProps = React.ComponentPropsWithoutRef<"p">;

const RainbowCardDescription = React.forwardRef<HTMLParagraphElement, RainbowCardDescriptionProps>(
  function RainbowCardDescription({ className, ...props }, ref) {
    const size = useRainbowCardSize();
    return (
      <p
        ref={ref}
        data-slot="rainbow-card-description"
        className={cn("w-full", descriptionClassName[size], className)}
        {...props}
      />
    );
  },
);

const RainbowCard = {
  Root: RainbowCardRoot,
  Title: RainbowCardTitle,
  Description: RainbowCardDescription,
};

export { RainbowCard, RainbowCardRoot, RainbowCardTitle, RainbowCardDescription, rainbowCardRootVariants };
export type RainbowCardRootVariantProps = VariantProps<typeof rainbowCardRootVariants>;
