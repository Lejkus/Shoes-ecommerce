import axios from "axios";
export const addToCart = (id, color) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/products/singleproduct${id}`
    );
    //only selected color image
    data.images = data.images.filter((c) => c.color == color);

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { data, color: color, qty: 1 },
    });

    //seting to local storage
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: "CART_ADD_ITEM_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.nessage
          : error.message,
    });
  }
};

export const deleteFromCart = (id, color) => async (dispatch, getState) => {
  dispatch({
    type: "CART_DELETE_ITEM",
    payload: { id, color },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const ChangeQty = (id, color, qty) => async (dispatch, getState) => {
  if (qty < 1) {
    dispatch({
      type: "CART_DELETE_ITEM",
      payload: { id, color },
    });
  } else {
    dispatch({
      type: "CART_CHANGE_QTY",
      payload: { id, color, qty },
    });
  }
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
