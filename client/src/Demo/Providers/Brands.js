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
    nameOfBrand: '',
    description:'',
    nationality:'',
    company:'',
    companyNumber:'',
    identification:'',
    companyDetail:'',
    countries:[],
    data : [], 
    code: ''
};

class Brands extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.loadBrands();
        this.loadCountries();
    }

    resetState() {
        this.setState(initialState);
        this.loadCountries();
    }

    loadBrands() {
        axios.get( this.state.configUrl + '/brands/')
            .then((response) => {
                // handle success
                this.setState({ data: response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    createSelectItems() {
        let items = [];    
        this.state.countries.forEach((element, i) => {
            items.push(<option key={i} value={element.name}>{element.name}</option>);  
        });   
        return items;
    }

    loadCountries() {
        axios.get( this.state.configUrl + '/countries/')
            .then((response) => {
                // handle success
                this.setState({ countries: response.data });                  
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    createBrand() {
        const newBrand = {
            name:this.state.nameOfBrand,
            description:this.state.description,
            nationality:this.state.nationality,
            company:this.state.company,
            companyNumber:this.state.companyNumber,
            identification:this.state.identification,
            companyDetail:this.state.companyDetail,
        };

        axios.get(this.state.configUrl + '/consecutives/get/lastConsecutive?code=M-')
            .then((response) => {
                // handle success
                const consecutive = response.data;
                let updateActualValue = {};
                if(consecutive.actualValue === undefined || consecutive.actualValue === null){
                    updateActualValue = { actualValue: consecutive.initialValue}
                    newBrand.code = consecutive.code + consecutive.initialValue;
                } else {
                    updateActualValue = { actualValue: consecutive.actualValue + 1}
                    newBrand.code = consecutive.code + updateActualValue.actualValue;
                }
                axios.all([
                    axios.patch(this.state.configUrl + '/consecutives/update/lastConsecutive?code=M-', updateActualValue),
                    axios.post(this.state.configUrl + '/brands/create', newBrand)
                  ])
                  .then(responseArr => {
                    store.addNotification({
                        title: "Marca creado",
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
                      this.loadBrands();

                  }).catch((error) => {
                    store.addNotification({
                        title: "Error al crear el marca",
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

    editBrand(){
        const newBrand = {
            name:this.state.nameOfBrand,
            description:this.state.description,
            nationality:this.state.nationality,
            company:this.state.company,
            companyNumber:this.state.companyNumber,
            identification:this.state.identification,
            companyDetail:this.state.companyDetail,
        };

        axios.patch(this.state.configUrl + '/brands/edit/' + this.state.code, newBrand)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Marca editado correctamente",
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
                  this.loadBrands();
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Marca no encontrado",
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
    

    getBrandByCode (){
        axios.get(this.state.configUrl + '/brands/getBrandByCode/' + this.state.code)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Marca encontrada",
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
                    nameOfBrand : response.data.name, 
                    description : response.data.description,
                    nationality: response.data.nationality,
                    company: response.data.company,
                    companyNumber: response.data.companyNumber,
                    companyDetail: response.data.companyDetail,
                    identification: response.data.identification,
                    isBasic:true
                  });
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Marca no encontrada",
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
        const {data, nameOfBrand, description, nationality, company, companyNumber, identification, companyDetail, code, isBasic} = this.state;
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
                label:"Nombre de la Marca",
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
                name: "nationality",
                label:"Nacionalidad",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "company",
                label:"Compañía",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "companyNumber",
                label:"Número de la compañía",
                options: {
                 filter: true,
                 sort: false,
                },
                
            },
            {
                name: "identification",
                label:"Cédula Jurídica",
                options: {
                 filter: true,
                 sort: false,
                },
                
            },
            {
                name: "companyDetail",
                label:"Detalle de la compañía",
                options: {
                 filter: true,
                 sort: false,
                },
                
            }
        ];

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title="Manejo de Marcas">
                            <MUIDataTable
                            title={"Marcas"}
                            data={data}
                            columns={columns}
                            options={options}
                            />
                        </Card>
                        <h5>Administración de Marcas</h5>
                        <hr/>
                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="Crear marca">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte nombre" name="nameOfBrand" value={nameOfBrand} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte descripción de la marca" name="description" value={description} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nacionalidad</Form.Label>
                                        <Form.Control as="select" placeholder="Elija nacionalidad" name="nationality" value={nationality} onChange={ (e) => this.handleChange(e) }>
                                            {this.createSelectItems()}
                                        </Form.Control>
                                    </Form.Group>
                                    <h5>Información de empresa</h5>
                                    <hr/>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Compañía</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte la compañía de la marca" name="company" value={company} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Número de la compañía</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte el número de la compañía" name="companyNumber" value={companyNumber} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Cédula Jurídica</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte la cédula jurídica" name="identification" value={identification} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Detalle de la compañía</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte el detalle de la compañía" name="companyDetail" value={companyDetail} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => this.createBrand()}>
                                        Crear
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="profile" title="Editar marca">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte código de marca a editar" name="code" value={code} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button onClick={() => this.getBrandByCode()} aria-controls="basic-collapse" aria-expanded={isBasic}>Buscar marca</Button>
                                    <Collapse in={this.state.isBasic}>
                                        <div id="basic-collapse">
                                        <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte nombre" name="nameOfBrand" value={nameOfBrand} onChange={ (e) => this.handleChange(e) } />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Descripción</Form.Label>
                                            <Form.Control type="input" placeholder="Inserte descripción de la marca" name="description" value={description} onChange={ (e) => this.handleChange(e) } />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Nacionalidad</Form.Label>
                                            <Form.Control as="select" placeholder="Elija nacionalidad" name="nationality" value={nationality} onChange={ (e) => this.handleChange(e) }>
                                                {this.createSelectItems()}
                                            </Form.Control>
                                        </Form.Group>
                                        <h5>Información de empresa</h5>
                                        <hr/>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Compañía</Form.Label>
                                            <Form.Control type="input" placeholder="Inserte la compañía de la marca" name="company" value={company} onChange={ (e) => this.handleChange(e) } />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Número de la compañía</Form.Label>
                                            <Form.Control type="input" placeholder="Inserte el número de la compañía" name="companyNumber" value={companyNumber} onChange={ (e) => this.handleChange(e) } />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Cédula Jurídica</Form.Label>
                                            <Form.Control type="input" placeholder="Inserte la cédula jurídica" name="identification" value={identification} onChange={ (e) => this.handleChange(e) } />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Detalle de la compañía</Form.Label>
                                            <Form.Control type="input" placeholder="Inserte el detalle de la compañía" name="companyDetail" value={companyDetail} onChange={ (e) => this.handleChange(e) } />
                                        </Form.Group>
                                        <Button variant="primary" onClick={() => this.editBrand()}>
                                            Editar
                                        </Button>
                                        </div>
                                    </Collapse>
                                </Form>
                            </Tab>
                            <Tab disabled={true} eventKey="contact" title="Eliminar marca">
                                <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
                
            </Aux>
        );
    }
}

export default Brands;
