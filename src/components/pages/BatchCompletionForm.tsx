import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import type { BatchTypes } from "@/interfaces/ProductionTypes";
import { useBatchContext } from "@/hooks/context/BatchContext";
import { useOperatorContext } from "@/hooks/context/OperatorContext";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface IBatchCompletionForm {
  batch: BatchTypes;
  open: boolean;
  setOpen: (arg: boolean) => void;
}

export const BatchCompletionForm = ({
  batch,
  open,
  setOpen,
}: IBatchCompletionForm) => {
  const [yieldQty, setYield] = useState(0);
  const [scrapQty, setScrap] = useState(0);

  const {
    stateBatchContext: { completeBatch },
  } = useBatchContext();
  const {
    stateOperatorContext: { contextOperatorName },
  } = useOperatorContext();

  const lotNumber = `LOT-${batch.id}`;

  const submit = () => {
    completeBatch({
      ...batch,
      operator: contextOperatorName,
      lot: lotNumber,
      yieldQty,
      scrapQty,
    });

    setOpen(false);
    toast("Batch Completed Successfully!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-2" asChild>
        <Button>Complete</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogTitle>Complete Batch {batch.id}</DialogTitle>

        <Input
          type="number"
          placeholder="Yield quantity"
          onChange={(e) => setYield(Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Scrap quantity"
          onChange={(e) => setScrap(Number(e.target.value))}
        />

        <Button className="mt-4 w-full" onClick={submit}>
          Save & Finish
        </Button>
      </DialogContent>
    </Dialog>
  );
};
