import { CART_ADD_ITEM } from '../constants/cardConstants.js';

const initialStateCart = {
  cardItems: [],
};


export const cartReducer = (state = initialStateCart, action) =>{
    switch(action.type){
      case CART_ADD_ITEM:
        const item = action.payload

        {/*x => x.product === item.product*/}
        const existItem = state.cardItems.find()
        if(existItem){
          {/*x => x.product === existItem.product ? item : x*/}
            return {
                ...state,
                cardItems: state?.cardItems?.map()
               }
        }
        else{ 
          console.log('here we are inside');
          return {...state, cardItems:[...state.cardItems, action.payload] }
        }
      default:
        return state;
    }

}