import axios from "axios";

export const LoginUser = (loginData) => async (dispatch, getState) => {
  dispatch({ type: "LOGIN_REQUEST"});
  try {
    const { data } = await axios.post(
      `https://store-shoes.onrender.com/api/user/login`,
      loginData
    );

    if (data.token !== undefined) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });
    } else {
      throw data.Error;
    }
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error,
    });
  }
};

export async function RegisterUser(registerData) {
  try {
    return await axios.post(
      `https://store-shoes.onrender.com/api/user/register`,
      registerData
    );
  } catch (error) {
    throw error.message;
  }
}

export async function GetUserData(token) {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.get(`https://store-shoes.onrender.com/api/user/get`, config);
  } catch (error) {
    throw error.message;
  }
}

export async function AddUserOrder(token,cart,total){
  try {
    const data = {
      id:token,
      cart:cart,
      total:total
    };
    
    return await axios.post(`https://store-shoes.onrender.com/api/user/addorder`, data);
  } catch (error) {
    throw error.message;
  }
}

export async function ChangeUserAddress(id,address) {
  try {
    return await axios.put(`https://store-shoes.onrender.com/api/user/address`, {address:address,id:id});
  } catch (error) {
    throw error.message;
  }
}
