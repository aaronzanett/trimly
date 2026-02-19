import { useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { Scissors, ShoppingCart, User, LogIn, LogOut, Home, CalendarPlus, ShoppingBag, Clock, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const SHOP_SLUG_KEY = "client_last_shop_slug";

export function ClientNavbar() {
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

  const globalLinks = [
    { label: "Temukan", path: "/client", icon: Compass, exact: true },
    { label: "Riwayat", path: "/client/history", icon: Clock },
    { label: "Profil", path: "/client/profile", icon: User },
  ];

  const shopLinks = shopSlug ? [
    { label: "Info Toko", path: `/client/${shopSlug}`, icon: Home, exact: true },
    { label: "Booking", path: `/client/${shopSlug}/booking`, icon: CalendarPlus },
    { label: "Produk", path: `/client/${shopSlug}/shop`, icon: ShoppingBag },
  ] : [];

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/client" className="flex items-center gap-2 shrink-0">
          <Scissors className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">Trimly</span>
        </Link>

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {(shopSlug ? shopLinks : globalLinks).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                isActive(item.path, item.exact)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          {/* If inside a shop, also show global links */}
          {shopSlug && (
            <>
              <span className="w-px h-5 bg-border mx-1" />
              {globalLinks.filter(l => l.path !== "/client").map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    isActive(item.path, item.exact)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 shrink-0">
          {shopSlug && (
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/client/${shopSlug}/checkout`} title="Keranjang">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          )}
          {user ? (
            <Button
              variant="ghost"
              size="icon"
              title="Keluar"
              onClick={() => { logout(); navigate("/client/login"); }}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/client/login" title="Masuk">
                <LogIn className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
