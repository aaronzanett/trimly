import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import VerifyCode from "./pages/VerifyCode";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TenantManagement from "./pages/admin/TenantManagement";
import SubscriptionPlans from "./pages/admin/SubscriptionPlans";
import PlatformUsers from "./pages/admin/PlatformUsers";
import BillingMonitor from "./pages/admin/BillingMonitor";
import SystemControl from "./pages/admin/SystemControl";

// Owner Portal
import { OwnerLayout } from "./components/owner/OwnerLayout";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import BranchManagement from "./pages/owner/BranchManagement";
import EmployeeManagement from "./pages/owner/EmployeeManagement";
import CommissionScheme from "./pages/owner/CommissionScheme";
import BusinessFinance from "./pages/owner/BusinessFinance";
import Services from "./pages/owner/Services";
import Products from "./pages/owner/Products";
import TenantSettings from "./pages/owner/TenantSettings";
import FinancialReports from "./pages/owner/reports/FinancialReports";
import SalesReports from "./pages/owner/reports/SalesReports";
import EmployeeReports from "./pages/owner/reports/EmployeeReports";
import ProductReports from "./pages/owner/reports/ProductReports";

// Staff Portal
import { StaffLayout } from "./components/staff/StaffLayout";
import StaffDashboard from "./pages/staff/StaffDashboard";
import AttendanceShift from "./pages/staff/AttendanceShift";
import POSCashier from "./pages/staff/POSCashier";
import CommissionSalary from "./pages/staff/CommissionSalary";
import CashAdvance from "./pages/staff/CashAdvance";
import AccountProfile from "./pages/staff/AccountProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="tenants" element={<TenantManagement />} />
            <Route path="subscriptions" element={<SubscriptionPlans />} />
            <Route path="users" element={<PlatformUsers />} />
            <Route path="billing" element={<BillingMonitor />} />
            <Route path="system" element={<SystemControl />} />
          </Route>

          {/* Owner Portal Routes (Dynamic Tenant) */}
          <Route path="/:tenant" element={<OwnerLayout />}>
            <Route path="dashboard" element={<OwnerDashboard />} />
            <Route path="branches" element={<BranchManagement />} />
            <Route path="employees" element={<EmployeeManagement />} />
            <Route path="commission" element={<CommissionScheme />} />
            <Route path="finance" element={<BusinessFinance />} />
            <Route path="services" element={<Services />} />
            <Route path="products" element={<Products />} />
            <Route path="settings" element={<TenantSettings />} />
            <Route path="reports/financial" element={<FinancialReports />} />
            <Route path="reports/sales" element={<SalesReports />} />
            <Route path="reports/employees" element={<EmployeeReports />} />
            <Route path="reports/products" element={<ProductReports />} />
          </Route>

          {/* Staff Portal Routes (Dynamic Tenant) */}
          <Route path="/:tenant/staff" element={<StaffLayout />}>
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="attendance" element={<AttendanceShift />} />
            <Route path="pos" element={<POSCashier />} />
            <Route path="commission" element={<CommissionSalary />} />
            <Route path="cash-advance" element={<CashAdvance />} />
            <Route path="profile" element={<AccountProfile />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
