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
    type: '',
    description: '',
    initialValue: '',
    hasPrefix: false,
    prefix: '',
    data : [], 
    code: ''
};

class Countries extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.loadCountries();
    }

    resetState() {
        this.setState(initialState);
    }

    loadCountries() {
        axios.get( this.state.configUrl + '/consecutives/')
            .then((response) => {
                // handle success
                this.setState({ data: response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    createConsecutive() {
        const newConsecutive = {
            code: this.state.prefix,
            type: this.state.type,
            description: this.state.description,
            initialValue: this.state.initialValue,
            hasPrefix: this.state.hasPrefix,
            prefix: this.state.prefix
        };
        axios.post(this.state.configUrl + '/consecutives/create', newConsecutive)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Consecutivo creado",
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
                  this.resetState();
                  this.loadCountries();
            }).catch((error) => {
                // handle error
                store.addNotification({
                    title: "Error al crear el consecutivo",
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

    editConsecutive(){
        const newConsecutive = {
            code: this.state.prefix,
            type: this.state.type,
            description: this.state.description,
            initialValue: this.state.initialValue,
            hasPrefix: this.state.hasPrefix,
            prefix: this.state.prefix
        };
        axios.patch(this.state.configUrl + '/consecutives/edit/' + this.state.code, newConsecutive)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Consecutivo editado correctamente",
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
                  this.loadCountries();
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Consecutivo no encontrado",
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

    getConsecutiveByCode (){
        axios.get(this.state.configUrl + '/consecutives/getConsecutiveByCode/' + this.state.code)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Consecutivo encontrado",
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
                        type : response.data.type,
                        description: response.data.description,
                        initialValue: response.data.initialValue,
                        hasPrefix: response.data.hasPrefix,
                        prefix: response.data.prefix,
                        isBasic:true
                  });
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Consecutivo no encontrado",
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
        const {data, type, description, initialValue, hasPrefix, prefix, code, isBasic} = this.state;
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
                name: "type",
                label:"Tipo",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "description",
                label:"Descripción",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "initialValue",
                label:"Valor incial",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "actualValue",
                label:"Valor actual",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "prefix",
                label:"Prefijo",
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
                        <Card title="Lista de Consecutivos">
                            <MUIDataTable
                            title={"Consecutivos"}
                            data={data}
                            columns={columns}
                            options={options}
                            />
                        </Card>
                        <h5>Administración de Consecutivos</h5>
                        <hr/>
                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="Crear consecutivo">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte tipo" name="type" value={type} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte descripción" name="description" value={description} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Valor Inicial</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte segundo apellido" name="initialValue" value={initialValue} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Check lg={3} md={3} type="checkbox" label="¿El consecutivo tiene prefijo?" name="hasPrefix" value={hasPrefix} onChange={ (e) => this.handleChange(e) }/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Prefijo</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte el prefijo deseado" name="prefix" value={prefix} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => this.createConsecutive()}>
                                        Crear
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="profile" title="Editar Consecutivo">
                            <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Prefijo</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte código de consecutivo a editar" name="code" value={code} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button onClick={() => this.getConsecutiveByCode()} aria-controls="basic-collapse" aria-expanded={isBasic}>Buscar consecutivo</Button>
                                    <Collapse in={this.state.isBasic}>
                                        <div id="basic-collapse">
                                        <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte tipo" name="type" value={type} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte descripción" name="description" value={description} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Valor Inicial</Form.Label>
                                        <Form.Control disabled={true} type="input" placeholder="Inserte segundo apellido" name="initialValue" value={initialValue} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Check disabled={true} lg={3} md={3} type="checkbox" label="¿El consecutivo tiene prefijo?" name="hasPrefix" value={hasPrefix} onChange={ (e) => this.handleChange(e) }/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Prefijo</Form.Label>
                                        <Form.Control disabled={true} type="input" placeholder="Inserte el prefijo deseado" name="prefix" value={prefix} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => this.editConsecutive()}>
                                        Editar
                                    </Button>
                                        </div>
                                    </Collapse>
                                </Form>
                            </Tab>
                            <Tab disabled={true} eventKey="contact" title="Eliminar Consecutivo">
                                <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
                
            </Aux>
        );
    }
}

export default Countries;
