import type { FC, ReactNode } from "react";
import { OperatorProvider } from "./OperatorContext";
import { BatchProvider } from "./BatchContext";

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <OperatorProvider>
      <BatchProvider>{children}</BatchProvider>
    </OperatorProvider>
  );
};
