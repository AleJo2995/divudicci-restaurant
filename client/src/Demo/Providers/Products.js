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
    nameOfProduct: '',
    description:'',
    quantity:'',
    type:'',
    brand:'',
    brands:[],
    data : [], 
    code: ''
};

class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.loadProducts();
        this.loadBrands();
    }

    resetState() {
        this.setState(initialState);
        this.loadBrands();
    }

    loadProducts() {
        axios.get( this.state.configUrl + '/products/')
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
        this.state.brands.forEach((element, i) => {
            items.push(<option key={i} value={element.name}>{element.name}</option>);  
        });   
        return items;
    }

    loadBrands() {
        axios.get( this.state.configUrl + '/brands/')
            .then((response) => {
                // handle success
                this.setState({ brands: response.data });                  
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    createProduct() {
        const newProduct = {
            name:this.state.nameOfProduct,
            description:this.state.description,
            quantity:this.state.quantity,
            type:this.state.type,
            brand:this.state.brand
        };

        axios.get(this.state.configUrl + '/consecutives/get/lastConsecutive?code=PR-')
            .then((response) => {
                // handle success
                const consecutive = response.data;
                let updateActualValue = {};
                if(consecutive.actualValue === undefined || consecutive.actualValue === null){
                    updateActualValue = { actualValue: consecutive.initialValue}
                    newProduct.code = consecutive.code + consecutive.initialValue;
                } else {
                    updateActualValue = { actualValue: consecutive.actualValue + 1}
                    newProduct.code = consecutive.code + updateActualValue.actualValue;
                }
                axios.all([
                    axios.patch(this.state.configUrl + '/consecutives/update/lastConsecutive?code=PR-', updateActualValue),
                    axios.post(this.state.configUrl + '/products/create', newProduct)
                  ])
                  .then(responseArr => {
                    store.addNotification({
                        title: "Producto creado",
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
                      this.loadProducts();

                  }).catch((error) => {
                    store.addNotification({
                        title: "Error al crear el producto",
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

    editProduct(){
        const newProduct = {
            name:this.state.nameOfProduct,
            description:this.state.description,
            quantity:this.state.quantity,
            type:this.state.type,
            brand:this.state.brand
        };

        axios.patch(this.state.configUrl + '/products/edit/' + this.state.code, newProduct)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Producto editado correctamente",
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
                  this.loadProducts();
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Producto no encontrado",
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
    

    getProductByCode (){
        axios.get(this.state.configUrl + '/products/getProductByCode/' + this.state.code)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Producto encontrada",
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
                    nameOfProduct : response.data.name, 
                    description : response.data.description,
                    quantity: response.data.quantity,
                    type: response.data.type,
                    brand: response.data.brand,
                    isBasic:true
                  });
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Producto no encontrado",
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
        const {data, nameOfProduct, description, quantity, brand, type, code, isBasic} = this.state;
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
                label:"Nombre del Producto",
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
                name: "quantity",
                label:"Cantidad",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "brand",
                label:"Marca",
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
                 sort: false,
                },
                
            },
        ];

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title="Manejo de Productos">
                            <MUIDataTable
                            title={"Productos"}
                            data={data}
                            columns={columns}
                            options={options}
                            />
                        </Card>
                        <h5>Administración de Productos</h5>
                        <hr/>
                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="Crear producto">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte nombre" name="nameOfProduct" value={nameOfProduct} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte descripción de la producto" name="description" value={description} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Cantidad</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte la cantidad" name="quantity" value={quantity} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Marca</Form.Label>
                                        <Form.Control as="select" placeholder="Elija nacionalidad" name="brand" value={brand} onChange={ (e) => this.handleChange(e) }>
                                            {this.createSelectItems()}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Control as="select" placeholder="Inserte la compañía de la producto" name="type" value={type} onChange={ (e) => this.handleChange(e) }>
                                            <option>Comestible</option>
                                            <option>Desechables y Empaques</option>
                                            <option>Limpieza e Higiene</option>
                                            <option>Tecnología</option>
                                            <option>Equipos y utensilios</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => this.createProduct()}>
                                        Crear
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="profile" title="Editar producto">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte código de producto a editar" name="code" value={code} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button onClick={() => this.getProductByCode()} aria-controls="basic-collapse" aria-expanded={isBasic}>Buscar producto</Button>
                                    <Collapse in={this.state.isBasic}>
                                        <div id="basic-collapse">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control type="input" placeholder="Inserte nombre" name="nameOfProduct" value={nameOfProduct} onChange={ (e) => this.handleChange(e) } />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Descripción</Form.Label>
                                            <Form.Control type="input" placeholder="Inserte descripción de la producto" name="description" value={description} onChange={ (e) => this.handleChange(e) } />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Cantidad</Form.Label>
                                            <Form.Control type="input" placeholder="Inserte la cantidad" name="quantity" value={quantity} onChange={ (e) => this.handleChange(e) } />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Marca</Form.Label>
                                            <Form.Control as="select" placeholder="Elija nacionalidad" name="brand" value={brand} onChange={ (e) => this.handleChange(e) }>
                                                {this.createSelectItems()}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Tipo</Form.Label>
                                            <Form.Control as="select" placeholder="Inserte la compañía de la producto" name="type" value={type} onChange={ (e) => this.handleChange(e) }>
                                                <option>Comestible</option>
                                                <option>Desechables y Empaques</option>
                                                <option>Limpieza e Higiene</option>
                                                <option>Tecnología</option>
                                                <option>Equipos y utensilios</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button variant="primary" onClick={() => this.editProduct()}>
                                            Editar
                                        </Button>
                                        </div>
                                    </Collapse>
                                </Form>
                            </Tab>
                            <Tab disabled={true} eventKey="contact" title="Eliminar producto">
                                <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
                
            </Aux>
        );
    }
}

export default Products;
