import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ig => {
            return (
                <li key={ig}>
                    <span style={{ textTransform: 'capitalize' }}>{ig}</span> :
            {props.ingredients[ig]}
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
            <p>Total Price : <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancle</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    );
}

export default orderSummary;