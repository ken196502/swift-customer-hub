
import { Users, FileText, MessageSquare, Building, Shield } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "客户管理",
      url: "/",
      icon: Users,
    },
    {
      title: "审核管理",
      url: "/audit",
      icon: FileText,
    },
    {
      title: "信息共享管理", 
      url: "/permissions",
      icon: Shield,
    },
    {
      title: "联系类型管理",
      url: "/contact-types",
      icon: MessageSquare,
    },
    {
      title: "集团管理",
      url: "/groups",
      icon: Building,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">客户关系管理</h3>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>功能菜单</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link to={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
