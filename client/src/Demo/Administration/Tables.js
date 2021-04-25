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
    nameOfTable: '',
    number:'',
    chairs:'',
    restaurant:'',
    restaurants:[],
    data : [], 
    code: ''
};

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.loadTable();
        this.loadRestaurants();
    }

    resetState() {
        this.setState(initialState);
    }

    loadTable() {
        axios.get( this.state.configUrl + '/tables/')
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

    createTable() {
        const newTable = {
            name:this.state.nameOfTable,
            number:this.state.number,
            chairs:this.state.chairs,
            restaurant:this.state.restaurant
        };

        axios.get(this.state.configUrl + '/consecutives/get/lastConsecutive?code=ME-')
            .then((response) => {
                // handle success
                const consecutive = response.data;
                let updateActualValue = {};
                if(consecutive.actualValue === undefined || consecutive.actualValue === null){
                    updateActualValue = { actualValue: consecutive.initialValue}
                    newTable.code = consecutive.code + consecutive.initialValue;
                } else {
                    updateActualValue = { actualValue: consecutive.actualValue + 1}
                    newTable.code = consecutive.code + updateActualValue.actualValue;
                }
                axios.all([
                    axios.patch(this.state.configUrl + '/consecutives/update/lastConsecutive?code=ME-', updateActualValue),
                    axios.post(this.state.configUrl + '/tables/create', newTable)
                  ])
                  .then(responseArr => {
                    store.addNotification({
                        title: "Mesa creada",
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
                      this.loadTable();
                      this.loadRestaurants();

                  }).catch((error) => {
                    store.addNotification({
                        title: "Error al crear la mesa",
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

    editTable(){
        const newTable = {
            name:this.state.nameOfTable,
            number:this.state.number,
            chairs:this.state.chairs,
            restaurant:this.state.restaurant
        };

        axios.patch(this.state.configUrl + '/tables/edit/' + this.state.code, newTable)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Mesa editada correctamente",
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
                  this.loadTable();
                  this.loadRestaurants();
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Mesa no encontrada",
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

    getTableByCode (){
        axios.get(this.state.configUrl + '/tables/getTableByCode/' + this.state.code)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Mesa encontrada",
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
                    nameOfTable : response.data.name, 
                    number : response.data.number,
                    chairs: response.data.chairs,
                    restaurant: response.data.restaurant,
                    isBasic:true
                  });
                  
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Mesa no encontrada",
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
        const {data, nameOfTable, number, chairs, restaurant, code, isBasic} = this.state;
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
                label:"Nombre de la mesa",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "chairs",
                label:"Número de sillas",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "restaurant",
                label:"Restaurante",
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
                        <Card title="Lista de mesas disponibles">
                            <MUIDataTable
                            title={"Mesas"}
                            data={data}
                            columns={columns}
                            options={options}
                            />
                        </Card>
                        <h5>Administración de mesas</h5>
                        <hr/>
                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="Crear mesa">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte nombre" name="nameOfTable" value={nameOfTable} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Número de mesa</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte numero de mesa" name="number" value={number} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Cantidad de sillas</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte cantidad de sillas" name="chairs" value={chairs} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Restaurante</Form.Label>
                                        <Form.Control as="select" placeholder="Elija restaurante" name="restaurant" value={restaurant} onChange={ (e) => this.handleChange(e) }>
                                            {this.createSelectItems()}
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => this.createTable()}>
                                        Crear
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="profile" title="Editar Mesa">
                            <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte código de mesa a editar" name="code" value={code} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button onClick={() => this.getTableByCode()} aria-controls="basic-collapse" aria-expanded={isBasic}>Buscar mesa</Button>
                                    <Collapse in={this.state.isBasic}>
                                        <div id="basic-collapse">
                                                    <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="input" placeholder="Inserte nombre" name="nameOfTable" value={nameOfTable} onChange={ (e) => this.handleChange(e) } />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Número de mesa</Form.Label>
                                                <Form.Control type="input" placeholder="Inserte numero de mesa" name="number" value={number} onChange={ (e) => this.handleChange(e) } />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Cantidad de sillas</Form.Label>
                                                <Form.Control type="input" placeholder="Inserte cantidad de sillas" name="chairs" value={chairs} onChange={ (e) => this.handleChange(e) } />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Restaurante</Form.Label>
                                                <Form.Control as="select" placeholder="Elija restaurante" name="restaurant" value={restaurant} onChange={ (e) => this.handleChange(e) }>
                                                    {this.createSelectItems()}
                                                </Form.Control>
                                            </Form.Group>
                                                <Button variant="primary" onClick={() => this.editTable()}>
                                                    Editar
                                                </Button>
                                        </div>
                                    </Collapse>
                                </Form>
                            </Tab>
                            <Tab disabled={true} eventKey="contact" title="Eliminar Table">
                                <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
                
            </Aux>
        );
    }
}

export default Table;
