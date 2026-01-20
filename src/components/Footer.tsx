import { Scissors } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Product: ["Features", "Pricing", "Integrations", "API"],
    Company: ["About", "Careers", "Blog", "Press"],
    Resources: ["Documentation", "Help Center", "Community", "Contact"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
  };

  return (
    <footer id="contact" className="py-16 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Scissors className="h-7 w-7 text-primary" />
              <span className="font-display text-xl font-bold text-foreground">
                Trimly
              </span>
            </a>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              The all-in-one platform for modern barbershops.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-foreground mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-muted-foreground">
            © 2024 Trimly. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Twitter
            </a>
            <a
              href="#"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="#"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
