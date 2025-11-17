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

export const TraceabilityTable = () => {
  const {
    stateBatchContext: { contextHistoryBatch },
  } = useBatchContext();

  const duration = (startTime: string | null, endTime: string | null) => {
    const timeDiff = moment(endTime).diff(startTime);

    const totalMinutes = Math.floor(timeDiff / 1000 / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lot</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Yield</TableHead>
          <TableHead>Scrap</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Start</TableHead>
          <TableHead>End</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {contextHistoryBatch.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.lot}</TableCell>
            <TableCell>{item.product}</TableCell>
            <TableCell>{item.yieldQty}</TableCell>
            <TableCell>{item.scrapQty}</TableCell>
            <TableCell>{duration(item.startTime, item.endTime)}</TableCell>
            <TableCell>
              {moment(item.startTime).format("HH:MM DD-MM-YYYY")}
            </TableCell>
            <TableCell>
              {moment(item.endTime).format("HH:MM DD-MM-YYYY")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
