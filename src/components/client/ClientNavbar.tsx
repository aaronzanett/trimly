import { Link, useParams } from "react-router-dom";
import { Scissors, ShoppingCart, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ClientNavbar() {
  const { shopSlug } = useParams<{ shopSlug?: string }>();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/client" className="flex items-center gap-2">
          <Scissors className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">Trimly</span>
        </Link>

        {shopSlug && (
          <div className="hidden md:flex items-center gap-6">
            <Link to={`/client/${shopSlug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Beranda</Link>
            <Link to={`/client/${shopSlug}/booking`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Booking</Link>
            <Link to={`/client/${shopSlug}/shop`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Produk</Link>
          </div>
        )}

        <div className="flex items-center gap-2">
          {shopSlug && (
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/client/${shopSlug}/checkout`}>
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/client/profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/client/login">
              <LogIn className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
