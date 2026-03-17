import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Save, Plus, Trash2, RotateCcw, Star, ImageIcon,
  Calendar, Users, TrendingUp, Scissors, Clock, DollarSign,
  BarChart3, Heart, Shield, Zap, Award, Store, MapPin,
  Phone, Mail, ThumbsUp, Sparkles, Target, Rocket,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  getFrontPageContent,
  saveFrontPageContent,
  defaultContent,
  type FrontPageContent,
  type TestimonialItem,
  type HeroStat,
} from "@/lib/contentStore";

// Available icons for stat cards
const AVAILABLE_ICONS: { name: string; icon: React.ElementType; label: string }[] = [
  { name: "calendar", icon: Calendar, label: "Calendar" },
  { name: "users", icon: Users, label: "Users" },
  { name: "trending-up", icon: TrendingUp, label: "Trending Up" },
  { name: "scissors", icon: Scissors, label: "Scissors" },
  { name: "clock", icon: Clock, label: "Clock" },
  { name: "dollar-sign", icon: DollarSign, label: "Dollar" },
  { name: "bar-chart-3", icon: BarChart3, label: "Chart" },
  { name: "heart", icon: Heart, label: "Heart" },
  { name: "shield", icon: Shield, label: "Shield" },
  { name: "zap", icon: Zap, label: "Zap" },
  { name: "award", icon: Award, label: "Award" },
  { name: "store", icon: Store, label: "Store" },
  { name: "map-pin", icon: MapPin, label: "Location" },
  { name: "phone", icon: Phone, label: "Phone" },
  { name: "mail", icon: Mail, label: "Mail" },
  { name: "thumbs-up", icon: ThumbsUp, label: "Thumbs Up" },
  { name: "sparkles", icon: Sparkles, label: "Sparkles" },
  { name: "target", icon: Target, label: "Target" },
  { name: "rocket", icon: Rocket, label: "Rocket" },
];

export const getIconComponent = (name: string) => {
  return AVAILABLE_ICONS.find((i) => i.name === name)?.icon || Calendar;
};

const ContentManagement = () => {
  const [content, setContent] = useState<FrontPageContent>(getFrontPageContent);
  const { toast } = useToast();

  const handleSave = () => {
    saveFrontPageContent(content);
    toast({ title: "Content saved", description: "Front page content has been updated successfully." });
  };

  const handleReset = () => {
    setContent(defaultContent);
    saveFrontPageContent(defaultContent);
    toast({ title: "Content reset", description: "Front page content has been restored to defaults." });
  };

  const updateStat = (index: number, field: keyof HeroStat, value: string) => {
    const stats = [...content.heroStats];
    stats[index] = { ...stats[index], [field]: value };
    setContent({ ...content, heroStats: stats });
  };

  const updateTestimonial = (index: number, field: keyof TestimonialItem, value: string | number) => {
    const testimonials = [...content.testimonials];
    testimonials[index] = { ...testimonials[index], [field]: value };
    setContent({ ...content, testimonials });
  };

  const addTestimonial = () => {
    setContent({
      ...content,
      testimonials: [
        ...content.testimonials,
        { name: "", role: "", content: "", rating: 5, image: "" },
      ],
    });
  };

  const removeTestimonial = (index: number) => {
    setContent({
      ...content,
      testimonials: content.testimonials.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground mt-1">Manage front page content visible to all visitors.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="stats">Stats & Numbers</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="cta">Call to Action</TabsTrigger>
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Edit the main banner content on the landing page.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Badge Text</Label>
                <Input
                  value={content.heroBadge}
                  onChange={(e) => setContent({ ...content, heroBadge: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Headline</Label>
                  <Input
                    value={content.heroHeadline}
                    onChange={(e) => setContent({ ...content, heroHeadline: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Headline Highlight (gold text)</Label>
                  <Input
                    value={content.heroHeadlineHighlight}
                    onChange={(e) => setContent({ ...content, heroHeadlineHighlight: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Subheadline</Label>
                <Textarea
                  value={content.heroSubheadline}
                  onChange={(e) => setContent({ ...content, heroSubheadline: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats */}
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Stats Cards</CardTitle>
              <CardDescription>Edit the 3 stat cards shown below the hero headline. Choose an icon for each.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.heroStats.map((stat, index) => {
                const CurrentIcon = getIconComponent(stat.icon);
                return (
                  <div key={index}>
                    {index > 0 && <Separator className="mb-4" />}
                    <p className="text-sm font-medium text-muted-foreground mb-3">Card {index + 1}</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Icon</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start gap-2">
                              <CurrentIcon className="w-4 h-4 text-primary" />
                              <span className="truncate text-xs">{AVAILABLE_ICONS.find(i => i.name === stat.icon)?.label || "Select"}</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-64 p-3" align="start">
                            <p className="text-xs font-medium text-muted-foreground mb-2">Choose an icon</p>
                            <div className="grid grid-cols-5 gap-1">
                              {AVAILABLE_ICONS.map((item) => (
                                <button
                                  key={item.name}
                                  type="button"
                                  onClick={() => updateStat(index, "icon", item.name)}
                                  className={`p-2 rounded-md transition-colors flex items-center justify-center ${
                                    stat.icon === item.name
                                      ? "bg-primary text-primary-foreground"
                                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                  }`}
                                  title={item.label}
                                >
                                  <item.icon className="w-4 h-4" />
                                </button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>Value</Label>
                        <Input
                          value={stat.value}
                          onChange={(e) => updateStat(index, "value", e.target.value)}
                          placeholder="e.g. 50K+"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={stat.title}
                          onChange={(e) => updateStat(index, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          value={stat.description}
                          onChange={(e) => updateStat(index, "description", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials */}
        <TabsContent value="testimonials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Testimonials
                <Button size="sm" onClick={addTestimonial}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Testimonial
                </Button>
              </CardTitle>
              <CardDescription>Manage customer testimonials displayed on the landing page.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.testimonials.map((t, index) => (
                <div key={index}>
                  {index > 0 && <Separator className="mb-4" />}
                  <div className="flex items-start gap-4">
                    {/* Photo preview */}
                    <div className="flex-shrink-0 space-y-2">
                      <Label className="text-xs">Photo</Label>
                      <div className="w-16 h-16 rounded-full border-2 border-dashed border-border overflow-hidden bg-muted flex items-center justify-center">
                        {t.image ? (
                          <img
                            src={t.image}
                            alt={t.name || "Preview"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                              (e.target as HTMLImageElement).parentElement!.classList.add("fallback");
                            }}
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-muted-foreground">Testimonial {index + 1}</p>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => removeTestimonial(index)}>
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input value={t.name} onChange={(e) => updateTestimonial(index, "name", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Role / Company</Label>
                          <Input value={t.role} onChange={(e) => updateTestimonial(index, "role", e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        <Label>Testimonial Text</Label>
                        <Textarea value={t.content} onChange={(e) => updateTestimonial(index, "content", e.target.value)} rows={2} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Photo URL</Label>
                          <Input value={t.image} onChange={(e) => updateTestimonial(index, "image", e.target.value)} placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                          <Label>Rating (1-5)</Label>
                          <div className="flex items-center gap-1 pt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => updateTestimonial(index, "rating", star)}
                                className="focus:outline-none"
                              >
                                <Star
                                  className={`w-5 h-5 transition-colors ${
                                    star <= t.rating ? "fill-primary text-primary" : "text-muted-foreground"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {content.testimonials.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No testimonials yet. Click "Add Testimonial" to create one.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* CTA */}
        <TabsContent value="cta" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Call to Action Section</CardTitle>
              <CardDescription>Edit the CTA section near the bottom of the landing page.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Headline</Label>
                  <Input
                    value={content.ctaHeadline}
                    onChange={(e) => setContent({ ...content, ctaHeadline: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Headline Highlight (gold text)</Label>
                  <Input
                    value={content.ctaHeadlineHighlight}
                    onChange={(e) => setContent({ ...content, ctaHeadlineHighlight: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Subheadline</Label>
                <Textarea
                  value={content.ctaSubheadline}
                  onChange={(e) => setContent({ ...content, ctaSubheadline: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Note (below button)</Label>
                <Input
                  value={content.ctaNote}
                  onChange={(e) => setContent({ ...content, ctaNote: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
