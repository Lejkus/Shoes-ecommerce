export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      let itemFound = "";

      state.cartItems.map((item) => {
        if (
          item.color === newItem.color &&
          item.data._id === newItem.data._id
        ) {
          if (item.qty < item.data.countInStock) {
            item.qty++;
            itemFound = "qty add";
          } else {
            itemFound = "qty not add";
          }
        }
      });

      if (itemFound == "qty add") {
        return {
          succes: "increased quantity",
          cartItems: [...state.cartItems],
        };
      } else if (itemFound == "qty not add") {
        return {
          succes: "not enough in stock",
          cartItems: [...state.cartItems],
        };
      } else {
        return {
          succes: "item added",
          cartItems: [...state.cartItems, newItem],
        };
      }

    case "CART_DELETE_ITEM": {
      let DeletedItem = "";
      state.cartItems.map((item) => {
        if (
          item.color === action.payload.color &&
          item.data._id === action.payload.id
        ) {
          DeletedItem = item;
        }
      });
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x !== DeletedItem),
      };
    }

    case "CART_CHANGE_QTY": {
      //let ChangeItem = "";
      state.cartItems.map((item) => {
        if (
          item.color === action.payload.color &&
          item.data._id === action.payload.id
        ) {
          if (action.payload.qty <= item.data.countInStock) {
            item.qty = action.payload.qty;
          } else {
            item.qty = item.data.countInStock;
          }
        }
      });

      return {
        ...state,
        cartItems: state.cartItems,
      };
    }

    case "CART_TOTAL":{
      return {
        ...state,
        total: action.payload.total,
      };
    }

    case "CART_ADD_ITEM_FAIL":
      return { added: false, error: action.payload };

      return { delete: false, error: action.payload };
    default:
      return state;
  }
};
