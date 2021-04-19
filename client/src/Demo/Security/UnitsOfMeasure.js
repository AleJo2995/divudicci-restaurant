import React from 'react';
import {
    Row,
    Col,
    Tabs, Tab,
    Button,
    Form,
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
    unitOfMeasureName: '',
    scale: '',
    detail: '',
    symbol: '',
    isBasic: false,
    data : [],
    code: ''
};

class UnitsOfMeasure extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.loadUnitsOfMeasure();
    }

    resetState() {
        this.setState(initialState);
    }

    loadUnitsOfMeasure() {
        axios.get( this.state.configUrl + '/unitsOfMeasure/')
            .then((response) => {
                // handle success
                this.setState({ data: response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    createUnitOfMeasure() {
        const newUnitOfMeasure = {
            name: this.state.unitOfMeasureName,
            scale: this.state.scale,
            detail: this.state.detail,
            symbol: this.state.symbol
        };

        axios.get(this.state.configUrl + '/consecutives/get/lastConsecutive?code=UM-')
            .then((response) => {
                // handle success
                const consecutive = response.data;
                let updateActualValue = {};
                if(consecutive.actualValue === undefined || consecutive.actualValue === null){
                    updateActualValue = { actualValue: consecutive.initialValue}
                    newUnitOfMeasure.code = consecutive.code + consecutive.initialValue;
                } else {
                    updateActualValue = { actualValue: consecutive.actualValue + 1}
                    newUnitOfMeasure.code = consecutive.code + updateActualValue.actualValue;
                }
                axios.all([
                    axios.patch(this.state.configUrl + '/consecutives/update/lastConsecutive?code=UM-', updateActualValue),
                    axios.post(this.state.configUrl + '/unitsOfMeasure/create', newUnitOfMeasure)
                  ])
                  .then(responseArr => {
                    store.addNotification({
                        title: "Unidad de Medida creado",
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
                        title: "Nuevo Consecutivo generado",
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
                      this.loadUnitsOfMeasure();

                  }).catch((error) => {
                    store.addNotification({
                        title: "Error al crear el unidad de Medida",
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

    editUnitOfMeasure(){
        const newUnitOfMeasure = {
            name: this.state.unitOfMeasureName,
            scale: this.state.scale,
            detail: this.state.detail,
            symbol: this.state.symbol
        };

        axios.patch(this.state.configUrl + '/unitsOfMeasure/edit/' + this.state.code, newUnitOfMeasure)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Unidad de Medida editado correctamente",
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
                  this.loadUnitsOfMeasure();
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Unidad de Medida no encontrado",
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

    getUnitOfMeasureByCode (){
        axios.get(this.state.configUrl + '/unitsOfMeasure/getUnitOfMeasureByCode/' + this.state.code)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Unidad de Medida encontrado",
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
                        unitOfMeasureName : response.data.name,
                        symbol: response.data.symbol,
                        scale: response.data.scale,
                        detail: response.data.detail,
                        isBasic:true
                  });
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Unidad de Medida no encontrado",
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
        const {data, unitOfMeasureName, isBasic, scale, symbol, detail, code} = this.state;
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
                label:"Nombre",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "scale",
                label:"Escala",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "symbol",
                label:"Símbolo",
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
            }
        ];

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title="Lista de Unidades de Medida">
                            <MUIDataTable
                            title={"Unidades de Medida"}
                            data={data}
                            columns={columns}
                            options={options}
                            />
                        </Card>
                        <h5>Administración de Unidades de Medida</h5>
                        <hr/>
                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="Crear Unidad de Medida">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte nombre del unidad de Medida" name="unitOfMeasureName" value={unitOfMeasureName} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Escala</Form.Label>
                                        <Form.Control as="select" placeholder="Elija escala" name="scale" value={scale !== '' ? scale : 'Escala Genérica'  } onChange={ (e) => this.handleChange(e) }>
                                            <option>Escala Genérica</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Detalle</Form.Label>
                                        <Form.Control as="select" placeholder="Elija detalle" name="detail" value={detail} onChange={ (e) => this.handleChange(e) }>
                                        <option>Unidades de capacidad</option>
                                        <option>Unidades de densidad</option>
                                        <option>Unidades de energía</option>
                                        <option>Unidades de fuerza</option>
                                        <option>Unidades de longitud</option>
                                        <option>Unidades de masa</option>
                                        <option>Unidades de peso específico</option>
                                        <option>Unidades de potencia</option>
                                        <option>Unidades de superficie</option>
                                        <option>Unidades de temperatura</option>
                                        <option>Unidades de tiempo</option>
                                        <option>Unidades de velocidad</option>
                                        <option>Unidades de viscosidad</option>
                                        <option>Unidades de volumen</option>
                                        <option>Unidades eléctricas</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Símbolo</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte símbolo" name="symbol" value={symbol} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => this.createUnitOfMeasure()}>
                                        Crear
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="profile" title="Editar Unidad de Medida">
                            <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte código de unidad de Medida a editar" name="code" value={code} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button onClick={() => this.getUnitOfMeasureByCode()} aria-controls="basic-collapse" aria-expanded={isBasic}>Buscar Unidad de Medida</Button>
                                    <Collapse in={this.state.isBasic}>
                                        <div id="basic-collapse">
                                        <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte nombre del unidad de Medida" name="unitOfMeasureName" value={unitOfMeasureName} onChange={ (e) => this.handleChange(e) } />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Escala</Form.Label>
                                                <Form.Control as="select" placeholder="Elija escala" name="scale" value={scale !== '' ? scale : 'Escala Genérica'  } onChange={ (e) => this.handleChange(e) }>
                                                    <option>Escala Genérica</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Detalle</Form.Label>
                                                <Form.Control as="select" placeholder="Elija detalle" name="detail" value={detail} onChange={ (e) => this.handleChange(e) }>
                                                <option>Unidades de capacidad</option>
                                                <option>Unidades de densidad</option>
                                                <option>Unidades de energía</option>
                                                <option>Unidades de fuerza</option>
                                                <option>Unidades de longitud</option>
                                                <option>Unidades de masa</option>
                                                <option>Unidades de peso específico</option>
                                                <option>Unidades de potencia</option>
                                                <option>Unidades de superficie</option>
                                                <option>Unidades de temperatura</option>
                                                <option>Unidades de tiempo</option>
                                                <option>Unidades de velocidad</option>
                                                <option>Unidades de viscosidad</option>
                                                <option>Unidades de volumen</option>
                                                <option>Unidades eléctricas</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Símbolo</Form.Label>
                                                <Form.Control type="input" placeholder="Inserte símbolo" name="symbol" value={symbol} onChange={ (e) => this.handleChange(e) } />
                                            </Form.Group>
                                        <Button variant="primary" onClick={() => this.editUnitOfMeasure()}>
                                            Editar
                                        </Button>
                                        </div>
                                    </Collapse>
                                </Form>
                            </Tab>
                            <Tab disabled={true} eventKey="contact" title="Eliminar Unidad de Medida">
                                <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
                
            </Aux>
        );
    }
}

export default UnitsOfMeasure;
