import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOperatorContext } from "@/hooks/context/OperatorContext";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginLayout,
});

function LoginLayout() {
  const {
    stateOperatorContext: { setContextOperatorName, contextOperatorName },
  } = useOperatorContext();
  const navigate = useNavigate();

  const operators = ["Tatas", "Fachrul"];

  const checkUser = () => {
    if (contextOperatorName === "") {
      toast("Please select Operator first!", {
        dismissible: true,
        duration: 3000,
      });
    }

    localStorage.setItem("user.operator", contextOperatorName);

    navigate({ to: "/dashboard" });
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Card className="p-8 w-full max-w-sm">
        <div className="flex flex-col gap-6 max-w-sm mx-auto">
          <h1 className="text-xl font-bold">Select Operator</h1>

          <Select onValueChange={setContextOperatorName}>
            <SelectTrigger className="self-center">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              {operators.map((op) => (
                <SelectItem value={op} key={op}>
                  {op}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="w-full" onClick={checkUser}>
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}
