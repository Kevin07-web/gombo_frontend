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

import Logo from "../../../../public/GOMBO_2026-removebg-preview.png";
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
      <div className="pl-3">
        <SidebarHeader>
          <img src={Logo} className="w-full h-10 hidden object-cover" />
          <h3 className="font-extrabold">Dashboard</h3>
        </SidebarHeader>

        <SidebarContent>
          {menuSections.map((section) => (
            <SidebarGroup key={section.title}>
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">
                {section.title}
              </p>

              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <Link to={`/dashboard${item.href}`}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter />
      </div>
    </Sidebar>
  );
}
