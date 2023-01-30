import axios from "axios";
export const addToCart = (id, color) => async (dispatch) => {
  try {
    dispatch({ type: "CART_ADD_ITEM_REQUEST" });
    const { data } = await axios.get(
      `http://localhost:5000/api/products/singleproduct${id}`
    );
    //only selected color image
    data.images = data.images.filter((c) => c.color == color);

    
    dispatch({
      type: "CART_ADD_ITEM_ADDING",
      payload: { data, color: color ,qty:1},
    });
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
