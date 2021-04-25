import React from 'react';
import {Row, Col, Card, Table, Tabs, Tab, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import LockIcon from '@material-ui/icons/Lock';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import PeopleIcon from '@material-ui/icons/People';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AssessmentIcon from '@material-ui/icons/Assessment';
import UcFirst from "../../App/components/UcFirst";


import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import { Link, Redirect } from "react-router-dom";

class Help extends React.Component {

    constructor(props) {
        super(props);
        this.state = { x: 0, y: 0 };
    }

    render() {

        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        {/* <i className="fa fa-facebook text-primary f-36"/> */}
                                        <LockIcon fontSize="large"  />
                                    </div>
                                    <div className="col text-right">
                                        <h3>Administrador de sistema</h3>
                                        <h5><span className="text-muted">Visualice los permisos con rol de administdor de sistema</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-12">
                                        <p> Este tipo de administrador ingresa a la pantalla principal,
                                            pero solo puede acceder a las Ventanas de Proveedores, Administración, Listas de Restaurantes, 
                                            Listado de Clientes y los Reportes de los Clientes, no puede acceder a la vista de los restaurantes.</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <LockIcon fontSize="large"  />
                                    </div>
                                    <div className="col text-right">
                                        <h3>Administrador de seguridad</h3>
                                        <h5><span className="text-muted">Visualice los permisos con rol de administdor de seguridad</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-12">
                                    <p> Este tipo de administrador ingresa a la pantalla principal, 
                                        pero solo puede acceder a las Ventanas de Seguridad y reportes, 
                                        únicamente puede acceder a la Bitácora y no puede acceder a la vista de los restaurantes.</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4} md={6}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <RestaurantMenuIcon fontSize="large" />
                                    </div>
                                    <div className="col text-right">
                                        <h3>Administrador de Restaurante</h3>
                                        <h5 > <span className="text-muted">Visualice los permisos con rol de administdor de restaurantes</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-12">
                                    <p> No puede acceder a la pantalla principal, solo accede a la pantalla de Apertura de Caja, 
                                        cuando el usuario marque ésta opción, al lado aparecerán el nombre de los restaurantes, donde solo podrá administrar uno de ellos</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4} md={6}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <PeopleIcon fontSize="large"/>
                                    </div>
                                    <div className="col text-right">
                                        <h3>Administrador de Cuentas</h3>
                                        <h5 > <span className="text-muted">Visualice los permisos con rol de administdor de restaurantes</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-12">
                                    <p> Este tipo de administrador ingresa a la pantalla principal, 
                                        pero solo puede acceder a las Ventanas de Seguridad y podrá visualizar solo y únicamente la parte llamada Cajas, 
                                        y en los Reportes, únicamente puede acceder a los Reportes de Facturación, no puede acceder a la vista de los restaurantes.</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Help;