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
                value: '',
                validation: {

                },
                valid: false
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {

                },
                valid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    required: 'true',
                    placeholder: 'ZIP CODE',
                },
                value: '',
                validation: {
                    minLength: 5,
                     maxLength: 5,
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {

                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {

                },
                valid: false
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
        let formData = {};
        for (let formElementIdentifier in this.state.orderForm) { //transform the order form with key : value pair
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const orderObj = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
        }
        axios.post('/orders.json', orderObj)
            .then(res => {
                this.props.history.push("/");
            },
                err => console.log(err))
            .finally(res => this.setState({ loading: true }));
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) { //if empty or whitespace
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
    }

    inputChangedHandler = (event, identifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }//get the keys shallow copy
        const updatedFormEl = { ...updatedOrderForm[identifier] }; // identify the oe you want to deep copy
        updatedFormEl.value = event.target.value; //update the value
        updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation); //update the value
        updatedOrderForm[identifier] = updatedFormEl; // put the updated copy 
        this.setState({ orderForm: updatedOrderForm }); //set state
    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElements.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType="Success" > Order </Button>
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