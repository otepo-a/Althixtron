import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ AUTO LOAD (FIXED — walang mod.default issue)
const modules = import.meta.glob("/src/assets/*/*.{png,jpg,jpeg}", {
  eager: true,
  import: "default",
});

const albumMap = {};

// ✅ GROUP BY FOLDER
Object.entries(modules).forEach(([path, mod]) => {
  const folder = path.split("/")[3];

  if (!albumMap[folder]) albumMap[folder] = [];

  albumMap[folder].push(mod); // ✅ FIXED (wala nang .default)
});

// ✅ SORT IMAGES
Object.keys(albumMap).forEach((folder) => {
  albumMap[folder].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );
});

// ✅ CREATE ALBUMS
const albums = Object.entries(albumMap).map(([folder, images]) => ({
  name: folder,
  title: folder.replace(/-/g, " ").toUpperCase(),
  cover: images[0],
  photos: images,
}));

const GallerySection = () => {
  const [view, setView] = useState("albums"); // albums | grid
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null); // ✅ FIXED

  // ✅ KEYBOARD NAVIGATION
  useEffect(() => {
    const handleKey = (e) => {
      if (!activeAlbum || activeIndex === null) return;

      if (e.key === "ArrowRight") {
        setActiveIndex((prev) =>
          (prev + 1) % activeAlbum.photos.length
        );
      }

      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === 0
            ? activeAlbum.photos.length - 1
            : prev - 1
        );
      }

      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeAlbum, activeIndex]);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        <h2 className="text-3xl font-bold text-center mb-12">
          Project Gallery
        </h2>

        {/* ================= ALBUM VIEW ================= */}
        {view === "albums" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {albums.map((album, i) => (
              <div
                key={i}
                onClick={() => {
                  setActiveAlbum(album);
                  setView("grid");
                }}
                className="cursor-pointer relative group rounded-xl overflow-hidden"
              >
                <img
                  src={album.cover}
                  className="w-full h-64 object-cover group-hover:scale-110 transition"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="text-white font-bold">
                    {album.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= GRID VIEW ================= */}
        {view === "grid" && activeAlbum && (
          <>
            <button
              onClick={() => setView("albums")}
              className="mb-6 px-4 py-2 bg-gray-800 text-white rounded"
            >
              ← Back to Albums
            </button>

            <h3 className="text-xl font-bold mb-6">
              {activeAlbum.title}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {activeAlbum.photos.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveIndex(i)}
                  className="cursor-pointer rounded-lg object-cover h-40 w-full hover:scale-105 transition"
                />
              ))}
            </div>
          </>
        )}

        {/* ================= LIGHTBOX ================= */}
        <AnimatePresence>
          {activeAlbum && activeIndex !== null && (
            <motion.div
              className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* CLOSE */}
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute top-5 right-5 text-white text-2xl"
              >
                ✕
              </button>

              {/* PREV */}
              <button
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === 0
                      ? activeAlbum.photos.length - 1
                      : prev - 1
                  )
                }
                className="absolute left-5 text-white text-3xl"
              >
                ‹
              </button>

              {/* IMAGE */}
              <img
                src={activeAlbum.photos[activeIndex]}
                className="max-h-[80%] max-w-[90%] object-contain"
              />

              {/* NEXT */}
              <button
                onClick={() =>
                  setActiveIndex((prev) =>
                    (prev + 1) % activeAlbum.photos.length
                  )
                }
                className="absolute right-5 text-white text-3xl"
              >
                ›
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default GallerySection;