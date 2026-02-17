import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingBag, Search, Plus, Minus, ShoppingCart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const allProducts = [
  { id: "1", name: "Pomade Strong Hold", price: 85000, brand: "Trimly Pro", category: "Styling", tag: "Best Seller", rating: 4.8, description: "Professional-grade pomade with strong hold and high shine. Perfect for slick backs and pompadours.", stock: 15 },
  { id: "2", name: "Beard Oil", price: 65000, brand: "Trimly Pro", category: "Beard Care", tag: "New", rating: 4.6, description: "Nourishing beard oil with jojoba and argan blend. Softens and conditions facial hair.", stock: 22 },
  { id: "3", name: "Hair Wax Matte", price: 75000, brand: "Trimly Pro", category: "Styling", tag: "Popular", rating: 4.7, description: "Matte finish wax for natural-looking textured styles. Medium hold, no shine.", stock: 18 },
  { id: "4", name: "Shampoo Anti-Dandruff", price: 55000, brand: "Trimly Pro", category: "Hair Care", tag: "", rating: 4.5, description: "Gentle anti-dandruff shampoo with tea tree oil. Cleanses without stripping natural oils.", stock: 30 },
  { id: "5", name: "Hair Clay", price: 90000, brand: "Trimly Pro", category: "Styling", tag: "Popular", rating: 4.9, description: "Premium clay for strong hold with ultra-matte finish. Great for short to medium styles.", stock: 12 },
  { id: "6", name: "Aftershave Balm", price: 45000, brand: "Trimly Pro", category: "Shaving", tag: "", rating: 4.4, description: "Soothing aftershave balm with aloe vera. Calms irritation and moisturizes.", stock: 25 },
];

const categories = ["All", "Styling", "Beard Care", "Hair Care", "Shaving"];

export type CartItem = { productId: string; name: string; price: number; quantity: number };

const ClientShop = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<typeof allProducts[0] | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const filtered = allProducts.filter(p =>
    (category === "All" || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: typeof allProducts[0], qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        return prev.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, quantity: qty }];
    });
    toast({ title: "Added to cart", description: `${product.name} added to your cart.` });
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">Shop Products</h1>
        <Badge variant="secondary" className="gap-1">
          <ShoppingCart className="h-3.5 w-3.5" /> {cartCount}
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.map((product) => (
          <Card key={product.id} className="hover:border-primary/40 transition-colors cursor-pointer" onClick={() => setSelectedProduct(product)}>
            <CardContent className="p-4">
              <div className="aspect-square rounded-lg bg-secondary/50 flex items-center justify-center mb-3">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              {product.tag && <Badge variant="secondary" className="text-xs mb-1">{product.tag}</Badge>}
              <p className="font-semibold text-sm">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.brand}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-primary font-bold">Rp {product.price.toLocaleString("id-ID")}</span>
                <div className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="text-xs">{product.rating}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-md">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-video rounded-lg bg-secondary/50 flex items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-2">
                  {selectedProduct.tag && <Badge variant="secondary">{selectedProduct.tag}</Badge>}
                  <Badge variant="outline">{selectedProduct.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-semibold">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{selectedProduct.stock} in stock</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-2xl font-bold text-primary">Rp {selectedProduct.price.toLocaleString("id-ID")}</span>
                  <Button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>
                    <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientShop;
