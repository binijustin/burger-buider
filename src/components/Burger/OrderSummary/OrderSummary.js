import React from 'react';
import Aux from '../../../hoc/Aux';
 
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
            <p>Continue to Checkout?</p>
        </Aux>
    );
}

export default orderSummary;