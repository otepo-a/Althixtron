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
          {
            id: "cignus-nx-mini",
            name: "NX-MINI",
            image: placeholder,
            price: 3250,
            description: "Compact handheld radio with long-range performance.",
            stock: 8,
          },
          {
            id: "cignus-nx-700",
            name: "NX-700",
            image: placeholder,
            price: 5299,
            description: "Heavy-duty two-way radio for professional communication.",
            stock: 5,
          },
        ],
      },
      {
        name: "Motorola",
        logo: motorola,
        models: [
          {
            id: "motorola-mt-100",
            name: "MT-100",
            image: placeholder,
            price: 4100,
            description: "Reliable Motorola radio for everyday store and service use.",
            stock: 12,
          },
        ],
      },
    ],
  },
];
