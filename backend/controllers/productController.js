const { query } = require("express");
const Product = require("../models/ProductModel");

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
  //----------sorting here------------//

  //--------------------//

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  //23

  let products = await result;

  if (color) {
    products = products.filter(
      ({ colors }) =>
        colors[0] === color ||
        colors[1] === color ||
        colors[2] === color ||
        colors[3] === color
    );
  }

  if (sort === "priced") {
    products.sort();
    products.reverse();
  } else if (sort === "price") {
    products.sort();
  }

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
    name: "SWIFTKNIT DERBY",
    images: [
      {
        color: "",
        images: [
          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-RightLateral_fa43f569-4125-4bba-a124-8aec39795476.jpg?v=1672616967&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Medial_6ffbc284-823c-45c9-a256-37fb67131656.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Sole_563030d7-4750-4e43-bd6e-918d4d115133.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-LeftLateral_aebb243e-1499-4757-bb74-dc90fcf79040.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Front3Q.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Rear3Q_b111ff02-e1cf-45e3-ab0d-bd7f726a2b0a.jpg?v=1672624952&width=390",
        ],
      },
      {
        color: "",
        images: [
          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-RightLateral_fa43f569-4125-4bba-a124-8aec39795476.jpg?v=1672616967&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Medial_6ffbc284-823c-45c9-a256-37fb67131656.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Sole_563030d7-4750-4e43-bd6e-918d4d115133.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-LeftLateral_aebb243e-1499-4757-bb74-dc90fcf79040.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Front3Q.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Rear3Q_b111ff02-e1cf-45e3-ab0d-bd7f726a2b0a.jpg?v=1672624952&width=390",
        ],
      },
      {
        color: "",
        images: [
          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-RightLateral_fa43f569-4125-4bba-a124-8aec39795476.jpg?v=1672616967&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Medial_6ffbc284-823c-45c9-a256-37fb67131656.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Sole_563030d7-4750-4e43-bd6e-918d4d115133.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-LeftLateral_aebb243e-1499-4757-bb74-dc90fcf79040.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Front3Q.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Rear3Q_b111ff02-e1cf-45e3-ab0d-bd7f726a2b0a.jpg?v=1672624952&width=390",
        ],
      },
      {
        color: "",
        images: [
          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-RightLateral_fa43f569-4125-4bba-a124-8aec39795476.jpg?v=1672616967&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Medial_6ffbc284-823c-45c9-a256-37fb67131656.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Sole_563030d7-4750-4e43-bd6e-918d4d115133.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-LeftLateral_aebb243e-1499-4757-bb74-dc90fcf79040.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Front3Q.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Rear3Q_b111ff02-e1cf-45e3-ab0d-bd7f726a2b0a.jpg?v=1672624952&width=390",
        ],
      },
      {
        color: "",
        images: [
          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-RightLateral_fa43f569-4125-4bba-a124-8aec39795476.jpg?v=1672616967&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Medial_6ffbc284-823c-45c9-a256-37fb67131656.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Sole_563030d7-4750-4e43-bd6e-918d4d115133.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-LeftLateral_aebb243e-1499-4757-bb74-dc90fcf79040.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Front3Q.jpg?v=1672624952&width=390",

          "https://cdn.shopify.com/s/files/1/0966/8928/products/WS-Web-Product-SwiftKnit-Navy-Rear3Q_b111ff02-e1cf-45e3-ab0d-bd7f726a2b0a.jpg?v=1672624952&width=390",
        ],
      },
    ],
    category: "Lace-Ups",
    description:
      "A super lightweight, knit mesh lends extra stretch to our lightest, most adaptable shoe yet",
    reviews: [
      {
        name: "Mar",
        rating: 5,
        comment: "Love it!",
      },
    ],
    rating: 3,
    price: 179,
    colors: ["NAVY", "BLACK", "GRAY", "STONE", "WHITE"],
  });
  newProduct.save(function (err, Product) {
    if (err) console.log(err);
    else res.send({ Success: "yess!!!" });
  });
};

module.exports = {
  getAllProducts,
  addProduct,
  getSingleProduct,
  addReview,
};
