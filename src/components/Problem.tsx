import { motion } from "framer-motion";
import { XCircle, Clock, DollarSign, Users } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Endless No-Shows",
    description: "Clients forget appointments, leaving chairs empty and revenue lost.",
  },
  {
    icon: XCircle,
    title: "Scheduling Chaos",
    description: "Double bookings, manual calendars, and constant phone interruptions.",
  },
  {
    icon: DollarSign,
    title: "Revenue Leaks",
    description: "Missed upsells, no recurring booking prompts, and inefficient pricing.",
  },
  {
    icon: Users,
    title: "Team Headaches",
    description: "Tracking barber schedules, commissions, and performance is a nightmare.",
  },
];

const Problem = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-destructive/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-body text-sm text-destructive uppercase tracking-widest">
            The Problem
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Running a Barbershop Shouldn't Feel Like This
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Most shop owners spend more time managing chaos than doing what they love—cutting hair.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-destructive/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-5 group-hover:bg-destructive/20 transition-colors duration-300">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Transition Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center font-body text-lg text-muted-foreground mt-16 max-w-2xl mx-auto"
        >
          Sound familiar? <span className="text-primary font-medium">Trimly was built to fix all of this.</span>
        </motion.p>
      </div>
    </section>
  );
};

export default Problem;
