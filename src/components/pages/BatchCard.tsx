import { useBatchContext } from "@/hooks/context/BatchContext";
import { Card, CardContent, CardHeader } from "../ui/card";
import type { BatchTypes } from "@/interfaces/BatchTypes";
import { StatusConstant } from "@/data/status-constant";
import { Button } from "../ui/button";

export const BatchCard = ({
  batch,
}: {
  batch: BatchTypes;
  onComplete: string;
}) => {
  const {
    stateBatchContext: { updateBatch, completeBatch },
  } = useBatchContext();

  return (
    <Card>
      <CardHeader>
        <h2 className="font-bold">{batch.id}</h2>
        <p className="text-sm text-gray-500">{batch.produt}</p>
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
            <Button
              className="ml-2"
              variant={"default"}
              onClick={() => completeBatch(batch)}
            >
              Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
