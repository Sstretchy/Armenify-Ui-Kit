import { Fragment, StrictMode, type ReactNode } from "react";
import { createRoot, type Root, type RootOptions } from "react-dom/client";

import { App } from "@/app/App";

export type MountOptions = Partial<
  Pick<RootOptions, "identifierPrefix" | "onCaughtError" | "onRecoverableError" | "onUncaughtError">
> & {
  children?: ReactNode;
  strictMode?: boolean;
};

export type ArmenifyMountHandle = {
  unmount: () => void;
  rerender: (next: ReactNode) => void;
};

export type ArmenifyMicrofrontendHandle = ArmenifyMountHandle;

function wrap(node: ReactNode, strictMode: boolean) {
  if (strictMode) {
    return <StrictMode>{node}</StrictMode>;
  }
  return <Fragment>{node}</Fragment>;
}

function pickRootOptions(options: MountOptions | undefined): RootOptions {
  if (options == null) {
    return {};
  }
  const { identifierPrefix, onCaughtError, onRecoverableError, onUncaughtError } = options;
  const rootOptions: RootOptions = {};
  if (identifierPrefix !== undefined) {
    rootOptions.identifierPrefix = identifierPrefix;
  }
  if (onCaughtError !== undefined) {
    rootOptions.onCaughtError = onCaughtError;
  }
  if (onRecoverableError !== undefined) {
    rootOptions.onRecoverableError = onRecoverableError;
  }
  if (onUncaughtError !== undefined) {
    rootOptions.onUncaughtError = onUncaughtError;
  }
  return rootOptions;
}

export function mount(container: HTMLElement, options?: MountOptions): ArmenifyMountHandle {
  const { strictMode = true, children } = options ?? {};
  const root: Root = createRoot(container, pickRootOptions(options));
  const initial = children ?? <App />;

  const render = (node: ReactNode) => {
    root.render(wrap(node, strictMode));
  };

  render(initial);

  return {
    unmount() {
      root.unmount();
    },
    rerender(next) {
      render(next);
    },
  };
}
