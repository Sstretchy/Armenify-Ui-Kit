import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type GlassCardSize = "sm" | "md" | "lg";

const glassCardRootVariants = cva(
  "relative flex w-full flex-col items-stretch justify-center overflow-hidden rounded-border-x-lg border border-solid border-semantic-border-brand-delicate bg-primitive-colors-brand-400/20 backdrop-blur-[0.75rem]",
  {
    variants: {
      size: {
        sm: "max-w-[23.8125rem] px-6 py-8",
        md: "max-w-[28.375rem] px-7 py-9",
        lg: "max-w-[31.25rem] px-8 py-10",
      },
    },
    defaultVariants: { size: "lg" },
  },
);

export type GlassCardRootProps = React.ComponentPropsWithoutRef<"div"> & {
  size?: GlassCardSize;
};

const GlassCardRoot = React.forwardRef<HTMLDivElement, GlassCardRootProps>(function GlassCardRoot(
  { className, size = "lg", children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="glass-card"
      data-glass-card-size={size}
      className={cn(glassCardRootVariants({ size }), className)}
      {...props}
    >
      {children}
    </div>
  );
});

const GlassCard = {
  Root: GlassCardRoot,
};

export { GlassCard, GlassCardRoot, glassCardRootVariants };
export type GlassCardRootVariantProps = VariantProps<typeof glassCardRootVariants>;
