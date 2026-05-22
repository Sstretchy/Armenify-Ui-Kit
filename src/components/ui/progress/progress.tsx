import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { controlInteractiveTransitionClassName } from "../control-transition";
import { Typography } from "../typography";

const progressFillVariants = cva(
  cn(
    "h-full w-full min-w-full origin-left rounded-[var(--border-xxs)]",
    controlInteractiveTransitionClassName,
  ),
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        success: "",
        error: "",
        warning: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        class:
          "bg-[image:var(--gradient-brand-primary)] shadow-[inset_1px_1px_4px_0_var(--components-controls-shadows-default-inner)]",
      },
      {
        variant: "secondary",
        class:
          "bg-components-controls-bg-secondary-default shadow-[inset_1px_1px_4px_0_var(--components-controls-shadows-default-inner)]",
      },
      {
        variant: "success",
        class: "bg-semantic-status-success-default shadow-[inset_1px_1px_4px_0_var(--components-controls-shadows-default-inner)]",
      },
      {
        variant: "error",
        class: "bg-semantic-status-error-default shadow-[inset_1px_1px_4px_0_var(--components-controls-shadows-default-inner)]",
      },
      {
        variant: "warning",
        class: "bg-semantic-status-warning-default shadow-[inset_1px_1px_4px_0_var(--components-controls-shadows-default-inner)]",
      },
    ],
    defaultVariants: { variant: "primary" },
  },
);

const labelClassByVariant: Record<NonNullable<VariantProps<typeof progressFillVariants>["variant"]>, string> = {
  primary: "text-semantic-text-brand-tertiary",
  secondary: "text-semantic-text-brand-primary-light",
  success: "text-semantic-status-success-default",
  error: "text-semantic-status-error-default",
  warning: "text-semantic-status-warning-default",
};

function clampPct(n: number): number {
  if (Number.isNaN(n) || !Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

export type ProgressVariant = NonNullable<VariantProps<typeof progressFillVariants>["variant"]>;

export type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  showLabel?: boolean;
  /** Снимок при первом рендере: анимация `scaleX` от 0 до целевого процента (двойной rAF до transition). */
  animateOnMount?: boolean;
  mountAnimationDurationMs?: number;
  widthTransitionMs?: number;
  label?: React.ReactNode;
};

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    className,
    value,
    max = 100,
    variant = "primary",
    showLabel = true,
    animateOnMount = false,
    mountAnimationDurationMs = 600,
    widthTransitionMs = 280,
    label,
    ...rest
  },
  ref,
) {
  const mountSnapRef = React.useRef<{ animateOnMount: boolean; pct: number } | null>(null);
  if (mountSnapRef.current === null) {
    mountSnapRef.current = {
      animateOnMount: Boolean(animateOnMount),
      pct: clampPct(max <= 0 ? 0 : (value / max) * 100),
    };
  }
  const mountSnap = mountSnapRef.current;

  const pct = clampPct(max <= 0 ? 0 : (value / max) * 100);
  const [scale, setScale] = React.useState(() => (mountSnap.animateOnMount && mountSnap.pct > 0 ? 0 : 1));

  React.useLayoutEffect(() => {
    if (!mountSnap.animateOnMount || mountSnap.pct <= 0) {
      setScale(1);
      return;
    }
    setScale(0);
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setScale(1));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [mountSnap.animateOnMount, mountSnap.pct]);

  const pctLabel = `${Math.round(pct)}%`;
  const labelClass = labelClassByVariant[variant];
  const safeValue = Number.isFinite(value) ? value : 0;

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={Math.round(safeValue)}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuetext={pctLabel}
      data-slot="progress"
      data-progress-variant={variant}
      className={cn("flex w-full min-w-0 items-center gap-[var(--space-space-1)]", className)}
      {...rest}
    >
      <div className="relative min-h-[10px] min-w-0 flex-1 py-[3px]">
        <div className="relative h-[var(--space-space-1)] w-full overflow-hidden rounded-[var(--border-xxs)]">
          <div
            className="pointer-events-none absolute inset-0 rounded-[var(--border-xxs)] bg-components-controls-bg-primary shadow-[var(--control-shadow-outer),var(--control-shadow-inner)]"
            aria-hidden
          />
          <div
            className="absolute inset-y-0 left-0 overflow-hidden rounded-[var(--border-xxs)]"
            style={{
              width: `${pct}%`,
              transitionProperty: "width",
              transitionDuration: `${widthTransitionMs}ms`,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            aria-hidden
          >
            <div
              className={progressFillVariants({ variant })}
              style={{
                transform: `scaleX(${scale})`,
                transitionProperty: "transform",
                transitionDuration: `${mountAnimationDurationMs}ms`,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>
        </div>
      </div>
      {showLabel ? (
        <div className="flex min-w-5 shrink-0 justify-end tabular-nums">
          {label ?? (
            <Typography variant="xxxs" weight="bold" className={cn("m-0 w-full text-right leading-[var(--font-font-height-xxxs)]", labelClass)}>
              {pctLabel}
            </Typography>
          )}
        </div>
      ) : null}
    </div>
  );
});

export { Progress, progressFillVariants };
