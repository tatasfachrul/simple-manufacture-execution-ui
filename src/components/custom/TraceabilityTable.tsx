import { useBatchContext } from "@/hooks/context/BatchContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import moment from "moment";
import type { BatchTypes } from "@/interfaces/ProductionTypes";

interface TraceabilityTableProps {
  onRowClicked: (arg: BatchTypes) => void;
}

export const TraceabilityTable = ({ onRowClicked }: TraceabilityTableProps) => {
  const {
    stateBatchContext: { contextHistoryBatch },
  } = useBatchContext();

  const duration = (startTime: string | null, endTime: string | null) => {
    if (!startTime || !endTime) return "-";

    const timeDiff = moment(endTime).diff(startTime);
    if (timeDiff < 0) return "-";

    const totalMinutes = Math.floor(timeDiff / 1000 / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours.toString().padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m`;
  };

  return (
    <div className="rounded-lg border shadow-sm overflow-hidden bg-white">
      <Table>
        <TableHeader className="bg-gray-50 border-b border-gray-200">
          <TableRow className="hover:bg-gray-50">
            <TableHead className="font-semibold text-gray-700 w-[150px] whitespace-nowrap">
              Lot
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Product
            </TableHead>
            <TableHead className="font-semibold text-gray-700 text-right w-[100px]">
              Yield
            </TableHead>
            <TableHead className="font-semibold text-gray-700 text-right w-[100px]">
              Scrap
            </TableHead>
            <TableHead className="font-semibold text-gray-700 text-center w-[120px]">
              Duration
            </TableHead>
            <TableHead className="font-semibold text-gray-700 w-[150px]">
              Operator
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {contextHistoryBatch.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => onRowClicked(item)}
              className="cursor-pointer hover:bg-blue-50/50 transition-colors duration-150"
            >
              <TableCell className="font-medium text-gray-800">
                {item.lot}
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {item.product}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {item.yieldQty} {item.uom}
              </TableCell>
              <TableCell className="text-right text-red-600 tabular-nums">
                {item.scrapQty} {item.uom}
              </TableCell>
              <TableCell className="text-center tabular-nums font-mono text-sm">
                {duration(item.startTime, item.endTime)}
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {item.operator}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
