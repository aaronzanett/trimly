import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserCircle, Lock, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AccountProfile = () => {
  const { toast } = useToast();

  const [profile, setProfile] = useState({
    name: "Ahmad Barber",
    email: "ahmad@trimly.com",
    phone: "+62 812 3456 7890",
    role: "Senior Barber",
    branch: "Main Branch",
    joinDate: "2024-06-15",
    employeeId: "EMP-001",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileSave = () => {
    toast({ title: "Profile Updated", description: "Your personal details have been saved." });
  };

  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast({ title: "Error", description: "Please fill all password fields.", variant: "destructive" });
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" });
      return;
    }
    if (passwords.new.length < 8) {
      toast({ title: "Error", description: "Password must be at least 8 characters.", variant: "destructive" });
      return;
    }
    setPasswords({ current: "", new: "", confirm: "" });
    toast({ title: "Password Changed", description: "Your password has been updated successfully." });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-[hsl(var(--admin-card-foreground))]">Account Profile</h1>
        <p className="text-[hsl(var(--admin-muted-foreground))]">Manage your personal details and security.</p>
      </div>

      {/* Profile Card */}
      <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                {profile.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-[hsl(var(--admin-card-foreground))]">{profile.name}</h2>
              <p className="text-[hsl(var(--admin-muted-foreground))]">{profile.role} • {profile.branch}</p>
              <p className="text-sm text-[hsl(var(--admin-muted-foreground))]">ID: {profile.employeeId} • Joined: {profile.joinDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal" className="gap-2"><UserCircle className="w-4 h-4" /> Personal Details</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Lock className="w-4 h-4" /> Change Password</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-[hsl(var(--admin-card-foreground))]">Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Full Name</Label>
                  <Input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="border-[hsl(var(--admin-border))]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Email</Label>
                  <Input value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className="border-[hsl(var(--admin-border))]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-card-foreground))]">Phone Number</Label>
                  <Input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} className="border-[hsl(var(--admin-border))]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-muted-foreground))]">Role (read-only)</Label>
                  <Input value={profile.role} disabled className="border-[hsl(var(--admin-border))] opacity-60" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-muted-foreground))]">Branch (read-only)</Label>
                  <Input value={profile.branch} disabled className="border-[hsl(var(--admin-border))] opacity-60" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[hsl(var(--admin-muted-foreground))]">Employee ID (read-only)</Label>
                  <Input value={profile.employeeId} disabled className="border-[hsl(var(--admin-border))] opacity-60" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleProfileSave} className="gap-2">
                  <Save className="w-4 h-4" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
            <CardHeader>
              <CardTitle className="text-[hsl(var(--admin-card-foreground))]">Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Current Password</Label>
                <Input type="password" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} className="border-[hsl(var(--admin-border))]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">New Password</Label>
                <Input type="password" value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} className="border-[hsl(var(--admin-border))]" />
              </div>
              <div className="space-y-2">
                <Label className="text-[hsl(var(--admin-card-foreground))]">Confirm New Password</Label>
                <Input type="password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} className="border-[hsl(var(--admin-border))]" />
              </div>
              <Button onClick={handlePasswordChange} className="gap-2">
                <Lock className="w-4 h-4" /> Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountProfile;
