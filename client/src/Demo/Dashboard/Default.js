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

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { x: 0, y: 0 };
    }

    render() {
        const tabContent = (
            <Aux>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Silje Larsen</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>3784</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Julie Vad</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>3544</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Storm Hanse</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>2739</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Frida Thomse</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>1032</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Silje Larsen</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>8750</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Storm Hanse</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>8750</span>
                    </div>
                </div>
            </Aux>
        );

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
                                        <h3>Seguridad</h3>
                                        <h5><span className="text-muted">Gestione usarios y roles</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-12">
                                        <OverlayTrigger key={1} overlay={<Tooltip>{'Ingresar'}</Tooltip>}>
                                            {/* <Button className="col-12" variant={'outline-primary'}><UcFirst text={'Ingresar'} /></Button> */}
                                            <Button className="col-12" variant={'outline-primary'}><Link to="/users"> Ingresar </Link></Button>
                                        </OverlayTrigger>
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
                                        <RestaurantMenuIcon fontSize="large" />
                                    </div>
                                    <div className="col text-right">
                                        <h3>Restaurantes</h3>
                                        <h5><span className="text-muted">Administre sus diferentes locaciones</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-12">
                                        <OverlayTrigger key={1} overlay={<Tooltip>{'Administrar'}</Tooltip>}>
                                            <Button className="col-12" variant={'outline-secondary'}><Link to="/restaurants/home"> Administrar </Link></Button>
                                        </OverlayTrigger>
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
                                        <h3>Clientes</h3>
                                        <h5 > <span className="text-muted">Maneje y visualice su cartera de clientes</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-12">
                                        <OverlayTrigger key={1} overlay={<Tooltip>{'Manejar'}</Tooltip>}>
                                            <Button className="col-12" variant={'outline-success'}><Link to="/clients"> Manejar </Link></Button>
                                        </OverlayTrigger>
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
                                        <LocalGroceryStoreIcon fontSize="large"/>
                                    </div>
                                    <div className="col text-right">
                                        <h3>Proveedores</h3>
                                        <h5><span className="text-muted">Visualice y administre proveedores</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-12">
                                        <OverlayTrigger key={1} overlay={<Tooltip>{'Administrar'}</Tooltip>}>
                                            <Button className="col-12" variant={'outline-danger'}><Link to="/providers"> Administrar </Link></Button>
                                        </OverlayTrigger>
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
                                        <AccountBalanceWalletIcon fontSize="large"/>
                                    </div>
                                    <div className="col text-right">
                                        <h3>Administración</h3>
                                        <h5> <span className="text-muted">Administre las características del sistema</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-12">
                                        <OverlayTrigger key={1} overlay={<Tooltip>{'Administrar'}</Tooltip>}>
                                            <Button className="col-12" variant={'outline-warning'}><Link to="/administration/buffet"> Administrar </Link></Button>
                                        </OverlayTrigger>
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
                                        <AssessmentIcon fontSize="large"/>
                                    </div>
                                    <div className="col text-right">
                                        <h3>Reportes</h3>
                                        <h5><span className="text-muted">Visualice todos sus reportes</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-12">
                                        <OverlayTrigger key={1} overlay={<Tooltip>{'Visualizar'}</Tooltip>}>
                                            <Button className="col-12" variant={'outline-info'}><Link to="/cashiers"> Administrar </Link></Button>
                                        </OverlayTrigger>
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

export default Dashboard;