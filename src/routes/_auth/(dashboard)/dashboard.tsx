import { BatchCard } from "@/components/pages/BatchCard";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useBatchContext } from "@/hooks/context/BatchContext";
import { AppSidebar } from "@/components/pages/AppSidebar";

export const Route = createFileRoute("/_auth/(dashboard)/dashboard")({
  beforeLoad: ({ context, location }) => {
    if (!context.login) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  const {
    stateBatchContext: { contextBatch },
  } = useBatchContext();
  return (
    <>
      <AppSidebar />
      <div className="flex flex-col p-4 gap-4 w-full">
        <h1 className="text-4xl font-extrabold tracking-tight text-balance">
          Production List
        </h1>
        {contextBatch.map((item) => (
          <div key={item.id} className="">
            <BatchCard batch={item} />
          </div>
        ))}
      </div>
    </>
  );
}
