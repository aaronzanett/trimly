import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const comparisonData = [
  {
    feature: "Built specifically for barbershops",
    trimly: true,
    others: false,
  },
  {
    feature: "Automated SMS & email reminders",
    trimly: true,
    others: "partial",
  },
  {
    feature: "Team scheduling & commission tracking",
    trimly: true,
    others: "partial",
  },
  {
    feature: "Branded client mobile app",
    trimly: true,
    others: false,
  },
  {
    feature: "Real-time analytics dashboard",
    trimly: true,
    others: "partial",
  },
  {
    feature: "Integrated payment processing",
    trimly: true,
    others: true,
  },
  {
    feature: "No per-barber fees",
    trimly: true,
    others: false,
  },
  {
    feature: "24/7 Priority support",
    trimly: true,
    others: false,
  },
];

const StatusIcon = ({ status }: { status: boolean | string }) => {
  if (status === true) {
    return (
      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
        <Check className="w-4 h-4 text-primary" />
      </div>
    );
  }
  if (status === "partial") {
    return (
      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
        <Minus className="w-4 h-4 text-muted-foreground" />
      </div>
    );
  }
  return (
    <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
      <X className="w-4 h-4 text-destructive" />
    </div>
  );
};

const Comparison = () => {
  return (
    <section className="py-24 bg-background">
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
            Why Trimly
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            Not All Booking Software Is Created Equal
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Generic scheduling tools weren't made for barbershops. See how Trimly stacks up against the competition.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="font-display text-foreground text-base py-5 pl-6">
                    Feature
                  </TableHead>
                  <TableHead className="font-display text-center text-primary text-base py-5">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold">Trimly</span>
                    </div>
                  </TableHead>
                  <TableHead className="font-display text-center text-muted-foreground text-base py-5 pr-6">
                    <div className="flex flex-col items-center">
                      <span>Other Tools</span>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow 
                    key={row.feature} 
                    className="border-border hover:bg-secondary/30"
                  >
                    <TableCell className="font-body text-foreground py-4 pl-6">
                      {row.feature}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex justify-center">
                        <StatusIcon status={row.trimly} />
                      </div>
                    </TableCell>
                    <TableCell className="py-4 pr-6">
                      <div className="flex justify-center">
                        <StatusIcon status={row.others} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center font-body text-sm text-muted-foreground mt-6"
          >
            <span className="text-primary">●</span> Full support &nbsp;
            <span className="text-muted-foreground">●</span> Partial/Limited &nbsp;
            <span className="text-destructive">●</span> Not available
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;
