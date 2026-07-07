const FeaturedProductsSection = () => {
  return (
    <section className="bg-background px-4 py-20">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            Featured Solutions
          </span>

          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3">
            Business Communication & Technology Solutions
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Explore Althixtron solutions for team communication, security,
            office operations, ICT support, and technical service needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <a
            href="/two-way-radio"
            className="group rounded-2xl border border-primary/20 bg-card p-6 transition hover:border-primary hover:shadow-lg hover:shadow-primary/10"
          >
            <h3 className="text-2xl font-display font-bold mb-3">
              Two Way Radio Products
            </h3>

            <p className="text-muted-foreground mb-6">
              Cignus two way radios for security teams, warehouses,
              construction sites, events, field work, and business communication.
            </p>

            <span className="font-semibold text-primary group-hover:underline">
              View Two Way Radios →
            </span>
          </a>

          <a
            href="/products"
            className="group rounded-2xl border border-primary/20 bg-card p-6 transition hover:border-primary hover:shadow-lg hover:shadow-primary/10"
          >
            <h3 className="text-2xl font-display font-bold mb-3">
              Product Catalog & Quote Request
            </h3>

            <p className="text-muted-foreground mb-6">
              Browse available products, check specifications, view pricing,
              and add items to your quotation request.
            </p>

            <span className="font-semibold text-primary group-hover:underline">
              Browse Catalog →
            </span>
          </a>

          <a
            href="/#services"
            className="group rounded-2xl border border-primary/20 bg-card p-6 transition hover:border-primary hover:shadow-lg hover:shadow-primary/10"
          >
            <h3 className="text-2xl font-display font-bold mb-3">
              Technical Services
            </h3>

            <p className="text-muted-foreground mb-6">
              CCTV installation, network infrastructure, structured cabling,
              ICT support, system maintenance, and related technical services.
            </p>

            <span className="font-semibold text-primary group-hover:underline">
              View Services →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;