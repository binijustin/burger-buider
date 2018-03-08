import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withError from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrder = [];
                for (let key in res.data) {
                    fetchedOrder.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({ orders: fetchedOrder });
            })
            .catch(err => {
                this.setState({ loading: false })
            })
            .finally(() => {
                this.setState({ loading: false })
            })
    }
    render() {
        return (
            <div>
             {this.state.orders.map(order => (
                 <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
             ))}
            </div>
        );
    }
}


export default withError(Orders,axios);