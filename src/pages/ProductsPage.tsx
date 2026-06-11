import Navbar from "../components/Navbar";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex min-h-screen items-center justify-center px-4 pt-20">
        <section className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl shadow-black/30">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
            Product Catalog
          </p>

          <h1 className="mt-4 font-sans text-3xl font-semibold tracking-normal text-white md:text-4xl">
            Temporarily Unavailable
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            Our product catalog is currently under review and will be available
            again soon. For product inquiries, quotations, or urgent requests,
            please contact Althixtron directly.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-5 text-left">
            <p className="text-sm font-semibold text-slate-200">
              Need assistance?
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              You may request product details, availability, and quotation
              directly from our team.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:sales@althixtron.com?subject=Product Inquiry"
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-blue-500"
              >
                Email Us
              </a>

              <a
                href="/"
                className="flex-1 rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-medium text-slate-300 transition hover:border-blue-500 hover:text-white"
              >
                Back to Home
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}