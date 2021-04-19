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
    nameOfUser: '',
    lastName:'',
    secondSurname:'',
    phoneNumber:'',
    cellPhoneNumber:'',
    username:'',
    password : '',
    roles : [],
    data : [], 
    code: ''
};

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.loadUsers();
        this.loadRoles();
    }

    resetState() {
        this.setState(initialState);
    }

    loadUsers() {
        axios.get( this.state.configUrl + '/users/')
            .then((response) => {
                // handle success
                this.setState({ data: response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    loadRoles() {
        axios.get( this.state.configUrl + '/roles/')
            .then((response) => {
                // handle success
                this.setState({ roles: response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    createCheckItems() {
        let items = [];    
        this.state.roles.forEach((element, i) => {
            items.push(<Form.Check id={i} lg={3} md={3} type="checkbox" onChange={ (e) => this.handleChange(e) } name={element.name} label={element.name} checked={false}/>);  
        });   
        return items;
    }

    createUser() {
        const newUser = {
            name: this.state.nameOfUser,
            lastName: this.state.lastName,
            secondSurname: this.state.secondSurname,
            username: this.state.username,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            cellPhoneNumber: this.state.cellPhoneNumber,
            roles: this.state.roles || [],
        };

        axios.get(this.state.configUrl + '/consecutives/get/lastConsecutive?code=USU-')
            .then((response) => {
                // handle success
                const consecutive = response.data;
                let updateActualValue = {};
                if(consecutive.actualValue === undefined || consecutive.actualValue === null){
                    updateActualValue = { actualValue: consecutive.initialValue}
                    newUser.code = consecutive.code + consecutive.initialValue;
                } else {
                    updateActualValue = { actualValue: consecutive.actualValue + 1}
                    newUser.code = consecutive.code + updateActualValue.actualValue;
                }
                axios.all([
                    axios.patch(this.state.configUrl + '/consecutives/update/lastConsecutive?code=USU-', updateActualValue),
                    axios.post(this.state.configUrl + '/users/create', newUser)
                  ])
                  .then(responseArr => {
                    store.addNotification({
                        title: "Usuario creado",
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
                      this.loadUsers();

                  }).catch((error) => {
                    store.addNotification({
                        title: "Error al crear el usuario",
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

    editUser(){
        const newUser = {
            name: this.state.nameOfUser,
            lastName: this.state.lastName,
            secondSurname: this.state.secondSurname,
            username: this.state.username,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            cellPhoneNumber: this.state.cellPhoneNumber,
            roles: this.state.roles || [],
        };

        axios.patch(this.state.configUrl + '/users/edit/' + this.state.code, newUser)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Usuario editado correctamente",
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
                  this.loadUsers();
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Usuario no encontrado",
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

    getUserByCode (){
        axios.get(this.state.configUrl + '/users/getUserByCode/' + this.state.code)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Usuario encontrado",
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
                      nameOfUser : response.data.name, 
                      lastName : response.data.lastName,
                        secondSurname: response.data.secondSurname,
                        username: response.data.username,
                        password: response.data.password,
                        phoneNumber: response.data.phoneNumber,
                        cellPhoneNumber: response.data.cellPhoneNumber,
                        roles: response.data.roles,
                        isBasic:true
                  });
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Usuario no encontrado",
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
        const {data, nameOfUser, lastName, secondSurname, phoneNumber, cellPhoneNumber, username, password, code, isBasic} = this.state;
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
                name: "lastName",
                label:"Primer Apellido",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "secondSurname",
                label:"Segundo Apellido",
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
            },
            {
                name: "cellPhoneNumber",
                label:"Telefono Celular",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "username",
                label:"Nombre de Usuario",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "roles",
                label:"Roles",
                options: {
                 filter: true,
                 customBodyRender: (value, tableMeta, updateValue) => (
                    <div>{value.join(", ")}</div>
                  ),
                 sort: false
                }
            }
        ];

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title="Lista de Usuarios">
                            <MUIDataTable
                            title={"Usuarios"}
                            data={data}
                            columns={columns}
                            options={options}
                            />
                        </Card>
                        <h5>Administración de Usuarios</h5>
                        <hr/>
                        <Tabs defaultActiveKey="home">
                            <Tab eventKey="home" title="Crear usuario">
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte nombre" name="nameOfUser" value={nameOfUser} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Primer Apellido</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte primer apellido" name="lastName" value={lastName} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Segundo Apellido</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte segundo apellido" name="secondSurname" value={secondSurname} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Teléfono fijo</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte teléfono fijo" name="phoneNumber" value={phoneNumber} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Teléfono celular</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte teléfono celular" name="cellPhoneNumber" value={cellPhoneNumber} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nombre de Usuario</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte el nombre de usuario deseado" name="username" value={username} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control type="password" placeholder="Inserte la contraseña deseada" name="password" value={password} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicChecbox">
                                        {this.createCheckItems()}
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => this.createUser()}>
                                        Crear
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="profile" title="Editar Usuario">
                            <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Código</Form.Label>
                                        <Form.Control type="input" placeholder="Inserte código de usuario a editar" name="code" value={code} onChange={ (e) => this.handleChange(e) } />
                                    </Form.Group>
                                    <Button onClick={() => this.getUserByCode()} aria-controls="basic-collapse" aria-expanded={isBasic}>Buscar usuario</Button>
                                    <Collapse in={this.state.isBasic}>
                                        <div id="basic-collapse">
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Nombre</Form.Label>
                                                    <Form.Control type="input" placeholder="Inserte nombre" name="nameOfUser" value={nameOfUser} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Primer Apellido</Form.Label>
                                                    <Form.Control type="input" placeholder="Inserte primer apellido" name="lastName" value={lastName} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Segundo Apellido</Form.Label>
                                                    <Form.Control type="input" placeholder="Inserte segundo apellido" name="secondSurname" value={secondSurname} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Teléfono fijo</Form.Label>
                                                    <Form.Control type="input" placeholder="Inserte teléfono fijo" name="phoneNumber" value={phoneNumber} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Teléfono celular</Form.Label>
                                                    <Form.Control type="input" placeholder="Inserte teléfono celular" name="cellPhoneNumber" value={cellPhoneNumber} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Nombre de Usuario</Form.Label>
                                                    <Form.Control type="input" placeholder="Inserte el nombre de usuario deseado" name="username" value={username} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Contraseña</Form.Label>
                                                    <Form.Control type="password" placeholder="Inserte la contraseña deseada" name="password" value={password} onChange={ (e) => this.handleChange(e) } />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicChecbox">
                                                    {this.createCheckItems()}
                                                </Form.Group>
                                                <Button variant="primary" onClick={() => this.editUser()}>
                                                    Editar
                                                </Button>
                                        </div>
                                    </Collapse>
                                </Form>
                            </Tab>
                            <Tab disabled={true} eventKey="contact" title="Eliminar Usuario">
                                <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
                
            </Aux>
        );
    }
}

export default Users;
