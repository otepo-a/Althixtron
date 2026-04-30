import { useState } from "react";
import { productsData } from "../data/products";
import Navbar from "../components/Navbar"; // 👈 gamitin mo existing navbar mo

type Model = {
  name: string;
  image: string;
};

type Brand = {
  name: string;
  logo: string;
  models: Model[];
};

type Category = {
  name: string;
  brands: Brand[];
};

type CartItem = Model & {
  qty: number;
};

export default function ProductsPage() {
  const [category, setCategory] = useState<Category | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Model) => {
    const exist = cart.find((c) => c.name === item.name);
    if (exist) {
      setCart(
        cart.map((c) =>
          c.name === item.name ? { ...c, qty: c.qty + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white">
      
      {/* ✅ NAVBAR */}
      <Navbar />

      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Our <span className="text-blue-500">Products</span>
        </h1>

        {/* CATEGORY */}
        {!category && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {productsData.map((cat, i) => (
              <div
                key={i}
                onClick={() => setCategory(cat)}
                className="bg-white/5 backdrop-blur-lg border border-white/10 
                p-6 rounded-2xl cursor-pointer text-center
                hover:scale-105 hover:border-blue-500 transition"
              >
                <p className="text-lg font-semibold">{cat.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* BRAND */}
        {category && !brand && (
          <>
            <button
              onClick={() => setCategory(null)}
              className="mb-6 text-sm text-blue-400 hover:underline"
            >
              ← Back
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {category.brands.map((b, i) => (
                <div
                  key={i}
                  onClick={() => setBrand(b)}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 
                  p-6 rounded-2xl text-center cursor-pointer
                  hover:scale-105 hover:border-blue-500 transition"
                >
                  <img src={b.logo} className="h-16 mx-auto mb-2" />
                  <p>{b.name}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PRODUCTS */}
        {brand && (
          <>
            <button
              onClick={() => setBrand(null)}
              className="mb-6 text-sm text-blue-400 hover:underline"
            >
              ← Back
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {brand.models.map((m, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 
                  p-4 rounded-2xl text-center
                  hover:scale-105 hover:border-blue-500 transition"
                >
                  <img src={m.image} className="h-32 mx-auto mb-3" />

                  <p className="font-medium">{m.name}</p>

                  <button
                    onClick={() => addToCart(m)}
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 
                    text-white py-2 rounded-lg text-sm transition"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CART */}
        {cart.length > 0 && (
          <div className="fixed right-5 bottom-5 w-80 
          bg-[#020617] border border-white/10 p-4 rounded-2xl shadow-2xl">
            
            <h3 className="font-bold mb-3 text-blue-400">Cart</h3>

            {cart.map((c, i) => (
              <div key={i} className="mb-3 text-sm">
                <p>{c.name} x{c.qty}</p>
              </div>
            ))}

            <button
              className="mt-3 w-full bg-green-600 hover:bg-green-700 
              py-2 rounded-lg text-sm"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}