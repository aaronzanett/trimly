import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Lock, Scissors, Star, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const haircutHistory = [
  { id: "1", date: "2026-02-15", style: "Textured Crop", barber: "Rizal Hidayat", notes: "Short sides, textured top" },
  { id: "2", date: "2026-01-28", style: "Classic Taper", barber: "Fajar Nugraha", notes: "Clean taper, 2 on sides" },
  { id: "3", date: "2026-01-10", style: "Pompadour", barber: "Rizal Hidayat", notes: "Volume on top, skin fade" },
];

const favoriteBarbers = [
  { id: "1", name: "Rizal Hidayat", specialty: "Classic Cuts", visits: 12, rating: 4.9 },
  { id: "2", name: "Fajar Nugraha", specialty: "Fades & Tapers", visits: 5, rating: 4.8 },
];

const ClientProfile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    firstName: "Budi",
    lastName: "Setiawan",
    email: "budi@email.com",
    phone: "+62 812 345 6789",
  });
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });

  const handleProfileSave = () => {
    toast({ title: "Profile Updated", description: "Your personal details have been saved." });
  };

  const handlePasswordChange = () => {
    if (passwords.newPass !== passwords.confirm) {
      toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" });
      return;
    }
    if (passwords.newPass.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    toast({ title: "Password Changed", description: "Your password has been updated." });
    setPasswords({ current: "", newPass: "", confirm: "" });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="font-display text-2xl font-bold mb-6">My Profile</h1>

      <Tabs defaultValue="profile">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="profile" className="flex-1 gap-1"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="haircuts" className="flex-1 gap-1"><Scissors className="h-4 w-4" /> Haircuts</TabsTrigger>
          <TabsTrigger value="favorites" className="flex-1 gap-1"><Star className="h-4 w-4" /> Favorites</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                      {profile.firstName[0]}{profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="secondary" size="icon" className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full">
                    <Camera className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input value={profile.firstName} onChange={(e) => setProfile(p => ({ ...p, firstName: e.target.value }))} />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input value={profile.lastName} onChange={(e) => setProfile(p => ({ ...p, lastName: e.target.value }))} />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input value={profile.email} onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={profile.phone} onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))} />
              </div>
              <Button onClick={handleProfileSave} className="w-full">Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Lock className="h-4 w-4" /> Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Current Password</Label>
                <Input type="password" value={passwords.current} onChange={(e) => setPasswords(p => ({ ...p, current: e.target.value }))} />
              </div>
              <div>
                <Label>New Password</Label>
                <Input type="password" value={passwords.newPass} onChange={(e) => setPasswords(p => ({ ...p, newPass: e.target.value }))} />
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <Input type="password" value={passwords.confirm} onChange={(e) => setPasswords(p => ({ ...p, confirm: e.target.value }))} />
              </div>
              <Button onClick={handlePasswordChange} variant="outline" className="w-full">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Haircut History Tab */}
        <TabsContent value="haircuts" className="space-y-3">
          <p className="text-sm text-muted-foreground mb-2">Your past styles and looks</p>
          {haircutHistory.map((cut) => (
            <Card key={cut.id}>
              <CardContent className="p-4 flex gap-4">
                <div className="w-16 h-16 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0">
                  <Camera className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{cut.style}</p>
                  <p className="text-xs text-muted-foreground">{cut.barber} · {cut.date}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cut.notes}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Favorite Barbers Tab */}
        <TabsContent value="favorites" className="space-y-3">
          <p className="text-sm text-muted-foreground mb-2">Your go-to barbers</p>
          {favoriteBarbers.map((barber) => (
            <Card key={barber.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {barber.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{barber.name}</p>
                  <p className="text-xs text-muted-foreground">{barber.specialty}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-sm font-semibold">{barber.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{barber.visits} visits</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientProfile;
