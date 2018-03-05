import React, {Component} from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component{



    render (){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ig => {
            return (
                <li key={ig}>
                    <span style={{ textTransform: 'capitalize' }}>{ig}</span> :
            {this.props.ingredients[ig]}
                </li>
            )
        });
        return (
            <Aux>
                <h3>Your Order </h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price : <strong>{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancle</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;