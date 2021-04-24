import React from 'react';
import {Row, Col, Card, Button, OverlayTrigger, Tooltip, Tabs, Tab, Form} from 'react-bootstrap';
import LockIcon from '@material-ui/icons/Lock';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import moment from 'moment';


import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { Link, Redirect } from "react-router-dom";
import config from '../../config.js';
import { store } from 'react-notifications-component';

const axios = require('axios');

const initialState = {
    configUrl: config.SERVER_URL,
    restaurants:[],
    tables:[],
    restaurantName:'',
    openingAmount:'',
    registryDate:'',
};

class Console extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.setState({ restaurant :  this.props.location.query !== null && this.props.location.query !== undefined  ?  this.props.location.query.element: '' });
    }
    
    componentDidMount(){
        this.getRestaurantByName();
        this.loadTablesByRestaurant();
    }

    renderDynamicCards(){
        let items = [];    
        this.state.tables.forEach((element, i) => {
                items.push(
                    <Col md={2} xl={2}>
                        <Card className='card-social' l={12} md={12} xl={12}>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <RestaurantMenuIcon fontSize="large" />
                                    </div>
                                    <div className="col text-right">
                                        <h3>{element.name}</h3>
                                        <h5><span className="text-muted">Número de sillas : {element.chairs}</span></h5>
                                        <h6> Status :<span className="text-muted" style= {{currentColor: element.busy ? 'red' :  'green'}}> {element.busy ? 'Ocupada' : 'Libre'}</span></h6>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-12">
                                        <OverlayTrigger key={1} overlay={<Tooltip>{'Ocupar'}</Tooltip>}>
                                            <Button className="col-12" variant={'outline-secondary'} disabled={element.busy ? element.busy : false } onClick={() => this.useTable(element.code)}><Link to="/restaurants/console"> Ocupar </Link></Button>
                                        </OverlayTrigger>
                                        <OverlayTrigger key={2} overlay={<Tooltip>{'Ingresar'}</Tooltip>}>
                                            <Button className="col-12" variant={'outline-primary'}><Link to="/clients" to={{pathname: `/clients`, query: {element} }}> Pagar </Link></Button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </Card.Body>
                    </Card>
                    </Col>
                );  
        });
        return items;
    }

    loadTablesByRestaurant(name) {
        const restaurantName = name !== undefined && name !== null ? name : (this.props.location.query ? this.props.location.query.element.name : 'Piccola Stella');
        axios.get( this.state.configUrl + '/tables/getTablesByRestaurant/' + restaurantName)
            .then((response) => {
                // handle success
                this.setState({ tables : response.data});
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    useTable(code) {
        const tableToEdit = {
            busy:true
        };
        axios.patch( this.state.configUrl + '/tables/edit/' + code, tableToEdit )
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Mesa reservada exitosamente",
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
                this.loadTablesByRestaurant(this.state.restaurant.name);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    getRestaurantByName() {
        const restaurantCode = this.props.location.query ? this.props.location.query.element.code : 'RE-1';
        axios.get( this.state.configUrl + '/restaurants/getRestaurantByCode/' + restaurantCode)
            .then((response) => {
                // handle success
                this.setState({ restaurant : response.data});
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    handleChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }

    createCashier(action) {
        const newCashier = {
            registryDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
            description: action === 'Apertura' ? 'Apertura de Caja': 'Cierre de Caja' ,
            openingAmount: this.state.openingAmount,
            action: action,
            restaurant: this.state.restaurant.name
        };

        axios.get(this.state.configUrl + '/consecutives/get/lastConsecutive?code=CAJ-')
            .then((response) => {
                // handle success
                const consecutive = response.data;
                let updateActualValue = {};
                if(consecutive.actualValue === undefined || consecutive.actualValue === null){
                    updateActualValue = { actualValue: consecutive.initialValue}
                    newCashier.code = consecutive.code + consecutive.initialValue;
                } else {
                    updateActualValue = { actualValue: consecutive.actualValue + 1}
                    newCashier.code = consecutive.code + updateActualValue.actualValue;
                }
                axios.all([
                    axios.patch(this.state.configUrl + '/consecutives/update/lastConsecutive?code=CAJ-', updateActualValue),
                    axios.post(this.state.configUrl + '/cashiers/create', newCashier)
                  ])
                  .then(responseArr => {
                    store.addNotification({
                        title: action + " de caja satisfactorio",
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
                      this.setState({openingAmount : ''})

                  }).catch((error) => {
                    store.addNotification({
                        title: "Error al crear el cajas",
                        message: error.message,
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
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    render() {
        const { restaurant, openingAmount } = this.state;
        return (
            <Aux>
                <Row>
                <Col md={12} xl={12}>
                    <Card className='card-social'>
                        <Card.Body className='border-bottom'>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-auto">
                                    <RestaurantMenuIcon fontSize="large" />
                                </div>
                                <div className="col text-right">
                                    <h3>Restaurante {restaurant !== null &&  restaurant !== undefined ? restaurant.name : ''}</h3>
                                    <h4>Especialidad {restaurant !== null &&  restaurant !== undefined ? restaurant.specialty : ''}</h4>
                                    <h5><span className="text-muted"> Número de mesas : {restaurant !== null &&  restaurant !== undefined ? restaurant.clientsQuant : ''} </span></h5>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                </Row>
                <Row>
                    <Col>   
                    <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="Administración de caja">
                                <Row>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Monto de apertura/cierre</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte monto de apertura/cierre" type="number" name="openingAmount" value={openingAmount}  onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => this.createCashier('Apertura')}>
                                        Abrir caja
                                    </Button>
                                    <Button variant="primary" onClick={() => this.createCashier('Cierre')}>
                                        Cerrar caja
                                    </Button>
                                </Form>
                                </Row>
                            </Tab>
                            <Tab eventKey="mesas" title="Mesas">
                                <Row>
                                {this.renderDynamicCards()}
                                </Row>
                            </Tab>
                            <Tab eventKey="profile" title="Barras">
                            
                            </Tab>
                        </Tabs>
                    </Col>
                    
                </Row>
            </Aux>
        );
    }
}

export default Console;