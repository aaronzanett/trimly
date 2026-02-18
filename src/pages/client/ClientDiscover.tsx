import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search, MapPin, Star, Clock, Scissors, ChevronRight,
  SlidersHorizontal, LocateFixed, Loader2, ChevronDown,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const barbershops = [
  {
    slug: "trimly-jakarta",
    name: "Trimly Jakarta Selatan",
    address: "Jl. Sudirman No. 12, Jakarta Selatan",
    city: "Jakarta Selatan",
    distance: "0.8 km",
    rating: 4.9,
    reviews: 312,
    openNow: true,
    hours: "09:00 – 21:00",
    services: ["Classic Haircut", "Beard Trim", "Hair Color"],
    priceRange: "Rp 50.000 – 150.000",
    tags: ["Populer", "Buka Sekarang"],
  },
  {
    slug: "barberco-kemang",
    name: "BarberCo Kemang",
    address: "Jl. Kemang Raya No. 55, Jakarta Selatan",
    city: "Jakarta Selatan",
    distance: "1.4 km",
    rating: 4.7,
    reviews: 189,
    openNow: true,
    hours: "10:00 – 22:00",
    services: ["Fade", "Beard Styling", "Kids Haircut"],
    priceRange: "Rp 45.000 – 120.000",
    tags: ["Buka Sekarang"],
  },
  {
    slug: "gentleman-cut-blok-m",
    name: "Gentleman Cut Blok M",
    address: "Jl. Melawai No. 8, Blok M, Jakarta",
    city: "Jakarta Selatan",
    distance: "2.1 km",
    rating: 4.8,
    reviews: 241,
    openNow: false,
    hours: "09:00 – 20:00",
    services: ["Hot Towel Shave", "Hair Treatment", "Classic Haircut"],
    priceRange: "Rp 60.000 – 200.000",
    tags: ["Premium"],
  },
  {
    slug: "kings-barbershop-tb-simatupang",
    name: "King's Barbershop TB Simatupang",
    address: "Jl. TB Simatupang No. 77, Jakarta",
    city: "Jakarta Selatan",
    distance: "3.0 km",
    rating: 4.6,
    reviews: 152,
    openNow: true,
    hours: "08:00 – 21:00",
    services: ["Scissor Cut", "Pomade Styling", "Beard Trim"],
    priceRange: "Rp 40.000 – 100.000",
    tags: ["Buka Sekarang", "Terjangkau"],
  },
  {
    slug: "fade-factory-cipete",
    name: "Fade Factory Cipete",
    address: "Jl. Cipete Raya No. 30, Jakarta Selatan",
    city: "Bandung",
    distance: "3.8 km",
    rating: 4.5,
    reviews: 98,
    openNow: false,
    hours: "10:00 – 21:00",
    services: ["Fade", "Taper", "Hair Color"],
    priceRange: "Rp 55.000 – 130.000",
    tags: [],
  },
];

const sortOptions = [
  { value: "distance", label: "Terdekat" },
  { value: "rating", label: "Rating Tertinggi" },
  { value: "reviews", label: "Ulasan Terbanyak" },
];

type City = { id: string; name: string };

const ClientDiscover = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  // Location & city state
  const [detectedCity, setDetectedCity] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  // City filter
  const [cities, setCities] = useState<City[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [cityOpen, setCityOpen] = useState(false);

  // Fetch Indonesian cities on mount
  useEffect(() => {
    setCitiesLoading(true);
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/regencies.json")
      .then((r) => r.json())
      .then((data: { id: string; name: string }[]) => {
        // Normalize: remove "KOTA " / "KABUPATEN " prefix, title-case
        const normalized = data.map((d) => ({
          id: d.id,
          name: d.name
            .replace(/^(KOTA |KABUPATEN )/i, "")
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" "),
        }));
        // Deduplicate by name
        const seen = new Set<string>();
        const unique = normalized.filter((c) => {
          if (seen.has(c.name)) return false;
          seen.add(c.name);
          return true;
        });
        setCities(unique.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch(() => setCities([]))
      .finally(() => setCitiesLoading(false));
  }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocError("Geolokasi tidak didukung di browser ini.");
      return;
    }
    setLocating(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=id`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.county ||
            data.address?.state_district ||
            null;
          if (city) {
            // Try to match with our city list
            const normalized = city
              .replace(/^(KOTA |KABUPATEN )/i, "")
              .split(" ")
              .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
              .join(" ");
            setDetectedCity(normalized);
            setSelectedCity(normalized);
          }
        } catch {
          setLocError("Gagal mendeteksi kota. Silakan pilih secara manual.");
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocError("Izin lokasi ditolak. Pilih kota secara manual.");
        setLocating(false);
      }
    );
  };

  const filtered = barbershops
    .filter((shop) => {
      const matchSearch =
        shop.name.toLowerCase().includes(search.toLowerCase()) ||
        shop.address.toLowerCase().includes(search.toLowerCase());
      const matchOpen = showOpenOnly ? shop.openNow : true;
      const matchCity =
        selectedCity === "all" ||
        shop.city.toLowerCase().includes(selectedCity.toLowerCase());
      return matchSearch && matchOpen && matchCity;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      return parseFloat(a.distance) - parseFloat(b.distance);
    });

  const selectedCityLabel =
    selectedCity === "all" ? "Semua Kota" : selectedCity;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 max-w-3xl">
      {/* Hero Search */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm text-slate-300">
            {detectedCity ? detectedCity : "Lokasi belum dideteksi"}
          </span>
        </div>
        <h1 className="font-display text-2xl font-bold mb-4">
          Temukan Barbershop Terdekat
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama atau lokasi barbershop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20"
          />
        </div>

        {/* Location button */}
        <div className="mt-3 flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={requestLocation}
            disabled={locating}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 gap-1.5"
          >
            {locating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <LocateFixed className="h-3.5 w-3.5" />
            )}
            {locating ? "Mendeteksi..." : "Gunakan Lokasimu"}
          </Button>
          {locError && (
            <span className="text-xs text-red-300">{locError}</span>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* City filter */}
        <Popover open={cityOpen} onOpenChange={setCityOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 min-w-[130px] justify-between"
            >
              <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="truncate max-w-[100px]">{selectedCityLabel}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-64" align="start">
            <Command>
              <CommandInput placeholder="Cari kota..." />
              <CommandList>
                {citiesLoading ? (
                  <div className="flex items-center justify-center py-6 gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memuat kota...
                  </div>
                ) : (
                  <>
                    <CommandEmpty>Kota tidak ditemukan.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        value="all"
                        onSelect={() => { setSelectedCity("all"); setCityOpen(false); }}
                      >
                        <span className={cn("font-medium", selectedCity === "all" && "text-primary")}>
                          Semua Kota
                        </span>
                      </CommandItem>
                      {cities.map((city) => (
                        <CommandItem
                          key={city.id}
                          value={city.name}
                          onSelect={(val) => {
                            setSelectedCity(val);
                            setCityOpen(false);
                          }}
                        >
                          <span className={cn(selectedCity === city.name && "text-primary font-medium")}>
                            {city.name}
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[155px] h-9">
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Open now */}
        <Button
          variant={showOpenOnly ? "default" : "outline"}
          size="sm"
          onClick={() => setShowOpenOnly(!showOpenOnly)}
          className="gap-1"
        >
          <Clock className="h-3.5 w-3.5" /> Buka Sekarang
        </Button>

        <span className="text-sm text-muted-foreground ml-auto">
          {filtered.length} barbershop
        </span>
      </div>

      {/* Shop List */}
      <div className="space-y-4 pb-4">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="p-10 text-center text-muted-foreground">
              <Scissors className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p>Tidak ada barbershop yang ditemukan.</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((shop) => (
            <Link key={shop.slug} to={`/client/${shop.slug}`}>
              <Card className="hover:border-primary/40 transition-all hover:shadow-md cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <Avatar className="h-16 w-16 rounded-xl shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg rounded-xl">
                        {shop.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                            {shop.name}
                          </h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="truncate">{shop.address}</span>
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {shop.openNow ? (
                          <Badge className="text-xs bg-green-500/15 text-green-600 border-green-500/30 hover:bg-green-500/15">
                            Buka
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">Tutup</Badge>
                        )}
                        {shop.tags.filter(t => t !== "Buka Sekarang").map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center gap-3 mt-2.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <span className="font-semibold text-foreground">{shop.rating}</span>
                          <span>({shop.reviews})</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {shop.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {shop.hours}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground mt-1.5">{shop.priceRange}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientDiscover;
