import { Link, useParams, useLocation } from "react-router-dom";
import { Home, CalendarPlus, ShoppingBag, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: Home, path: "" },
  { label: "Book", icon: CalendarPlus, path: "/booking" },
  { label: "Shop", icon: ShoppingBag, path: "/shop" },
  { label: "History", icon: Clock, path: "/history" },
  { label: "Profile", icon: User, path: "/profile" },
];

export function ClientBottomNav() {
  const { tenant } = useParams();
  const location = useLocation();
  const basePath = `/${tenant}/client`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const fullPath = `${basePath}${item.path}`;
          const isActive = item.path === ""
            ? location.pathname === fullPath
            : location.pathname.startsWith(fullPath);

          return (
            <Link
              key={item.label}
              to={fullPath}
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
