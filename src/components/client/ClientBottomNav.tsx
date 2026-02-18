import { Link, useParams, useLocation } from "react-router-dom";
import { Home, CalendarPlus, ShoppingBag, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function ClientBottomNav() {
  const { shopSlug } = useParams<{ shopSlug?: string }>();
  const location = useLocation();

  // When inside a shop context, show shop-specific nav
  if (shopSlug) {
    const shopBase = `/client/${shopSlug}`;
    const shopItems = [
      { label: "Beranda", icon: Home, path: shopBase },
      { label: "Booking", icon: CalendarPlus, path: `${shopBase}/booking` },
      { label: "Produk", icon: ShoppingBag, path: `${shopBase}/shop` },
      { label: "Riwayat", icon: Clock, path: `/client/history` },
      { label: "Profil", icon: User, path: `/client/profile` },
    ];

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border">
        <div className="flex items-center justify-around h-16">
          {shopItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
            return (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 text-xs transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  // Global client nav (discover, history, profile)
  const globalItems = [
    { label: "Temukan", icon: Home, path: "/client" },
    { label: "Riwayat", icon: Clock, path: "/client/history" },
    { label: "Profil", icon: User, path: "/client/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border">
      <div className="flex items-center justify-around h-16">
        {globalItems.map((item) => {
          const isActive = item.path === "/client"
            ? location.pathname === "/client"
            : location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 text-xs transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
