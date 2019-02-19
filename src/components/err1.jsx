import React, { Component } from 'react';
import { withAlert } from 'react-alert';

class Err1 extends Component {
    constructor(props){
        super(props);
        this.state={

        }
        const alert = this.props.alert.show('You have not selected any items and provide your valid data', {
            // timeout: 5000 , // custom timeout just for this one alert
             type: 'success',
             position: 'top center',
             onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
             onClose: () => { this.props.history.push('/cart')} // callback that will be executed after this alert is removed
           })
    }
    render(){
        return(
            <div>

            </div>
        )
    }
    }
    export default  withAlert(Err1);