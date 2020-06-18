import React, { Component } from 'react';

import Modal from '../Components/Modal/Modal'

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null,
            message:null
        }

        componentDidMount() {
            
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
                if(error.response){
                    console.log(error.response.data)       // for cases except than network error
                    this.setState({message:error.response.data.message})
                }
            });
            
        }   

        componentWillUnmount (){
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)

        }

        removeErrorHandler = () => {
            this.setState({error: null});
        }

        render () {

            let message = null
            if(this.state.error && this.state.error.message === "Network Error"){
                message = "You are not connected to internet"
            }
            else{
                message = this.state.message
                if(message === 'Something went wrong please try again '){
                    message = "This email address is already in use by other account"
                }

                if(message === 'There is no user record corresponding to this identifier. The user may have been deleted.'){
                    message = 'User Not found '
                }

                if(message === 'The password is invalid or the user does not have a password.'){
                    message = 'Wrong password'
                }
            }
            return (
                <>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.removeErrorHandler}>
                        {message}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    }
}

export default withErrorHandler;