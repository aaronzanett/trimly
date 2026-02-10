import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen min-w-full flex bg-[hsl(var(--admin-background))]">
        <AdminSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-[hsl(var(--admin-border))] flex items-center px-4 bg-[hsl(var(--admin-card))] sticky top-0 z-10">
            <SidebarTrigger className="text-[hsl(var(--admin-muted-foreground))] hover:text-[hsl(var(--admin-card-foreground))]" />
          </header>
          <div className="flex-1 p-6 overflow-auto bg-[hsl(var(--admin-background))]">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
