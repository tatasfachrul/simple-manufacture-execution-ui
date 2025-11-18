import type { BatchTypes } from "@/interfaces/ProductionTypes";
import { useCallback, useEffect, useMemo, useState } from "react";
import "@xyflow/react/dist/style.css";
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "../ui/dialog";
import { useBatchContext } from "@/hooks/context/BatchContext";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type NodeChange,
  type EdgeChange,
} from "@xyflow/react";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import moment from "moment";

interface TraceabilityGraphProps {
  lot: BatchTypes;
  onClose: (args: boolean) => void;
}

interface NodesTypes {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
}

const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
  { id: "n2", position: { x: 200, y: 0 }, data: { label: "Node 2" } },
];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

export const TraceabilityGraph = ({ lot, onClose }: TraceabilityGraphProps) => {
  const [nodes, setNodes] = useState<NodesTypes[]>(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const {
    stateBatchContext: { contextProductionLot },
  } = useBatchContext();

  const data = useMemo(
    () => contextProductionLot?.lots.find((item) => item.lot === lot.lot),
    [lot, contextProductionLot]
  );

  const batchNodeId = `batch-${lot.id}`;
  const lotNodeId = `lot-${lot.lot}`;

  useEffect(() => {
    const materials = data?.inputs;
    // SET NODES
    // Materials
    const nodesMaterials =
      materials?.map((item, index) => {
        return {
          id: `m-${index + 1}`,
          position: { x: 0 + index * 200, y: 0 },
          data: { label: item.material },
        };
      }) ?? [];

    // Batch Production
    const nodesBatch = {
      id: batchNodeId,
      position: { x: 200, y: 100 },
      data: { label: data?.batchId ?? "" },
    };

    // Lot Production
    const nodesLot = {
      id: lotNodeId,
      position: { x: 200, y: 200 },
      data: { label: data?.lot ?? "" },
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNodes([...nodesMaterials, nodesBatch, nodesLot]);

    // SET EDGES
    // Materials -> Batch
    const edgesMaterials = nodesMaterials?.map((item) => {
      return {
        id: `${item.id}-${batchNodeId}`,
        source: item.id,
        target: batchNodeId ?? "",
      };
    });

    const edgesBatch = {
      id: `${batchNodeId}-${lotNodeId}`,
      source: batchNodeId ?? "",
      target: lotNodeId ?? "",
    };
    setEdges([...edgesMaterials, edgesBatch]);
  }, []);

  const onNodesChange = useCallback(
    (
      changes: NodeChange<{
        id: string;
        position: { x: number; y: number };
        data: { label: string };
      }>[]
    ) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<{ id: string; source: string; target: string }>[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );
  if (!lot) return null;

  return (
    <Dialog open={!!lot} onOpenChange={onClose}>
      <DialogContent className="max-w-none! w-auto min-w-3xl">
        <DialogHeader className="border-b border-gray-200 p-2">
          <DialogTitle>{`${lot.lot} - ${lot.product}`}</DialogTitle>
        </DialogHeader>
        <div className="p-2 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 text-sm">
            {/* Lot Number */}
            <div className="flex flex-col">
              <Label className="text-gray-500 flex items-center mb-1">
                Lot Number
              </Label>
              <p className="font-semibold text-md text-gray-800">{lot.lot}</p>
            </div>
            {/* Batch Number */}
            <div className="flex flex-col">
              <Label className="text-gray-500 flex items-center mb-1">
                Batch Number
              </Label>
              <p className="font-semibold text-md text-gray-800">{lot.id}</p>
            </div>
            {/* Operator */}
            <div className="flex flex-col">
              <Label className="text-gray-500 mb-1">Operator</Label>
              <p className="font-medium text-gray-800">{lot.operator}</p>
            </div>
            {/* Target Qty */}
            <div className="flex flex-col">
              <Label className="text-gray-500 flex items-center mb-1">
                Target Qty
              </Label>
              <p className="font-medium text-gray-800">
                {lot.targetQty} {lot.uom}
              </p>
            </div>
            {/* Yield Qty */}
            <div className="flex flex-col">
              <Label className="text-gray-500 mb-1">Yield Qty</Label>
              <p className="font-medium text-gray-800">
                {lot.yieldQty} {lot.uom}
              </p>
            </div>

            {/* Scrap Qty */}
            <div className="flex flex-col">
              <Label className="text-gray-500 mb-1">Scrap Qty</Label>
              <p className="font-medium text-red-600">
                {lot.scrapQty} {lot.uom}
              </p>
            </div>
            {/* Start Time */}
            <div className="flex flex-col">
              <Label className="text-gray-500 flex items-center mb-1">
                Start Time
              </Label>
              <p className="font-medium text-gray-800 tabular-nums">
                {lot.startTime
                  ? moment(lot.startTime).format("HH:mm D-MM-YYYY")
                  : "-"}
              </p>
            </div>

            {/* End Time */}
            <div className="flex flex-col">
              <Label className="text-gray-500 mb-1">End Time</Label>
              <p className="font-medium text-gray-800 tabular-nums">
                {lot.endTime
                  ? moment(lot.endTime).format("HH:mm D-MM-YYYY")
                  : "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700">
            Production Flow
          </h3>
          <div
            className="rounded-lg border border-gray-300 bg-gray-50 shadow-inner"
            style={{ height: 300 }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodesFocusable={true}
              edgesFocusable={true}
              fitView
            />
          </div>
        </div>
        <div>
          <Label className="text-gray-500" htmlFor="materialsInput">
            Materials Used
          </Label>
          <Table id="materialsInput">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Qty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.inputs.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.material}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
