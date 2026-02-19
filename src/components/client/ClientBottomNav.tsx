import { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Home, CalendarPlus, ShoppingBag, Clock, User, LogOut, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const SHOP_SLUG_KEY = "client_last_shop_slug";

export function ClientBottomNav() {
  const { shopSlug: paramSlug } = useParams<{ shopSlug?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [shopSlug, setShopSlug] = useState<string | undefined>(
    paramSlug || localStorage.getItem(SHOP_SLUG_KEY) || undefined
  );

  useEffect(() => {
    if (paramSlug) {
      localStorage.setItem(SHOP_SLUG_KEY, paramSlug);
      setShopSlug(paramSlug);
    } else if (location.pathname === "/client") {
      localStorage.removeItem(SHOP_SLUG_KEY);
      setShopSlug(undefined);
    } else {
      setShopSlug(localStorage.getItem(SHOP_SLUG_KEY) || undefined);
    }
  }, [paramSlug, location.pathname]);

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
          {user ? (
            <button
              onClick={() => { logout(); navigate("/client/login"); }}
              className="flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Keluar</span>
            </button>
          ) : (
            <Link to="/client/login" className="flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors">
              <LogIn className="h-5 w-5" />
              <span>Masuk</span>
            </Link>
          )}
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
        {user ? (
          <button
            onClick={() => { logout(); navigate("/client/login"); }}
            className="flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Keluar</span>
          </button>
        ) : (
          <Link to="/client/login" className="flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors">
            <LogIn className="h-5 w-5" />
            <span>Masuk</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
