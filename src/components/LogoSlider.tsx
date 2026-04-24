import { motion, useAnimationControls } from "framer-motion";
import atxlogo from "../assets/atx.png";
import motorola from "../assets/motorola.png";

const logos = [
  { id: 1, src: atxlogo, alt: "ATX" },
  {
    id: 2,
    src: "https://static.wixstatic.com/media/d82457_0ee0f313b3f24f35a5d0a7515ca263b6~mv2.png/v1/fill/w_143,h_26,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cignus-logo.png",
    alt: "Cignus",
  },
  { id: 3, src: motorola, alt: "Motorola" },
  {
    id: 4,
    src: "https://www.kenwood.com/content/dam/kenwood/webmaterial/kenwood_logo.svg",
    alt: "Kenwood",
  },
  { id: 5, src: atxlogo, alt: "ATX" },
  {
    id: 6,
    src: "https://static.wixstatic.com/media/d82457_0ee0f313b3f24f35a5d0a7515ca263b6~mv2.png/v1/fill/w_143,h_26,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cignus-logo.png",
    alt: "Cignus",
  },
  { id: 7, src: atxlogo, alt: "ATX" },
  {
    id: 8,
    src: "https://static.wixstatic.com/media/d82457_0ee0f313b3f24f35a5d0a7515ca263b6~mv2.png/v1/fill/w_143,h_26,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cignus-logo.png",
    alt: "Cignus",
  },
  { id: 9, src: atxlogo, alt: "ATX" },
  {
    id: 10,
    src: "https://static.wixstatic.com/media/d82457_0ee0f313b3f24f35a5d0a7515ca263b6~mv2.png/v1/fill/w_143,h_26,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cignus-logo.png",
    alt: "Cignus",
  },
];

const repeatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

export default function LogoSlider() {
  return (
    <section className="w-full space-y-2 overflow-hidden bg-[#070b12] py-2">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1ea7ff]">
          TRUSTED TECHNOLOGY PARTNERS
        </p>

        <h3 className="mt-1 text-3xl font-bold leading-tight md:text-[36px]">
          <span className="text-white">Brands </span>
          <span className="bg-gradient-to-r from-[#1ea7ff] to-[#00d4ff] bg-clip-text text-transparent">
            We Work With
          </span>
        </h3>
      </div>
      <LogoRow reverse={false} />
      <LogoRow reverse={true} />
    </section>
  );
}

function LogoRow({ reverse }: { reverse: boolean }) {
  const controls = useAnimationControls();

  const startAutoScroll = () => {
    controls.start({
      x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
      transition: {
        duration: 190,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  return (
    <div
      className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={startAutoScroll}
    >
      <motion.div
        className="group flex w-max cursor-grab items-center gap-2 active:cursor-grabbing"
        animate={controls}
        initial={{ x: reverse ? "-50%" : "0%" }}
        drag="x"
        dragElastic={0.08}
        dragMomentum={true}
        onDragStart={() => controls.stop()}
        onDragEnd={startAutoScroll}
        onHoverStart={() => controls.stop()}
        onHoverEnd={startAutoScroll}
        onViewportEnter={startAutoScroll}
      >
        {repeatedLogos.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex h-[70px] w-[180px] items-center justify-center"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              draggable={false}
              className="
                max-h-[45px] max-w-[150px] object-contain
                select-none
                transition duration-300

                group-hover:grayscale
                group-hover:opacity-40

                hover:!grayscale-0
                hover:!opacity-100
                hover:scale-110
                hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.85)]
              "
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}