import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './CustomNavbar';
import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { updateCart } from '../redux/actions';
import { fetchProductsById, fetchProducts, fetchProductForCart } from '../helpers/api_calls';
import { connect } from 'react-redux'

function CartItem(props) {
    const { updateCart, cart } = props;
    let [qty, setQty] = useState(0);
    useEffect(() => {
        setQty(cart && cart.length > 0 && cart[cart.findIndex(({ id }) => id === props.id)] ? cart[cart.findIndex(({ id }) => id === props.id)].qty : 0);
    }, [])

    let product=''
    if(qty && qty>0){
        product=<tr>
        <td data-th="Product">
            <div className="row">
                <div className="col-sm-2 hidden-xs" style={{ marginLeft: '10px' }}><img src={require(`../assets/${props.image}.jpg`)} alt="..." className="img-responsive" height="100px" /></div>
                <div className="col-sm-10" style={{ marginLeft: '10px' }}>
                    <h4 className="nomargin">{props.device_name}</h4>
                </div>
            </div>
        </td>
        <td data-th="Price"><span className="ticker">₹{props.price}</span></td>
        <td data-th="Quantity">
            <span className="ticker">
                <button className="myButton decButton" onClick={(e)=>{removeFromCart(e)}}><FaMinus /></button>
                <input type="number" value={qty} className="qtyBox" readOnly />
                <button className="myButton incButton" onClick={(e)=>{addToCart(e)}} ><FaPlus /></button>
            </span>
        </td>
        <td data-th="Subtotal"><span className="ticker">₹{props.price * qty}</span></td>
        <td className="actions" data-th>
            <span className="ticker">
                <button className="btn btn-danger btn-sm" onClick={(e)=>{deleteFromCart(e)}}><FaTrash /></button>
            </span>
        </td>
    </tr>

    }
    return product;
    function addToCart(event) {
        event.preventDefault();
        // let q = qty + 1;
        setQty(qty + 1);
        updateCart(props.id, qty + 1);
    }
    function removeFromCart(event) {
        event.preventDefault();
        // let q = qty - 1;
        setQty(qty - 1);
        updateCart(props.id, qty - 1);
    }
    function deleteFromCart(event) {
        event.preventDefault();
        // let q = qty - 1;
        setQty(0);
        updateCart(props.id, 0);
    }
}

const mapStateToProps = (state) => ({ cart: state.cart })

const mapDispatchToProps = {
    updateCart: fetchProductForCart
};


CartItem = connect(mapStateToProps, mapDispatchToProps)(CartItem)


export default CartItem;
