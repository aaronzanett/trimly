import {
  LayoutDashboard,
  Clock,
  ShoppingCart,
  Percent,
  Banknote,
  UserCircle,
  LogOut,
  Scissors,
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

export function StaffSidebar() {
  const navigate = useNavigate();
  const { tenant } = useParams();

  const handleLogout = () => {
    navigate("/login");
  };

  const menuItems = [
    { title: "Dashboard", url: `/${tenant}/staff/dashboard`, icon: LayoutDashboard },
    { title: "Attendance & Shift", url: `/${tenant}/staff/attendance`, icon: Clock },
    { title: "POS / Cashier", url: `/${tenant}/staff/pos`, icon: ShoppingCart },
    { title: "Commission & Salary", url: `/${tenant}/staff/commission`, icon: Percent },
    { title: "Cash Advance", url: `/${tenant}/staff/cash-advance`, icon: Banknote },
    { title: "Account Profile", url: `/${tenant}/staff/profile`, icon: UserCircle },
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
            <p className="text-xs text-[hsl(var(--admin-sidebar-foreground)/0.6)]">Staff Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[hsl(var(--admin-sidebar))]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[hsl(var(--admin-sidebar-foreground)/0.5)] text-xs uppercase tracking-wider">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <NavItem key={item.title} item={item} />
              ))}
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
