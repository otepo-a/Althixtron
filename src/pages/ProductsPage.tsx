import { useEffect, useMemo, useState } from "react";
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
  const [checkoutStage, setCheckoutStage] =
    useState<CheckoutStage>("summary");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerMessage, setCustomerMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartAlert, setCartAlert] = useState("");

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
            String(product.specs || "").toLowerCase().includes(query) ||
            String(product.inclusions || "").toLowerCase().includes(query)
          );
        }),
    [allProducts, category, brand, search]
  );

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart((current) =>
        current.map((item) =>
          item.id === product.id
            ? { ...item, qty: Math.min(item.qty + 1, item.stock) }
            : item
        )
      );
    } else {
      setCart((current) => [...current, { ...product, qty: 1 }]);
    }

    setCartAlert(`${product.name} added to quote successfully`);

    window.setTimeout(() => {
      setCartAlert("");
    }, 2000);
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

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal;

  const quoteLines = [
    `Quote request from ${customerName || "Guest"}`,
    `Email: ${customerEmail || "Not provided"}`,
    "",
    "Requested items:",
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

    const subject = encodeURIComponent("Althixtron Quotation Request");
    const body = encodeURIComponent(quoteLines);

    window.open(
      `mailto:sales@althixtron.com?subject=${subject}&body=${body}`,
      "_blank"
    );

    setCheckoutStage("sent");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <AnimatePresence>
        {cartAlert && (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="fixed left-4 right-4 top-24 z-[90] rounded-xl border border-emerald-500/20 bg-slate-900 px-4 py-3 shadow-xl sm:left-auto sm:right-6 sm:w-[360px]"
          >
            <p className="text-sm font-semibold text-emerald-400">
              Added to Quote
            </p>
            <p className="mt-1 text-sm text-slate-300">{cartAlert}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        <section className="border-b border-slate-800">
          <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
                Official Product Catalog
              </p>

              <h1 className="mt-3 font-sans text-3xl font-semibold tracking-normal text-white md:text-4xl">
                Browse products and request a quotation
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                Explore Althixtron’s product catalog, including Cignus two way radios,
                communication equipment, and electronics supplies. Click any product to view
                full specifications, inclusions, pricing, and stock availability.
              </p>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-[1fr_180px_180px]">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="h-12 rounded-xl border border-slate-800 bg-slate-900 px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-12 rounded-xl border border-slate-800 bg-slate-900 px-4 text-sm text-white outline-none transition focus:border-blue-500"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="h-12 rounded-xl border border-slate-800 bg-slate-900 px-4 text-sm text-white outline-none transition focus:border-blue-500"
              >
                {brands.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-[220px_1fr_300px]">
          <aside className="hidden h-fit rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:block">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Categories
            </h3>

            <div className="mt-4 space-y-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                    category === item
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-8 border-t border-slate-800 pt-6">
              <h4 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-white">
                Brand Filter
              </h4>

              <div className="mt-4 space-y-3">
                {brands.map((item) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-center gap-2 text-sm text-slate-400"
                  >
                    <input
                      type="radio"
                      name="brand"
                      checked={brand === item}
                      onChange={() => setBrand(item)}
                      className="accent-blue-600"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <section>
            <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-white">
                    Product Results
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {isLoadingProducts
                      ? "Loading products..."
                      : `${filteredProducts.length} products available`}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-slate-500">Sort by</span>
                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                    Popular
                  </button>
                  <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-blue-500 hover:text-white">
                    Latest
                  </button>
                  <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-blue-500 hover:text-white">
                    Top Sales
                  </button>
                  <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-blue-500 hover:text-white">
                    Price
                  </button>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm leading-6 text-slate-400">
                <span className="font-medium text-slate-200">
                  Official Althixtron Product Catalog.
                </span>{" "}
                Prices and availability may change. Add items to your quote cart
                and our team will confirm the final quotation.
              </div>
            </div>

            {isLoadingProducts && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
                Loading products from Google Sheets...
              </div>
            )}

            {productsError && (
              <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-5 text-sm text-rose-300">
                {productsError}
              </div>
            )}

            {!isLoadingProducts &&
              !productsError &&
              filteredProducts.length === 0 && (
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
                  No products match your criteria.
                </div>
              )}

            {!isLoadingProducts &&
              !productsError &&
              filteredProducts.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product, index) => (
                    <article
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:-translate-y-0.5 hover:border-blue-500/60"
                    >
                      <div className="relative h-52 bg-white">
                        <div className="flex h-full w-full items-center justify-center p-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                          />
                        </div>

                        {index < 4 && (
                          <span className="absolute right-0 top-0 bg-slate-900 px-2 py-1 text-[11px] font-medium text-white">
                            Popular
                          </span>
                        )}
                      </div>

                      <div className="p-4">
                        <p className="text-xs text-slate-500">
                          {product.category}
                        </p>

                        <h2 className="mt-2 min-h-[48px] font-sans text-[15px] font-semibold leading-6 tracking-normal text-slate-100">
                          {product.name}
                        </h2>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                          className="mt-1 text-xs font-medium text-blue-400 transition hover:text-blue-300"
                        >
                          View specifications →
                        </button>

                        <p className="mt-3 font-sans text-xl font-semibold tracking-normal text-slate-100">
                          {product.price > 0
                            ? `₱${product.price.toLocaleString()}`
                            : "Request Price"}
                        </p>

                        <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
                          <span>{product.brand}</span>
                          <span>{product.stock} stock</span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          disabled={product.stock === 0}
                          className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                        >
                          {product.stock === 0 ? "Sold out" : "Add to Quote"}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
          </section>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Quote Cart</h3>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-blue-400">
                  {cart.length} items
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="rounded-xl bg-slate-800/70 p-4 text-sm text-slate-400">
                  Your cart is empty. Add products to start your quotation
                  request.
                </div>
              ) : (
                <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-800 bg-slate-950 p-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-14 rounded-lg bg-white object-contain p-1"
                        />

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {item.price > 0
                              ? `₱${item.price.toLocaleString()}`
                              : "Request Price"}
                          </p>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="mt-1 text-xs text-rose-400"
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
                          <span className="w-10 text-center text-sm text-white">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="h-8 w-8 text-slate-300 hover:bg-slate-800"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-sm font-semibold text-slate-100">
                          {item.price > 0
                            ? `₱${(item.qty * item.price).toLocaleString()}`
                            : "Request Price"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="text-xl font-semibold text-white">
                Quote Summary
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Review selected items before sending your request.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <div className="flex justify-between text-2xl font-semibold text-slate-100">
                    <span>Total</span>
                    <span>₱{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={handleProceedToCheckout}
                className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
              >
                Request Quotation
              </button>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Need bulk pricing or project quotation? Add products and send us
                your request.
              </p>
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
              initial={{ scale: 0.96, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl md:overflow-hidden"
            >
              <div className="grid md:grid-cols-[1fr_1fr]">
                <div className="relative flex h-[320px] items-center justify-center bg-white p-6 sm:h-[420px] md:h-[78vh]">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="max-h-full max-w-full object-contain"
                  />

                  <span className="absolute left-5 top-5 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium uppercase text-white">
                    {selectedProduct.brand}
                  </span>
                </div>

                <div className="flex h-[78vh] flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
                        {selectedProduct.category}
                      </p>
                      <h2 className="mt-2 font-sans text-3xl font-semibold tracking-normal text-white">
                        {selectedProduct.name}
                      </h2>
                      <p className="mt-3 font-sans text-2xl font-semibold tracking-normal text-slate-100">
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
                      className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-blue-500 hover:text-white"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-6 min-h-0 flex-1 overflow-hidden">
                    <div className="h-full overflow-y-auto pr-2">
                      {selectedProduct.specs && (
                        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-400">
                            Specification
                          </h3>
                          <div className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-300">
                            {selectedProduct.specs}
                          </div>
                        </div>
                      )}

                      {selectedProduct.inclusions && (
                        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-400">
                            Inclusions
                          </h3>
                          <div className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-300">
                            {selectedProduct.inclusions}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-slate-800 pt-4">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        onClick={() => {
                          addToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        disabled={selectedProduct.stock === 0}
                        className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                      >
                        {selectedProduct.stock === 0
                          ? "Sold out"
                          : "Add to Quote"}
                      </button>

                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="flex-1 rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 hover:border-blue-500 hover:text-white"
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
              initial={{ scale: 0.97, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.97, y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {checkoutStage === "quote"
                      ? "Quotation Preview"
                      : "Quotation Sent"}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    {checkoutStage === "quote"
                      ? "Review your selected items and send your quotation request by email."
                      : "Your email client opened so you can complete the message."}
                  </p>
                </div>

                <button
                  onClick={() => setCheckoutStage("summary")}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-blue-500 hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-400">
                    Requested Items
                  </h3>

                  <div className="mt-4 space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-white">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {item.qty} x{" "}
                            {item.price > 0
                              ? `₱${item.price.toLocaleString()}`
                              : "Request Price"}
                          </p>
                        </div>

                        <p className="text-sm font-semibold text-slate-100">
                          {item.price > 0
                            ? `₱${(item.qty * item.price).toLocaleString()}`
                            : "Request Price"}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-slate-800 pt-4">
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>Subtotal</span>
                      <span>₱{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="mt-3 flex justify-between text-xl font-semibold text-slate-100">
                      <span>Total</span>
                      <span>₱{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  {checkoutStage === "quote" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-300">
                          Email
                        </label>
                        <input
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-300">
                          Name
                        </label>
                        <input
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Your name"
                          className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-300">
                          Message
                        </label>
                        <textarea
                          value={customerMessage}
                          onChange={(e) => setCustomerMessage(e.target.value)}
                          placeholder="Additional requests"
                          className="mt-2 min-h-[120px] w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                        />
                      </div>

                      {emailError && (
                        <p className="text-sm text-rose-400">{emailError}</p>
                      )}

                      <button
                        onClick={handleSendQuoteEmail}
                        className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500"
                      >
                        Send Quotation Request
                      </button>

                      <button
                        onClick={() => setCheckoutStage("summary")}
                        className="w-full rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 hover:border-blue-500 hover:text-white"
                      >
                        Back to Products
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-slate-400">
                        Your email client opened with the quotation details.
                      </p>

                      <button
                        onClick={() => setCheckoutStage("summary")}
                        className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500"
                      >
                        Continue Browsing
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