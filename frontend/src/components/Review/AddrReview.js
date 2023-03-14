import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Alert from "../Alert";
import { useSelector } from "react-redux";
import { GetUserData } from "../../actions/userActions";
import Button from "../Button";

export default function AddrReview() {
  const { id } = useParams();
  const [visible, setVisible] = useState(false);

  const User = useSelector((state) => state.user);
  const { userInfo } = User;
  const token = userInfo.token;

  const [starsLength, setStarsLength] = useState(4);
  const [comment, setComment] = useState("");

  const [alert, setAlert] = useState({ text: null });
  const [count, setCount] = useState(0);

  const addReviev = async () => {
    if (token) {
      if (comment != "") {
        GetUserData(token).then((response) => {
          axios
            .post(`http://localhost:5000/api/products/addreview/${id}`, {
              name: response.data.name,
              rating: starsLength + 1,
              comment: comment,
            })
            .then((response) => {
              setAlert({ type: "success", text: response.data.Success });
            });
        });
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
      <a
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <Button width={"180px"} height={"70px"} text={"Write review"} />
      </a>
      <div className={visible ? "review-schema" : "review-schema-hidden"}>
        <div>
          <label>Rating</label>
          <div className="star-container">
            <i
              onClick={() => {
                setStarsLength(0);
              }}
              className="fa fa-star fa-lg"
              aria-hidden="true"
            ></i>

            {starsLength >= 1 ? (
              <i
                onClick={() => {
                  setStarsLength(1);
                }}
                className="fa fa-star fa-lg"
                aria-hidden="true"
              ></i>
            ) : (
              <i
                onClick={() => {
                  setStarsLength(1);
                }}
                className="fa fa-star-o fa-lg"
                aria-hidden="true"
              ></i>
            )}

            {starsLength >= 2 ? (
              <i
                onClick={() => {
                  setStarsLength(2);
                }}
                className="fa fa-star fa-lg"
                aria-hidden="true"
              ></i>
            ) : (
              <i
                onClick={() => {
                  setStarsLength(2);
                }}
                className="fa fa-star-o fa-lg"
                aria-hidden="true"
              ></i>
            )}

            {starsLength >= 3 ? (
              <i
                onClick={() => {
                  setStarsLength(3);
                }}
                className="fa fa-star fa-lg"
                aria-hidden="true"
              ></i>
            ) : (
              <i
                onClick={() => {
                  setStarsLength(3);
                }}
                className="fa fa-star-o fa-lg"
                aria-hidden="true"
              ></i>
            )}

            {starsLength >= 4 ? (
              <i
                onClick={() => {
                  setStarsLength(4);
                }}
                className="fa fa-star fa-lg"
                aria-hidden="true"
              ></i>
            ) : (
              <i
                onClick={() => {
                  setStarsLength(4);
                }}
                className="fa fa-star-o fa-lg"
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
        <a
          style={{ marginLeft: "60%" }}
          onClick={() => {
            addReviev();
          }}
        >
          <Button
            margintop={"10px"}
            width={"100px"}
            height={"50px"}
            text={"Sumbit"}
          />
        </a>
      </div>
    </div>
  );
}
