import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { productsData } from "../data/products";
import Navbar from "../components/Navbar";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  category: string;
  stock: number;
};

type CartItem = Product & {
  qty: number;
};

type CheckoutStage = "summary" | "quote" | "sent";

export default function ProductsPage() {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutStage, setCheckoutStage] = useState<CheckoutStage>("summary");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerMessage, setCustomerMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const productGridRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(
    () => ["All", ...productsData.map((cat) => cat.name)],
    []
  );

  const brands = useMemo(
    () => [
      "All",
      ...new Set(productsData.flatMap((cat) => cat.brands.map((brand) => brand.name))),
    ],
    []
  );

  const allProducts = useMemo<Product[]>(
    () =>
      productsData.flatMap((category) =>
        category.brands.flatMap((brand) =>
          brand.models.map((model) => ({
            ...model,
            brand: brand.name,
            category: category.name,
          }))
        )
      ),
    []
  );

  const filteredProducts = useMemo(
    () =>
      allProducts
        .filter((product) => (category === "All" ? true : product.category === category))
        .filter((product) => (brand === "All" ? true : product.brand === brand))
        .filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
        ),
    [allProducts, category, brand, search]
  );

  const addToCart = (product: Product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: Math.min(item.qty + 1, product.stock) } : item
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
  const shipping = cart.length > 0 ? 150 : 0;
  const total = subtotal + shipping;

  const quoteLines = [
    `Quote request from ${customerName || "Guest"}`,
    `Email: ${customerEmail || "Not provided"}`,
    "",
    "Order details:",
    ...cart.map((item) => `- ${item.qty} x ${item.name} @ ₱${item.price.toLocaleString()} = ₱${(item.qty * item.price).toLocaleString()}`),
    "",
    `Subtotal: ₱${subtotal.toLocaleString()}`,
    `Shipping: ₱${shipping.toLocaleString()}`,
    `Total: ₱${total.toLocaleString()}`,
    "",
    `Message: ${customerMessage || "No additional notes."}`,
  ].join("\\n");

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
    window.open(`mailto:sales@althixtron.com?subject=${subject}&body=${body}`, "_blank");
    setCheckoutStage("sent");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <div className="pt-24 px-6 pb-24 max-w-7xl mx-auto">
        <div className="mb-8 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Store</p>
              <h1 className="mt-2 text-4xl font-semibold">Electronics Products</h1>
              <p className="mt-3 max-w-2xl text-slate-400">
                Shop trusted electronics, accessories, and communication equipment with live cart preview and easy filtering.
              </p>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto lg:grid-cols-[240px_240px_240px]">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                className="h-12 rounded-2xl border border-slate-700 bg-slate-950/80 px-4 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-12 rounded-2xl border border-slate-700 bg-slate-950/80 px-4 text-slate-100 focus:border-blue-500 focus:outline-none"
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
                className="h-12 rounded-2xl border border-slate-700 bg-slate-950/80 px-4 text-slate-100 focus:border-blue-500 focus:outline-none"
              >
                {brands.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.6fr_0.9fr]">
          <div>
            <div className="mb-4 flex items-center justify-between gap-4 rounded-3xl bg-slate-900/80 px-6 py-5 text-slate-300 shadow-xl">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Products</p>
                <p className="text-lg font-semibold text-slate-100">{filteredProducts.length} items found</p>
              </div>

              <div className="text-right text-sm text-slate-400">
                <p>Category: <span className="text-slate-100">{category}</span></p>
                <p>Brand: <span className="text-slate-100">{brand}</span></p>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/70 p-12 text-center text-slate-400">
                No products match your criteria. Try a different search or filter.
              </div>
            ) : (
              <div id="product-grid" ref={productGridRef} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-xl transition hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-slate-800">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                        <span>{product.brand}</span>
                        <span>{product.category}</span>
                      </div>

                      <h2 className="text-lg font-semibold text-slate-100">{product.name}</h2>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{product.description}</p>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-2xl font-bold text-white">₱{product.price.toLocaleString()}</p>
                          <p className="text-xs text-slate-500">{product.stock} in stock</p>
                        </div>

                        <button
                          onClick={() => addToCart(product)}
                          disabled={product.stock === 0}
                          className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
                        >
                          {product.stock === 0 ? "Sold out" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Shopping cart</h2>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                  {cart.length} items
                </span>
              </div>

              {cart.length === 0 ? (
                <p className="text-sm text-slate-400">Your cart is empty. Add products to start checkout.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
                      <div className="flex items-start gap-3">
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded-2xl object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium text-slate-100">{item.name}</p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-xs text-rose-400 hover:text-rose-300"
                            >
                              Remove
                            </button>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">{item.brand}</p>
                          <div className="mt-3 flex items-center gap-2">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100"
                            >
                              −
                            </button>
                            <span className="min-w-[32px] text-center text-sm font-semibold">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                        <span>Unit</span>
                        <span>₱{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl">
              <h3 className="text-lg font-semibold">Order summary</h3>

              <div className="mt-5 space-y-3 text-sm text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₱{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">₱{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={handleProceedToCheckout}
                className="mt-6 w-full rounded-3xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-blue-500 hover:to-blue-400 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {checkoutStage !== "summary" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-6"
          >
            <motion.div
              initial={{ scale: 0.98, y: 18, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 18, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-900/95 p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {checkoutStage === "quote" ? "Quote preview" : "Quote sent!"}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    {checkoutStage === "quote"
                      ? "Review your quote and send it by email."
                      : "Your email client opened so you can finish sending the quote."}
                  </p>
                </div>
                <button
                  onClick={() => setCheckoutStage("summary")}
                  className="rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 transition hover:border-blue-500"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 text-slate-100">
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Order details</p>
                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-3 rounded-3xl border border-slate-800 bg-slate-900/70 px-4 py-3">
                        <div>
                          <p className="font-medium text-white">{item.name}</p>
                          <p className="text-xs text-slate-500">{item.qty} x ₱{item.price.toLocaleString()}</p>
                        </div>
                        <p className="text-sm font-semibold">₱{(item.qty * item.price).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 space-y-3 border-t border-slate-800 pt-4 text-sm text-slate-300">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₱{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>₱{shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">₱{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 text-slate-100">
                  {checkoutStage === "quote" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300">Email</label>
                        <input
                          value={customerEmail}
                          onChange={(event) => setCustomerEmail(event.target.value)}
                          placeholder="you@example.com"
                          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300">Name</label>
                        <input
                          value={customerName}
                          onChange={(event) => setCustomerName(event.target.value)}
                          placeholder="Your name"
                          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300">Message</label>
                        <textarea
                          value={customerMessage}
                          onChange={(event) => setCustomerMessage(event.target.value)}
                          placeholder="Additional requests or delivery notes"
                          className="mt-2 min-h-[120px] w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      {emailError && <p className="text-sm text-rose-400">{emailError}</p>}
                      <button
                        onClick={handleSendQuoteEmail}
                        className="w-full rounded-3xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-emerald-500 hover:to-emerald-400"
                      >
                        Send quote by email
                      </button>
                      <button
                        onClick={() => setCheckoutStage("summary")}
                        className="w-full rounded-3xl border border-slate-700 bg-transparent px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500"
                      >
                        Back to shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-5 text-sm text-slate-300">
                      <p>Your email client opened with the quote details. Complete the email to send the quote.</p>
                      <button
                        onClick={() => setCheckoutStage("summary")}
                        className="w-full rounded-3xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-blue-500 hover:to-blue-400"
                      >
                        Continue shopping
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
