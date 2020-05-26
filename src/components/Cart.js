import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './CustomNavbar';
import React, { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { connect } from 'react-redux'
import CartItem from './CartItem';
import { BrowserRouter as Router, Redirect, Link, useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import { emptyCart } from '../redux/actions';

function Cart(props) {
    const { loading, cart, totalCartAmount, emptyCart } = props
    const history = useHistory();

    let products = "";

    if (cart && cart.length > 0) {
        products =


            <div className="container" style={{ padding: "25px" }}>
                <div className="navbar-brand" style={{ textAlign: "center", backgroundColor: "#0062cc", width: "100%", color: "white", marginBottom: "10px", borderRadius: "3px" }}>Cart</div>
                <div className="card" style={{ padding: "25px" }}>
                    <table id="cart" className="table table-hover table-condensed">
                        <thead>
                            <tr>
                                <th style={{ width: '50%' }}><span className="ticker" style={{ marginLeft: '-10%' }}>Product</span></th>
                                <th style={{ width: '10%' }}> <span className="ticker">Price</span></th>
                                <th style={{ width: '15%' }}><span className="ticker">Quantity</span></th>
                                <th style={{ width: '22%' }} className="text-center"> <span className="ticker">Subtotal</span></th>
                                <th style={{ width: '10%' }} />
                            </tr>
                        </thead>
                        <tbody id="productList">
                            {
                                cart.map((mobile) => (
                                    <CartItem
                                        id={mobile.id}
                                        key={mobile.id}
                                        image={mobile.id}
                                        price={mobile.price}
                                        device_name={mobile.device_name}
                                        qty={mobile.qty}
                                    />))
                            }
                        </tbody>
                        <tfoot id="productListFooter">
                            <tr>
                                <td><Link to={"/"} className="btn btn-primary"><FaAngleLeft /> Continue Shopping</Link></td>
                                <td colSpan={2} className="hidden-xs" />
                                <td className="hidden-xs text-center"><strong id="total">Total ₹{totalCartAmount}</strong></td>
                                <td>
                                    <Popup
                                        trigger={<button className="btn btn-success btn-block" id="btnCheckOut">Checkout <FaAngleRight /></button>}
                                        modal
                                        closeondocumentclick
                                    >
                                        {
                                            localStorage.getItem('userName') == "" || localStorage.getItem('userName') == undefined ?
                                                <Redirect to='/login' /> : ""
                                        }
                                        <div className="row text-center">
                                            <div className="row">
                                                <div className="col-lg-8 col-12 col-sm-10 offset-lg-2 offset-sm-1">
                                                    <h2 className="m-0">Order placed successfully. <b>Order ID : {Math.floor((Math.random() * 1000000) + 1)}</b> </h2>
                                                    <h6>Thanks for shopping with us.</h6>
                                                    <button className="btn btn-danger btn-block" onClick={() => {
                                                        emptyCart();
                                                        history.push("/");
                                                    }}>
                                                        Close
                                                </button>
                                                </div>

                                            </div>
                                        </div>
                                    </Popup>

                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
    }
    else {
        products = <div className="container">
            <div className="row text-center">
                <div className="col-lg-6 offset-lg-3 col-sm-6 offset-sm-3 col-12 p-3 error-main">
                    <div className="row">
                        <div className="col-lg-8 col-12 col-sm-10 offset-lg-2 offset-sm-1">
                            <h1 className="m-0">Empty Cart</h1>
                            <h6>Go <Link to={"/"}> back</Link> and add some of your favourite stuff.</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    if (loading) {
        products = <div className="loader"></div>
    }
    return (
        <div>
            <CustomNavbar />
            {products}
        </div>
    );
}

const mapStateToProps = (state) => ({
    loading: state.loading,
    cart: state.cart,
    totalCartAmount: state.totalCartAmount
})

const mapDispatchToProps = dispatch => ({
    emptyCart: () => dispatch(emptyCart())
});

Cart = connect(mapStateToProps, mapDispatchToProps)(Cart)


export default Cart;