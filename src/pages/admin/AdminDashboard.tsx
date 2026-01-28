import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, GitBranch, DollarSign, TrendingDown, Activity, Calendar, Users, Clock } from "lucide-react";

const stats = [
  {
    title: "Active Tenants",
    value: "127",
    change: "+12%",
    changeType: "positive" as const,
    icon: Building2,
  },
  {
    title: "Total Branches",
    value: "342",
    change: "+8%",
    changeType: "positive" as const,
    icon: GitBranch,
  },
  {
    title: "MRR",
    value: "$24,580",
    change: "+15%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Tenant Churn",
    value: "2.3%",
    change: "-0.5%",
    changeType: "positive" as const,
    icon: TrendingDown,
  },
];

const todayActivities = [
  { time: "09:15 AM", event: "New tenant signup", tenant: "Elite Cuts Barbershop", type: "signup" },
  { time: "10:30 AM", event: "Subscription upgraded", tenant: "Urban Style Studio", type: "upgrade" },
  { time: "11:45 AM", event: "New branch added", tenant: "Classic Barbers", type: "branch" },
  { time: "02:00 PM", event: "Payment received", tenant: "The Gentleman's Corner", type: "payment" },
  { time: "03:30 PM", event: "Trial started", tenant: "Fresh Fades Lounge", type: "trial" },
  { time: "04:15 PM", event: "Support ticket opened", tenant: "Premium Cuts", type: "support" },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "signup":
      return <Users className="w-4 h-4 text-green-500" />;
    case "upgrade":
      return <TrendingDown className="w-4 h-4 text-primary rotate-180" />;
    case "branch":
      return <GitBranch className="w-4 h-4 text-blue-500" />;
    case "payment":
      return <DollarSign className="w-4 h-4 text-green-500" />;
    case "trial":
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case "support":
      return <Activity className="w-4 h-4 text-orange-500" />;
    default:
      return <Activity className="w-4 h-4 text-muted-foreground" />;
  }
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Dashboard</h1>
        <p className="text-[hsl(var(--admin-muted-foreground))] mt-1">Platform overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[hsl(var(--admin-muted-foreground))]">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[hsl(var(--admin-card-foreground))]">{stat.value}</div>
              <p className={`text-xs mt-1 ${stat.changeType === "positive" ? "text-green-600" : "text-destructive"}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Activity */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader className="flex flex-row items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))]">Today's Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg bg-[hsl(var(--admin-muted))] hover:bg-[hsl(var(--admin-border))] transition-colors"
              >
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[hsl(var(--admin-card-foreground))]">{activity.event}</p>
                  <p className="text-xs text-[hsl(var(--admin-muted-foreground))] truncate">{activity.tenant}</p>
                </div>
                <div className="text-xs text-[hsl(var(--admin-muted-foreground))]">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
