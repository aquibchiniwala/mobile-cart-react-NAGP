import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import CustomNavbar from './CustomNavbar';
import { connect } from 'react-redux'
import { fetchProductsById, fetchProductForCart } from '../helpers/api_calls';
import { updateCart } from '../redux/actions';
import { FaMinus, FaPlus } from 'react-icons/fa';


let ProductDetail = (props) => {
    let [qty, setQty] = useState(0);
    const { getProductById, mobile, loading, updateCart, cart } = props
    useEffect(() => {
        getProductById(parseInt(props.match.params.id));
        setQty(cart && cart.length > 0 && cart[cart.findIndex(({ id }) => id === parseInt(props.match.params.id))] ? cart[cart.findIndex(({ id }) => id === parseInt(props.match.params.id))].qty : 0);
    }, []);
    console.log("qty", qty);
    let product = '';
    if (mobile) {
        product = <div className="container" style={{ fontSize: "12px", padding: "25px" }}>
            <div className="card">
                <div className="row">
                    <aside className="col-sm-4">
                        <article className="gallery-wrap">
                            <div className="img-big-wrap" style={{ padding: "10%" }}>
                                <div> <img src={require(`../assets/${mobile.id}.jpg`)} height="10px" /></div>
                            </div> {/* slider-product.// */}

                        </article> {/* gallery-wrap .end// */}
                    </aside>
                    <aside className="col-sm-7">
                        <article className="card-body p-5">
                            <h5 className="title mb-3">{mobile.device_name}</h5>
                            <p className="price-detail-wrap">
                                <span className="price h5 text-success">
                                    <span className="currency">₹</span><span className="num">{mobile.price}</span>
                                </span>
                            </p> {/* price-detail-wrap .// */}

                            <dl className="param param-feature">
                                <dt>Colors</dt>
                                <dd>{mobile.colours}</dd>
                            </dl>  {/* item-property-hor .// */}
                            <div className="row">
                                <div className="col-sm-6">
                                    <dl className="param param-feature">
                                        <dt>Screen Size</dt>
                                        <dd>{mobile.screen_size}</dd>
                                    </dl>  {/* item-property-hor .// */}
                                </div>
                                <div className="col-sm-6">

                                    <dl className="param param-feature">
                                        <dt>Operating System</dt>
                                        <dd>{mobile.os}</dd>
                                    </dl>  {/* item-property-hor .// */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <dl className="param param-feature">
                                        <dt>RAM</dt>
                                        <dd>{mobile.ram}</dd>
                                    </dl>  {/* item-property-hor .// */}
                                </div>
                                <div className="col-sm-6">
                                    <dl className="param param-feature">
                                        <dt>Storage</dt>
                                        <dd>{mobile.storage}</dd>
                                    </dl>  {/* item-property-hor .// */}
                                </div>
                                <div className="col-sm-6">
                                    <dl className="param param-feature">
                                        {
                                            qty == 0 ?
                                                <span id="ads">
                                                    <a href="" onClick={(e) => addToCart(e)} className="ad-btn">Add to cart</a>
                                                </span> :
                                                <span className="ticker">
                                                    <button className="myButton decButton" onClick={(e) => removeFromCart(e)}><FaMinus /></button>
                                                    <input type="number" value={qty} className="qtyBox" readOnly />
                                                    <button className="myButton incButton" onClick={(e) => addToCart(e)}><FaPlus /></button>
                                                </span>
                                        }
                                    </dl>  {/* item-property-hor .// */}
                                </div>
                            </div>


                            {/* <hr /> */}


                        </article> {/* card-body.// */}
                    </aside> {/* col.// */}
                </div> {/* row.// */}
            </div> {/* card.// */}
        </div>

    }
    else {
        product = <div className="container">
            <div className="row text-center">
                <div className="col-lg-6 offset-lg-3 col-sm-6 offset-sm-3 col-12 p-3 error-main">
                    <div className="row">
                        <div className="col-lg-8 col-12 col-sm-10 offset-lg-2 offset-sm-1">
                            <h1 className="m-0">404</h1>
                            <h6>Page not found</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    if (loading) {
        product = <div className="loader"></div>
    }
    return (
        <div><CustomNavbar />
            {product}
        </div>
    )
    function addToCart(event) {
        event.preventDefault();
        // let q = qty + 1;
        setQty(qty + 1);
        console.log("pd+", qty)
        updateCart(parseInt(props.match.params.id), qty + 1);
        console.log("pdCart", cart)
    }
    function removeFromCart(event) {
        event.preventDefault();
        // let q = qty - 1;
        setQty(qty - 1);
        console.log("pd-", qty)
        updateCart(parseInt(props.match.params.id), qty - 1);
        console.log("pd-Cart", cart)
    }
};

const mapStateToProps = (state) => ({
    loading: state.loading,
    cart: state.cart,
    mobile: state.productById,
})

const mapDispatchToProps = {
    getProductById: fetchProductsById,
    updateCart: fetchProductForCart
}

ProductDetail = connect(mapStateToProps, mapDispatchToProps)(ProductDetail)


export default ProductDetail;