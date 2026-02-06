import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  Percent,
  Wallet,
  Scissors,
  Package,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  FileText,
  TrendingUp,
  UserCheck,
  ShoppingBag,
} from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
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
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function OwnerSidebar() {
  const navigate = useNavigate();
  const { tenant } = useParams();
  const [reportsOpen, setReportsOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const mainMenuItems = [
    { title: "Dashboard", url: `/${tenant}/dashboard`, icon: LayoutDashboard },
    { title: "Branches", url: `/${tenant}/branches`, icon: Building2 },
    { title: "Employees", url: `/${tenant}/employees`, icon: Users },
    { title: "Commission & Salary", url: `/${tenant}/commission`, icon: Percent },
    { title: "Business Finance", url: `/${tenant}/finance`, icon: Wallet },
  ];

  const catalogItems = [
    { title: "Services", url: `/${tenant}/services`, icon: Scissors },
    { title: "Products", url: `/${tenant}/products`, icon: Package },
  ];

  const reportItems = [
    { title: "Financial Reports", url: `/${tenant}/reports/financial`, icon: FileText },
    { title: "Sales Reports", url: `/${tenant}/reports/sales`, icon: TrendingUp },
    { title: "Employee Reports", url: `/${tenant}/reports/employees`, icon: UserCheck },
    { title: "Product Reports", url: `/${tenant}/reports/products`, icon: ShoppingBag },
  ];

  const NavItem = ({ item }: { item: { title: string; url: string; icon: React.ElementType } }) => (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink
          to={item.url}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-[hsl(var(--admin-sidebar-foreground)/0.7)] hover:bg-[hsl(var(--admin-sidebar-foreground)/0.1)] hover:text-[hsl(var(--admin-sidebar-foreground))]"
            )
          }
        >
          <item.icon className="w-4 h-4" />
          <span>{item.title}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar className="border-r border-[hsl(var(--admin-sidebar-border))] bg-[hsl(var(--admin-sidebar))]">
      <SidebarHeader className="p-4 border-b border-[hsl(var(--admin-sidebar-border))]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Scissors className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-[hsl(var(--admin-sidebar-foreground))]">
              Trimly
            </h2>
            <p className="text-xs text-[hsl(var(--admin-sidebar-foreground)/0.6)]">Owner Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[hsl(var(--admin-sidebar))]">
        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[hsl(var(--admin-sidebar-foreground)/0.5)] text-xs uppercase tracking-wider">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <NavItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Catalog Group (Collapsible) */}
        <SidebarGroup>
          <Collapsible open={catalogOpen} onOpenChange={setCatalogOpen}>
            <CollapsibleTrigger className="w-full">
              <SidebarGroupLabel className="text-[hsl(var(--admin-sidebar-foreground)/0.5)] text-xs uppercase tracking-wider flex items-center justify-between cursor-pointer hover:text-[hsl(var(--admin-sidebar-foreground)/0.7)] transition-colors">
                <span>Services & Products</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    catalogOpen && "rotate-180"
                  )}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {catalogItems.map((item) => (
                    <NavItem key={item.title} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Reports Group (Collapsible) */}
        <SidebarGroup>
          <Collapsible open={reportsOpen} onOpenChange={setReportsOpen}>
            <CollapsibleTrigger className="w-full">
              <SidebarGroupLabel className="text-[hsl(var(--admin-sidebar-foreground)/0.5)] text-xs uppercase tracking-wider flex items-center justify-between cursor-pointer hover:text-[hsl(var(--admin-sidebar-foreground)/0.7)] transition-colors">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-3 h-3" />
                  <span>Reports</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    reportsOpen && "rotate-180"
                  )}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {reportItems.map((item) => (
                    <NavItem key={item.title} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[hsl(var(--admin-sidebar-foreground)/0.5)] text-xs uppercase tracking-wider">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem item={{ title: "Business Settings", url: `/${tenant}/settings`, icon: Settings }} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-[hsl(var(--admin-sidebar-border))] bg-[hsl(var(--admin-sidebar))]">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-[hsl(var(--admin-sidebar-foreground)/0.7)] hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
