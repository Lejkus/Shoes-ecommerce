import Product from "../models/ProductModel.js";

const getAllProducts = async (req, res) => {
  const { color, name, category, sort, numericFilters } = req.query;
  const queryObject = {};

  if (category) {
    queryObject.category = category;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  //-----finding product after filters-----//
  let result = Product.find(queryObject);
  let products = await result;

  if (color) {
    products = products.filter(
      ({ colors }) =>
        colors[0] === color ||
        colors[1] === color ||
        colors[2] === color ||
        colors[3] === color ||
        colors[4] === color ||
        colors[5] === color ||
        colors[6] === color ||
        colors[7] === color
    );
  }

  if (sort === "priced") {
    products.sort((a, b) => (a.price > b.price ? 1 : -1));
    products.reverse();
  } else if (sort === "price") {
    products.sort((a, b) => (a.price > b.price ? 1 : -1));
  }

  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 2;
  // const skip = (page - 1) * limit;
  // // result = result.skip(skip).limit(limit);

  res.status(200).json(products);
};

const getSingleProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  res.status(200).json(product);
};

const addReview = async (req, res) => {
  const { name, rating, comment } = req.body;

  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: { reviews: { name: name, rating: rating, comment: comment } },
    },
    function (error, success) {
      if (error) {
        res.send({ Success: error });
      } else {
        res.send({ Success: "Added Review!" });
      }
    }
  );
};

const addProduct = async (req, res) => {
  const newProduct = new Product({
    name: "CROSSOVER LOAFER",
    images: [
      {
        color: "HONEY",
        images: [
          "https://cdn.shopify.com/s/files/1/0966/8928/products/LoaferLite_Honey_Lateral.jpg?v=1672623760&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/LoaferLite_Honey_Insole.jpg?v=1672626658&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/LoaferLite_Honey_Medial.jpg?v=1672626658&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/LoaferLite_Honey_Outsole.jpg?v=1672626658&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/LoaferLite_Honey_Front3Q_1.jpg?v=1672626658&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/LoaferLite_Honey_Rear3Q.jpg?v=1672626658&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-CrossoverLoafer-Honey-Lifestyle1.jpg?v=1672626658&width=390",

          // "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverGolf_White_Macro3.jpg?v=1672627138&width=390",

          // "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverGolf_White_TopDown.jpg?v=1672627138&width=390",
        ],
      },
      {
        color: "BROWN",
        images: [
          "https://cdn.shopify.com/s/files/1/0966/8928/products/LoaferLite_Maple_Lateral.jpg?v=1672626658&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/LoaferLite_Maple_Insole.jpg?v=1672626776&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/LoaferLite_Maple_Medial.jpg?v=1672626776&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/LoaferLite_Maple_Outsole.jpg?v=1672626658&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/LoaferLite_Maple_Front3Q.jpg?v=1672626658&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/LoaferLite_Maple_TopPair.jpg?v=1672626658&width=390",
          // "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverGolf_Gray_Macro3.jpg?v=1672627262&width=390",
          // "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverGolf_Gray_TopDown.jpg?v=1672627262&width=390",
        ],
      },
      {
        color: "BLACK",
        images: [
          "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverLoafer_Black_Lateral_9a5508fb-c698-4b7d-864a-ea4e8fa0cf03.jpg?v=1672626658&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverLoafer_Black_Insole_9c70d24f-e85d-451a-b1e4-b310ebffddd3.jpg?v=1672626658&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverLoafer_Black_Medial_e9756481-2dc4-409c-a9aa-fe177178f1a9.jpg?v=1672626729&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverLoafer_Black_Outsole_fe47c25a-1909-4e2a-a87b-49840ea21316.jpg?v=1672626729&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/Crossover_Loafer_Black_Front3Q_0d265c04-9922-4a01-a35c-9c813e236757.jpg?v=1672626658&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverLoafer_Black_TopPair_c8d7a46c-3c73-4baf-a85c-9b88521f0d8e.jpg?v=1672626658&width=390",
          // "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverGolf_Navy_Macro1copy.jpg?v=1672627262&width=390",
          // "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverGolf_Navy_TopDowncopy.jpg?v=1672627262&width=390",
        ],
      },
      // {
      //   color: "GRAY",
      //   images: [
      //     "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverMidMochaLateral_1512x_0b3437cf-2554-471a-9f5a-a50766e7822d.jpg?v=1673629773&width=390",

      //     "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverMidMochaInsole.jpg?v=1673629773&width=390",

      //     "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverMidMochaMedial.jpg?v=1673629773&width=390",

      //     "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverMidMochaOutsole.jpg?v=1673629773&width=390",

      //     "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverMidMocha3Q_1512x_e8fd89df-a345-47c4-921e-b5077b347703.jpg?v=1673629773&width=390",

      //     "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverMidMochaBack3Q-Recovered.jpg?v=1673629773&width=390",
      //     "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverMidMochaFloating.jpg?v=1673629773&width=390",
      //     "https://cdn.shopify.com/s/files/1/0966/8928/products/CrossoverMidMochaTopDown2.jpg?v=1673629773&width=390",
      //   ],
      // },
      // {
      //   color: "",
      //   images: [
      //     "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-RightLateral_fa43f569-4125-4bba-a124-8aec39795476.jpg?v=1672616967&width=390",

      //     "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Medial_6ffbc284-823c-45c9-a256-37fb67131656.jpg?v=1672624952&width=390",

      //     "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Sole_563030d7-4750-4e43-bd6e-918d4d115133.jpg?v=1672624952&width=390",

      //     "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-LeftLateral_aebb243e-1499-4757-bb74-dc90fcf79040.jpg?v=1672624952&width=390",

      //     "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Front3Q.jpg?v=1672624952&width=390",

      //     "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Rear3Q_b111ff02-e1cf-45e3-ab0d-bd7f726a2b0a.jpg?v=1672624952&width=390",
      //   ],
      // },
    ],
    category: "Slip-ons",
    description:
      "A classic penny loafer reimagined with sleek style and comfort in mind.",
    reviews: [
      // {
      //   name: "Mar",
      //   rating: 5,
      //   comment: "Love it!",
      // },
    ],
    price: 169,
    colors: ["HONEY", "BROWN", "BLACK"],
  });
  newProduct.save(function (err, Product) {
    if (err) console.log(err);
    else res.send({ Success: "yess!!!" });
  });
};

export { getAllProducts, addProduct, getSingleProduct, addReview };
