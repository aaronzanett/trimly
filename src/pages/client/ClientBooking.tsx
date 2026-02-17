import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronRight, Clock, Scissors, Star, Armchair } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const services = [
  { id: "1", name: "Classic Haircut", price: 350, duration: 30 },
  { id: "2", name: "Beard Trim", price: 200, duration: 20 },
  { id: "3", name: "Hair Color", price: 800, duration: 60 },
  { id: "4", name: "Hot Towel Shave", price: 300, duration: 25 },
  { id: "5", name: "Hair Treatment", price: 500, duration: 45 },
  { id: "6", name: "Kids Haircut", price: 250, duration: 20 },
];

const barbers = [
  { id: "1", name: "Marco Reyes", specialty: "Classic Cuts", rating: 4.9, available: true },
  { id: "2", name: "Jake Santos", specialty: "Fades & Tapers", rating: 4.8, available: true },
  { id: "3", name: "Carlos Diaz", specialty: "Beard Styling", rating: 4.7, available: false },
];

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"];
const chairs = ["Chair 1", "Chair 2", "Chair 3", "Chair 4"];

const ClientBooking = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedChair, setSelectedChair] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const toggleService = (id: string) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const totalPrice = selectedServices.reduce((sum, id) => {
    const svc = services.find(s => s.id === id);
    return sum + (svc?.price || 0);
  }, 0);

  const totalDuration = selectedServices.reduce((sum, id) => {
    const svc = services.find(s => s.id === id);
    return sum + (svc?.duration || 0);
  }, 0);

  const canProceed = () => {
    if (step === 1) return selectedServices.length > 0;
    if (step === 2) return !!selectedBarber;
    if (step === 3) return !!selectedDate && !!selectedTime;
    if (step === 4) return !!selectedChair;
    return false;
  };

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
    toast({ title: "Booking Confirmed!", description: "Your appointment has been scheduled successfully." });
  };

  const handleReset = () => {
    setStep(1);
    setSelectedServices([]);
    setSelectedBarber("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setSelectedChair("");
    setShowConfirmation(false);
    setBookingConfirmed(false);
  };

  // Simulated unavailable times
  const unavailableTimes = ["11:00 AM", "2:00 PM"];

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="font-display text-2xl font-bold mb-6">Book a Service</h1>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {["Service", "Barber", "Date & Time", "Chair"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
              step > i + 1 ? "bg-primary text-primary-foreground" :
              step === i + 1 ? "bg-primary text-primary-foreground" :
              "bg-secondary text-muted-foreground"
            )}>
              {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={cn("text-xs whitespace-nowrap", step === i + 1 ? "text-foreground font-medium" : "text-muted-foreground")}>{label}</span>
            {i < 3 && <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Services */}
      {step === 1 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-2">Select one or more services</p>
          {services.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            return (
              <Card
                key={service.id}
                className={cn("cursor-pointer transition-all", isSelected && "border-primary ring-1 ring-primary")}
                onClick={() => toggleService(service.id)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{service.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {service.duration} min
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary">₱{service.price}</span>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                    )}>
                      {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {selectedServices.length > 0 && (
            <Card className="bg-secondary/50">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{selectedServices.length} service(s) · {totalDuration} min</p>
                </div>
                <span className="font-bold text-lg text-primary">₱{totalPrice}</span>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Step 2: Select Barber */}
      {step === 2 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-2">Choose your barber</p>
          {barbers.map((barber) => (
            <Card
              key={barber.id}
              className={cn(
                "cursor-pointer transition-all",
                !barber.available && "opacity-50 cursor-not-allowed",
                selectedBarber === barber.id && "border-primary ring-1 ring-primary"
              )}
              onClick={() => barber.available && setSelectedBarber(barber.id)}
            >
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
                  {!barber.available && <Badge variant="secondary" className="text-xs mt-1">Unavailable</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Step 3: Date & Time */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Select a date</p>
            <Card>
              <CardContent className="p-4 flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="p-3 pointer-events-auto"
                />
              </CardContent>
            </Card>
          </div>
          {selectedDate && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Select a time for {format(selectedDate, "MMM d, yyyy")}</p>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {timeSlots.map((time) => {
                  const isUnavailable = unavailableTimes.includes(time);
                  return (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      disabled={isUnavailable}
                      onClick={() => setSelectedTime(time)}
                      className={cn("text-xs", isUnavailable && "line-through")}
                    >
                      {time}
                    </Button>
                  );
                })}
              </div>
              {selectedTime && (
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Check className="h-3 w-3 text-primary" /> Schedule is available
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Step 4: Chair */}
      {step === 4 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-2">Select a chair</p>
          <div className="grid grid-cols-2 gap-3">
            {chairs.map((chair) => (
              <Card
                key={chair}
                className={cn("cursor-pointer transition-all text-center", selectedChair === chair && "border-primary ring-1 ring-primary")}
                onClick={() => setSelectedChair(chair)}
              >
                <CardContent className="p-6">
                  <Armchair className={cn("h-8 w-8 mx-auto mb-2", selectedChair === chair ? "text-primary" : "text-muted-foreground")} />
                  <p className="font-semibold text-sm">{chair}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setStep(s => s - 1)} disabled={step === 1}>Back</Button>
        {step < 4 ? (
          <Button onClick={() => setStep(s => s + 1)} disabled={!canProceed()}>Next</Button>
        ) : (
          <Button onClick={() => setShowConfirmation(true)} disabled={!canProceed()}>Review Booking</Button>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{bookingConfirmed ? "Booking Confirmed! 🎉" : "Confirm Your Booking"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Services</span>
              <span className="font-medium text-right">
                {selectedServices.map(id => services.find(s => s.id === id)?.name).join(", ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Barber</span>
              <span className="font-medium">{barbers.find(b => b.id === selectedBarber)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-medium">{selectedDate && format(selectedDate, "MMM d, yyyy")} at {selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Chair</span>
              <span className="font-medium">{selectedChair}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{totalDuration} min</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-primary text-lg">₱{totalPrice}</span>
            </div>
          </div>
          <DialogFooter>
            {bookingConfirmed ? (
              <Button className="w-full" onClick={handleReset}>Book Another</Button>
            ) : (
              <Button className="w-full" onClick={handleConfirmBooking}>Confirm Booking</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientBooking;
