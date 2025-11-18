import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import type { BatchTypes } from "@/interfaces/ProductionTypes";
import { useBatchContext } from "@/hooks/context/BatchContext";
import { useOperatorContext } from "@/hooks/context/OperatorContext";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { localStorageKey } from "@/data/status-constant";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { materials } from "@/data/materials";

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
  const [ingredients, setIngredients] = useState(materials);

  const {
    stateBatchContext: { completeBatch },
  } = useBatchContext();
  const {
    stateOperatorContext: { contextOperatorName },
  } = useOperatorContext();

  const lotNumber = `LOT-${batch.id}-01`;
  const user = localStorage.getItem(localStorageKey.user);

  const submit = () => {
    if (yieldQty === 0) return showError("Yield Qty cannot be blank");

    completeBatch(
      {
        ...batch,
        operator: user || contextOperatorName,
        lot: lotNumber,
        yieldQty,
        scrapQty,
      },
      ingredients
    );

    setOpen(false);
    toast("Batch Completed Successfully");
  };

  const showError = (msg: string) => {
    alert(msg);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogTitle>Complete Batch {batch.id}</DialogTitle>

        <div className="flex flex-col gap-1">
          <Label htmlFor="batchId">Batch ID</Label>
          <Input
            id="batchId"
            type="string"
            placeholder="Batch ID"
            value={batch.id}
            disabled
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="yieldQty" aria-required>
            <p className="text-red-500">*</p>Actual Yield
          </Label>
          <Input
            id="yieldQty"
            type="number"
            placeholder={yieldQty.toString()}
            onChange={(e) => setYield(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="scrapQty">Scrap Quantity</Label>
          <Input
            id="scrapQty"
            type="number"
            placeholder={scrapQty.toString()}
            onChange={(e) => setScrap(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="lotNumber">LOT Number</Label>
          <Input
            id="lotNumber"
            type="string"
            placeholder="Scrap quantity"
            value={lotNumber}
            disabled
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="materialsInput">Materials</Label>
          <Table id="materialsInput">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Qty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.material}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="0"
                      onChange={(e) => {
                        const qty = Number(e.target.value);

                        setIngredients((prev) =>
                          prev.map((mat) =>
                            mat.id === item.id ? { ...mat, qty } : mat
                          )
                        );
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button className="mt-4 w-full" onClick={submit}>
          Save & Finish
        </Button>
      </DialogContent>
    </Dialog>
  );
};
