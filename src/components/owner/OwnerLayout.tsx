import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { OwnerSidebar } from "./OwnerSidebar";

export function OwnerLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen min-w-full flex bg-[hsl(var(--admin-background))]">
        <OwnerSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-[hsl(var(--admin-border))] flex items-center px-4 bg-[hsl(var(--admin-card))]">
            <SidebarTrigger className="text-[hsl(var(--admin-muted-foreground))] hover:text-[hsl(var(--admin-card-foreground))]" />
          </header>
          <div className="flex-1 p-6 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
