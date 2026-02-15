import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, DollarSign, ListOrdered, CheckCircle, AlertCircle } from "lucide-react";

const StaffDashboard = () => {
  const [currentShift] = useState({
    date: "2026-02-15",
    startTime: "09:00",
    endTime: "17:00",
    branch: "Main Branch",
    status: "Active",
  });

  const [attendanceStatus] = useState({
    checkedIn: true,
    checkInTime: "08:55",
    checkOutTime: null as string | null,
    hoursWorked: "6h 15m",
    status: "On Time",
  });

  const [commission] = useState({
    today: 125000,
    thisWeek: 580000,
    thisMonth: 2350000,
    pendingServices: 3,
  });

  const [queue] = useState([
    { id: "1", customerName: "Ahmad", service: "Haircut", estimatedTime: "30 min", position: 1 },
    { id: "2", customerName: "Budi", service: "Haircut + Beard", estimatedTime: "45 min", position: 2 },
    { id: "3", customerName: "Charlie", service: "Hair Color", estimatedTime: "60 min", position: 3 },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Staff Dashboard</h1>
        <p className="text-[hsl(var(--admin-muted-foreground))]">Welcome back! Here's your shift overview.</p>
      </div>

      {/* Current Shift */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Current Shift</p>
                <p className="font-semibold text-[hsl(var(--admin-card-foreground))]">{currentShift.startTime} - {currentShift.endTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Attendance</p>
                <p className="font-semibold text-[hsl(var(--admin-card-foreground))]">
                  {attendanceStatus.checkedIn ? `In: ${attendanceStatus.checkInTime}` : "Not Checked In"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Today's Commission</p>
                <p className="font-semibold text-[hsl(var(--admin-card-foreground))]">Rp {commission.today.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <ListOrdered className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Queue</p>
                <p className="font-semibold text-[hsl(var(--admin-card-foreground))]">{queue.length} customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shift Details */}
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader>
            <CardTitle className="text-[hsl(var(--admin-card-foreground))]">Shift Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[hsl(var(--admin-muted-foreground))]">Branch</span>
              <span className="text-[hsl(var(--admin-card-foreground))] font-medium">{currentShift.branch}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[hsl(var(--admin-muted-foreground))]">Date</span>
              <span className="text-[hsl(var(--admin-card-foreground))] font-medium">{currentShift.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[hsl(var(--admin-muted-foreground))]">Hours Worked</span>
              <span className="text-[hsl(var(--admin-card-foreground))] font-medium">{attendanceStatus.hoursWorked}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[hsl(var(--admin-muted-foreground))]">Status</span>
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20">{attendanceStatus.status}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-[hsl(var(--admin-muted-foreground))]">Commission (Month)</span>
              <span className="text-[hsl(var(--admin-card-foreground))] font-semibold">Rp {commission.thisMonth.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Queue */}
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader>
            <CardTitle className="text-[hsl(var(--admin-card-foreground))]">Active Queue</CardTitle>
          </CardHeader>
          <CardContent>
            {queue.length === 0 ? (
              <div className="text-center py-8 text-[hsl(var(--admin-muted-foreground))]">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No customers in queue</p>
              </div>
            ) : (
              <div className="space-y-3">
                {queue.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-[hsl(var(--admin-background))] border border-[hsl(var(--admin-border))]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                        {item.position}
                      </div>
                      <div>
                        <p className="font-medium text-[hsl(var(--admin-card-foreground))]">{item.customerName}</p>
                        <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">{item.service}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[hsl(var(--admin-muted-foreground))]">{item.estimatedTime}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;
