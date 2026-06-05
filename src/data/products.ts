import cignusLogo from "../assets/cignus.png";
import motorolaLogo from "../assets/motorola.png";
import motorolaR5 from "../assets/products/motorolaR5.png";

const productImages = import.meta.glob(
  "../assets/products/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  {
    eager: true,
    import: "default",
  }
) as Record<string, string>;

const getCignusImage = (fileName: string) => {
  return productImages[`../assets/products/cignus/${fileName}`] || cignusLogo;
};

const cignusModels = [
  {
    id: "cignus-nx-100",
    name: "NX-100",
    imageFile: "nx-100.png",
    price: 3250,
    description: "Compact Cignus handheld radio for reliable communication.",
    stock: 8,
  },
  {
    id: "cignus-nx-200",
    name: "NX-200",
    imageFile: "nx-200.png",
    price: 3899,
    description: "Durable Cignus two-way radio for daily business use.",
    stock: 10,
  },
  {
    id: "cignus-nx-300",
    name: "NX-300",
    imageFile: "nx-300.png",
    price: 4299,
    description: "Professional Cignus radio with clear audio performance.",
    stock: 7,
  },
  {
    id: "cignus-nx-700",
    name: "NX-700",
    imageFile: "nx-700.png",
    price: 5299,
    description: "Heavy-duty two-way radio for professional communication.",
    stock: 5,
  },
  {
    id: "cignus-nx-slim",
    name: "NX-SLIM",
    imageFile: "nx-slim.png",
    price: 3499,
    description: "Slim and lightweight Cignus radio for easy everyday use.",
    stock: 9,
  },
  {
    id: "cignus-uv-88",
    name: "UV-88",
    imageFile: "uv-88.png",
    price: 2999,
    description: "Portable Cignus radio for flexible communication needs.",
    stock: 12,
  },
];

export const productsData = [
  {
    name: "Radio",
    brands: [
      {
        name: "Cignus",
        logo: cignusLogo,
        models: cignusModels.map((product) => ({
          id: product.id,
          name: product.name,
          image: getCignusImage(product.imageFile),
          price: product.price,
          description: product.description,
          stock: product.stock,
        })),
      },
      {
        name: "Motorola",
        logo: motorolaLogo,
        models: [
          {
            id: "motorola-mt-r5",
            name: "MT-R5",
            image: motorolaR5,
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