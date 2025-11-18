import { AppSidebar } from "@/components/pages/AppSidebar";
import { TraceabilityGraph } from "@/components/pages/TraceabilityGraph";
import { TraceabilityTable } from "@/components/pages/TraceabilityTable";
import type { BatchTypes } from "@/interfaces/ProductionTypes";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_auth/(history)/history")({
  beforeLoad: ({ context, location }) => {
    if (!context.login) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  component: HistoryLayout,
});

function HistoryLayout() {
  const [selectedLot, setSelectedLot] = useState<BatchTypes | null>(null);
  return (
    <>
      <AppSidebar />
      <div className="flex flex-col p-4 gap-4 w-full">
        <h1 className="text-4xl font-extrabold tracking-tight text-balance">
          Production History
        </h1>
        <TraceabilityTable onRowClicked={setSelectedLot} />

        {selectedLot && (
          <TraceabilityGraph
            lot={selectedLot}
            onClose={() => setSelectedLot(null)}
          />
        )}
      </div>
    </>
  );
}
