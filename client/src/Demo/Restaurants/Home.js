import React from 'react';
import {Row, Col, Card, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import LockIcon from '@material-ui/icons/Lock';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import PeopleIcon from '@material-ui/icons/People';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AssessmentIcon from '@material-ui/icons/Assessment';
import UcFirst from "../../App/components/UcFirst";


import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { Link, Redirect } from "react-router-dom";
import config from '../../config.js';

const axios = require('axios');

const initialState = {
    configUrl: config.SERVER_URL,
    restaurants:[]
};

class Console extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }
    
    componentDidMount(){
        this.loadRestaurants();
    }

    renderDynamicCards(){
        let items = []; 
        this.state.restaurants.forEach((element, i) => {
            if(element.active){
                items.push(
                    <Col md={6} xl={4}>
                    <Card className='card-social'>
                        <Card.Body className='border-bottom'>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-auto">
                                    <RestaurantMenuIcon fontSize="large" />
                                </div>
                                <div className="col text-right">
                                    <h3>{element.name}</h3>
                                    <h5><span className="text-muted">{element.specialty}</span></h5>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <div className="row align-items-center justify-content-center card-active">
                                <div className="col-12">
                                    <OverlayTrigger key={1} overlay={<Tooltip>{'Ingresar'}</Tooltip>}>
                                        <Button className="col-12" variant={'outline-primary'}><Link to={{pathname: `/restaurants/console`, query: {element} }} > Ingresar </Link></Button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                );  
            }
        });
        return items;
    }

    loadRestaurants() {
        axios.get( this.state.configUrl + '/restaurants/')
            .then((response) => {
                // handle success
                this.setState({ restaurants : response.data});
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    render() {

        return (
            <Aux>
                <Row>
                    {this.renderDynamicCards()}
                </Row>
            </Aux>
        );
    }
}

export default Console;