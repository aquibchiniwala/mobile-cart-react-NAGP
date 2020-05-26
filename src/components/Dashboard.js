import ProductCard from './ProductCard';
import CustomNavbar from './CustomNavbar';
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../helpers/api_calls'
import { searchProducts } from '../helpers/search';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

function Dashboard({ getProducts, mobiles, loading, filterString }) {

  useEffect(() => {
    getProducts();
  }, []);

  let products = '';

  if (mobiles) {
    products = searchProducts(filterString, mobiles).map((mobile) => (
      <ProductCard
        id={mobile.id}
        key={mobile.id}
        image={mobile.id}
        price={mobile.price}
        device_name={mobile.device_name}
      />
    ));

    if (products == '') {
      products = <div className="container">
      <div className="row text-center">
        <div className="col-lg-6 offset-lg-3 col-sm-6 offset-sm-3 col-12 p-3 error-main">
          <div className="row">
            <div className="col-lg-8 col-12 col-sm-10 offset-lg-2 offset-sm-1">
              <h1 className="m-0">No Products </h1>
              <h6>Please modify your search</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    }
  }


  if (loading) {
    products = <div className="loader"></div>
  }

  return (
    <div className="App">
      <div>
        <CustomNavbar />
        <div className="row" id="ads">

          {products}
          {/* Category Card  */}

        </div>
      </div>
    </div>
  );

}

const mapStateToProps = (state) => ({
  mobiles: state.products,
  loading: state.loading,
  sortMethod: state.sortMethod,
  filterString: state.filterString
})
const mapDispatchToProps = { getProducts: fetchProducts }
Dashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export default Dashboard;