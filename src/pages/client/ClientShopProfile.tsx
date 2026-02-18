import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin, Star, Clock, Scissors, ShoppingBag, Phone, Instagram,
  ArrowRight, Tag, ChevronLeft
} from "lucide-react";

// Mock data — in a real app this comes from the DB based on slug
const shopData: Record<string, {
  name: string; address: string; phone: string; instagram: string;
  hours: string; rating: number; reviews: number; openNow: boolean; description: string;
  services: { id: string; name: string; price: number; duration: string; icon: string }[];
  barbers: { id: string; name: string; specialty: string; rating: number }[];
  products: { id: string; name: string; price: number; tag: string }[];
  promotions: { id: string; title: string; description: string; badge: string }[];
}> = {
  "trimly-jakarta": {
    name: "Trimly Jakarta Selatan",
    address: "Jl. Sudirman No. 12, Jakarta Selatan",
    phone: "+62 21 5550 1234",
    instagram: "@trimly.jkt",
    hours: "Senin–Minggu, 09:00 – 21:00",
    rating: 4.9, reviews: 312, openNow: true,
    description: "Barbershop premium dengan pengalaman lebih dari 10 tahun. Kami melayani berbagai gaya rambut pria dengan standar terbaik.",
    services: [
      { id: "1", name: "Classic Haircut", price: 50000, duration: "30 mnt", icon: "✂️" },
      { id: "2", name: "Beard Trim", price: 30000, duration: "20 mnt", icon: "🧔" },
      { id: "3", name: "Hair Color", price: 150000, duration: "60 mnt", icon: "🎨" },
      { id: "4", name: "Hot Towel Shave", price: 45000, duration: "25 mnt", icon: "🪒" },
      { id: "5", name: "Hair Treatment", price: 75000, duration: "45 mnt", icon: "💆" },
      { id: "6", name: "Kids Haircut", price: 40000, duration: "20 mnt", icon: "👦" },
    ],
    barbers: [
      { id: "1", name: "Rizal Hidayat", specialty: "Classic Cuts", rating: 4.9 },
      { id: "2", name: "Fajar Nugraha", specialty: "Fades & Tapers", rating: 4.8 },
      { id: "3", name: "Dimas Prasetyo", specialty: "Beard Styling", rating: 4.7 },
    ],
    products: [
      { id: "1", name: "Pomade Strong Hold", price: 85000, tag: "Best Seller" },
      { id: "2", name: "Beard Oil", price: 65000, tag: "Baru" },
      { id: "3", name: "Hair Wax Matte", price: 75000, tag: "Populer" },
    ],
    promotions: [
      { id: "1", title: "Diskon 20% Kunjungan Pertama", description: "Berlaku untuk semua layanan potong rambut.", badge: "Pelanggan Baru" },
      { id: "2", title: "Paket Hemat", description: "Potong Rambut + Cukur Jenggot hanya Rp 70.000", badge: "Best Value" },
    ],
  },
};

// Fallback for unknown slugs
const defaultShop = {
  name: "Barbershop",
  address: "Jakarta",
  phone: "-",
  instagram: "-",
  hours: "09:00 – 21:00",
  rating: 4.5, reviews: 50, openNow: true,
  description: "Barbershop berkualitas dengan pelayanan terbaik.",
  services: [
    { id: "1", name: "Classic Haircut", price: 50000, duration: "30 mnt", icon: "✂️" },
    { id: "2", name: "Beard Trim", price: 30000, duration: "20 mnt", icon: "🧔" },
  ],
  barbers: [{ id: "1", name: "Ahmad Fauzi", specialty: "All Styles", rating: 4.5 }],
  products: [{ id: "1", name: "Pomade", price: 80000, tag: "Populer" }],
  promotions: [],
};

const ClientShopProfile = () => {
  const { shopSlug } = useParams<{ shopSlug: string }>();
  const shop = (shopSlug && shopData[shopSlug]) || defaultShop;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
        <Link
          to="/client"
          className="inline-flex items-center gap-1 text-sm text-slate-300 hover:text-white mb-4"
        >
          <ChevronLeft className="h-4 w-4" /> Kembali ke Temukan
        </Link>

        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 rounded-xl shrink-0">
            <AvatarFallback className="bg-primary/20 text-primary font-bold text-xl rounded-xl">
              {shop.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold">{shop.name}</h1>
            <p className="text-slate-300 text-sm flex items-center gap-1 mt-0.5">
              <MapPin className="h-3.5 w-3.5" /> {shop.address}
            </p>
            <div className="flex items-center gap-3 mt-2 text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <span className="font-semibold">{shop.rating}</span>
                <span className="text-slate-400">({shop.reviews})</span>
              </span>
              <Badge className={shop.openNow
                ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/20"
                : "bg-slate-600 text-slate-300 border-slate-500"
              }>
                {shop.openNow ? "Buka" : "Tutup"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button asChild className="flex-1" size="sm">
            <Link to={`/client/${shopSlug}/booking`}>
              <Scissors className="h-4 w-4 mr-1" /> Pesan Sekarang
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="flex-1 border-white/20 text-white hover:bg-white/10 hover:text-white">
            <Link to={`/client/${shopSlug}/shop`}>
              <ShoppingBag className="h-4 w-4 mr-1" /> Beli Produk
            </Link>
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-4 py-4">
        <Tabs defaultValue="overview">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="overview" className="flex-1">Info</TabsTrigger>
            <TabsTrigger value="services" className="flex-1">Layanan</TabsTrigger>
            <TabsTrigger value="barbers" className="flex-1">Barber</TabsTrigger>
            <TabsTrigger value="products" className="flex-1">Produk</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-4">
            {shop.promotions.length > 0 && (
              <section>
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-1">
                  <Tag className="h-4 w-4 text-primary" /> Promo
                </h3>
                <div className="space-y-2">
                  {shop.promotions.map((promo) => (
                    <Card key={promo.id} className="border-primary/20">
                      <CardContent className="p-3 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-sm">{promo.title}</span>
                            <Badge variant="secondary" className="text-xs">{promo.badge}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{promo.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            <Card>
              <CardContent className="p-4 space-y-3 text-sm">
                <p className="text-muted-foreground">{shop.description}</p>
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{shop.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{shop.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{shop.instagram}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{shop.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services */}
          <TabsContent value="services" className="space-y-3">
            {shop.services.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{service.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {service.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary">Rp {service.price.toLocaleString("id-ID")}</span>
                    <Button size="sm" asChild>
                      <Link to={`/client/${shopSlug}/booking`}>Pesan</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Barbers */}
          <TabsContent value="barbers" className="space-y-3">
            {shop.barbers.map((barber) => (
              <Card key={barber.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {barber.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{barber.name}</p>
                    <p className="text-xs text-muted-foreground">{barber.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-sm font-semibold">{barber.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Products */}
          <TabsContent value="products" className="space-y-3">
            {shop.products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{product.name}</p>
                      {product.tag && <Badge variant="secondary" className="text-xs">{product.tag}</Badge>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary">Rp {product.price.toLocaleString("id-ID")}</span>
                    <Button size="sm" asChild>
                      <Link to={`/client/${shopSlug}/shop`}>Beli</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientShopProfile;
