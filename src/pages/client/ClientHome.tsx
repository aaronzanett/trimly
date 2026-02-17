import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Scissors, Star, ArrowRight, Tag, ShoppingBag } from "lucide-react";

const promotions = [
  { id: "1", title: "First Visit 20% Off", description: "New customers get 20% off any haircut service", badge: "New Customer", validUntil: "2026-03-31" },
  { id: "2", title: "Bundle Deal", description: "Haircut + Beard Trim for only ₱450", badge: "Best Value", validUntil: "2026-02-28" },
  { id: "3", title: "Refer a Friend", description: "Get ₱100 off for every friend you refer", badge: "Referral", validUntil: "2026-04-30" },
];

const services = [
  { id: "1", name: "Classic Haircut", price: 350, duration: "30 min", icon: "✂️" },
  { id: "2", name: "Beard Trim", price: 200, duration: "20 min", icon: "🧔" },
  { id: "3", name: "Hair Color", price: 800, duration: "60 min", icon: "🎨" },
  { id: "4", name: "Hot Towel Shave", price: 300, duration: "25 min", icon: "🪒" },
  { id: "5", name: "Hair Treatment", price: 500, duration: "45 min", icon: "💆" },
  { id: "6", name: "Kids Haircut", price: 250, duration: "20 min", icon: "👦" },
];

const barbers = [
  { id: "1", name: "Marco Reyes", specialty: "Classic Cuts", rating: 4.9, reviews: 128 },
  { id: "2", name: "Jake Santos", specialty: "Fades & Tapers", rating: 4.8, reviews: 95 },
  { id: "3", name: "Carlos Diaz", specialty: "Beard Styling", rating: 4.7, reviews: 72 },
];

const products = [
  { id: "1", name: "Pomade Strong Hold", price: 450, brand: "Trimly Pro", tag: "Best Seller" },
  { id: "2", name: "Beard Oil", price: 380, brand: "Trimly Pro", tag: "New" },
  { id: "3", name: "Hair Wax Matte", price: 350, brand: "Trimly Pro", tag: "Popular" },
];

const ClientHome = () => {
  const { tenant } = useParams();

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-4xl">
      {/* Hero */}
      <div className="rounded-xl bg-gradient-gold p-6 text-primary-foreground">
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Welcome to Trimly</h1>
        <p className="text-sm opacity-90 mb-4">Premium grooming, exceptional style.</p>
        <Button variant="secondary" size="sm" asChild>
          <Link to={`/${tenant}/client/booking`}>Book Now <ArrowRight className="h-4 w-4 ml-1" /></Link>
        </Button>
      </div>

      {/* Promotions */}
      <section>
        <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" /> Promotions
        </h2>
        <div className="grid gap-3">
          {promotions.map((promo) => (
            <Card key={promo.id} className="border-primary/20">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{promo.title}</span>
                    <Badge variant="secondary" className="text-xs">{promo.badge}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{promo.description}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">Until {promo.validUntil}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Services */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2">
            <Scissors className="h-5 w-5 text-primary" /> Services
          </h2>
          <Button variant="link" size="sm" asChild>
            <Link to={`/${tenant}/client/booking`}>See All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {services.map((service) => (
            <Card key={service.id} className="hover:border-primary/40 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <span className="text-2xl mb-2 block">{service.icon}</span>
                <p className="font-semibold text-sm">{service.name}</p>
                <p className="text-primary font-bold text-sm">₱{service.price}</p>
                <p className="text-xs text-muted-foreground">{service.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Barbers */}
      <section>
        <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" /> Popular Barbers
        </h2>
        <div className="grid gap-3">
          {barbers.map((barber) => (
            <Card key={barber.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {barber.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{barber.name}</p>
                  <p className="text-xs text-muted-foreground">{barber.specialty}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-sm font-semibold">{barber.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{barber.reviews} reviews</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" /> Featured Products
          </h2>
          <Button variant="link" size="sm" asChild>
            <Link to={`/${tenant}/client/shop`}>Shop All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {products.map((product) => (
            <Card key={product.id} className="hover:border-primary/40 transition-colors">
              <CardContent className="p-4">
                <div className="aspect-square rounded-lg bg-secondary/50 flex items-center justify-center mb-3">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                </div>
                <Badge variant="secondary" className="text-xs mb-1">{product.tag}</Badge>
                <p className="font-semibold text-sm">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.brand}</p>
                <p className="text-primary font-bold mt-1">₱{product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ClientHome;
