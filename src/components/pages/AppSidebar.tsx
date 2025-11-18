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
import { GalleryHorizontalEnd, History } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { localStorageKey } from "@/data/status-constant";

export const AppSidebar = () => {
  const {
    stateOperatorContext: { setContextOperatorName },
  } = useOperatorContext();
  const navigate = useNavigate();
  return (
    <Sidebar className="flex">
      <SidebarHeader>
        <Card>
          <CardContent>
            Hi! {localStorage.getItem(localStorageKey.user)}
          </CardContent>
        </Card>
      </SidebarHeader>
      <SidebarContent className="m-2">
        <Card>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl">Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate({ to: "/dashboard" })}
                    className="text-lg"
                  >
                    <GalleryHorizontalEnd />
                    Production
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate({ to: "/history" })}
                    className="text-lg"
                  >
                    <History />
                    History
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </Card>
      </SidebarContent>
      <SidebarFooter>
        <Card>
          <CardContent>
            <Button
              className="w-full"
              onClick={() => {
                setContextOperatorName("");
                localStorage.removeItem(localStorageKey.user);
                navigate({ to: "/login" });
              }}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </SidebarFooter>
    </Sidebar>
  );
};
