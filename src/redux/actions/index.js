export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const RECEIVE_PRODUCT_BY_ID = 'RECEIVE_PRODUCT_BY_ID';
export const SORT_PRODUCTS = 'SORT_PRODUCTS';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
export const UPDATE_CART = 'UPDATE_CART';
export const EMPTY_CART = 'EMPTY_CART';

export const sortProducts = sortMethod => ({
    type: SORT_PRODUCTS,
    sortMethod
});

export const filterProducts = filterString => ({
    type: FILTER_PRODUCTS,
    filterString
});

export const requestProducts = () => ({
    type: REQUEST_PRODUCTS,
});

export const receivedProducts = products => ({
    type: RECEIVE_PRODUCTS,
    products,
});

export const receivedProductById = productById => ({
    type: RECEIVE_PRODUCT_BY_ID,
    productById,
});

export const updateCart = (product) => ({
    type: UPDATE_CART,
    product
});

export const emptyCart = () => ({
    type: EMPTY_CART,
});
