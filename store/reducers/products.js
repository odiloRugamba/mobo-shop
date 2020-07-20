import PRODUCTS from "../../data/products";
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from "../actions/products";
import Product from "../../models/product";

const initialState = {
    availableProducts : [],
    userProducts: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(product => product.ownerId === 'u1')
            }
        case CREATE_PRODUCT:
            const product = new Product(
                                    action.product.id,
                                    'u1',
                                    action.product.title,
                                    action.product.imageUrl,
                                    action.product.description,
                                    action.product.price,
                                );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(product),
                userProducts: state.userProducts.concat(product),
            }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.productId);
            const updatedProduct = new Product(
                                    action.productId,
                                    state.userProducts[productIndex].ownerId,
                                    action.product.title,
                                    action.product.imageUrl,
                                    action.product.description,
                                    state.userProducts[productIndex].price,
                                );
            updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;
            console.log(updatedProduct);
            
            availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.productId);
            updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;
            return{
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts,
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(product => product.id !== action.id),
                userProducts: state.userProducts.filter(product => product.id !== action.id),
            }
    }
    return state;
}