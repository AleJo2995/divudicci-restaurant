import React from 'react';
import {NavLink} from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import config from '../../../config.js';
import { store } from 'react-notifications-component';
import {Redirect} from 'react-router';

const axios = require('axios');

const initialState = {
    configUrl: config.SERVER_URL,
    username:'',
    password:'',
    redirect:false,
};

class SignUp1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
    }

    resetState() {
        this.setState(initialState);
    }

    validateUserLogin() {
        const userLogin = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post(this.state.configUrl + '/users/login', userLogin)
            .then((response) => {   

                if (response.status == 200) {
                    store.addNotification({
                        title: "Usuario logueado",
                        message: "Puede continuar con sus gestiones",
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 2000,
                          onScreen: true
                        }
                      });
                     this.setState({redirect:true});
                    //this.props.history.pushState(null, 'login')
                } else if (response.status === 500) {
                    store.addNotification({
                        title: "Error al intentar loguear el usuario",
                        message: "Revise los datos de usuario",
                        type: "danger",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 3000,
                          onScreen: true
                        }
                      });
                }
                
                    


                  }).catch((error) => {
                    store.addNotification({
                        title: "Error al intentar loguear el usuario",
                        message: "Revise los datos del usuario",
                        type: "danger",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 3000,
                          onScreen: true
                        }
                      });
                });
    }

    handleChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }



    render () {

        const {username, password, redirect} = this.state;

        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Bienvenido a Divudicci</h3>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Username" name="username" value={username} onChange={ (e) => this.handleChange(e) }/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="password" name="password" value={password} onChange={ (e) => this.handleChange(e) }/>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={() => this.validateUserLogin()}>Login</button>
                            </div>
                        </div>
                    </div>
                    {redirect ? <Redirect to='/dashboard/default'/> : null} 
                </div>
            </Aux>
        );
    }
}

export default SignUp1;