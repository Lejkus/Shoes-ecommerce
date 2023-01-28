import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./reducers/productReducers";
import { singleProductReducer } from "./reducers/productReducers";

const reducer = combineReducers({
  productList: productListReducer,
  singleProduct: singleProductReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...[thunk]))
);
export default store;
