import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import UserContext from '../contextAPI/UserContext'

export default class Login extends Component {

    static contextType = UserContext

    constructor() {
        super();

        this.state = {
            userName: "",
            password: "",
            submitted: false
        };
    }

    componentDidMount() {
        const user = this.context
    }


    render() {
        return (
            <div className="container" >
                <div className="loginContainer">
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{backgroundColor:"#212529",color:"white",height:"50px"}}>
                        <div className="container">
                            <Link className="navbar-brand" to={"/"} style={{color:"white"}}>MobKart.in</Link>
                        </div>
                    </nav>
                    <form>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>User Name</label>
                            <input type="text" className="form-control" placeholder="Enter user name" onChange={
                                event =>
                                    this.setState({
                                        userName: event.target.value
                                    })
                            } />
                            {this.state.userName == '' && this.state.submitted ? <p className="text-danger">Username is required</p> : <p></p>}
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={
                                event =>
                                    this.setState({
                                        password: event.target.value
                                    })
                            }
                            />
                            {this.state.password == '' && this.state.submitted ? <p className="text-danger">Passwords is required</p> : <p></p>}
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button onClick={this.onSubmit} className="btn btn-primary btn-block">Login</button>
                    </form>
                </div>
            </div>

        );
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            submitted: true
        });
        if (this.state.userName != "" && this.state.password!="") {
            const { user, setUser } = this.context
            const newUser = { name: this.state.userName, loggedIn: true };
            setUser(newUser);
            localStorage.setItem("userName",this.state.userName);
            this.props.history.push('/');
        }
    }
}



