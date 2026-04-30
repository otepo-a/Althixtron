import cignus from "../assets/cignus.png";
import motorola from "../assets/motorola.png";
import placeholder from "../assets/placeholder.png";

export const productsData = [
  {
    name: "Radio",
    brands: [
      {
        name: "Cignus",
        logo: cignus,
        models: [
          { name: "NX-MINI", image: placeholder },
          { name: "NX-700", image: placeholder },
        ],
      },
      {
        name: "Motorola",
        logo: motorola,
        models: [
          { name: "MT-100", image: placeholder },
        ],
      },
    ],
  },
];