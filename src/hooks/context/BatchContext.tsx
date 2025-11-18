/* eslint-disable react-refresh/only-export-components */
import type { BatchTypes } from "@/interfaces/ProductionTypes";
import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";

import batchesData from "../../data/batches.json";

const data = JSON.parse(JSON.stringify(batchesData));

interface BatchContextProps {
  contextBatch: BatchTypes[];
  setContextBatch: (data: BatchTypes[]) => void;
  contextHistoryBatch: BatchTypes[];
  setContextHistoryBatch: (data: BatchTypes[]) => void;
  updateBatch: (id: string, updates: BatchTypes) => void;
  completeBatch: (result: BatchTypes) => void;
}

const BatchContextState = createContext<BatchContextProps | undefined>(
  undefined
);

export const BatchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [contextBatch, setContextBatch] = useState<BatchTypes[]>(data);
  const [contextHistoryBatch, setContextHistoryBatch] = useState<BatchTypes[]>(
    []
  );

  const updateBatch = (id: string, updates: BatchTypes) => {
    setContextBatch((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const completeBatch = (result: BatchTypes) => {
    result = {
      ...result,
      status: "completed",
      endTime: new Date().toISOString(),
    };
    updateBatch(result.id, result);

    setContextHistoryBatch((prev) => [...prev, result]);
  };

  return (
    <BatchContextState.Provider
      value={{
        contextBatch,
        setContextBatch,
        contextHistoryBatch,
        setContextHistoryBatch,
        updateBatch,
        completeBatch,
      }}
    >
      {children}
    </BatchContextState.Provider>
  );
};

export const useBatchContext = () => {
  const stateBatchContext = useContext(BatchContextState);

  if (!stateBatchContext) {
    throw new Error("useBatchContext must be used within Provider!");
  }

  return { stateBatchContext };
};
