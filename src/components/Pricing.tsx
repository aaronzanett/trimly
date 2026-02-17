import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "149.000",
    description: "Perfect for solo barbers getting started",
    features: [
      "1 Barber profile",
      "Up to 100 appointments/month",
      "Basic scheduling",
      "Email reminders",
      "Online booking page",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "229.000",
    description: "For growing barbershops with a team",
    features: [
      "Up to 5 Barber profiles",
      "Unlimited appointments",
      "Advanced scheduling",
      "SMS & Email reminders",
      "Payment processing",
      "Analytics dashboard",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "299.000",
    description: "For multi-location barbershop chains",
    features: [
      "Unlimited Barber profiles",
      "Unlimited appointments",
      "Multi-location support",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "White-label client app",
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-body text-sm text-primary uppercase tracking-widest">
            Pricing
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            No hidden fees. No long-term contracts. Cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border ${
                plan.popular
                  ? "bg-card border-primary shadow-gold"
                  : "bg-card border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-gold rounded-full">
                  <span className="font-body text-xs font-semibold text-primary-foreground uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="font-body text-lg text-muted-foreground">Rp</span>
                  <span className="font-display text-4xl font-bold text-foreground ml-1">
                    {plan.price}
                  </span>
                  <span className="font-body text-muted-foreground ml-2">/bulan</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="font-body text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "heroOutline"}
                className="w-full"
                size="lg"
                asChild
              >
                <Link to="/register">Get Started</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
