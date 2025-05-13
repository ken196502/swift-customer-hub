
import { Users, FileText, MessageSquare, Building, Shield, UserCircle } from "lucide-react";
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
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

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
      title: "服务人员管理",
      url: "/service-personnel",
      icon: UserCircle,
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
                // 为“服务人员管理”加上Tooltip
                if (item.title === "服务人员管理") {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
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
                          </TooltipTrigger>
                          <TooltipContent sideOffset={8}>
                            人员信息管理为线上已有功能
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </SidebarMenuItem>
                  );
                }
                // 其他菜单项保持不变
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
