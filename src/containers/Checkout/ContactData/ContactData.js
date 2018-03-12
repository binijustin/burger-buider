import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name',
                },
                value: 'Justin Gallardo'
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE',
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', text: 'Fastest' }, { value: 'cheapest', text: 'Cheapest' }]
                },
                value: ''
            },
        },
        loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const orderObj = {
            ingredients: this.props.ingredients,
            price: this.props.price
        }
        axios.post('/orders.json', orderObj)
            .then(res => {
                this.props.history.push("/");
            },
            err => console.log(err))
            .finally(res => this.setState({ loading: true }));
    }

    inputChangedHandler = (event, identifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormEl = { ...updatedOrderForm[identifier] };
        updatedFormEl.value = event.target.value;
        updatedOrderForm[identifier] = updatedFormEl;
        this.setState({orderForm  : updatedOrderForm});
    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form>
            {formElements.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType="Success" clicked={this.orderHandler}> Order </Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data </h4>
                {form}
            </div>
        )
    }
}

export default ContactData;