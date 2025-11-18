import { useBatchContext } from "@/hooks/context/BatchContext";
import { Card, CardContent } from "../ui/card"; // Removed CardHeader as we integrate its content
import type { BatchTypes } from "@/interfaces/ProductionTypes";
import { StatusConstant } from "@/data/status-constant";
import { Button } from "../ui/button";
import { BatchCompletionForm } from "./BatchCompletionForm";
import { useState } from "react";
import {
  Settings, // Icon for product/batch type
  ArrowUp, // Icon for target quantity
  Clock, // Icon for status
  Play, // Icon for Start/Resume
  Pause, // Icon for Pause
  CheckCircle, // Icon for Complete (Implied by BatchCompletionForm)
} from "lucide-react";

export const BatchCard = ({ batch }: { batch: BatchTypes }) => {
  const {
    stateBatchContext: { updateBatch },
  } = useBatchContext();
  const [open, setOpen] = useState<boolean>(false);

  // Helper to get Status title and color classes
  const statusInfo = StatusConstant.find(
    (item) => item.status === batch.status
  );
  const statusTitle = statusInfo?.title || batch.status;

  // Function to determine status styling for the badge
  const getStatusClasses = (statusKey: string) => {
    switch (statusKey) {
      case "planned":
        return "text-blue-600 bg-blue-100 ring-blue-600/10";
      case "inProgress":
        return "text-yellow-600 bg-yellow-100 ring-yellow-600/10";
      case "paused":
        return "text-orange-600 bg-orange-100 ring-orange-600/10";
      case "completed":
        return "text-green-600 bg-green-100 ring-green-600/10";
      default:
        return "text-gray-600 bg-gray-100 ring-gray-600/10";
    }
  };

  // --- Handlers ---

  const handleStart = () => {
    updateBatch(batch.id, {
      ...batch,
      status: "inProgress",
      startTime: new Date().toISOString(),
    });
  };

  const handlePause = () => {
    updateBatch(batch.id, { ...batch, status: "paused" });
  };

  const handleResume = () => {
    updateBatch(batch.id, { ...batch, status: "inProgress" });
  };

  // --- Component JSX ---

  return (
    <Card className="max-w-sm w-full rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-200">
      <CardContent className="p-6 flex flex-col space-y-4">
        <div className="flex items-center space-x-3 mb-2">
          <Settings className="h-6 w-6 text-gray-600" />
          <div>
            <h3 className="text-2xl font-bold text-gray-900 leading-tight">
              {batch.id}
            </h3>
            <p className="text-gray-600 text-sm mt-0.5">{batch.product}</p>
          </div>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
          <div className="flex items-center">
            <ArrowUp className="h-4 w-4 mr-2 text-green-500" />
            <span>
              Target:{" "}
              <span className="font-semibold">
                {batch.targetQty} {batch.uom}
              </span>
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>
              Status:{" "}
              <span
                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusClasses(
                  batch.status
                )}`}
              >
                {statusTitle}
              </span>
            </span>
          </div>
        </div>
        {/* Action Button Section */}
        <div className="flex justify-end pt-4 space-x-2">
          {batch.status === "planned" && (
            <Button
              onClick={handleStart}
              className="flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            >
              <Play className="h-5 w-5 mr-2" />
              Start
            </Button>
          )}

          {batch.status === "inProgress" && (
            <>
              <Button
                variant={"outline"}
                onClick={handlePause}
                className="flex items-center text-orange-600 border-orange-300 hover:bg-orange-50"
              >
                <Pause className="h-5 w-5 mr-2" />
                Pause
              </Button>
              <Button
                onClick={() => setOpen(true)}
                className="flex items-center bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Complete
              </Button>
            </>
          )}

          {batch.status === "paused" && (
            <Button
              onClick={handleResume}
              className="flex items-center bg-blue-600 hover:bg-blue-700"
            >
              <Play className="h-5 w-5 mr-2" />
              Resume
            </Button>
          )}

          {/* Completion Form (always rendered, controls visibility via 'open' prop) */}
          {open && (
            <BatchCompletionForm batch={batch} open={open} setOpen={setOpen} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
