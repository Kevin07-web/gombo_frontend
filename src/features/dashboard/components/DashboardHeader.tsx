import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Bell } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function DashboardHeader() {
  return (
    <header
      className="
      sticky top-0 z-10
      h-14
      border-b bg-background/80 backdrop-blur
      flex items-center justify-between
      px-4
    "
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <div
          className="
          w-8 h-8 rounded-full bg-secondary
          flex items-center justify-center
          text-sm font-medium
          text-secondary-foreground
        "
        >
          U
        </div>
      </div>
    </header>
  );
}
