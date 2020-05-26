import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { FaMinus, FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux'
import { updateCart } from '../redux/actions';
import { fetchProductForCart, fetchProductsById } from '../helpers/api_calls';

function ProductCard(props) {
    const { updateCart, cart } = props;
    let [qty, setQty] = useState(0);
    useEffect(() => {
        setQty(cart && cart.length > 0 && cart[cart.findIndex(({ id }) => id === props.id)] ? cart[cart.findIndex(({ id }) => id === props.id)].qty : 0);
    },[])
    return (
        <div className="col-md-4" style={{ marginBottom: "2.5%" }}>
            <div className="card rounded">
                <div className="card-image" style={{ margin: "auto", padding: "20px" }}>
                    <img className="img-fluid" src={require(`../assets/${props.image}.jpg`)} alt="Alternate Text" />
                </div>
                <div className="card-image-overlay m-auto">
                    <span className="card-detail-badge">₹{props.price}</span>
                </div>
                <div className="card-body text-center">
                    <div className="ad-title m-auto">
                        <h5>{props.device_name}</h5>
                    </div>
                    <Link className="ad-btn" to={`/view/${props.id}`}>View</Link>
                    {
                        qty == 0 ?
                            <a href="" onClick={(e) => addToCart(e)} className="ad-btn">Add to cart</a> :
                            <span className="ticker">
                                <button className="myButton decButton" onClick={(e) => removeFromCart(e)}><FaMinus /></button>
                                <input type="number" value={qty} className="qtyBox" readOnly />
                                <button className="myButton incButton" onClick={(e) => addToCart(e)}><FaPlus /></button>
                            </span>
                    }
                </div>
            </div>
        </div>

    );
    function addToCart(event) {
        event.preventDefault();
        // let q = qty + 1;
        setQty(qty+1);
        console.log("hot",qty)
        updateCart(props.id, qty+1);
    }
    function removeFromCart(event) {
        event.preventDefault();
        // let q = qty - 1;
        setQty(qty-1);
        console.log("hot",qty)
        updateCart(props.id, qty-1);
    }
}

const mapStateToProps = (state) => ({ cart: state.cart })

const mapDispatchToProps = {
    updateCart: fetchProductForCart
};


ProductCard = connect(mapStateToProps, mapDispatchToProps)(ProductCard)





export default ProductCard;
