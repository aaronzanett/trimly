import { motion } from "framer-motion";
import { Calendar, Users, CreditCard, BarChart3, Bell, Smartphone } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Intuitive booking system that syncs with your barbers' availability in real-time.",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Manage schedules, track performance, and assign clients to your team effortlessly.",
  },
  {
    icon: CreditCard,
    title: "Seamless Payments",
    description: "Accept payments online and in-person with integrated payment processing.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track revenue, popular services, and customer trends with powerful insights.",
  },
  {
    icon: Bell,
    title: "Automated Reminders",
    description: "Reduce no-shows with automatic SMS and email appointment reminders.",
  },
  {
    icon: Smartphone,
    title: "Client App",
    description: "Give clients a branded app to book appointments and manage their profiles.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-card">
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
            Features
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Everything You Need to Run Your Shop
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            From booking to payments, Trimly handles it all so you can focus on what you do best—creating great haircuts.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
