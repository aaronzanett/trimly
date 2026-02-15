import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, LogIn, LogOut, Download, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  hoursWorked: string;
  status: "On Time" | "Late" | "Overtime" | "Absent";
  overtime: string;
}

const AttendanceShift = () => {
  const { toast } = useToast();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [monthFilter, setMonthFilter] = useState("february");

  const [history] = useState<AttendanceRecord[]>([
    { id: "1", date: "2026-02-14", checkIn: "08:55", checkOut: "17:05", hoursWorked: "8h 10m", status: "On Time", overtime: "10m" },
    { id: "2", date: "2026-02-13", checkIn: "09:15", checkOut: "17:00", hoursWorked: "7h 45m", status: "Late", overtime: "-" },
    { id: "3", date: "2026-02-12", checkIn: "08:50", checkOut: "19:00", hoursWorked: "10h 10m", status: "Overtime", overtime: "2h 10m" },
    { id: "4", date: "2026-02-11", checkIn: "09:00", checkOut: "17:00", hoursWorked: "8h 0m", status: "On Time", overtime: "-" },
    { id: "5", date: "2026-02-10", checkIn: "-", checkOut: "-", hoursWorked: "-", status: "Absent", overtime: "-" },
  ]);

  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
    setIsCheckedIn(true);
    setCheckInTime(now);
    toast({ title: "Checked In", description: `You checked in at ${now}` });
  };

  const handleCheckOut = () => {
    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
    setIsCheckedIn(false);
    toast({ title: "Checked Out", description: `You checked out at ${now}` });
  };

  const handleExport = () => {
    const headers = ["Date", "Check In", "Check Out", "Hours Worked", "Status", "Overtime"];
    const rows = history.map(r => [r.date, r.checkIn, r.checkOut, r.hoursWorked, r.status, r.overtime]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance-history.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: "Attendance history exported as CSV." });
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      "On Time": "bg-green-500/10 text-green-600 border-green-500/20",
      "Late": "bg-red-500/10 text-red-600 border-red-500/20",
      "Overtime": "bg-blue-500/10 text-blue-600 border-blue-500/20",
      "Absent": "bg-gray-500/10 text-gray-500 border-gray-500/20",
    };
    return map[status] || "";
  };

  const totalLate = history.filter(r => r.status === "Late").length;
  const totalOvertime = history.filter(r => r.status === "Overtime").length;
  const totalAbsent = history.filter(r => r.status === "Absent").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Attendance & Shift</h1>
          <p className="text-[hsl(var(--admin-muted-foreground))]">Manage your check-in, check-out, and attendance history.</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
      </div>

      {/* Check-in / Check-out */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3 rounded-full bg-primary/10">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-[hsl(var(--admin-card-foreground))]">
                  {isCheckedIn ? `Checked in at ${checkInTime}` : "You are not checked in"}
                </p>
                <p className="text-[hsl(var(--admin-muted-foreground))]">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleCheckIn} disabled={isCheckedIn} className="gap-2">
                <LogIn className="w-4 h-4" /> Check In
              </Button>
              <Button onClick={handleCheckOut} disabled={!isCheckedIn} variant="outline" className="gap-2 border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]">
                <LogOut className="w-4 h-4" /> Check Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Late This Month</p>
              <p className="text-xl font-bold text-[hsl(var(--admin-card-foreground))]">{totalLate}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Overtime Days</p>
              <p className="text-xl font-bold text-[hsl(var(--admin-card-foreground))]">{totalOvertime}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Absent Days</p>
              <p className="text-xl font-bold text-[hsl(var(--admin-card-foreground))]">{totalAbsent}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance History */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[hsl(var(--admin-card-foreground))]">Attendance History</CardTitle>
          <Select value={monthFilter} onValueChange={setMonthFilter}>
            <SelectTrigger className="w-40 border-[hsl(var(--admin-border))]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="february">February 2026</SelectItem>
              <SelectItem value="january">January 2026</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[hsl(var(--admin-border))]">
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Date</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Check In</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Check Out</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Hours Worked</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Status</TableHead>
                <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Overtime</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((record) => (
                <TableRow key={record.id} className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]">
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{record.date}</TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{record.checkIn}</TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{record.checkOut}</TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{record.hoursWorked}</TableCell>
                  <TableCell><Badge className={getStatusBadge(record.status)}>{record.status}</Badge></TableCell>
                  <TableCell className="text-[hsl(var(--admin-card-foreground))]">{record.overtime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceShift;
