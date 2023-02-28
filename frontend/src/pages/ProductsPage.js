import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "../components/Product/Product";
import Loading from "../components/Product/Loading";
import Filters from "../components/Product/Filters";

export default function ProductsPage() {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [page, setPage] = useState(1);
  const [pageloading, setPageloading] = useState(false);

  const handleChangePage = (page) => {
    setPageloading(true);
    setTimeout(() => {
      setPage(page);
      setPageloading(false);
    }, 200);
  };

  //when products change set page by default on 1
  useEffect(() => {
    setPage(1);
  }, [products]);

  const ppp = 7;
  return (
    <>
      {loading || pageloading ? (
        <Loading />
      ) : error ? (
        <div className="products">
          <h1>error</h1>
        </div>
      ) : (
        <div className="products-container">
          <div className="products">
            {products.length == 0 ? (
              <h1>No products find :(</h1>
            ) : (
              <>
                {products.map((p, i) => {
                  if (i + 1 <= page * ppp && i + 1 > (page - 1) * ppp) {
                    return <Product key={p._id} product={p} />;
                  }
                })}
              </>
            )}
          </div>
          <div className="navigation-container">
            {Array(Math.ceil(products.length / ppp))
              .fill(1)
              .map((el, i) => (
                <div
                  onClick={() => {
                    handleChangePage(i + 1);
                  }}
                  className={page==i+1 ? "active" : ""}
                >
                  {i + 1}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
