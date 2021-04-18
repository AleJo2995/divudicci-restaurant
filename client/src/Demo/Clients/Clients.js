import React from 'react';
import {
    Row,
    Col,
    Tabs, Tab,
    Button,
    Form,
    OverlayTrigger,
    Tooltip,
    ButtonToolbar,
    Dropdown,
    DropdownButton,
    SplitButton,
    Collapse
} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import MUIDataTable from "mui-datatables";
import config from '../../config.js';
import { store } from 'react-notifications-component';


const axios = require('axios');

const initialState = {
    configUrl: config.SERVER_URL,
    nameOfClient: '',
    amount:'',
    detail:'',
    reservation:false,
    bar:false,
    date:'',
    restaurant:'',
    data : [], 
    code: '',
    restaurants:[]
};

class Clients extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.loadClients();
        this.loadRestaurants();
    }

    resetState() {
        this.setState(initialState);
        this.loadRestaurants();
    }

    loadClients() {
        axios.get( this.state.configUrl + '/clients/')
            .then((response) => {
                // handle success
                this.setState({ data: response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    loadRestaurants() {
        axios.get( this.state.configUrl + '/restaurants/')
            .then((response) => {
                // handle success
                this.setState({ restaurants: response.data });                  
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    createSelectItems() {
        let items = [];    
        this.state.restaurants.forEach((element, i) => {
            items.push(<option key={i} value={element.name}>{element.name}</option>);  
        });   
        return items;
    }

    createClient() {
        const newClient = {
            name:this.state.nameOfClient,
            amount:this.state.amount,
            detail:this.state.detail,
            reservation:this.state.reservation,
            bar:this.state.bar,
            date:this.state.date,
            restaurant:this.state.restaurant
        };

        axios.get(this.state.configUrl + '/consecutives/get/lastConsecutive?code=CLI-')
            .then((response) => {
                // handle success
                const consecutive = response.data;
                let updateActualValue = {};
                if(consecutive.actualValue === undefined || consecutive.actualValue === null){
                    updateActualValue = { actualValue: consecutive.initialValue}
                    newClient.code = consecutive.code + consecutive.initialValue;
                } else {
                    updateActualValue = { actualValue: consecutive.actualValue + 1}
                    newClient.code = consecutive.code + updateActualValue.actualValue;
                }
                axios.all([
                    axios.patch(this.state.configUrl + '/consecutives/update/lastConsecutive?code=CLI-', updateActualValue),
                    axios.post(this.state.configUrl + '/clients/create', newClient)
                  ])
                  .then(responseArr => {
                    store.addNotification({
                        title: "Cliente creado",
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
                      store.addNotification({
                        title: "Nuevo consecutivo generado",
                        message: "Puede continuar con sus gestiones",
                        type: "info",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 2000,
                          onScreen: true
                        }
                      });
                      this.resetState();
                      this.loadClients();

                  }).catch((error) => {
                    store.addNotification({
                        title: "Error al crear el cliente",
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

    editClient(){
        const newClient = {
            name:this.state.nameOfClient,
            amount:this.state.amount,
            detail:this.state.detail,
            reservation:this.state.reservation,
            bar:this.state.bar,
            date:this.state.date,
            restaurant:this.state.restaurant
        };

        axios.patch(this.state.configUrl + '/clients/edit/' + this.state.code, newClient)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Cliente editado correctamente",
                    message: "Puede continuar con sus gestiones",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 1000,
                      onScreen: true
                    }
                  });
                  this.resetState();
                  this.setState({ 
                    isBasic:false
                  });
                  this.loadClients();
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Cliente no encontrado",
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
            })
    }

    getClientByCode (){
        axios.get(this.state.configUrl + '/clients/getClientByCode/' + this.state.code)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Cliente encontrado",
                    message: "Puede continuar con sus gestiones",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 1000,
                      onScreen: true
                    }
                  });
                  this.setState({ 
                    nameOfClient : response.data.name, 
                    amount : response.data.amount,
                    detail: response.data.detail,
                    reservation: response.data.reservation,
                    bar: response.data.bar,
                    date: response.data.date,
                    restaurant: response.data.restaurant,
                    isBasic:true
                  });
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Cliente no encontrado",
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

    render = () => {        
        const {data, nameOfClient, amount, detail, reservation, bar, date, restaurant,  code, isBasic} = this.state;
        const options = {
            filterType: 'checkbox',
        };
        const columns = [
            {
                name: "code",
                label:"Código",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "name",
                label:"Nombre del Cliente",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "amount",
                label:"Cantidad pagada",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "detail",
                label:"Detalle",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "reservation",
                label:"¿Reservó?",
                options: {
                 filter: true,
                 sort: false,
                 customBodyRender: (value, tableMeta, updateValue) => (
                    <div>
                        <Form.Control disabled={true}  type="checkbox" name="reservation" checked={value} value={value}/>
                    </div>
                    
                  ),
                }
            },
            {
                name: "bar",
                label:"¿Estuvo en la barra?",
                options: {
                 filter: true,
                 sort: false,
                 customBodyRender: (value, tableMeta, updateValue) => (
                    <div>
                        <Form.Control disabled={true}  type="checkbox" name="reservation" checked={value} value={value.toString()}/>
                    </div>
                    
                  ),
                },
                
            },
            {
                name: "date",
                label:"Fecha",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "restaurant",
                label:"Restuarante",
                options: {
                 filter: true,
                 sort: false
                }
            }
        ];

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title="Manejo de Clientes">
                            <MUIDataTable
                            title={"Clientes"}
                            data={data}
                            columns={columns}
                            options={options}
                            />
                        </Card>
                        <h5>Administración de Clientes</h5>
                        <hr/>
                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="Crear cliente">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte nombre" name="nameOfClient" value={nameOfClient} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Cantidad</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte cantidad consumida" name="amount" value={amount} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Detalle</Form.Label>
                                        <Form.Control as="textarea" rows="3" placeholder="Inserte detalle" name="detail" value={detail} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>¿El cliente reservó?</Form.Label>
                                        <Form.Control type="checkbox" placeholder="" name="reservation" checked={reservation} onChange={ (e) => this.handleChange(e) } />
                                        <Form.Label>¿El cliente estuvo en la barra?</Form.Label>
                                        <Form.Control type="checkbox" placeholder="" name="bar" checked={bar} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Fecha</Form.Label>
                                        <Form.Control type="date" placeholder="Inserte fecha" name="date" value={date} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Restaurant</Form.Label>
                                        <Form.Control as="select" placeholder="Elija restaurante" name="restaurant" value={restaurant} onChange={ (e) => this.handleChange(e) }>
                                            {this.createSelectItems()}
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => this.createClient()}>
                                        Crear
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="profile" title="Editar Cliente">
                            <Form>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Código</Form.Label>
                                                <Form.Control type="input" placeholder="Inserte código de cliente a editar" name="code" value={code} onChange={ (e) => this.handleChange(e) } />
                                            </Form.Group>
                                            <Button onClick={() => this.getClientByCode()} aria-controls="basic-collapse" aria-expanded={isBasic}>Buscar cliente</Button>
                                            <Collapse in={this.state.isBasic}>
                                                <div id="basic-collapse">
                                                <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="input" placeholder="Inserte nombre" name="nameOfClient" value={nameOfClient} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Cantidad</Form.Label>
                                                    <Form.Control type="input" placeholder="Inserte cantidad consumida" name="amount" value={amount} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Detalle</Form.Label>
                                                    <Form.Control as="textarea" rows="3" placeholder="Inserte detalle" name="detail" value={detail} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>¿El cliente reservó?</Form.Label>
                                                    <Form.Control type="checkbox" placeholder="" name="reservation" checked={reservation} onChange={ (e) => this.handleChange(e) } />
                                                    <Form.Label>¿El cliente estuvo en la barra?</Form.Label>
                                                    <Form.Control type="checkbox" placeholder="" name="bar" checked={bar} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Fecha</Form.Label>
                                                    <Form.Control type="date" placeholder="Inserte fecha" name="date" value={date} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Restaurant</Form.Label>
                                                    <Form.Control as="select" placeholder="Elija restaurante" name="restaurant" value={restaurant} onChange={ (e) => this.handleChange(e) }>
                                                        {this.createSelectItems()}
                                                    </Form.Control>
                                                </Form.Group>
                                            <Button variant="primary" onClick={() => this.editClient()}>
                                                Editar
                                            </Button>
                                        </div>
                                    </Collapse>
                                </Form>
                            </Tab>
                            <Tab disabled={true} eventKey="contact" title="Eliminar Cliente">
                                <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
                
            </Aux>
        );
    }
}

export default Clients;
