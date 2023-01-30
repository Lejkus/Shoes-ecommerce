import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";

export default function Filters() {
  const dispatch = useDispatch();

  const [queryObject, setQueryObject] = useState({
    color: "",
    category: "",
    numericFilters: "",
    sort: "",
  });

  const [filters, setFilters] = useState({
    color: false,
    style: true,
    sort: true,
  });

  const handleToggle = (event) => {
    if (event == "color") {
      setFilters((prevState) => ({
        ...prevState,
        color: !prevState.color,
      }));
    }
    if (event == "style") {
      setFilters((prevState) => ({
        ...prevState,
        style: !prevState.style,
      }));
    }
    if (event == "sort") {
      setFilters((prevState) => ({
        ...prevState,
        sort: !prevState.sort,
      }));
    }
  };

  useEffect(() => {
    dispatch(listProducts(queryObject));
  }, [queryObject]);

  return (
    <div className="filters">
      <h1>FILTERS</h1>
      <hr></hr>
      <div
        className="title-toogle"
        onClick={() => {
          handleToggle("color");
        }}
      >
        <h3>Color</h3>
        <div>
          <i class={filters.color ? "arrow down" : "arrow up"}></i>
        </div>
      </div>
      <div className={filters.color ? "colors" : "colors-hidden"}>
        <div
          onClick={() => {
            setQueryObject((prevState) => ({
              ...prevState,
              color: "",
            }));
          }}
          className="color"
        >
          <label>All</label>
          <input type="checkbox" checked={queryObject.color === ""}></input>
        </div>
        <div
          onClick={() => {
            setQueryObject((prevState) => ({
              ...prevState,
              color: "OCEAN",
            }));
          }}
          className="color"
        >
          <label>Ocean</label>
          <input
            type="checkbox"
            checked={queryObject.color === "OCEAN"}
          ></input>
        </div>
        <div
          onClick={() => {
            setQueryObject((prevState) => ({
              ...prevState,
              color: "BLACK",
            }));
          }}
          className="color"
        >
          <label>Black</label>
          <input
            type="checkbox"
            checked={queryObject.color === "BLACK"}
          ></input>
        </div>
        <div
          onClick={() => {
            setQueryObject((prevState) => ({
              ...prevState,
              color: "WHITE",
            }));
          }}
          className="color"
        >
          <label>White</label>
          <input
            type="checkbox"
            checked={queryObject.color === "WHITE"}
          ></input>
        </div>
        <div
          className="color"
          onClick={() => {
            setQueryObject((prevState) => ({
              ...prevState,
              color: "BLUE",
            }));
          }}
        >
          <label>Blue</label>
          <input type="checkbox" checked={queryObject.color === "BLUE"}></input>
        </div>

        <div
          className="color"
          onClick={() => {
            setQueryObject((prevState) => ({
              ...prevState,
              color: "HONEY",
            }));
          }}
        >
          <label>Honey</label>
          <input
            type="checkbox"
            checked={queryObject.color === "HONEY"}
          ></input>
        </div>
      </div>
      <hr></hr>
      <div
        className="title-toogle"
        onClick={() => {
          handleToggle("style");
        }}
      >
        <h3>Style</h3>
        <div>
          <i class={filters.style ? "arrow down" : "arrow up"}></i>
        </div>
      </div>

      <div className="style">
        <div className={filters.style ? "colors" : "colors-hidden"}>
          <div
            className="color"
            onClick={() => {
              setQueryObject((prevState) => ({
                ...prevState,
                category: "",
              }));
            }}
          >
            <label>All</label>
            <input
              type="checkbox"
              checked={queryObject.category === ""}
            ></input>
          </div>

          <div
            className="color"
            onClick={() => {
              setQueryObject((prevState) => ({
                ...prevState,
                category: "Lace-Ups",
              }));
            }}
          >
            <label>Lace-Ups</label>
            <input
              type="checkbox"
              checked={queryObject.category === "Lace-Ups"}
            ></input>
          </div>

          <div
            className="color"
            onClick={() => {
              setQueryObject((prevState) => ({
                ...prevState,
                category: "Slip-ons",
              }));
            }}
          >
            <label>Slip-ons</label>
            <input
              type="checkbox"
              checked={queryObject.category === "Slip-ons"}
            ></input>
          </div>

          <div
            className="color"
            onChange={() => {
              setQueryObject((prevState) => ({
                ...prevState,
                category: "Boots",
              }));
            }}
          >
            <label>Boots</label>

            <input
              type="checkbox"
              checked={queryObject.category === "Boots"}
            ></input>
          </div>
        </div>
      </div>
      <hr></hr>
      <div
        className="title-toogle"
        onClick={() => {
          handleToggle("sort");
        }}
      >
        <h3>Sort by:</h3>
        <div>
          <i class={filters.sort ? "arrow down" : "arrow up"}></i>
        </div>
      </div>

      <div className="sort">
        <div className={filters.sort ? "colors" : "colors-hidden"}>
          <div
            className="color"
            onClick={() => {
              setQueryObject((prevState) => ({
                ...prevState,
                sort: "",
              }));
            }}
          >
            <label>Clear</label>
            <input type="checkbox" checked={queryObject.sort === ""}></input>
          </div>
          <div
            className="color"
            onClick={() => {
              setQueryObject((prevState) => ({
                ...prevState,
                sort: "priced",
              }));
            }}
          >
            <label>Price asc</label>
            <input
              type="checkbox"
              checked={queryObject.sort === "priced"}
            ></input>
          </div>

          <div
            className="color"
            onClick={() => {
              setQueryObject((prevState) => ({
                ...prevState,
                sort: "price",
              }));
            }}
          >
            <label>Price desc</label>
            <input
              type="checkbox"
              checked={queryObject.sort === "price"}
            ></input>
          </div>

          <div
            className="color"
            onClick={() => {
              setQueryObject((prevState) => ({
                ...prevState,
                sort: "raiting",
              }));
            }}
          >
            <label>Rating</label>
            <input
              type="checkbox"
              checked={queryObject.sort === "raiting"}
            ></input>
          </div>
        </div>
      </div>
      <hr></hr>
      <button
        className="reset"
        onClick={() => {
          setQueryObject(() => ({
            color: "",
            category: "",
            sort: "",
          }));
        }}
      >
        Remove all
      </button>
    </div>
  );
}
