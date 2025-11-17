/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";

interface OperatorContextProps {
  contextOperatorName: string;
  setContextOperatorName: (name: string) => void;
}

const OperatorContextState = createContext<OperatorContextProps | undefined>(
  undefined
);

export const OperatorProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [contextOperatorName, setContextOperatorName] = useState<string>("");
  return (
    <OperatorContextState.Provider
      value={{ contextOperatorName, setContextOperatorName }}
    >
      {children}
    </OperatorContextState.Provider>
  );
};

export const useOperatorContext = () => {
  const stateOperatorContext = useContext(OperatorContextState);

  if (!stateOperatorContext) {
    throw new Error("useOperatorContext must be used within Provider!");
  }

  return { stateOperatorContext };
};
