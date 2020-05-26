import { requestProducts, receivedProducts, receivedProductById, updateCart } from "../redux/actions";

export function fetchProducts() {
    return function (dispatch) {
        dispatch(requestProducts());
        return fetch("http://localhost:3001/mobiles")
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error),
            )
            .then((json) => {
                dispatch(receivedProducts(json));
            },
            );
    };
}

export function fetchProductsById(id) {
    return function (dispatch) {
        dispatch(requestProducts());
        return fetch(`http://localhost:3001/mobiles/${id}`)
            .then(response => {
                if (response.status == 200 || response.status == 304) {
                    response.json()
                        .then((json) => {
                            dispatch(receivedProductById(json));
                        },
                        );
                }
                else {
                    dispatch(receivedProductById(null))
                }
            })
    };
}

export function fetchProductForCart(productId, qty) {
    console.log("fetchProductForCart");
    return function (dispatch) {
        // dispatch(requestProducts());
        console.log("call");
        return fetch(`http://localhost:3001/mobiles/${productId}`)
            .then(response => {
                if (response.status == 200 || response.status == 304) {
                    response.json()
                        .then((json) => {
                            json.qty = qty;
                            dispatch(updateCart(json));
                        },
                        );
                }
            })
    };
}