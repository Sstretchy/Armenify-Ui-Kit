import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "phosphor-strokes-icons";

import { cn } from "@/lib/utils";
import { ArmenifyIcon, ghostButtonSizeToArmenifyIconSize } from "@/components/ui/icon";
import { ghostButtonVariants } from "@/components/ui/button/ghost-button";
import "./modal.css";

export type ModalColor = "brand" | "brand-dark" | "ntrl" | "ntrl-dark";

export type ModalOverlayTone = "dark" | "light";

type ModalContextValue = {
  color: ModalColor;
  overlayTone: ModalOverlayTone;
};

const ModalContext = React.createContext<ModalContextValue>({
  color: "brand",
  overlayTone: "dark",
});

function useModalContext(): ModalContextValue {
  return React.useContext(ModalContext);
}

const overlayToneClassName: Record<ModalOverlayTone, string> = {
  dark: "bg-black/25 backdrop-blur-[0.75rem]",
  light: "bg-white/25 backdrop-blur-[0.5rem]",
};

const panelShellClassName: Record<ModalColor, string> = {
  brand:
    "inner-border inner-border-1 [--inner-border-color:var(--semantic-border-brand-default)] bg-semantic-bg-brand-primary shadow-input-shadow-outer",
  "brand-dark":
    "inner-border inner-border-1 [--inner-border-color:var(--semantic-border-brand-default-inverse)] bg-semantic-bg-brand-primary-inverse shadow-input-shadow-outer",
  ntrl:
    "inner-border inner-border-1 [--inner-border-color:var(--semantic-border-ntrl-default)] bg-semantic-bg-ntrl-secondary shadow-input-shadow-outer",
  "ntrl-dark":
    "inner-border inner-border-1 [--inner-border-color:var(--semantic-border-ntrl-default-inverse)] bg-semantic-bg-ntrl-secondary-inverse shadow-input-shadow-outer",
};

const headerStripClassName: Record<ModalColor, string> = {
  brand:
    "border-b border-solid border-semantic-border-brand-delicate bg-semantic-bg-brand-secondary",
  "brand-dark":
    "border-b border-solid border-semantic-border-brand-delicate-inverse bg-semantic-bg-brand-secondary-inverse",
  ntrl: "border-b border-solid border-semantic-border-ntrl-delicate bg-semantic-bg-ntrl-secondary",
  "ntrl-dark":
    "border-b border-solid border-semantic-border-ntrl-delicate-inverse bg-semantic-bg-ntrl-tertiary-inverse",
};

const titleClassName: Record<ModalColor, string> = {
  brand: "text-components-typography-brand-light-content-light",
  "brand-dark": "text-components-typography-brand-dark-content-light",
  ntrl: "text-components-typography-ntrl-light-content-light",
  "ntrl-dark": "text-components-typography-ntrl-dark-content-light",
};

const descriptionClassName: Record<ModalColor, string> = {
  brand: "text-components-typography-brand-light-sub-label",
  "brand-dark": "text-components-typography-brand-dark-sub-label",
  ntrl: "text-components-typography-brand-light-sub-label",
  "ntrl-dark": "text-components-typography-brand-dark-sub-label",
};

const bodyTextClassName: Record<ModalColor, string> = {
  brand: "text-components-typography-brand-light-content",
  "brand-dark": "text-components-typography-brand-dark-content",
  ntrl: "text-components-typography-ntrl-light-content",
  "ntrl-dark": "text-components-typography-ntrl-dark-content",
};

/** Только ntrl light: тело на белом фоне, шапка/футер на secondary (Figma 250:12276). */
const bodySurfaceClassName: Record<ModalColor, string> = {
  brand: "",
  "brand-dark": "",
  ntrl: "bg-semantic-bg-ntrl-primary",
  "ntrl-dark": "",
};

const footerBorderClassName: Record<ModalColor, string> = {
  brand: "border-t border-solid border-semantic-border-brand-delicate",
  "brand-dark": "border-t border-solid border-semantic-border-brand-delicate-inverse",
  ntrl: "border-t border-solid border-semantic-border-ntrl-delicate",
  "ntrl-dark": "border-t border-solid border-semantic-border-ntrl-delicate-inverse",
};

export type ModalRootProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> & {
  color?: ModalColor;
  /** Default overlays use rem-based blur values so modal scaling follows the root font size. */
  overlayTone?: ModalOverlayTone;
};

function ModalRoot({ color = "brand", overlayTone: overlayToneProp, children, ...props }: ModalRootProps) {
  const overlayTone: ModalOverlayTone =
    overlayToneProp ?? (color === "brand" || color === "ntrl" ? "dark" : "light");
  const ctx = React.useMemo(() => ({ color, overlayTone }), [color, overlayTone]);
  return (
    <ModalContext.Provider value={ctx}>
      <DialogPrimitive.Root data-slot="modal-root" data-modal-color={color} {...props}>
        {children}
      </DialogPrimitive.Root>
    </ModalContext.Provider>
  );
}

const ModalTrigger = DialogPrimitive.Trigger;

const ModalPortal = DialogPrimitive.Portal;

export type ModalOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

const ModalOverlay = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, ModalOverlayProps>(
  function ModalOverlay({ className, ...props }, ref) {
    const { overlayTone } = useModalContext();
    return (
      <DialogPrimitive.Overlay
        ref={ref}
        data-slot="modal-overlay"
        className={cn(
          "fixed inset-0 z-50 data-[state=open]:pointer-events-auto data-[state=closed]:pointer-events-none data-[state=open]:animate-[am-modal-overlay-in_220ms_ease-out_forwards]",
          overlayToneClassName[overlayTone],
          className,
        )}
        {...props}
      />
    );
  },
);

export type ModalContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

const ModalContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, ModalContentProps>(
  function ModalContent({ className, children, ...props }, ref) {
    const { color } = useModalContext();
    return (
      <DialogPrimitive.Content
        ref={ref}
        data-slot="modal-content"
        className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 font-sans antialiased outline-none pointer-events-none focus-visible:outline-none data-[state=open]:[&_[data-slot=modal-content-panel]]:animate-[am-modal-content-in_240ms_cubic-bezier(0.16,1,0.3,1)_forwards]"
        {...props}
      >
        <div
          data-slot="modal-content-panel"
          className={cn(
            "pointer-events-auto flex max-h-[min(90vh,40rem)] w-[min(100vw-2rem,35.25rem)] flex-col overflow-hidden rounded-border-x-lg outline-none",
            "focus-visible:outline-none focus-visible:shadow-control-shadow-outer-focused",
            panelShellClassName[color],
            className,
          )}
        >
          {children}
        </div>
      </DialogPrimitive.Content>
    );
  },
);

export type ModalHeaderProps = React.ComponentPropsWithoutRef<"div">;

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(function ModalHeader(
  { className, ...props },
  ref,
) {
  const { color } = useModalContext();
  return (
    <div
      ref={ref}
      data-slot="modal-header"
      className={cn(
        "flex min-h-[4.25rem] min-w-0 items-center justify-between gap-10 px-5 py-3",
        headerStripClassName[color],
        className,
      )}
      {...props}
    />
  );
});

export type ModalTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

const ModalTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, ModalTitleProps>(
  function ModalTitle({ className, ...props }, ref) {
    const { color } = useModalContext();
    return (
      <DialogPrimitive.Title
        ref={ref}
        data-slot="modal-title"
        className={cn(
          "min-w-0 font-medium text-font-size-xl leading-[var(--font-font-height-xl)] tracking-normal",
          titleClassName[color],
          className,
        )}
        {...props}
      />
    );
  },
);

export type ModalDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  ModalDescriptionProps
>(function ModalDescription({ className, ...props }, ref) {
  const { color } = useModalContext();
  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="modal-description"
      className={cn(
        "mt-1 font-medium text-font-size-sm leading-[var(--font-font-height-sm)] tracking-normal",
        descriptionClassName[color],
        className,
      )}
      {...props}
    />
  );
});

export type ModalBodyProps = React.ComponentPropsWithoutRef<"div">;

const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(function ModalBody(
  { className, ...props },
  ref,
) {
  const { color } = useModalContext();
  return (
    <div
      ref={ref}
      data-slot="modal-body"
      className={cn(
        "min-h-0 min-w-0 flex-1 overflow-y-auto p-5 font-normal text-font-size-lg leading-[var(--font-font-height-lg)] tracking-normal",
        bodyTextClassName[color],
        bodySurfaceClassName[color],
        className,
      )}
      {...props}
    />
  );
});

export type ModalFooterProps = React.ComponentPropsWithoutRef<"div">;

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(function ModalFooter(
  { className, ...props },
  ref,
) {
  const { color } = useModalContext();
  return (
    <div
      ref={ref}
      data-slot="modal-footer"
      className={cn(
        "flex min-w-0 flex-wrap items-center justify-between gap-3 px-5 py-4",
        footerBorderClassName[color],
        className,
      )}
      {...props}
    />
  );
});

export type ModalCloseProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

const ModalClose = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Close>, ModalCloseProps>(
  function ModalClose({ className, type = "button", ...props }, ref) {
    const { color } = useModalContext();
    const ghostVariant = color === "brand" || color === "ntrl" ? "secondary" : "tertiary";
    return (
      <DialogPrimitive.Close
        ref={ref}
        type={type}
        data-slot="modal-close"
        aria-label="Закрыть"
        className={cn(ghostButtonVariants({ variant: ghostVariant, size: "xxxs" }), "shrink-0", className)}
        {...props}
      >
        <span className="relative z-[1] inline-flex shrink-0 items-center justify-center">
          <ArmenifyIcon icon={X} size={ghostButtonSizeToArmenifyIconSize.xxxs} strokeWeight="bold" />
        </span>
      </DialogPrimitive.Close>
    );
  },
);

const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Portal: ModalPortal,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooter,
  Close: ModalClose,
};

export {
  Modal,
  ModalRoot,
  ModalTrigger,
  ModalPortal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
};
