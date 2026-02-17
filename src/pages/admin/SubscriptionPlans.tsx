import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { CreditCard, Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AdminPagination } from "@/components/admin/AdminPagination";

interface Plan {
  id: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  branchLimit: number;
  userLimit: number;
  features: {
    appointments: boolean;
    inventory: boolean;
    analytics: boolean;
    marketing: boolean;
    api: boolean;
  };
}

const initialPlans: Plan[] = [
  {
    id: "1",
    name: "Starter",
    price: 149000,
    billingCycle: "monthly",
    branchLimit: 1,
    userLimit: 5,
    features: { appointments: true, inventory: false, analytics: false, marketing: false, api: false },
  },
  {
    id: "2",
    name: "Professional",
    price: 229000,
    billingCycle: "monthly",
    branchLimit: 5,
    userLimit: 20,
    features: { appointments: true, inventory: true, analytics: true, marketing: false, api: false },
  },
  {
    id: "3",
    name: "Enterprise",
    price: 299000,
    billingCycle: "monthly",
    branchLimit: -1,
    userLimit: -1,
    features: { appointments: true, inventory: true, analytics: true, marketing: true, api: true },
  },
  {
    id: "4",
    name: "Basic",
    price: 99000,
    billingCycle: "monthly",
    branchLimit: 1,
    userLimit: 3,
    features: { appointments: true, inventory: false, analytics: false, marketing: false, api: false },
  },
  {
    id: "5",
    name: "Team",
    price: 179000,
    billingCycle: "monthly",
    branchLimit: 3,
    userLimit: 10,
    features: { appointments: true, inventory: true, analytics: false, marketing: false, api: false },
  },
  {
    id: "6",
    name: "Premium",
    price: 399000,
    billingCycle: "monthly",
    branchLimit: 10,
    userLimit: 50,
    features: { appointments: true, inventory: true, analytics: true, marketing: true, api: false },
  },
];

const featureLabels: Record<keyof Plan["features"], string> = {
  appointments: "Appointment Management",
  inventory: "Inventory Management",
  analytics: "Advanced Analytics",
  marketing: "Marketing Tools",
  api: "API Access",
};

const ITEMS_PER_PAGE = 5;

export default function SubscriptionPlans() {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<Omit<Plan, "id">>({
    name: "",
    price: 0,
    billingCycle: "monthly",
    branchLimit: 1,
    userLimit: 5,
    features: {
      appointments: true,
      inventory: false,
      analytics: false,
      marketing: false,
      api: false,
    },
  });

  const totalPages = Math.ceil(plans.length / ITEMS_PER_PAGE);
  const paginatedPlans = plans.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openCreateDialog = () => {
    setEditingPlan(null);
    setFormData({
      name: "",
      price: 0,
      billingCycle: "monthly",
      branchLimit: 1,
      userLimit: 5,
      features: {
        appointments: true,
        inventory: false,
        analytics: false,
        marketing: false,
        api: false,
      },
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (plan: Plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      billingCycle: plan.billingCycle,
      branchLimit: plan.branchLimit,
      userLimit: plan.userLimit,
      features: { ...plan.features },
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({ title: "Error", description: "Plan name is required", variant: "destructive" });
      return;
    }

    if (editingPlan) {
      setPlans(plans.map((p) => (p.id === editingPlan.id ? { ...formData, id: editingPlan.id } : p)));
      toast({ title: "Success", description: "Plan updated successfully" });
    } else {
      const newPlan: Plan = { ...formData, id: Date.now().toString() };
      setPlans([...plans, newPlan]);
      toast({ title: "Success", description: "Plan created successfully" });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setPlans(plans.filter((p) => p.id !== id));
    toast({ title: "Success", description: "Plan deleted successfully" });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Subscription & Plans</h1>
          <p className="text-[hsl(var(--admin-muted-foreground))] mt-1">Manage subscription plans and feature flags</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Plan
        </Button>
      </div>

      {/* Plans Table */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader>
          <CardTitle className="text-lg font-display flex items-center gap-2 text-[hsl(var(--admin-card-foreground))]">
            <CreditCard className="w-5 h-5 text-primary" />
            Subscription Plans ({plans.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Plan Name</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Price</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Branch Limit</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">User Limit</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Features</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPlans.map((plan) => (
                <TableRow key={plan.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]">
                  <TableCell>
                    <p className="font-medium text-[hsl(var(--admin-card-foreground))]">{plan.name}</p>
                  </TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">
                    Rp {plan.price.toLocaleString("id-ID")}/{plan.billingCycle === "monthly" ? "bln" : "thn"}
                  </TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">
                    {plan.branchLimit === -1 ? "Unlimited" : plan.branchLimit}
                  </TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">
                    {plan.userLimit === -1 ? "Unlimited" : plan.userLimit}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {Object.entries(plan.features).map(([key, enabled]) =>
                        enabled ? (
                          <Badge key={key} variant="secondary" className="text-xs bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))]">
                            {featureLabels[key as keyof Plan["features"]].split(" ")[0]}
                          </Badge>
                        ) : null
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(plan)}
                        className="text-[hsl(var(--admin-muted-foreground))] hover:text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(plan.id)}
                        className="text-[hsl(var(--admin-muted-foreground))] hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[hsl(var(--admin-card-foreground))]">
              {editingPlan ? "Edit Plan" : "Create New Plan"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[hsl(var(--admin-card-foreground))]">Plan Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] placeholder:text-[hsl(var(--admin-muted-foreground))] focus-visible:border-primary"
                placeholder="e.g. Professional"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-[hsl(var(--admin-card-foreground))]">Price (Rp)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] focus-visible:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Billing Cycle</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={formData.billingCycle === "monthly" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, billingCycle: "monthly" })}
                    className={`flex-1 ${formData.billingCycle !== "monthly" ? "border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]" : "bg-primary text-primary-foreground"}`}
                  >
                    Monthly
                  </Button>
                  <Button
                    type="button"
                    variant={formData.billingCycle === "yearly" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, billingCycle: "yearly" })}
                    className={`flex-1 ${formData.billingCycle !== "yearly" ? "border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]" : "bg-primary text-primary-foreground"}`}
                  >
                    Yearly
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="branchLimit" className="text-[hsl(var(--admin-card-foreground))]">Branch Limit (-1 for unlimited)</Label>
                <Input
                  id="branchLimit"
                  type="number"
                  value={formData.branchLimit}
                  onChange={(e) => setFormData({ ...formData, branchLimit: Number(e.target.value) })}
                  className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] focus-visible:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userLimit" className="text-[hsl(var(--admin-card-foreground))]">User Limit (-1 for unlimited)</Label>
                <Input
                  id="userLimit"
                  type="number"
                  value={formData.userLimit}
                  onChange={(e) => setFormData({ ...formData, userLimit: Number(e.target.value) })}
                  className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))] focus-visible:border-primary"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[hsl(var(--admin-card-foreground))]">Feature Flags</Label>
              <div className="space-y-3">
                {Object.entries(featureLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-[hsl(var(--admin-muted))]">
                    <span className="text-sm text-[hsl(var(--admin-card-foreground))]">{label}</span>
                    <Switch
                      checked={formData.features[key as keyof Plan["features"]]}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          features: { ...formData.features, [key]: checked },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-[hsl(var(--admin-border))] bg-[hsl(var(--admin-muted))] text-[hsl(var(--admin-card-foreground))] hover:bg-[hsl(var(--admin-hover))]">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground">
              {editingPlan ? "Update Plan" : "Create Plan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
