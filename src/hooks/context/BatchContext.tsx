/* eslint-disable react-refresh/only-export-components */
import type {
  BatchTypes,
  ProductionLotDetailTypes,
  ProductionLotTypes,
  ProductionMaterialsTypes,
} from "@/interfaces/ProductionTypes";
import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";

import batchesData from "../../data/batches.json";
import { localStorageKey } from "@/data/status-constant";

const data = JSON.parse(JSON.stringify(batchesData));

interface BatchContextProps {
  contextBatch: BatchTypes[];
  setContextBatch: (data: BatchTypes[]) => void;
  contextHistoryBatch: BatchTypes[];
  setContextHistoryBatch: (data: BatchTypes[]) => void;
  updateBatch: (id: string, updates: BatchTypes) => void;
  completeBatch: (
    result: BatchTypes,
    materials: ProductionMaterialsTypes[]
  ) => void;
  contextProductionLot: ProductionLotTypes | null;
  setContextProductionLot: (data: ProductionLotTypes) => void;
}

const BatchContextState = createContext<BatchContextProps | undefined>(
  undefined
);

export const BatchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [contextBatch, setContextBatch] = useState<BatchTypes[]>(data);
  const [contextHistoryBatch, setContextHistoryBatch] = useState<BatchTypes[]>(
    []
  );
  const [contextProductionLot, setContextProductionLot] =
    useState<ProductionLotTypes | null>(null);

  const user = localStorage.getItem(localStorageKey.user);

  const updateBatch = (id: string, updates: BatchTypes) => {
    setContextBatch((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, ...updates, operator: user || "" } : b
      )
    );
  };

  const completeBatch = (
    result: BatchTypes,
    materials: ProductionMaterialsTypes[]
  ) => {
    result = {
      ...result,
      status: "completed",
      endTime: new Date().toISOString(),
    };
    updateBatch(result.id, result);

    // Insert to History
    setContextHistoryBatch((prev) => [...prev, result]);

    // Production Result
    let data = contextProductionLot;
    const productionResult: ProductionLotDetailTypes = {
      lot: result.lot,
      product: result.product,
      inputs: materials,
      yield: result.yieldQty,
      batchId: result.id,
    };

    if (data !== null) {
      data.lots.push(productionResult);
      setContextProductionLot(data);
    } else {
      data = {
        lots: [productionResult],
      };
      setContextProductionLot(data);
    }
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
        contextProductionLot,
        setContextProductionLot,
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
