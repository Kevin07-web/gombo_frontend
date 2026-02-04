import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import DasboardSidebar from "../components/DasboardSidebar";
import type { PropsWithChildren } from "react";
import { Outlet } from "react-router";

type DashboardLayoutProps = PropsWithChildren;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-muted">
      {" "}
      <SidebarProvider>
        <DasboardSidebar />
        <main className="w-screen max-md:px-3">
          <SidebarTrigger />
          {children}
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
