import { AppSidebar } from "@/components/pages/AppSidebar";
import { TraceabilityTable } from "@/components/pages/TraceabilityTable";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/(history)/history")({
  beforeLoad: ({ context, location }) => {
    if (!context.login) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AppSidebar />
      <div className="flex flex-col p-4 gap-4 w-full">
        <h1 className="text-4xl font-extrabold tracking-tight text-balance">
          Production History
        </h1>
        <TraceabilityTable />
      </div>
    </>
  );
}
