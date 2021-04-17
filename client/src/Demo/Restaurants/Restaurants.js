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
    nameOfRestaurant: '',
    address:'',
    clientsQuant:'',
    phoneNumber:'',
    specialty:'',
    data : [], 
    code: ''
};

class Restaurants extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.loadRestaurants();
    }

    resetState() {
        this.setState(initialState);
    }

    loadRestaurants() {
        axios.get( this.state.configUrl + '/restaurants/')
            .then((response) => {
                // handle success
                this.setState({ data: response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    createRestaurant() {
        const newRestaurant = {
            name:this.state.nameOfRestaurant,
            address:this.state.address,
            clientsQuant:this.state.clientsQuant,
            phoneNumber:this.state.phoneNumber,
            specialty:this.state.specialty
        };

        axios.get(this.state.configUrl + '/consecutives/get/lastConsecutive?code=RES-')
            .then((response) => {
                // handle success
                const consecutive = response.data;
                let updateActualValue = {};
                if(consecutive.actualValue === undefined || consecutive.actualValue === null){
                    updateActualValue = { actualValue: consecutive.initialValue}
                    newRestaurant.code = consecutive.code + consecutive.initialValue;
                } else {
                    updateActualValue = { actualValue: consecutive.actualValue + 1}
                    newRestaurant.code = consecutive.code + updateActualValue.actualValue;
                }
                axios.all([
                    axios.patch(this.state.configUrl + '/consecutives/update/lastConsecutive?code=RES-', updateActualValue),
                    axios.post(this.state.configUrl + '/restaurants/create', newRestaurant)
                  ])
                  .then(responseArr => {
                    store.addNotification({
                        title: "Restaurante creado",
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
                      this.loadRestaurants();

                  }).catch((error) => {
                    store.addNotification({
                        title: "Error al crear el restaurante",
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

    editRestaurant(){
        const newRestaurant = {
            name:this.state.nameOfRestaurant,
            address:this.state.address,
            clientsQuant:this.state.clientsQuant,
            phoneNumber:this.state.phoneNumber,
            specialty:this.state.specialty
        };

        axios.patch(this.state.configUrl + '/restaurants/edit/' + this.state.code, newRestaurant)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Restaurante editado correctamente",
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
                  this.loadRestaurants();
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Restaurante no encontrado",
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

    getRestaurantByCode (){
        axios.get(this.state.configUrl + '/restaurants/getRestaurantByCode/' + this.state.code)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Restaurante encontrado",
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
                    nameOfRestaurant : response.data.name, 
                    address : response.data.address,
                    clientsQuant: response.data.clientsQuant,
                    specialty: response.data.specialty,
                    phoneNumber: response.data.phoneNumber,
                    isBasic:true
                  });
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Restaurante no encontrado",
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
        const {data, nameOfRestaurant, address, clientsQuant, phoneNumber, specialty, code, isBasic} = this.state;
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
                label:"Nombre del Restaurante",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "address",
                label:"Dirección",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "clientsQuant",
                label:"Cantidad de clientes",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "specialty",
                label:"Especialidad",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "phoneNumber",
                label:"Telefono Fijo",
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
                        <Card title="Lista de Restaurantes">
                            <MUIDataTable
                            title={"Restaurantes"}
                            data={data}
                            columns={columns}
                            options={options}
                            />
                        </Card>
                        <h5>Administración de Restaurantes</h5>
                        <hr/>
                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="Crear restaurante">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte nombre" name="nameOfRestaurant" value={nameOfRestaurant} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Dirección</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte dirección" name="address" value={address} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Cantidad de clientes</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte cantidad de clientes" name="clientsQuant" value={clientsQuant} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Teléfono</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte teléfono" name="phoneNumber" value={phoneNumber} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Especialidad</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte especialidad" name="specialty" value={specialty} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => this.createRestaurant()}>
                                        Crear
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="profile" title="Editar Restaurante">
                            <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte código de restaurante a editar" name="code" value={code} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button onClick={() => this.getRestaurantByCode()} aria-controls="basic-collapse" aria-expanded={isBasic}>Buscar restaurante</Button>
                                    <Collapse in={this.state.isBasic}>
                                        <div id="basic-collapse">
                                                    <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Nombre</Form.Label>
                                                    <Form.Control type="input" placeholder="Inserte nombre" name="nameOfRestaurant" value={nameOfRestaurant} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Dirección</Form.Label>
                                                    <Form.Control type="input" placeholder="Inserte dirección" name="address" value={address} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Cantidad de clientes</Form.Label>
                                                    <Form.Control type="input" placeholder="Inserte cantidad de clientes" name="clientsQuant" value={clientsQuant} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Teléfono</Form.Label>
                                                    <Form.Control type="input" placeholder="Inserte teléfono" name="phoneNumber" value={phoneNumber} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Especialidad</Form.Label>
                                                    <Form.Control type="input" placeholder="Inserte especialidad" name="specialty" value={specialty} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Button variant="primary" onClick={() => this.editRestaurant()}>
                                                    Editar
                                                </Button>
                                        </div>
                                    </Collapse>
                                </Form>
                            </Tab>
                            <Tab disabled={true} eventKey="contact" title="Eliminar Restaurante">
                                <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
                
            </Aux>
        );
    }
}

export default Restaurants;
