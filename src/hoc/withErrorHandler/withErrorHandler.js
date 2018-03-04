import React, { Component } from 'react';

import Aux from '../../hoc/Auxilliary/Auxilliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null,

        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });


        }

        componentWillUnmount(){
            console.log("will unmouynt", this.reqInterceptor, this.resInterceptor)
          axios.interceptors.request.eject( this.reqInterceptor);
          axios.interceptors.response.eject( this.resInterceptor);
        }

        closeError = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                    modalClosed={this.closeError}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;