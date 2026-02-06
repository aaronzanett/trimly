import { useState } from "react";
import { Building2, Plus, Edit2, Trash2, Clock, Armchair, Search, MoreHorizontal } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { AdminPagination } from "@/components/admin/AdminPagination";

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  operatingHours: string;
  chairs: number;
  status: "active" | "inactive";
}

const mockBranches: Branch[] = [
  { id: "1", name: "Central Branch", address: "Jl. Sudirman No. 123, Jakarta", phone: "+62 21 1234567", operatingHours: "09:00 - 21:00", chairs: 6, status: "active" },
  { id: "2", name: "West Branch", address: "Jl. Gatot Subroto No. 45, Jakarta", phone: "+62 21 7654321", operatingHours: "10:00 - 22:00", chairs: 4, status: "active" },
  { id: "3", name: "East Branch", address: "Jl. MT Haryono No. 78, Jakarta", phone: "+62 21 9876543", operatingHours: "09:00 - 20:00", chairs: 5, status: "active" },
  { id: "4", name: "South Branch", address: "Jl. Kemang Raya No. 90, Jakarta", phone: "+62 21 1122334", operatingHours: "10:00 - 21:00", chairs: 4, status: "inactive" },
  { id: "5", name: "North Branch", address: "Jl. Kelapa Gading No. 55, Jakarta", phone: "+62 21 5566778", operatingHours: "09:00 - 21:00", chairs: 5, status: "active" },
  { id: "6", name: "BSD Branch", address: "BSD City Blok A1 No. 12, Tangerang", phone: "+62 21 8899001", operatingHours: "10:00 - 22:00", chairs: 6, status: "active" },
];

const ITEMS_PER_PAGE = 5;

export default function BranchManagement() {
  const [branches] = useState<Branch[]>(mockBranches);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBranches.length / ITEMS_PER_PAGE);
  const paginatedBranches = filteredBranches.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">
            Branch Management
          </h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">
            Manage your barbershop branches
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <DialogHeader>
              <DialogTitle className="text-[hsl(var(--admin-card-foreground))]">
                Add New Branch
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Branch Name</Label>
                <Input
                  placeholder="Enter branch name"
                  className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Address</Label>
                <Input
                  placeholder="Enter full address"
                  className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Phone Number</Label>
                  <Input
                    placeholder="+62 xxx"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Barber Chairs</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Opening Time</Label>
                  <Input
                    type="time"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Closing Time</Label>
                  <Input
                    type="time"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Active Status</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Save Branch</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))]">
              All Branches
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--admin-muted-foreground))]" />
              <Input
                placeholder="Search branches..."
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
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Branch</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Contact</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Hours</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Chairs</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Status</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedBranches.map((branch) => (
                <TableRow
                  key={branch.id}
                  className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]"
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-[hsl(var(--admin-card-foreground))]">
                        {branch.name}
                      </p>
                      <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">
                        {branch.address}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">
                    {branch.phone}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-[hsl(var(--admin-card-foreground))]">
                      <Clock className="w-3 h-3" />
                      {branch.operatingHours}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-[hsl(var(--admin-card-foreground))]">
                      <Armchair className="w-3 h-3" />
                      {branch.chairs}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={branch.status === "active" ? "default" : "secondary"}
                      className={
                        branch.status === "active"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                      }
                    >
                      {branch.status}
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
