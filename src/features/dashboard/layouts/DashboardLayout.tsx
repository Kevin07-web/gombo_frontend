import { SidebarProvider } from "@/shared/components/ui/sidebar";
import DasboardSidebar from "../components/DasboardSidebar";
import type { PropsWithChildren } from "react";
import { Outlet } from "react-router";
import DashboardHeader from "../components/DashboardHeader";

type DashboardLayoutProps = PropsWithChildren;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="">
      <SidebarProvider>
        <DasboardSidebar />
        <main className="w-screen max-md:px-3">
          <DashboardHeader />
          <div className="max-md:px-2">
            {children}
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
