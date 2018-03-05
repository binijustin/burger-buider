import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';

import axios from '../../../axios-orders';

import classes from './ContactData.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        alert("Continue");
        this.setState({ loading: true });
        const orderObj = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Justin Gallardo',
                address: {
                    street: 'Margarita',
                    zipCode: '1772',
                    country: 'PH'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', orderObj)
            .then(res => { 
                console.log(res) 
            },
            err => console.log(err))
            .finally(res => this.setState({ loading: true }));
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data </h4>
                <form>
                    <input type="text" name="name" placeholder="your name" />
                    <input type="email" name="email" placeholder="your email" />
                    <input type="text" name="street" placeholder="your street" />
                    <input type="text" name="postal" placeholder="your postal" />
                    <Button btnType="Success" clicked={this.orderHandler}> Order </Button>
                </form>
            </div>
        )
    }
}

export default ContactData;