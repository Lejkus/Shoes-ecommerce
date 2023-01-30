export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM_REQUEST":
      return { adding: true, cartItems: [...state.cartItems] };
    case "CART_ADD_ITEM_ADDING":
      const newItem = action.payload;
      let itemFound = false

      state.cartItems.map((item)=>{
        if(item.color === newItem.color && item.data._id === newItem.data._id){
          item.qty++
          itemFound=true
        }
      })

      if(itemFound){
        return { adding: false, error:'already in cart, adding one more',cartItems: [...state.cartItems] };
      }else{
        return { adding: false, cartItems: [...state.cartItems, newItem] };
      }

      case "CART_ADD_ITEM_FAIL":
        return{ adding: false, error: action.payload };
    default:
      return state;
  }
};
