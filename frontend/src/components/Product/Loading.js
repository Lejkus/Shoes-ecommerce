import React from "react";

export default function Loading() {
  const tab = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="products-loading">
      {tab.map((index) => {
        return (
          <div key={index} className="product-loading">
            <div className="image-loading"></div>
            <div className="p-loading"></div>
            <div className="h-loading"></div>
            <div className="g-loading"></div>
          </div>
        );
      })}
    </div>
  );
}
