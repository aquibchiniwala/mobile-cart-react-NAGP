import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./components/Login";
import Dashboard from './components/Dashboard';
import { UserProvider } from './contextAPI/UserContext';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

function App() {

  const user = { name: null, loggedIn: false }

  return (<Router>
    <UserProvider value={user}>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/view/:id" component={ProductDetail} />
              <Route path="/cart" component={Cart} />
              <Route path="/" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </div>
    </UserProvider>
  </Router>
  );
}

export default App;