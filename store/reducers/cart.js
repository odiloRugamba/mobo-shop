import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart";
import {ADD_ORDER} from '../actions/orders'
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    items: {},
    totalAmount: 0, 
};

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            if(state.items[addedProduct.id]){
                //already in cart
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity +1,
                    addedProduct.price,
                    addedProduct.title,
                    state.items[addedProduct.id].sum + addedProduct.price
                );
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [addedProduct.id]: updatedCartItem
                    },
                    totalAmount: state.totalAmount + addedProduct.price
                }
            }
            else{
                const newCartItem = new CartItem(
                    1,
                    addedProduct.price,
                    addedProduct.title,
                    addedProduct.price
                );
                return{
                    ...state,
                    items: {
                        ...state.items,
                        [addedProduct.id]: newCartItem,
                    },
                    totalAmount: state.totalAmount + addedProduct.price

                }
            
            
            }
        
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.productId];
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;
            if(currentQty > 1){
                //reduce it not remove it
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                updatedCartItems = {...state.items, [action.productId]: updatedCartItem};
            }
            else{
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.productId];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if(!state.items[action.id])
                return state;
            const updatedItems = {...state.items};
            const itemTotalCost = state.items[action.id].sum;
            delete updatedItems[action.id];
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotalCost
            }
    }
    return state;
}

