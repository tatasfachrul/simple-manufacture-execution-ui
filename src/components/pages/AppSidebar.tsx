import { useOperatorContext } from "@/hooks/context/OperatorContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { GalleryHorizontalEnd, History, LogOut } from "lucide-react"; // Added LogOut icon
import { useNavigate } from "@tanstack/react-router";
import { localStorageKey } from "@/data/status-constant";
import { Label } from "../ui/label";

export const AppSidebar = () => {
  const {
    stateOperatorContext: { setContextOperatorName },
  } = useOperatorContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setContextOperatorName("");
    localStorage.removeItem(localStorageKey.user);
    navigate({ to: "/login" });
  };

  return (
    <Sidebar className="flex flex-col h-full bg-gray-900 transition-all duration-300 w-64 fixed top-0 left-0 z-20 shadow-xl">
      <SidebarHeader className="p-4 border-b">
        <Card className="mt-4 border-none shadow-md">
          <CardContent className="p-3 text-sm font-medium text-gray-800">
            Welcome, {localStorage.getItem(localStorageKey.user)}
          </CardContent>
        </Card>
      </SidebarHeader>

      <SidebarContent className="grow p-4 space-y-6 overflow-y-auto">
        {/* Main Menu Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase font-semibold mb-2 tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {/* Production Link */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate({ to: "/dashboard" })}
                  className="w-full justify-start text-base font-medium py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <GalleryHorizontalEnd className="h-5 w-5 mr-3 text-gray-800" />
                  <Label className="text-gray-800">Production</Label>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* History Link */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate({ to: "/history" })}
                  className="w-full justify-start text-base font-medium py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 "
                >
                  <History className="h-5 w-5 mr-3 text-gray-800" />
                  <Label className="text-gray-800">History</Label>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <Button
          className="w-full flex items-center justify-center text-base font-medium bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
