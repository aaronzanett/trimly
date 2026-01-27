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
import { CreditCard, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    price: 29,
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
  },
  {
    id: "2",
    name: "Professional",
    price: 79,
    billingCycle: "monthly",
    branchLimit: 5,
    userLimit: 20,
    features: {
      appointments: true,
      inventory: true,
      analytics: true,
      marketing: false,
      api: false,
    },
  },
  {
    id: "3",
    name: "Enterprise",
    price: 199,
    billingCycle: "monthly",
    branchLimit: -1,
    userLimit: -1,
    features: {
      appointments: true,
      inventory: true,
      analytics: true,
      marketing: true,
      api: true,
    },
  },
];

const featureLabels: Record<keyof Plan["features"], string> = {
  appointments: "Appointment Management",
  inventory: "Inventory Management",
  analytics: "Advanced Analytics",
  marketing: "Marketing Tools",
  api: "API Access",
};

export default function SubscriptionPlans() {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Subscription & Plans</h1>
          <p className="text-muted-foreground mt-1">Manage subscription plans and feature flags</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Plan
        </Button>
      </div>

      {/* Plans Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Subscription Plans ({plans.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Plan Name</TableHead>
                <TableHead className="text-muted-foreground">Price</TableHead>
                <TableHead className="text-muted-foreground">Branch Limit</TableHead>
                <TableHead className="text-muted-foreground">User Limit</TableHead>
                <TableHead className="text-muted-foreground">Features</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id} className="border-border">
                  <TableCell>
                    <p className="font-medium text-foreground">{plan.name}</p>
                  </TableCell>
                  <TableCell className="text-foreground">
                    ${plan.price}/{plan.billingCycle === "monthly" ? "mo" : "yr"}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {plan.branchLimit === -1 ? "Unlimited" : plan.branchLimit}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {plan.userLimit === -1 ? "Unlimited" : plan.userLimit}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {Object.entries(plan.features).map(([key, enabled]) =>
                        enabled ? (
                          <Badge key={key} variant="secondary" className="text-xs">
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
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(plan.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingPlan ? "Edit Plan" : "Create New Plan"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Plan Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background border-border"
                placeholder="e.g. Professional"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-foreground">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Billing Cycle</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={formData.billingCycle === "monthly" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, billingCycle: "monthly" })}
                    className="flex-1"
                  >
                    Monthly
                  </Button>
                  <Button
                    type="button"
                    variant={formData.billingCycle === "yearly" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({ ...formData, billingCycle: "yearly" })}
                    className="flex-1"
                  >
                    Yearly
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="branchLimit" className="text-foreground">Branch Limit (-1 for unlimited)</Label>
                <Input
                  id="branchLimit"
                  type="number"
                  value={formData.branchLimit}
                  onChange={(e) => setFormData({ ...formData, branchLimit: Number(e.target.value) })}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userLimit" className="text-foreground">User Limit (-1 for unlimited)</Label>
                <Input
                  id="userLimit"
                  type="number"
                  value={formData.userLimit}
                  onChange={(e) => setFormData({ ...formData, userLimit: Number(e.target.value) })}
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-foreground">Feature Flags</Label>
              <div className="space-y-3">
                {Object.entries(featureLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <span className="text-sm text-foreground">{label}</span>
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
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
