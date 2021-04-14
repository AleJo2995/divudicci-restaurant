import React from 'react';
import {
    Row,
    Col,
    Button,
    OverlayTrigger,
    Tooltip,
    ButtonToolbar,
    Dropdown,
    DropdownButton,
    SplitButton
} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import MUIDataTable from "mui-datatables";
import config from '../../config.js'
import { map } from 'jquery';

const axios = require('axios');

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            columns : ["Codigo", "Nombre", "Primer Apellido", "Segundo Apellido", "Telefono Fijo", "Telefono Celular", "Nickname", "Roles" ],
            data : []
        };
    }

    componentDidMount(){
        this.loadUsers();
    }

    convertToExpectedFormat(data){
        let formattedData = [];
        data.forEach(element => {
            formattedData.push(Object.values(element));
        });
        return formattedData;
    }

    loadUsers() {
        const { SERVER_URL } = config;
        axios.get( SERVER_URL + '/users/')
            .then((response) => {
                // handle success
                console.log(response);
                const newData = this.convertToExpectedFormat(response.data);
                this.setState({ data: newData });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }





    render() {        
        const {columns, data} = this.state;


        const options = {
            filterType: 'checkbox',
        };

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title="Administración de usuarios">
                            <MUIDataTable
                            title={"Lista de Usuarios"}
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

export default Users;
