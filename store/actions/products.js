import Product from '../../models/product';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://shop-012.firebaseio.com/products.json');
            if(!response.ok){
                throw new Error('Something went wrong');
            }
            const products = await response.json();
            const loadedProducts = [];
            for(const key in products){
                loadedProducts.push(new Product(
                                            key, 
                                            'u1', 
                                            products[key].title, 
                                            products[key].imageUrl,
                                            products[key].description,
                                            products[key].price
                                        ))
            }
            dispatch({type: SET_PRODUCTS, products: loadedProducts})
        } catch (error) {
            throw error;
        }
    }
}

export const createProduct = (title, imageUrl, description, price) => {
    return async dispatch => {
        const response = await fetch('https://shop-012.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                price,
            })
        })
        const responseData = await response.json();


        dispatch({
            type: CREATE_PRODUCT,
            product: {
                id: responseData.name,
                title,
                imageUrl,
                description,
                price,
            }
        })
    }
}
export const updateProduct = (id, title, imageUrl, description) => {
    return async dispatch => {
        const response = await fetch(`https://shop-012.firebaseio.com/products/${id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    description,
                })
            });
        if(!response.ok){
            throw new Error('Something wrong with the request/response');
        }
        dispatch({
            type: UPDATE_PRODUCT,
            productId: id,
            product: {
                title,
                imageUrl,
                description
            }
        })
    }
}

export const deleteProduct = (id) => {
    return async dispatch => {
        const response = await fetch(`https://shop-012.firebaseio.com/products/${id}.json`, {method: 'DELETE',});
        if(!response.ok){
            throw new Error('Something wrong with the request/response');
        }
        dispatch({type: DELETE_PRODUCT, id: id})
    }
}