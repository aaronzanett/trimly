import { useState } from "react";
import { Percent, Calculator, Save, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";

const mockServices = [
  { id: "1", name: "Regular Haircut", price: 50000, commission: 30 },
  { id: "2", name: "Premium Haircut", price: 85000, commission: 35 },
  { id: "3", name: "Hair Coloring", price: 150000, commission: 25 },
  { id: "4", name: "Beard Trim", price: 35000, commission: 30 },
  { id: "5", name: "Hair Treatment", price: 120000, commission: 20 },
  { id: "6", name: "Kids Haircut", price: 40000, commission: 30 },
];

export default function CommissionScheme() {
  const [globalCommission, setGlobalCommission] = useState(30);
  const [simulationServices, setSimulationServices] = useState(20);
  const [simulationProductSales, setSimulationProductSales] = useState(5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateSimulation = () => {
    const avgServicePrice = 70000;
    const avgProductPrice = 85000;
    const serviceCommission = 0.3;
    const productCommission = 0.1;

    const serviceEarnings = simulationServices * avgServicePrice * serviceCommission;
    const productEarnings = simulationProductSales * avgProductPrice * productCommission;
    const totalEarnings = serviceEarnings + productEarnings;
    const baseSalary = 2500000;

    return {
      serviceEarnings,
      productEarnings,
      totalCommission: totalEarnings,
      baseSalary,
      totalPayslip: baseSalary + totalEarnings,
    };
  };

  const simulation = calculateSimulation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">
          Commission & Salary Scheme
        </h1>
        <p className="text-[hsl(var(--admin-muted-foreground))]">
          Configure commission rates and preview payslips
        </p>
      </div>

      <Tabs defaultValue="global" className="space-y-6">
        <TabsList className="bg-[hsl(var(--admin-background))] border border-[hsl(var(--admin-border))]">
          <TabsTrigger
            value="global"
            className="data-[state=active]:bg-[hsl(var(--admin-card))] data-[state=active]:text-[hsl(var(--admin-card-foreground))]"
          >
            Global Scheme
          </TabsTrigger>
          <TabsTrigger
            value="services"
            className="data-[state=active]:bg-[hsl(var(--admin-card))] data-[state=active]:text-[hsl(var(--admin-card-foreground))]"
          >
            Per Service
          </TabsTrigger>
          <TabsTrigger
            value="simulation"
            className="data-[state=active]:bg-[hsl(var(--admin-card))] data-[state=active]:text-[hsl(var(--admin-card-foreground))]"
          >
            Simulation
          </TabsTrigger>
          <TabsTrigger
            value="payslip"
            className="data-[state=active]:bg-[hsl(var(--admin-card))] data-[state=active]:text-[hsl(var(--admin-card-foreground))]"
          >
            Payslip Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
                <Percent className="w-5 h-5 text-primary" />
                Global Commission Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">
                    Default Service Commission Rate
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[globalCommission]}
                      onValueChange={(value) => setGlobalCommission(value[0])}
                      max={50}
                      min={5}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-primary w-16 text-right">
                      {globalCommission}%
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">
                    Product Sales Commission Rate
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      defaultValue={[10]}
                      max={30}
                      min={5}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-primary w-16 text-right">10%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Base Salary (Barber)</Label>
                  <Input
                    defaultValue="2500000"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Base Salary (Cashier)</Label>
                  <Input
                    defaultValue="2000000"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Base Salary (Manager)</Label>
                  <Input
                    defaultValue="4000000"
                    className="bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))]">
                Commission Per Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[hsl(var(--admin-border))] hover:bg-transparent">
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Service</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Price</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Commission %</TableHead>
                    <TableHead className="text-[hsl(var(--admin-muted-foreground))]">Commission Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockServices.map((service) => (
                    <TableRow
                      key={service.id}
                      className="border-[hsl(var(--admin-border))] hover:bg-[hsl(var(--admin-row-hover))]"
                    >
                      <TableCell className="font-medium text-[hsl(var(--admin-card-foreground))]">
                        {service.name}
                      </TableCell>
                      <TableCell className="text-[hsl(var(--admin-card-foreground))]">
                        {formatCurrency(service.price)}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          defaultValue={service.commission}
                          className="w-20 bg-[hsl(var(--admin-background))] border-[hsl(var(--admin-border))] text-[hsl(var(--admin-card-foreground))]"
                        />
                      </TableCell>
                      <TableCell className="text-primary font-medium">
                        {formatCurrency((service.price * service.commission) / 100)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end pt-4">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulation">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Commission Simulation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">
                    Number of Services Completed
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[simulationServices]}
                      onValueChange={(value) => setSimulationServices(value[0])}
                      max={50}
                      min={0}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-xl font-bold text-[hsl(var(--admin-card-foreground))] w-12 text-right">
                      {simulationServices}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">
                    Products Sold
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[simulationProductSales]}
                      onValueChange={(value) => setSimulationProductSales(value[0])}
                      max={20}
                      min={0}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-xl font-bold text-[hsl(var(--admin-card-foreground))] w-12 text-right">
                      {simulationProductSales}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="p-4 rounded-lg bg-[hsl(var(--admin-background))]">
                  <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Service Commission</p>
                  <p className="text-lg font-bold text-[hsl(var(--admin-card-foreground))]">
                    {formatCurrency(simulation.serviceEarnings)}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[hsl(var(--admin-background))]">
                  <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Product Commission</p>
                  <p className="text-lg font-bold text-[hsl(var(--admin-card-foreground))]">
                    {formatCurrency(simulation.productEarnings)}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[hsl(var(--admin-background))]">
                  <p className="text-xs text-[hsl(var(--admin-muted-foreground))]">Total Commission</p>
                  <p className="text-lg font-bold text-primary">
                    {formatCurrency(simulation.totalCommission)}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/10">
                  <p className="text-xs text-primary">Estimated Payslip</p>
                  <p className="text-lg font-bold text-primary">
                    {formatCurrency(simulation.totalPayslip)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payslip">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-lg font-display text-[hsl(var(--admin-card-foreground))] flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Payslip Preview - Ahmad Fauzi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-[hsl(var(--admin-border))] rounded-lg p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[hsl(var(--admin-card-foreground))]">
                      Trimly Barbershop
                    </h3>
                    <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Central Branch</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Period</p>
                    <p className="font-medium text-[hsl(var(--admin-card-foreground))]">January 2025</p>
                  </div>
                </div>

                <div className="border-t border-[hsl(var(--admin-border))] pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Employee Name</p>
                      <p className="font-medium text-[hsl(var(--admin-card-foreground))]">Ahmad Fauzi</p>
                    </div>
                    <div>
                      <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">Position</p>
                      <p className="font-medium text-[hsl(var(--admin-card-foreground))]">Senior Barber</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[hsl(var(--admin-border))] pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--admin-card-foreground))]">Base Salary</span>
                    <span className="font-medium text-[hsl(var(--admin-card-foreground))]">
                      {formatCurrency(2500000)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--admin-card-foreground))]">
                      Service Commission (142 services)
                    </span>
                    <span className="font-medium text-[hsl(var(--admin-card-foreground))]">
                      {formatCurrency(2980000)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--admin-card-foreground))]">
                      Product Commission (12 sales)
                    </span>
                    <span className="font-medium text-[hsl(var(--admin-card-foreground))]">
                      {formatCurrency(102000)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[hsl(var(--admin-card-foreground))]">Attendance Bonus</span>
                    <span className="font-medium text-[hsl(var(--admin-card-foreground))]">
                      {formatCurrency(200000)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[hsl(var(--admin-border))] pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-[hsl(var(--admin-card-foreground))]">Total Payslip</span>
                    <span className="font-bold text-primary">{formatCurrency(5782000)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
