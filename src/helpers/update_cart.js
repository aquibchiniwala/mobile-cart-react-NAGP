export function updateCartValue(cart, product) {
    if (product && product != {} && product.qty > 0) {

        let index = cart.findIndex(({ id }) => id === product.id);

        if (index === -1) {
            cart.push(product);
        } else {
            cart[index] = product;
        }

    }
    else if (product.qty <= 0) {

        let index = cart.findIndex(({ id }) => id === product.id);
        if (index != -1) {
            cart.splice(index,1);
        }
    }
    return cart;
}


export function getTotalCartQty(cart){
    let totalCartQty=0;
    cart.map((product)=>{
        totalCartQty+=product.qty;
    });
    return totalCartQty;
}

export function getTotalCartAmount(cart){
    let totalCartAmount=0;
    cart.map((product)=>{
        totalCartAmount+=(product.qty*product.price);
    });
    return totalCartAmount;
}