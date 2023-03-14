import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";

export default function Filters({ products }) {
  const dispatch = useDispatch();

  const rangeinput = useRef();

  const [colors, setColors] = useState([]);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);

  const [optionsVisibility, SetOptionsVisibility] = useState({
    color: false,
    style: true,
    sort: true,
  });

  const [queryObject, setQueryObject] = useState({
    color: "",
    category: "",
    numericFilters: "",
    sort: "",
  });

  const handleToggle = (event) => {
    if (event == "color") {
      SetOptionsVisibility((prevState) => ({
        ...prevState,
        color: !prevState.color,
      }));
    }
    if (event == "style") {
      SetOptionsVisibility((prevState) => ({
        ...prevState,
        style: !prevState.style,
      }));
    }
    if (event == "sort") {
      SetOptionsVisibility((prevState) => ({
        ...prevState,
        sort: !prevState.sort,
      }));
    }
  };
  const handleReset = () => {
    setQueryObject({
      color: "",
      category: "",
      sort: "",
      name: "",
      numericFilters: max,
    });
    rangeinput.current.value = max;
  };

  useEffect(() => {
    dispatch(listProducts(queryObject));
    window.scrollTo(0, 0);
  }, [queryObject]);

  useEffect(() => {
    if (products) {
      products.map((p) => {
        p.colors.map((color) => {
          if (!colors.includes(color)) {
            colors.push(color);
          }
        });
        const prices = products.map((object) => {
          return object.price;
        });
        if (!max) {
          rangeinput.current.value = max;
          setMax(Math.max(...prices));
          setMin(Math.min(...prices));
        }
      });
    }
  }, [products]);

  //if we get max price we change input to it
  useEffect(() => {
    rangeinput.current.value = max;
  }, [max]);

  return (
    <>
      <div className="filters">
        <h1>FILTERS</h1>
        <hr></hr>
        <>
          <div
            className="title-toogle"
            onClick={() => {
              handleToggle("color");
            }}
          >
            <h3>Color</h3>
            <div>
              <i
                className={optionsVisibility.color ? "arrow down" : "arrow up"}
              ></i>
            </div>
          </div>
          <div className={optionsVisibility.color ? "colors" : "colors-hidden"}>
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
            {colors.map((color, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setQueryObject((prevState) => ({
                      ...prevState,
                      color: color,
                    }));
                  }}
                  className="color"
                >
                  <label>{color}</label>
                  <input
                    type="checkbox"
                    checked={queryObject.color === color}
                  ></input>
                </div>
              );
            })}
          </div>
        </>
        <hr></hr>
        <div
          className="title-toogle"
          onClick={() => {
            handleToggle("style");
          }}
        >
          <h3>Style</h3>
          <div>
            <i
              className={optionsVisibility.style ? "arrow down" : "arrow up"}
            ></i>
          </div>
        </div>

        <div className="style">
          <div
            className={optionsVisibility.style ? "options" : "options-hidden"}
          >
            <div
              className="option"
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
              className="option"
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
              className="option"
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
              className="option"
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
            <i
              className={optionsVisibility.sort ? "arrow down" : "arrow up"}
            ></i>
          </div>
        </div>

        <div className="sort">
          <div
            className={optionsVisibility.sort ? "options" : "options-hidden"}
          >
            <div
              className="option"
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
              className="option"
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
              className="option"
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
              className="option"
              onClick={() => {
                setQueryObject((prevState) => ({
                  ...prevState,
                  sort: "rating",
                }));
              }}
            >
              <label><s>Rating</s></label>
              <input
                type="checkbox"
                checked={queryObject.sort === "rating"}
              ></input>
            </div>
          </div>
        </div>
        <hr></hr>
        <p>${queryObject.numericFilters || max || "loading.."}</p>

        <input
          type="range"
          ref={rangeinput}
          min={min}
          max={max}
          step="10"
          defaultValue={1000}
          onMouseUp={(e) => {
            setQueryObject((prevState) => ({
              ...prevState,
              numericFilters: e.target.value,
            }));
          }}
          onTouchEnd={(e) => {
            setQueryObject((prevState) => ({
              ...prevState,
              numericFilters: e.target.value,
            }));
          }}
        ></input>

        <hr></hr>
        <div style={{ display: "flex",justifyContent:'space-evenly',alignItems:"center" }}>
          <button className="reset" onClick={handleReset}>
            Remove all
          </button>
          {products.length > 0 ? (
            <p style={{ color: "#303030",fontSize:"14px",width:"70px" }}>{products.length} Items</p>
          ) : (
            <d style={{width:"70px"}}></d>
          )}
        </div>
      </div>
    </>
  );
}
