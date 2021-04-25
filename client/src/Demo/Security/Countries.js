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
    countryName: '',
    flag: '',
    isBasic: false,
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
        axios.get( this.state.configUrl + '/countries/')
            .then((response) => {
                // handle success
                this.setState({ data: response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    createCountry() {
        const newCountry = {
            name: this.state.countryName,
            flag: this.state.flag
        };

        axios.get(this.state.configUrl + '/consecutives/get/lastConsecutive?code=P-')
            .then((response) => {
                // handle success
                const consecutive = response.data;
                let updateActualValue = {};
                if(consecutive.actualValue === undefined || consecutive.actualValue === null){
                    updateActualValue = { actualValue: consecutive.initialValue}
                    newCountry.code = consecutive.code + consecutive.initialValue;
                } else {
                    updateActualValue = { actualValue: consecutive.actualValue + 1}
                    newCountry.code = consecutive.code + updateActualValue.actualValue;
                }
                axios.all([
                    axios.patch(this.state.configUrl + '/consecutives/update/lastConsecutive?code=P-', updateActualValue),
                    axios.post(this.state.configUrl + '/countries/create', newCountry)
                  ])
                  .then(responseArr => {
                    store.addNotification({
                        title: "País creado",
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
                      this.loadCountries();

                  }).catch((error) => {
                    store.addNotification({
                        title: "Error al crear el país",
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

    editCountry(){
        const newCountry = {
            name: this.state.countryName,
            flag: this.state.flag
        };
        axios.patch(this.state.configUrl + '/countries/edit/' + this.state.code, newCountry)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "País editado correctamente",
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
                    title: "País no encontrado",
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

    getCountryByCode (){
        axios.get(this.state.configUrl + '/countries/getCountryByCode/' + this.state.code)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "País encontrado",
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
                        countryName : response.data.name,
                        flag: response.data.flag,
                        isBasic:true
                  });
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "País no encontrado",
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
        const {data, countryName, flag, isBasic, code} = this.state;
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
                name: "flag",
                label:"Bandera",
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
                        <Card title="Lista de Países">
                            <MUIDataTable
                            title={"Países"}
                            data={data}
                            columns={columns}
                            options={options}
                            />
                        </Card>
                        <h5>Administración de Países</h5>
                        <hr/>
                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="Crear País">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte nombre del país" name="countryName" value={countryName} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Bandera</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte bandera del país" name="flag" value={flag} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => this.createCountry()}>
                                        Crear
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="profile" title="Editar País">
                            <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte código de país a editar" name="code" value={code} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button onClick={() => this.getCountryByCode()} aria-controls="basic-collapse" aria-expanded={isBasic}>Buscar País</Button>
                                    <Collapse in={this.state.isBasic}>
                                        <div id="basic-collapse">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control type="input" placeholder="Inserte nombre del país" name="countryName" value={countryName} onChange={ (e) => this.handleChange(e) } />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Bandera</Form.Label>
                                            <Form.Control type="input" placeholder="Inserte bandera del país" name="flag" value={flag} onChange={ (e) => this.handleChange(e) } />
                                        </Form.Group>
                                        <Button variant="primary" onClick={() => this.editCountry()}>
                                            Editar
                                        </Button>
                                        </div>
                                    </Collapse>
                                </Form>
                            </Tab>
                            <Tab disabled={true} eventKey="contact" title="Eliminar País">
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
