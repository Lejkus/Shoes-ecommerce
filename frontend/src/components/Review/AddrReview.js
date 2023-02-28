import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Alert from "../Alert";
import { useSelector } from "react-redux";

export default function AddrReview() {
  const { id } = useParams();
  const [visible, setVisible] = useState(false);

  const User = useSelector((state) => state.user);
  const { userInfo } = User;
  const token = userInfo.token;

  const [starsLength, setStarsLength] = useState(4);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const [alert, setAlert] = useState({ text: null });
  const [count, setCount] = useState(0);

  const addReviev = async () => {
    if (token) {
      if (name != "" && comment != "") {
        await axios
          .post(`http://localhost:5000/api/products/addreview/${id}`, {
            name: name,
            rating: starsLength + 1,
            comment: comment,
          })
          .then((response) => {
            setAlert({ type: "success", text: response.data.Success });
          });
        setName("");
        setComment("");
        setStarsLength(4);
      } else {
        setCount(count + 1);
        setAlert({ type: "error", text: "Empty spaces" });
      }
    } else {
      setCount(count + 1);
      setAlert({ type: "error", text: "Login to write Review" });
    }
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="review-container">
      {alert.text ? (
        <Alert type={alert.type} text={alert.text} c={count} />
      ) : (
        <div className="niuema" style={{ height: "70px" }}></div>
      )}
      <button
        className="display-button"
        onClick={() => {
          setVisible(!visible);
        }}
      >
        Write review
      </button>
      <div className={visible ? "review-schema" : "review-schema-hidden"}>
        <div>
          <label>Name</label>
          <input onChange={handleChangeName} value={name} type="text"></input>
        </div>

        <div>
          <label>Rating</label>
          <div className="star-container">
            <i
              onClick={() => {
                setStarsLength(0);
              }}
              class="fa fa-star fa-lg"
              aria-hidden="true"
            ></i>

            {starsLength >= 1 ? (
              <i
                onClick={() => {
                  setStarsLength(1);
                }}
                class="fa fa-star fa-lg"
                aria-hidden="true"
              ></i>
            ) : (
              <i
                onClick={() => {
                  setStarsLength(1);
                }}
                class="fa fa-star-o fa-lg"
                aria-hidden="true"
              ></i>
            )}

            {starsLength >= 2 ? (
              <i
                onClick={() => {
                  setStarsLength(2);
                }}
                class="fa fa-star fa-lg"
                aria-hidden="true"
              ></i>
            ) : (
              <i
                onClick={() => {
                  setStarsLength(2);
                }}
                class="fa fa-star-o fa-lg"
                aria-hidden="true"
              ></i>
            )}

            {starsLength >= 3 ? (
              <i
                onClick={() => {
                  setStarsLength(3);
                }}
                class="fa fa-star fa-lg"
                aria-hidden="true"
              ></i>
            ) : (
              <i
                onClick={() => {
                  setStarsLength(3);
                }}
                class="fa fa-star-o fa-lg"
                aria-hidden="true"
              ></i>
            )}

            {starsLength >= 4 ? (
              <i
                onClick={() => {
                  setStarsLength(4);
                }}
                class="fa fa-star fa-lg"
                aria-hidden="true"
              ></i>
            ) : (
              <i
                onClick={() => {
                  setStarsLength(4);
                }}
                class="fa fa-star-o fa-lg"
                aria-hidden="true"
              ></i>
            )}
          </div>
        </div>
        <div>
          <label>Opinion</label>
          <textarea
            onChange={handleChangeComment}
            className="opinion-input"
            type="text"
            value={comment}
          ></textarea>
        </div>
        <button
          onClick={() => {
            addReviev();
          }}
        >
          Sumbit
        </button>
      </div>
    </div>
  );
}
