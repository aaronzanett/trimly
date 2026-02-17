import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scissors, ShoppingBag, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";

const bookingHistory = [
  { id: "1", date: "2026-02-15", time: "3:00 PM", services: ["Classic Haircut", "Beard Trim"], barber: "Marco Reyes", total: 550, status: "completed" },
  { id: "2", date: "2026-02-01", time: "10:00 AM", services: ["Hair Color"], barber: "Jake Santos", total: 800, status: "completed" },
  { id: "3", date: "2026-02-20", time: "2:00 PM", services: ["Classic Haircut"], barber: "Marco Reyes", total: 350, status: "upcoming" },
  { id: "4", date: "2026-01-20", time: "11:00 AM", services: ["Hot Towel Shave"], barber: "Carlos Diaz", total: 300, status: "cancelled" },
];

const purchaseHistory = [
  { id: "1", date: "2026-02-15", items: ["Pomade Strong Hold x2"], total: 900, status: "delivered", receipt: "TRM-12345678" },
  { id: "2", date: "2026-02-10", items: ["Beard Oil x1", "Hair Wax Matte x1"], total: 730, status: "delivered", receipt: "TRM-12345679" },
  { id: "3", date: "2026-02-18", items: ["Hair Clay x1"], total: 400, status: "processing", receipt: "TRM-12345680" },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  completed: { icon: CheckCircle2, color: "text-green-500", label: "Completed" },
  upcoming: { icon: Clock, color: "text-primary", label: "Upcoming" },
  cancelled: { icon: XCircle, color: "text-destructive", label: "Cancelled" },
  delivered: { icon: CheckCircle2, color: "text-green-500", label: "Delivered" },
  processing: { icon: Loader2, color: "text-primary", label: "Processing" },
};

const ClientHistory = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="font-display text-2xl font-bold mb-6">History</h1>

      <Tabs defaultValue="bookings">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="bookings" className="flex-1 gap-1"><Scissors className="h-4 w-4" /> Bookings</TabsTrigger>
          <TabsTrigger value="purchases" className="flex-1 gap-1"><ShoppingBag className="h-4 w-4" /> Purchases</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-3">
          {bookingHistory.map((booking) => {
            const status = statusConfig[booking.status];
            const StatusIcon = status.icon;
            return (
              <Card key={booking.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm">{booking.services.join(" + ")}</p>
                      <p className="text-xs text-muted-foreground">{booking.barber}</p>
                    </div>
                    <Badge variant="outline" className={`gap-1 ${status.color}`}>
                      <StatusIcon className="h-3 w-3" /> {status.label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{booking.date} at {booking.time}</span>
                    <span className="font-semibold text-foreground">₱{booking.total}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="purchases" className="space-y-3">
          {purchaseHistory.map((purchase) => {
            const status = statusConfig[purchase.status];
            const StatusIcon = status.icon;
            return (
              <Card key={purchase.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm">{purchase.items.join(", ")}</p>
                      <p className="text-xs text-muted-foreground">Receipt: {purchase.receipt}</p>
                    </div>
                    <Badge variant="outline" className={`gap-1 ${status.color}`}>
                      <StatusIcon className="h-3 w-3" /> {status.label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{purchase.date}</span>
                    <span className="font-semibold text-foreground">₱{purchase.total}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientHistory;
