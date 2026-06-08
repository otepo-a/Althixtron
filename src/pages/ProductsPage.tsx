import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fetchProductsFromGoogleSheet } from "../data/googleSheetProducts";
import Navbar from "../components/Navbar";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  brand: string;
  category: string;
  stock: number;
  specs?: string;
  inclusions?: string;
};

type BrandGroup = {
  name: string;
  logo: string;
  models: {
    id: string;
    name: string;
    image: string;
    price: number;
    stock: number;
    specs?: string;
    inclusions?: string;
  }[];
};

type CategoryGroup = {
  name: string;
  brands: BrandGroup[];
};

type CartItem = Product & {
  qty: number;
};

type CheckoutStage = "summary" | "quote" | "sent";

export default function ProductsPage() {
  const [productsData, setProductsData] = useState<CategoryGroup[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");

  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutStage, setCheckoutStage] = useState<CheckoutStage>("summary");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerMessage, setCustomerMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoadingProducts(true);
        const sheetProducts = await fetchProductsFromGoogleSheet();
        setProductsData(sheetProducts);
        setProductsError("");
      } catch (error) {
        console.error(error);
        setProductsError(
          "Hindi ma-load ang products from Google Sheets. Check published CSV link or sharing settings."
        );
      } finally {
        setIsLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo(
    () => ["All", ...productsData.map((cat) => cat.name)],
    [productsData]
  );

  const brands = useMemo(
    () => [
      "All",
      ...new Set(
        productsData.flatMap((cat) => cat.brands.map((brand) => brand.name))
      ),
    ],
    [productsData]
  );

  const allProducts = useMemo<Product[]>(
    () =>
      productsData.flatMap((categoryItem) =>
        categoryItem.brands.flatMap((brandItem) =>
          brandItem.models.map((model) => ({
            ...model,
            brand: brandItem.name,
            category: categoryItem.name,
          }))
        )
      ),
    [productsData]
  );

  const filteredProducts = useMemo(
    () =>
      allProducts
        .filter((product) =>
          category === "All" ? true : product.category === category
        )
        .filter((product) => (brand === "All" ? true : product.brand === brand))
        .filter((product) => {
          const query = search.toLowerCase();

          return (
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            String(product.specs || "").toLowerCase().includes(query)
          );
        }),
    [allProducts, category, brand, search]
  );

  const addToCart = (product: Product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: Math.min(item.qty + 1, product.stock) }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (productId: string, qty: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId
            ? { ...item, qty: Math.max(1, Math.min(qty, item.stock)) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
  const total = subtotal;

  const quoteLines = [
    `Quote request from ${customerName || "Guest"}`,
    `Email: ${customerEmail || "Not provided"}`,
    "",
    "Order details:",
    ...cart.map(
      (item) =>
        `- ${item.qty} x ${item.name} @ ${
          item.price > 0 ? `₱${item.price.toLocaleString()}` : "Request Price"
        } = ${
          item.price > 0
            ? `₱${(item.qty * item.price).toLocaleString()}`
            : "Request Price"
        }`
    ),
    "",
    `Subtotal: ₱${subtotal.toLocaleString()}`,
    `Total: ₱${total.toLocaleString()}`,
    "",
    `Message: ${customerMessage || "No additional notes."}`,
  ].join("\n");

  const handleProceedToCheckout = () => {
    setCheckoutStage("quote");
  };

  const handleSendQuoteEmail = () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail);

    if (!isValidEmail) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");

    const subject = encodeURIComponent("Althixtron Quote Request");
    const body = encodeURIComponent(quoteLines);

    window.open(
      `mailto:sales@althixtron.com?subject=${subject}&body=${body}`,
      "_blank"
    );

    setCheckoutStage("sent");
  };

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100">
      <Navbar />

      <main className="pt-20">
        <section className="relative overflow-hidden border-b border-blue-500/20 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.35),_transparent_35%),linear-gradient(135deg,_#070b14,_#0b1220_45%,_#0f2b46)]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(2,132,199,0.08)_1px,_transparent_1px),linear-gradient(rgba(2,132,199,0.08)_1px,_transparent_1px)] bg-[size:42px_42px] opacity-30" />

          <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex rounded-full border border-blue-400/50 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-sky-300 shadow-sm">
                Althixtron Product Hub
              </div>

              <h1 className="mt-5 max-w-2xl text-4xl font-black tracking-tight text-white md:text-5xl">
                Electronics Products
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 md:text-base">
                Browse communication equipment, accessories, power supply,
                chargers, batteries, antennas, and trusted tech products from
                your Google Sheets catalog.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-300">
                  Quote-ready
                </span>
                <span className="rounded-full border border-slate-600 bg-slate-900/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                  Google Sheets Powered
                </span>
                <span className="rounded-full border border-slate-600 bg-slate-900/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                  Easy Updates
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-slate-900/70 px-7 py-6 text-white shadow-2xl shadow-blue-950/40 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
                Official Catalog
              </p>

              <p className="mt-2 text-3xl font-black">Get a Quote</p>

              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-300">
                Click a product to view specs and inclusions, then add it to
                your quote cart.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-800 bg-[#050914]">
          <div className="mx-auto max-w-7xl px-4 py-5">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:bg-slate-900"
            />
          </div>
        </section>

        <section className="border-b border-slate-800 bg-[#050914]">
          <div className="mx-auto max-w-7xl px-4 py-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-sky-300">
                Brands
              </h2>

              <button
                onClick={() => setBrand("All")}
                className="text-sm font-semibold text-sky-300 hover:text-sky-200"
              >
                See All
              </button>
            </div>

            <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-800 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {brands
                .filter((item) => item !== "All")
                .slice(0, 12)
                .map((item) => (
                  <button
                    key={item}
                    onClick={() => setBrand(item)}
                    className={`flex h-20 items-center justify-center border border-slate-800 bg-slate-900/80 px-3 text-center text-sm font-bold transition hover:border-sky-400 hover:bg-sky-500/10 hover:text-sky-300 ${
                      brand === item
                        ? "border-sky-400 bg-sky-500/10 text-sky-300"
                        : "text-slate-300"
                    }`}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 lg:grid-cols-[220px_1fr_320px]">
          <aside className="hidden h-fit rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl shadow-black/20 lg:block">
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.12em] text-slate-100">
              ☰ All Categories
            </h3>

            <div className="space-y-1 border-b border-slate-800 pb-4">
              {categories.map((name) => (
                <button
                  key={name}
                  onClick={() => setCategory(name)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                    category === name
                      ? "bg-blue-600 font-bold text-white"
                      : "text-slate-300 hover:bg-sky-500/10 hover:text-sky-300"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            <div className="mt-5">
              <h4 className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-slate-100">
                Search Filter
              </h4>

              <p className="mb-2 text-sm font-bold text-slate-300">Brand</p>

              <div className="space-y-2">
                {brands.map((name) => (
                  <label
                    key={name}
                    className="flex cursor-pointer items-center gap-2 text-sm text-slate-300"
                  >
                    <input
                      type="radio"
                      name="brand"
                      checked={brand === name}
                      onChange={() => setBrand(name)}
                      className="accent-blue-500"
                    />
                    {name}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <section>
            <div className="mb-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-3 shadow-xl shadow-black/20">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-slate-400">Sort by</span>

                  <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-500">
                    Popular
                  </button>

                  <button className="rounded-lg bg-slate-800 px-5 py-2 text-sm font-semibold text-slate-300 ring-1 ring-slate-700 hover:text-sky-300">
                    Latest
                  </button>

                  <button className="rounded-lg bg-slate-800 px-5 py-2 text-sm font-semibold text-slate-300 ring-1 ring-slate-700 hover:text-sky-300">
                    Top Sales
                  </button>

                  <button className="rounded-lg bg-slate-800 px-5 py-2 text-sm font-semibold text-slate-300 ring-1 ring-slate-700 hover:text-sky-300">
                    Price
                  </button>
                </div>

                <p className="text-sm font-semibold text-slate-400">
                  {isLoadingProducts
                    ? "Loading..."
                    : `${filteredProducts.length} products`}
                </p>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3 lg:hidden">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-11 rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 outline-none focus:border-sky-400"
              >
                {categories.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              <select
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                className="h-11 rounded-xl border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 outline-none focus:border-sky-400"
              >
                {brands.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {isLoadingProducts && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-12 text-center text-slate-400 shadow-xl shadow-black/20">
                Loading products from Google Sheets...
              </div>
            )}

            {productsError && (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-950/40 p-5 text-sm text-rose-200">
                {productsError}
              </div>
            )}

            {!isLoadingProducts &&
            !productsError &&
            filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-12 text-center text-slate-400 shadow-xl shadow-black/20">
                No products match your criteria. Try a different search or
                filter.
              </div>
            ) : null}

            {!isLoadingProducts &&
              !productsError &&
              filteredProducts.length > 0 && (
                <div
                  id="product-grid"
                  ref={productGridRef}
                  className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4"
                >
                  {filteredProducts.map((product) => (
                    <article
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-sky-950/40"
                    >
                      <div className="relative h-52 overflow-hidden bg-white">
                        <div className="flex h-full w-full items-center justify-center p-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain object-center transition duration-300 group-hover:scale-105"
                          />
                        </div>

                        <span className="absolute right-0 top-0 bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                          best seller
                        </span>

                        <span className="absolute bottom-0 left-0 bg-slate-950 px-2 py-1 text-[10px] font-black uppercase text-sky-300">
                          Althixtron
                        </span>
                      </div>

                      <div className="p-3">
                        <p className="text-[11px] text-slate-400">
                          {product.category}
                        </p>

                        <h2 className="mt-1 line-clamp-2 min-h-[40px] text-sm leading-5 text-slate-100">
                          {product.name}
                        </h2>

                        <p className="mt-2 text-lg font-black text-sky-300">
                          {product.price > 0
                            ? `₱${product.price.toLocaleString()}`
                            : "Request Price"}
                        </p>

                        <div className="mt-1 flex items-center justify-between gap-2 text-xs text-slate-400">
                          <span>{product.brand}</span>
                          <span>{product.stock} stock</span>
                        </div>

                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            addToCart(product);
                          }}
                          disabled={product.stock === 0}
                          className="mt-3 w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
                        >
                          {product.stock === 0 ? "Sold out" : "Add to Quote"}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
          </section>

          <aside className="h-fit space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl shadow-black/20">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-100">
                  Quote Cart
                </h2>

                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-sky-300">
                  {cart.length} items
                </span>
              </div>

              {cart.length === 0 ? (
                <p className="rounded-xl bg-slate-800/80 p-4 text-sm text-slate-400">
                  Your cart is empty. Add products to start your quote.
                </p>
              ) : (
                <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-lg border border-slate-800 bg-white object-contain p-1"
                        />

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-semibold text-slate-100">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {item.price > 0
                              ? `₱${item.price.toLocaleString()}`
                              : "Request Price"}
                          </p>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="mt-1 text-xs font-semibold text-rose-400 hover:text-rose-300"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-slate-700">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="h-8 w-8 text-slate-300 hover:bg-slate-800"
                          >
                            −
                          </button>

                          <span className="w-10 text-center text-sm font-bold text-slate-100">
                            {item.qty}
                          </span>

                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="h-8 w-8 text-slate-300 hover:bg-slate-800"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-sm font-black text-sky-300">
                          {item.price > 0
                            ? `₱${(item.price * item.qty).toLocaleString()}`
                            : "Request Price"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl shadow-black/20">
              <h3 className="text-lg font-black text-slate-100">
                Order Summary
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <div className="flex justify-between text-lg font-black text-sky-300">
                    <span>Total</span>
                    <span>₱{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={handleProceedToCheckout}
                className="mt-5 w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
              >
                Proceed to Quote
              </button>
            </div>
          </aside>
        </section>
      </main>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 18, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 18, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black lg:h-[82vh] lg:overflow-hidden"
            >
              <div className="grid lg:h-full lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative flex h-[360px] items-center justify-center overflow-hidden bg-white p-6 sm:h-[420px] lg:h-full lg:p-8">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="max-h-full max-w-full object-contain object-center"
                  />

                  <span className="absolute left-6 top-6 rounded-full bg-blue-600 px-3 py-1 text-xs font-black uppercase text-white">
                    {selectedProduct.brand}
                  </span>
                </div>

                <div className="flex flex-col overflow-hidden p-6 lg:h-full">
                  <div className="shrink-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">
                          {selectedProduct.category}
                        </p>

                        <h2 className="mt-2 text-3xl font-black text-white">
                          {selectedProduct.name}
                        </h2>

                        <p className="mt-3 text-2xl font-black text-sky-300">
                          {selectedProduct.price > 0
                            ? `₱${selectedProduct.price.toLocaleString()}`
                            : "Request Price"}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          {selectedProduct.stock} stock available
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-sky-400 hover:text-sky-300"
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 max-h-[260px] overflow-y-auto pr-3 [scrollbar-color:#38bdf8_#0f172a] [scrollbar-width:thin] sm:max-h-[320px] lg:min-h-0 lg:flex-1 lg:max-h-none">
                    {selectedProduct.specs && (
                      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                        <h3 className="text-sm font-black uppercase tracking-[0.16em] text-sky-300">
                          Specification
                        </h3>

                        <div className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-300">
                          {selectedProduct.specs}
                        </div>
                      </div>
                    )}

                    {selectedProduct.inclusions && (
                      <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                        <h3 className="text-sm font-black uppercase tracking-[0.16em] text-sky-300">
                          Inclusions
                        </h3>

                        <div className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-300">
                          {selectedProduct.inclusions}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 shrink-0 border-t border-slate-800 pt-4">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        onClick={() => {
                          addToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        disabled={selectedProduct.stock === 0}
                        className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                      >
                        {selectedProduct.stock === 0
                          ? "Sold out"
                          : "Add to Quote"}
                      </button>

                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="flex-1 rounded-xl border border-slate-700 bg-transparent px-5 py-3 text-sm font-black text-slate-300 transition hover:border-sky-400 hover:text-sky-300"
                      >
                        Continue Browsing
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutStage !== "summary" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6"
          >
            <motion.div
              initial={{ scale: 0.98, y: 18, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 18, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">
                    {checkoutStage === "quote"
                      ? "Quote Preview"
                      : "Quote Sent"}
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    {checkoutStage === "quote"
                      ? "Review your quote and send it by email."
                      : "Your email client opened so you can finish sending the quote."}
                  </p>
                </div>

                <button
                  onClick={() => setCheckoutStage("summary")}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-sky-400 hover:text-sky-300"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-sky-300">
                    Order Details
                  </p>

                  <div className="mt-4 space-y-3 text-sm">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3"
                      >
                        <div>
                          <p className="font-bold text-slate-100">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {item.qty} x{" "}
                            {item.price > 0
                              ? `₱${item.price.toLocaleString()}`
                              : "Request Price"}
                          </p>
                        </div>

                        <p className="text-sm font-black text-sky-300">
                          {item.price > 0
                            ? `₱${(item.qty * item.price).toLocaleString()}`
                            : "Request Price"}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 border-t border-slate-800 pt-4 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span>₱{subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-lg font-black text-sky-300">
                      <span>Total</span>
                      <span>₱{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                  {checkoutStage === "quote" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-300">
                          Email
                        </label>

                        <input
                          value={customerEmail}
                          onChange={(event) =>
                            setCustomerEmail(event.target.value)
                          }
                          placeholder="you@example.com"
                          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-300">
                          Name
                        </label>

                        <input
                          value={customerName}
                          onChange={(event) =>
                            setCustomerName(event.target.value)
                          }
                          placeholder="Your name"
                          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-300">
                          Message
                        </label>

                        <textarea
                          value={customerMessage}
                          onChange={(event) =>
                            setCustomerMessage(event.target.value)
                          }
                          placeholder="Additional requests or delivery notes"
                          className="mt-2 min-h-[120px] w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-400"
                        />
                      </div>

                      {emailError && (
                        <p className="text-sm text-rose-400">{emailError}</p>
                      )}

                      <button
                        onClick={handleSendQuoteEmail}
                        className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-500"
                      >
                        Send Quote by Email
                      </button>

                      <button
                        onClick={() => setCheckoutStage("summary")}
                        className="w-full rounded-xl border border-slate-700 bg-transparent px-5 py-3 text-sm font-black text-slate-300 hover:border-sky-400 hover:text-sky-300"
                      >
                        Back to Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-5 text-sm text-slate-400">
                      <p>
                        Your email client opened with the quote details. Complete
                        the email to send the quote.
                      </p>

                      <button
                        onClick={() => setCheckoutStage("summary")}
                        className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-500"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}