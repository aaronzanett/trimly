import { useState } from "react";
import { Scissors, Plus, Edit2, Trash2, Search, MoreHorizontal, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AdminPagination } from "@/components/admin/AdminPagination";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive: boolean;
}

const mockServices: Service[] = [
  { id: "1", name: "Regular Haircut", description: "Classic haircut with styling", price: 50000, duration: 30, category: "Haircut", isActive: true },
  { id: "2", name: "Premium Haircut", description: "Premium cut with hot towel and styling", price: 85000, duration: 45, category: "Haircut", isActive: true },
  { id: "3", name: "Kids Haircut", description: "Haircut for children under 12", price: 40000, duration: 25, category: "Haircut", isActive: true },
  { id: "4", name: "Beard Trim", description: "Beard shaping and trimming", price: 35000, duration: 20, category: "Grooming", isActive: true },
  { id: "5", name: "Full Shave", description: "Traditional hot towel shave", price: 45000, duration: 30, category: "Grooming", isActive: true },
  { id: "6", name: "Hair Coloring", description: "Single color application", price: 150000, duration: 90, category: "Color", isActive: true },
  { id: "7", name: "Hair Treatment", description: "Deep conditioning treatment", price: 120000, duration: 45, category: "Treatment", isActive: false },
  { id: "8", name: "Head Massage", description: "Relaxing scalp massage", price: 50000, duration: 20, category: "Treatment", isActive: true },
];

const ITEMS_PER_PAGE = 5;

export default function Services() {
  const [services] = useState<Service[]>(mockServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case "haircut":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "grooming":
        return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      case "color":
        return "bg-amber-100 text-amber-700 hover:bg-amber-100";
      case "treatment":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">
            Services
          </h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">
            Manage your barbershop services
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
            <DialogHeader>
              <DialogTitle className="text-[hsl(var(--admin-card-foreground))]">
                Add New Service
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Service Name</Label>
                <Input
                  placeholder="Enter service name"
                  className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Description</Label>
                <Textarea
                  placeholder="Describe the service..."
                  className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Price (IDR)</Label>
                  <Input
                    type="number"
                    placeholder="50000"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Duration (minutes)</Label>
                  <Input
                    type="number"
                    placeholder="30"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Category</Label>
                <Input
                  placeholder="e.g., Haircut, Grooming"
                  className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Active</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Save Service</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))]">
              All Services
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted-foreground))]" />
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Service</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Category</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Price</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Duration</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Status</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedServices.map((service) => (
                <TableRow
                  key={service.id}
                  className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]"
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-[hsl(var(--admin-card-foreground))]">
                        {service.name}
                      </p>
                      <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">
                        {service.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getCategoryStyle(service.category)}>
                      {service.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-[hsl(var(--admin-card-foreground))]">
                    {formatCurrency(service.price)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-[hsl(var(--admin-card-foreground))]">
                      <Clock className="w-3 h-3" />
                      {service.duration} min
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={service.isActive ? "default" : "secondary"}
                      className={
                        service.isActive
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                      }
                    >
                      {service.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[hsl(var(--admin-muted-foreground))] hover:text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]"
                      >
                        <DropdownMenuItem className="text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))] cursor-pointer">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive hover:bg-destructive/10 cursor-pointer">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
