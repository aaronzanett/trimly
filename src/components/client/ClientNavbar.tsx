import { Link, useParams } from "react-router-dom";
import { Scissors, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ClientNavbar() {
  const { tenant } = useParams();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={`/${tenant}/client`} className="flex items-center gap-2">
          <Scissors className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">Trimly</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to={`/${tenant}/client`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to={`/${tenant}/client/booking`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Book Now</Link>
          <Link to={`/${tenant}/client/shop`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
          <Link to={`/${tenant}/client/history`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">History</Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/${tenant}/client/checkout`}>
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/${tenant}/client/profile`}>
              <User className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
