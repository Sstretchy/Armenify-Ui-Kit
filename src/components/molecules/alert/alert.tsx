import * as React from "react";
import { SealCheck, X } from "phosphor-strokes-icons";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ArmenifyIcon, ghostButtonSizeToArmenifyIconSize } from "@/components/ui/icon";
import { ghostButtonVariants } from "@/components/ui/button/ghost-button";

export type AlertState = "error" | "success" | "warning" | "info";
export type AlertTheme = "light" | "dark";

type AlertStyleContextValue = { state: AlertState; theme: AlertTheme };

const AlertStyleContext = React.createContext<AlertStyleContextValue>({
  state: "error",
  theme: "dark",
});

function useAlertStyle(): AlertStyleContextValue {
  return React.useContext(AlertStyleContext);
}

const alertRootVariants = cva(
  [
    "flex w-full max-w-[25rem] items-start justify-center gap-2 overflow-hidden rounded-border-x-lg border-[0.15625rem] border-dashed p-3 backdrop-blur-[0.75rem]",
    "font-sans antialiased",
  ],
  {
    variants: {
      state: {
        error: "",
        success: "",
        warning: "",
        info: "",
      },
      theme: {
        dark: "",
        light: "",
      },
    },
    compoundVariants: [
      {
        theme: "dark",
        state: "error",
        class: "border-semantic-status-error-default bg-semantic-status-base-overlay",
      },
      {
        theme: "dark",
        state: "success",
        class: "border-semantic-status-success-default bg-semantic-status-base-overlay",
      },
      {
        theme: "dark",
        state: "warning",
        class: "border-semantic-status-warning-default bg-semantic-status-base-overlay",
      },
      {
        theme: "dark",
        state: "info",
        class: "border-semantic-status-info-default bg-semantic-status-base-overlay",
      },
      {
        theme: "light",
        state: "error",
        class: "border-semantic-status-error-bright bg-semantic-status-base-overlay-inverse",
      },
      {
        theme: "light",
        state: "success",
        class: "border-semantic-status-success-bright bg-semantic-status-base-overlay-inverse",
      },
      {
        theme: "light",
        state: "warning",
        class: "border-semantic-status-warning-bright bg-semantic-status-base-overlay-inverse",
      },
      {
        theme: "light",
        state: "info",
        class: "border-semantic-status-info-bright bg-semantic-status-base-overlay-inverse",
      },
    ],
    defaultVariants: { state: "error", theme: "dark" },
  },
);

const alertMessageText: Record<AlertTheme, string> = {
  dark: "text-semantic-status-base-default",
  light: "text-semantic-status-base-default-inverse",
};

export type AlertRootProps = React.ComponentPropsWithoutRef<"div"> & {
  state?: AlertState;
  theme?: AlertTheme;
};

const AlertRoot = React.forwardRef<HTMLDivElement, AlertRootProps>(function AlertRoot(
  { className, state = "error", theme = "dark", role: roleProp, children, ...props },
  ref,
) {
  const ctx = React.useMemo(() => ({ state, theme }), [state, theme]);
  const computedRole = roleProp ?? (state === "error" ? "alert" : "status");
  return (
    <AlertStyleContext.Provider value={ctx}>
      <div
        ref={ref}
        data-slot="alert-root"
        data-alert-state={state}
        data-alert-theme={theme}
        role={computedRole}
        className={cn(alertRootVariants({ state, theme }), className)}
        {...props}
      >
        {children}
      </div>
    </AlertStyleContext.Provider>
  );
});

export type AlertIconProps = React.ComponentPropsWithoutRef<"div"> & {
  icon?: typeof SealCheck;
};

const AlertIcon = React.forwardRef<HTMLDivElement, AlertIconProps>(function AlertIcon(
  { className, icon: Icon = SealCheck, ...props },
  ref,
) {
  const { theme } = useAlertStyle();
  return (
    <div
      ref={ref}
      data-slot="alert-icon"
      className={cn(
        "flex w-8 shrink-0 flex-col items-center justify-center self-stretch text-current",
        alertMessageText[theme],
        className,
      )}
      {...props}
    >
      <ArmenifyIcon icon={Icon} size="large" strokeWeight="bold" className="shrink-0" />
    </div>
  );
});

export type AlertContentProps = React.ComponentPropsWithoutRef<"div">;

const AlertContent = React.forwardRef<HTMLDivElement, AlertContentProps>(function AlertContent(
  { className, ...props },
  ref,
) {
  const { theme } = useAlertStyle();
  return (
    <div
      ref={ref}
      data-slot="alert-content"
      className={cn(
        "flex min-w-0 flex-1 flex-col justify-center self-stretch p-[0.625rem] font-medium text-font-size-lg leading-[var(--font-font-height-lg)] tracking-normal",
        alertMessageText[theme],
        className,
      )}
      {...props}
    />
  );
});

export type AlertCloseProps = React.ComponentPropsWithoutRef<"button">;

const AlertClose = React.forwardRef<HTMLButtonElement, AlertCloseProps>(function AlertClose(
  { className, type = "button", ...props },
  ref,
) {
  const { theme } = useAlertStyle();
  const ghostVariant = theme === "dark" ? "secondary" : "tertiary";
  return (
    <button
      ref={ref}
      type={type}
      data-slot="alert-close"
      aria-label="Закрыть"
      className={cn(ghostButtonVariants({ variant: ghostVariant, size: "xxxs" }), "shrink-0 self-start", alertMessageText[theme], className)}
      {...props}
    >
      <span className="relative z-[1] inline-flex shrink-0 items-center justify-center">
        <ArmenifyIcon icon={X} size={ghostButtonSizeToArmenifyIconSize.xxxs} strokeWeight="bold" />
      </span>
    </button>
  );
});

export type AlertBannerProps = Omit<AlertRootProps, "children"> & {
  onClose?: () => void;
  children: React.ReactNode;
};

function AlertBanner({ onClose, children, ...rootProps }: AlertBannerProps) {
  return (
    <AlertRoot {...rootProps}>
      <AlertIcon />
      <AlertContent>{children}</AlertContent>
      {onClose != null ? <AlertClose type="button" onClick={onClose} /> : null}
    </AlertRoot>
  );
}

const Alert = {
  Root: AlertRoot,
  Icon: AlertIcon,
  Content: AlertContent,
  Close: AlertClose,
  Banner: AlertBanner,
};

export { Alert, AlertRoot, AlertIcon, AlertContent, AlertClose, AlertBanner, alertRootVariants };
