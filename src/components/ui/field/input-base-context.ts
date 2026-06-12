import * as React from "react";

export type InputBaseContextValue = {
  controlId: string;
  labelId?: string;
  helperId?: string;
  invalid: boolean;
};

function inputBaseLabelId(controlId: string): string {
  return `${controlId}-label`;
}

function inputBaseHelperId(controlId: string): string {
  return `${controlId}-helper`;
}

const InputBaseContext = React.createContext<InputBaseContextValue | null>(null);

function useInputBaseContext(): InputBaseContextValue | null {
  return React.useContext(InputBaseContext);
}

export { InputBaseContext, inputBaseHelperId, inputBaseLabelId, useInputBaseContext };
