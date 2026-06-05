type SheetProduct = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  specs: string;
  inclusions: string;
  image: string;
};

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQg3pqIuILLWTdJlQJSBBhHOFKTUQ7bMaW8xrt-CFAGDzs9-TMZkxCU1hsHO5RgEwMxrdZ0JjDxtBeS/pub?output=csv";

const toTitleCase = (text: string) => {
  return text
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const cleanMoney = (value: string) => {
  return Number(String(value || "").replace(/[₱,\s]/g, "")) || 0;
};

const cleanNumber = (value: string) => {
  return Number(String(value || "").replace(/[,\s]/g, "")) || 0;
};

const parseCsv = (csvText: string) => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"' && nextChar === '"') {
      field += '"';
      i++;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === "," && !insideQuotes) {
      row.push(field.trim());
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        i++;
      }

      row.push(field.trim());

      if (row.some((cell) => cell !== "")) {
        rows.push(row);
      }

      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  row.push(field.trim());

  if (row.some((cell) => cell !== "")) {
    rows.push(row);
  }

  return rows;
};

export const fetchProductsFromGoogleSheet = async () => {
  const response = await fetch(SHEET_CSV_URL);

  if (!response.ok) {
    throw new Error("Failed to load Google Sheet products.");
  }

  const csvText = await response.text();
  const parsedRows = parseCsv(csvText);

  if (parsedRows.length === 0) {
    return [];
  }

  const headers = parsedRows[0].map((header) => header.toLowerCase().trim());

  const getCell = (row: string[], columnName: string) => {
    const index = headers.indexOf(columnName);
    return index >= 0 ? row[index] || "" : "";
  };

  const flatProducts: SheetProduct[] = parsedRows
    .slice(1)
    .map((row) => {
      const id = getCell(row, "id");
      const name = getCell(row, "name");
      const brand = getCell(row, "brand");
      const category = getCell(row, "category");
      const price = getCell(row, "price");
      const stock = getCell(row, "stock");
      const specs = getCell(row, "specs");
      const inclusions =
        getCell(row, "inclusions") || getCell(row, "inclusion");
      const image = getCell(row, "image");

      return {
        id,
        name,
        brand: brand ? toTitleCase(brand) : "No Brand",
        category: category ? toTitleCase(category) : "Uncategorized",
        price: cleanMoney(price),
        stock: cleanNumber(stock),
        specs: specs || "",
        inclusions: inclusions || "",
        image: image || "/products/placeholder.png",
      };
    })
    .filter((product) => product.id && product.name);

  const categories = Array.from(
    new Set(flatProducts.map((product) => product.category))
  );

  return categories.map((categoryName) => {
    const categoryProducts = flatProducts.filter(
      (product) => product.category === categoryName
    );

    const brands = Array.from(
      new Set(categoryProducts.map((product) => product.brand))
    );

    return {
      name: categoryName,
      brands: brands.map((brandName) => ({
        name: brandName,
        logo: "",
        models: categoryProducts
          .filter((product) => product.brand === brandName)
          .map((product) => ({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            stock: product.stock,
            specs: product.specs,
            inclusions: product.inclusions,
          })),
      })),
    };
  });
};