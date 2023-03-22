import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Seach({ changeVisible }) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");

  const getData = async () => {
    await axios
      .get(`https://store-shoes.onrender.com/api/products?&name=${name}`)
      .then((response) => {
        setProducts(response.data);
      });
  };

  useEffect(() => {
    if (name) {
      getData();
    } else {
      setProducts([]);
    }
  }, [name]);

  return (
    <div className="search-container">
      <input
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
      ></input>
      {products.length > 1 ? (
        <div className="products-container">
          {products.slice(0, 3).map((product) => {
            return (
              <Link
                to={`/product/${product._id}`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <div onClick={changeVisible} className="product">
                  <img
                    style={{ width: "100px" }}
                    src={product.images[0].images[0]}
                  ></img>
                  <h3>{product.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
