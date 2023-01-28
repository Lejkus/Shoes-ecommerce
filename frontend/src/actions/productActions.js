import axios from "axios";

export const listProducts = (queryObject) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });

    const { data } = await axios.get(
      `http://localhost:5000/api/products?color=${queryObject.color}&numericFilters=${queryObject.numericFilters}&sort=${queryObject.sort}&category=${queryObject.category}`
    );
    //little bit of waiting :)
    setTimeout(() => {
      dispatch({
        type: "PRODUCT_LIST_SUCCESS",
        payload: data,
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: "PRODUCT_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.nessage
          : error.message,
    });
  }
};

export const singleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SINGLE_PRODUCT_REQUEST" });

    const { data } = await axios.get(
      `http://localhost:5000/api/products/singleproduct${id}`
    );
    dispatch({
      type: "SINGLE_PRODUCT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "SINGLE_PRODUCT_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.nessage
          : error.message,
    });
  }
};
