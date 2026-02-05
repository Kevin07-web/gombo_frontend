import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";

import { Link } from "react-router";
import {
  Users,
  FileText,
  LayoutDashboard,
  Star,
  TriangleAlert,
  Wrench,
  Home,
  Building2,
  Map,
  Globe,
  Shield,
} from "lucide-react";

const menuSections = [
  {
    title: "Utilisateurs",
    items: [
      { id: 1, title: "Users", href: "/users", icon: <Users size={18} /> },
      { id: 2, title: "Roles", href: "/roles", icon: <Shield size={18} /> },
    ],
  },
  {
    title: "Gestion",
    items: [
      {
        id: 3,
        title: "Demandes",
        href: "/demandes",
        icon: <FileText size={18} />,
      },
      {
        id: 4,
        title: "Categories",
        href: "/categories",
        icon: <LayoutDashboard size={18} />,
      },
      {
        id: 5,
        title: "Services",
        href: "/services",
        icon: <Wrench size={18} />,
      },
      {
        id: 6,
        title: "Evaluations",
        href: "/evaluations",
        icon: <Star size={18} />,
      },
      {
        id: 7,
        title: "Reclamations",
        href: "/reclamations",
        icon: <TriangleAlert size={18} />,
      },
    ],
  },
  {
    title: "Localisation",
    items: [
      {
        id: 8,
        title: "Quartiers",
        href: "/quartiers",
        icon: <Home size={18} />,
      },
      {
        id: 9,
        title: "Communes",
        href: "/communes",
        icon: <Building2 size={18} />,
      },
      {
        id: 10,
        title: "Provinces",
        href: "/provinces",
        icon: <Map size={18} />,
      },
      { id: 11, title: "Régions", href: "/regions", icon: <Globe size={18} /> },
    ],
  },
];

export default function DashboardSidebar() {
  return (
    <Sidebar>
      <div className="pl-3 pr-2">
        <SidebarHeader className="flex gap-2 py-4">
          <h3 className="font-bold text-lg tracking-wide">Dashboard</h3>
        </SidebarHeader>

        <SidebarContent className="space-y-4">
          {menuSections.map((section) => (
            <SidebarGroup key={section.title}>
              <p className="text-[11px] font-heading font-semibold text-muted-foreground uppercase mb-2 px-2 tracking-widest">
                {section.title}
              </p>

              <SidebarMenu className="space-y-1">
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      className="
                        flex items-center gap-3
                        rounded-lg px-3 py-2
                        transition-all
                        hover:translate-x-1
                        hover:bg-sidebar-accent
                        data-[active=true]:bg-sidebar-accent
                        data-[active=true]:font-semibold
                      "
                    >
                      <Link to={`/dashboard${item.href}`}>
                        <span className="opacity-80">{item.icon}</span>
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="text-xs text-muted-foreground px-3 py-2">
          © 2026 Gombo
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
