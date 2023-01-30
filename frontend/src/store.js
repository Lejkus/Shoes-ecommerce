import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./reducers/productReducers";
import { singleProductReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
  productList: productListReducer,
  singleProduct: singleProductReducer,
  cart:cartReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...[thunk]))
);
export default store;
