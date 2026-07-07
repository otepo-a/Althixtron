import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TwoWayRadioPage = () => {
  const products = [
    {
      name: "Cignus UV-88 Dual Band FM Transceiver",
      description:
        "A compact dual band two way radio suitable for security teams, warehouse coordination, field work, outdoor activities, and daily business communication.",
    },
    {
      name: "Cignus UV-87 Two Way Radio",
      description:
        "A practical two way radio option for team coordination, business operations, events, and general communication needs.",
    },
    {
      name: "Cignus UV-86 Dual Band Radio",
      description:
        "A reliable dual band radio designed for teams that need clear communication for security, field operations, and worksite coordination.",
    },
  ];

  const uses = [
    "Security teams",
    "Warehouse operations",
    "Construction sites",
    "Event coordination",
    "Field work",
    "Outdoor activities",
    "Business communication",
    "Team coordination",
  ];

  const benefits = [
    "Supplier warranty and replacement support for factory defects",
    "Suitable for business, security, warehouse, and field operations",
    "Available Cignus radio models depending on stock availability",
    "Local assistance for product inquiry and coordination",
  ];

  const faqs = [
    {
      question: "What is a two way radio used for?",
      answer:
        "A two way radio is used for fast voice communication between team members. It is commonly used by security personnel, warehouse teams, construction workers, event staff, field workers, and outdoor users.",
    },
    {
      question:
        "What is the difference between a walkie-talkie and a two way radio?",
      answer:
        "A walkie-talkie is a portable type of two way radio. The term two way radio can refer to handheld radios and other radio communication devices that can send and receive voice communication.",
    },
    {
      question: "Where can I buy two way radios in the Philippines?",
      answer:
        "You can inquire at Althixtron Electronic Supply and Services Inc. for available two way radio products, including Cignus radio models for business, security, warehouse, construction, and field communication.",
    },
    {
      question: "What two way radio models are available at Althixtron?",
      answer:
        "Available models may include Cignus UV-88, Cignus UV-87, Cignus UV-86, and other radio communication products depending on stock availability.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Two Way Radio Philippines | Althixtron</title>
        <meta
          name="description"
          content="Althixtron supplies two way radios for security teams, warehouses, construction sites, events, field operations, outdoor activities, and business communication in the Philippines."
        />
        <link rel="canonical" href="https://www.althixtron.com/two-way-radio" />

        <meta
          property="og:title"
          content="Two Way Radio Philippines | Althixtron"
        />
        <meta
          property="og:description"
          content="Reliable two way radio products for security, warehouse, construction, events, field operations, and business communication."
        />
        <meta
          property="og:url"
          content="https://www.althixtron.com/two-way-radio"
        />
        <meta
          property="og:image"
          content="https://www.althixtron.com/og-image.jpg"
        />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground">
        <Navbar />

        {/* HERO SECTION */}
        <section className="border-b border-border bg-gradient-to-b from-[#07111f] to-background px-4 py-20">
          <div className="container mx-auto">
            <div className="mb-6 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary">
                Home
              </a>
              <span className="mx-2">/</span>
              <a href="/products" className="hover:text-primary">
                Products
              </a>
              <span className="mx-2">/</span>
              <span className="text-primary">Two Way Radio</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Radio Communication Solutions
                </p>

                <h1 className="mb-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
                  Two Way Radio Philippines
                </h1>

                <p className="mb-8 max-w-3xl text-lg leading-8 text-muted-foreground">
                  Althixtron Electronic Supply and Services Inc. provides two way
                  radio products for security teams, warehouse operations,
                  construction sites, events, field work, outdoor activities, and
                  business communication.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="/products"
                    className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
                  >
                    View Two Way Radio Products
                  </a>

                  <a
                    href="/#contact"
                    className="rounded-lg border border-primary/40 px-6 py-3 font-semibold text-primary transition hover:bg-primary/10"
                  >
                    Request a Quotation
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-card p-6 shadow-lg shadow-primary/5">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Best For
                </p>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Security teams and guards</li>
                  <li>Warehouse and logistics operations</li>
                  <li>Construction site coordination</li>
                  <li>Event staff and crowd control</li>
                  <li>Field work and outdoor communication</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT SECTION */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Available Models
              </p>

              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
                Two Way Radio Products Available
              </h2>

              <p className="text-muted-foreground">
                Althixtron offers Cignus two way radio models for businesses and
                teams that need dependable communication for daily operations.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="rounded-2xl border border-primary/20 bg-card p-6 transition hover:border-primary hover:shadow-lg hover:shadow-primary/10"
                >
                  <h3 className="mb-3 font-display text-2xl font-bold">
                    {product.name}
                  </h3>

                  <p className="mb-6 text-sm leading-7 text-muted-foreground">
                    {product.description}
                  </p>

                  <a
                    href="/products"
                    className="font-semibold text-primary hover:underline"
                  >
                    View in Catalog →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* USE CASE SECTION */}
        <section className="border-y border-border bg-muted/20 px-4 py-20">
          <div className="container mx-auto">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Best For
              </p>

              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
                Best Uses of Two Way Radios
              </h2>

              <p className="text-muted-foreground">
                Two way radios are useful for teams that need fast and direct
                communication without relying only on mobile calls or internet
                connection.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {uses.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-primary/20 bg-card p-5 font-semibold transition hover:border-primary"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE SECTION */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Why Althixtron
              </p>

              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
                Why Choose Althixtron for Two Way Radios?
              </h2>

              <p className="text-muted-foreground">
                Althixtron supports businesses, offices, security teams, and
                field operations with practical electronic supply and
                communication solutions.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-xl border border-primary/20 bg-card p-5 text-muted-foreground"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="border-y border-border bg-muted/20 px-4 py-20">
          <div className="container mx-auto">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Common Questions
              </p>

              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Frequently Asked Questions About Two Way Radios
              </h2>
            </div>

            <div className="space-y-5">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-primary/20 bg-card p-6"
                >
                  <h3 className="mb-2 text-xl font-semibold">{faq.question}</h3>
                  <p className="leading-7 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-8 md:p-12">
              <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
                Need Two Way Radios for Your Team?
              </h2>

              <p className="mb-8 max-w-3xl text-muted-foreground">
                Contact Althixtron today to inquire about available two way radio
                products, Cignus radio models, pricing, and stock availability.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/products"
                  className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Browse Catalog
                </a>

                <a
                  href="/#contact"
                  className="inline-block rounded-lg border border-primary/40 px-6 py-3 font-semibold text-primary transition hover:bg-primary/10"
                >
                  Request a Quotation
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default TwoWayRadioPage;