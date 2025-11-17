import { useBatchContext } from "@/hooks/context/BatchContext";
import { Card, CardContent, CardHeader } from "../ui/card";
import type { BatchTypes } from "@/interfaces/BatchTypes";
import { StatusConstant } from "@/data/status-constant";
import { Button } from "../ui/button";
import { BatchCompletionForm } from "./BatchCompletionForm";
import { useState } from "react";

export const BatchCard = ({ batch }: { batch: BatchTypes }) => {
  const {
    stateBatchContext: { updateBatch },
  } = useBatchContext();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Card>
      <CardHeader>
        <h2 className="font-bold">{batch.id}</h2>
        <p className="text-sm text-gray-500">{batch.product}</p>
      </CardHeader>
      <CardContent>
        <p>
          Target: {batch.targetQty} {batch.uom}
        </p>
        <p>
          Status:{" "}
          <b>
            {StatusConstant.find((item) => item.status === batch.status)?.title}
          </b>
        </p>

        <div>
          {batch.status === "planned" && (
            <Button
              onClick={() =>
                updateBatch(batch.id, {
                  ...batch,
                  status: "inProgress",
                  startTime: new Date().toISOString(),
                })
              }
            >
              Start
            </Button>
          )}

          {batch.status === "inProgress" && (
            <Button
              variant={"secondary"}
              onClick={() =>
                updateBatch(batch.id, { ...batch, status: "paused" })
              }
            >
              Pause
            </Button>
          )}

          {batch.status === "paused" && (
            <Button
              variant={"secondary"}
              onClick={() =>
                updateBatch(batch.id, { ...batch, status: "inProgress" })
              }
            >
              Resume
            </Button>
          )}
          {batch.status === "inProgress" && (
            <BatchCompletionForm batch={batch} open={open} setOpen={setOpen} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
