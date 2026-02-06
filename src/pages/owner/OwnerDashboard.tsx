import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Building2,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockStats = {
  todayTurnover: 2450000,
  monthlyTurnover: 48500000,
  estimatedProfit: 14550000,
  activeBranches: 4,
};

const mockTopBarbers = [
  { name: "Ahmad Fauzi", branch: "Central Branch", revenue: 8500000, services: 142 },
  { name: "Budi Santoso", branch: "West Branch", revenue: 7200000, services: 128 },
  { name: "Candra Wijaya", branch: "Central Branch", revenue: 6800000, services: 115 },
  { name: "Deni Kurniawan", branch: "East Branch", revenue: 5900000, services: 98 },
];

const mockAlerts = [
  { type: "cash", message: "Cash discrepancy of Rp 150,000 at West Branch", severity: "high" },
  { type: "commission", message: "Unusual commission spike for Budi Santoso", severity: "medium" },
  { type: "stock", message: "Pomade stock critically low at Central Branch", severity: "high" },
  { type: "stock", message: "Hair wax running low at East Branch", severity: "low" },
];

export default function OwnerDashboard() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default:
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">
          Owner Dashboard
        </h1>
        <p className="text-[hsl(var(--admin-muted-foreground))]">
          Overview of your barbershop business performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Today's Turnover
            </CardTitle>
            <DollarSign className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {formatCurrency(mockStats.todayTurnover)}
            </div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +12% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Monthly Turnover
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {formatCurrency(mockStats.monthlyTurnover)}
            </div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Estimated Profit
            </CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {formatCurrency(mockStats.estimatedProfit)}
            </div>
            <div className="flex items-center text-xs text-[hsl(var(--admin-muted-foreground))] mt-1">
              30% margin
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
              Active Branches
            </CardTitle>
            <Building2 className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">
              {mockStats.activeBranches}
            </div>
            <div className="flex items-center text-xs text-[hsl(var(--admin-muted-foreground))] mt-1">
              All branches operational
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Barbers */}
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader>
            <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Top Barbers This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTopBarbers.map((barber, index) => (
                <div
                  key={barber.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-[hsl(var(--admin-background))] hover:bg-[hsl(var(--admin-hover))] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-[hsl(var(--admin-card-foreground))]">
                        {barber.name}
                      </p>
                      <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">
                        {barber.branch} • {barber.services} services
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[hsl(var(--admin-card-foreground))]">
                      {formatCurrency(barber.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader>
            <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{alert.message}</p>
                      <Badge
                        variant="outline"
                        className={`mt-2 text-xs ${getSeverityColor(alert.severity)}`}
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
