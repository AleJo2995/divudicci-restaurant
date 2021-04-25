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
    nameOfCashier: '',
    lastName:'',
    secondSurname:'',
    phoneNumber:'',
    cellPhoneNumber:'',
    cashiername:'',
    password : '',
    roles : [],
    data : [], 
    code: ''
};

class Cashiers extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount(){
        this.loadCashiers();
        this.loadRoles();
    }

    resetState() {
        this.setState(initialState);
    }

    loadCashiers() {
        axios.get( this.state.configUrl + '/cashiers/')
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

    createCashier() {
        const newCashier = {
            name: this.state.nameOfCashier,
            lastName: this.state.lastName,
            secondSurname: this.state.secondSurname,
            cashiername: this.state.cashiername,
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
                    newCashier.code = consecutive.code + consecutive.initialValue;
                } else {
                    updateActualValue = { actualValue: consecutive.actualValue + 1}
                    newCashier.code = consecutive.code + updateActualValue.actualValue;
                }
                axios.all([
                    axios.patch(this.state.configUrl + '/consecutives/update/lastConsecutive?code=USU-', updateActualValue),
                    axios.post(this.state.configUrl + '/cashiers/create', newCashier)
                  ])
                  .then(responseArr => {
                    store.addNotification({
                        title: "Caja creado",
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
                      this.loadCashiers();

                  }).catch((error) => {
                    store.addNotification({
                        title: "Error al crear el cajas",
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

    editCashier(){
        const newCashier = {
            name: this.state.nameOfCashier,
            lastName: this.state.lastName,
            secondSurname: this.state.secondSurname,
            cashiername: this.state.cashiername,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            cellPhoneNumber: this.state.cellPhoneNumber,
            roles: this.state.roles || [],
        };

        axios.patch(this.state.configUrl + '/cashiers/edit/' + this.state.code, newCashier)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Caja editado correctamente",
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
                  this.loadCashiers();
            })
            .catch((error) => {
                // handle error
                console.log(error);
                store.addNotification({
                    title: "Caja no encontrado",
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

    getCashierByCode (){
        axios.get(this.state.configUrl + '/cashiers/getCashierByCode/' + this.state.code)
            .then((response) => {
                // handle success
                store.addNotification({
                    title: "Caja encontrado",
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
                      nameOfCashier : response.data.name, 
                      lastName : response.data.lastName,
                        secondSurname: response.data.secondSurname,
                        cashiername: response.data.cashiername,
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
                    title: "Caja no encontrado",
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
        const {data, nameOfCashier, lastName, secondSurname, phoneNumber, cellPhoneNumber, cashiername, password, code, isBasic} = this.state;
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
                name: "registryDate",
                label:"Fecha de registro",
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
                name: "openingAmount",
                label:"Monto",
                options: {
                 filter: true,
                 sort: false
                }
            },
            {
                name: "action",
                label:"Apertura/Cierre",
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
                        <Card title="Bitácora de cajas">
                            <MUIDataTable
                            title={"Cajas"}
                            data={data}
                            columns={columns}
                            options={options}
                            />
                        </Card>
                    </Col>  
                </Row>
                
            </Aux>
        );
    }
}

export default Cashiers;
