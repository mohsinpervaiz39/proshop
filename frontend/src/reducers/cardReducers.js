import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cardConstants.js';

const initialStateCart = {
  cartItems: [],
  shippingAddress:{}
};

 
export const cartReducer = (state = initialStateCart, action) =>{
    switch(action.type){
      case CART_ADD_ITEM:
        const item = action.payload
        const existItem = state?.cartItems?.find(x => x.product === item.product)
        if(existItem){
            return {
                ...state,
                cartItems: state?.cartItems?.map(x => x.product === existItem.product ? item : x)
               }
        }
        else{   
          if(state.cartItems === undefined){
            state.cartItems = [];
            return { cartItems:[...state.cartItems, action.payload] }
          }else {
            return { cartItems:[...state.cartItems, action.payload] }
          }
           
        }
        case CART_REMOVE_ITEM:
          return {
            ...state,
            cartItems: state?.cartItems?.filter((x) => x.product !== action.payload)
          }
          case CART_SAVE_SHIPPING_ADDRESS:
            return {
              ...state,
              shippingAddress: action.payload
            }
          case CART_SAVE_PAYMENT_METHOD:
              return {
                ...state,
                paymentMethod: action.payload
              }
      default:
        return state;
    }

}