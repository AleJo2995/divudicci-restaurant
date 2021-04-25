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
    nameOfBuffet: '',
    price:'',
    type:'',
    unitOfMeasure:'',
    unitsOfMeasure:[],
    data : [], 
    code: ''
};

class Buffet extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.loadBuffet();
        this.loadUnitsOfMeasure();
    }

    resetState() {
        this.setState(initialState);
    }

    loadBuffet() {
        axios.get( this.state.configUrl + '/buffet/')
            .then((response) => {
                // handle success
                this.setState({ data: response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    loadUnitsOfMeasure() {
        axios.get( this.state.configUrl + '/unitsOfMeasure/')
            .then((response) => {
                // handle success
                this.setState({ unitsOfMeasure: response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    createSelectItems() {
        let items = [];    
        this.state.unitsOfMeasure.forEach((element, i) => {
            items.push(<option key={i} value={element.name}>{element.name}</option>);  
        });   
        return items;
    }

    createBuffet() {
        const newBuffet = {
            name:this.state.nameOfBuffet,
            price:this.state.price,
            type:this.state.type,
            unitOfMeasure:this.state.unitOfMeasure,
        };

        axios.get(this.state.configUrl + '/consecutives/get/lastConsecutive?code=BUF-')
            .then((response) => {
                // handle success
                const consecutive = response.data;
                let updateActualValue = {};
                if(consecutive.actualValue === undefined || consecutive.actualValue === null){
                    updateActualValue = { actualValue: consecutive.initialValue}
                    newBuffet.code = consecutive.code + consecutive.initialValue;
                } else {
                    updateActualValue = { actualValue: consecutive.actualValue + 1}
                    newBuffet.code = consecutive.code + updateActualValue.actualValue;
                }
                axios.all([
                    axios.patch(this.state.configUrl + '/consecutives/update/lastConsecutive?code=BUF-', updateActualValue),
                    axios.post(this.state.configUrl + '/buffet/create', newBuffet)
                  ])
                  .then(responseArr => {
                    store.addNotification({
                        title: "Buffet creado",
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
                      this.loadBuffet();
                      this.loadUnitsOfMeasure();

                  }).catch((error) => {
                    store.addNotification({
                        title: "Error al crear el buffet",
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

    editBuffet(){
        const newBuffet = {
            name:this.state.nameOfBuffet,
            price:this.state.price,
            type:this.state.type,
            unitOfMeasure:this.state.unitOfMeasure,
        };

        axios.patch(this.state.configUrl + '/buffet/edit/' + this.state.code, newBuffet)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Buffet editado correctamente",
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
                  this.loadBuffet();
                  this.loadUnitsOfMeasure();
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Buffet no encontrado",
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

    getBuffetByCode (){
        axios.get(this.state.configUrl + '/buffet/getBuffetByCode/' + this.state.code)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Buffet encontrado",
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
                    nameOfBuffet : response.data.name, 
                    price : response.data.price,
                    type: response.data.type,
                    unitOfMeasure: response.data.unitOfMeasure,
                    isBasic:true
                  });
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Buffet no encontrado",
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
        const {data, nameOfBuffet, price, type, unitOfMeasure, code, isBasic} = this.state;
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
                label:"Nombre del Buffet",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "price",
                label:"Precio",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "type",
                label:"Tipo",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "unitOfMeasure",
                label:"Unidad de Medida",
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
                        <Card title="Lista de buffet">
                            <MUIDataTable
                            title={"buffet"}
                            data={data}
                            columns={columns}
                            options={options}
                            />
                        </Card>
                        <h5>Administración de buffet</h5>
                        <hr/>
                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="Crear buffet">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte nombre" name="nameOfBuffet" value={nameOfBuffet} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte precio" name="price" value={price} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Tipo de comida</Form.Label>
                                        <Form.Control as="select" placeholder="Elija tipo de comida" name="type" value={type} onChange={ (e) => this.handleChange(e) }>
                                            <option>Italiana</option>.
                                            <option>Marina</option>
                                            <option>Mexicana</option>
                                            <option>Japonesa</option>
                                            <option>Mediterránea</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Unidad de medida</Form.Label>
                                        <Form.Control as="select" placeholder="Elija unidad de medida" name="unitOfMeasure" value={unitOfMeasure} onChange={ (e) => this.handleChange(e) }>
                                            {this.createSelectItems()}
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => this.createBuffet()}>
                                        Crear
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="profile" title="Editar Buffet">
                            <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte código de buffet a editar" name="code" value={code} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button onClick={() => this.getBuffetByCode()} aria-controls="basic-collapse" aria-expanded={isBasic}>Buscar buffet</Button>
                                    <Collapse in={this.state.isBasic}>
                                        <div id="basic-collapse">
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="input" placeholder="Inserte nombre" name="nameOfBuffet" value={nameOfBuffet} onChange={ (e) => this.handleChange(e) } />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Precio</Form.Label>
                                                <Form.Control type="input" placeholder="Inserte precio" name="price" value={price} onChange={ (e) => this.handleChange(e) } />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Tipo de comida</Form.Label>
                                                <Form.Control as="select" placeholder="Elija tipo de comida" name="type" value={type} onChange={ (e) => this.handleChange(e) }>
                                                    <option>Italiana</option>.
                                                    <option>Marina</option>
                                                    <option>Mexicana</option>
                                                    <option>Japonesa</option>
                                                    <option>Mediterránea</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Unidad de medida</Form.Label>
                                                <Form.Control as="select" placeholder="Elija unidad de medida" name="unitOfMeasure" value={unitOfMeasure} onChange={ (e) => this.handleChange(e) }>
                                                    {this.createSelectItems()}
                                                </Form.Control>
                                            </Form.Group>
                                                <Button variant="primary" onClick={() => this.editBuffet()}>
                                                    Editar
                                                </Button>
                                        </div>
                                    </Collapse>
                                </Form>
                            </Tab>
                            <Tab disabled={true} eventKey="contact" title="Eliminar Buffet">
                                <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
                
            </Aux>
        );
    }
}

export default Buffet;
