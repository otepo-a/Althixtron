import cignus from "../assets/cignus.png";
import motorola from "../assets/motorola.png";

import nx100 from "../assets/products/nx100.png";
import nx700 from "../assets/products/nx700.png";
import mtR5 from "../assets/products/motorolaR5.png";

export const productsData = [
  {
    name: "Radio",
    brands: [
      {
        name: "Cignus",
        logo: cignus,
        models: [
          {
            id: "cignus-nx-100",
            name: "NX-100",
            image: nx100,
            price: 3250,
            description: "Compact handheld radio with long-range performance.",
            stock: 8,
          },
          {
            id: "cignus-nx-700",
            name: "NX-700",
            image: nx700,
            price: 5299,
            description:
              "Heavy-duty two-way radio for professional communication.",
            stock: 5,
          },
        ],
      },
      {
        name: "Motorola",
        logo: motorola,
        models: [
          {
            id: "motorola-R5",
            name: "MT-R5",
            image: mtR5,
            price: 4100,
            description:
              "Reliable Motorola radio for everyday store and service use.",
            stock: 12,
          },
        ],
      },
    ],
  },
];