import { Outlet } from "react-router-dom";
import { ClientNavbar } from "./ClientNavbar";
import { ClientBottomNav } from "./ClientBottomNav";

export function ClientLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ClientNavbar />
      <main className="flex-1 pt-16 pb-20 md:pb-6">
        <Outlet />
      </main>
      <ClientBottomNav />
    </div>
  );
}
