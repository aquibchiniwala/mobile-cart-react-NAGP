import { REQUEST_PRODUCTS, RECEIVE_PRODUCTS, SORT_PRODUCTS, FILTER_PRODUCTS, RECEIVE_PRODUCT_BY_ID, UPDATE_CART, EMPTY_CART } from '../actions';
import { sortMethodEnum } from '../../enums';
import { compareAsc, compareDesc } from '../../helpers/sorting';
import { updateCartValue, getTotalCartQty, getTotalCartAmount } from '../../helpers/update_cart';

const initialState = {
   products: [],
   loading: false,
   sortMethod: sortMethodEnum.HIGH_TO_LOW,
   filterString: "",
   productById: null,
   cart: [],
   totalCartQty: 0,
   totalCartAmount: 0
}
const reducer = (state = initialState, action) => {
   switch (action.type) {
      case SORT_PRODUCTS:
         if (action.sortMethod == sortMethodEnum.LOW_TO_HIGH) {
            state.products = state.products.sort(compareAsc);
         }
         else {
            state.products = state.products.sort(compareDesc);
         }
         return { ...state, sortMethod: action.sortMethod }
      case REQUEST_PRODUCTS:
         return { ...state, loading: true };
      case RECEIVE_PRODUCTS:
         return { ...state, products: state.sortMethod == sortMethodEnum.LOW_TO_HIGH ? action.products.sort(compareAsc) : action.products.sort(compareDesc), loading: false };
      case FILTER_PRODUCTS:
         return { ...state, filterString: action.filterString };
      case RECEIVE_PRODUCT_BY_ID:
         return { ...state, productById: action.productById, loading: false };
      case UPDATE_CART:
         return { ...state, cart: updateCartValue(state.cart, action.product), totalCartQty: getTotalCartQty(state.cart), totalCartAmount: getTotalCartAmount(state.cart) }
      case EMPTY_CART:
         return { ...state, cart: [], totalCartAmount:0, totalCartQty:0 }
      default:
         return state;
   }
};

export default reducer;