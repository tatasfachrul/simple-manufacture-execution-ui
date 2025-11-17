import { BatchCard } from "@/components/pages/BatchCard";
import { createFileRoute } from "@tanstack/react-router";
import { useBatchContext } from "@/hooks/context/BatchContext";
export const Route = createFileRoute("/_auth/dashboard/")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const {
    stateBatchContext: { contextBatch },
  } = useBatchContext();
  return (
    <div className="flex flex-col p-4 gap-4">
      {contextBatch.map((item) => (
        <div key={item.id}>
          <BatchCard batch={item} onComplete="" />
        </div>
      ))}
    </div>
  );
}
