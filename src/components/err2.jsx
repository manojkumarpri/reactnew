import React, { Component } from 'react';
import { withAlert } from 'react-alert';

class Err2 extends Component {
    constructor(props){
        super(props);
        this.state={
          userdata:{}
        }
        this.state.userdata = JSON.parse(localStorage.getItem("user"));

        const alert = this.props.alert.show('successfully logged in'+""+this.state.userdata.name, {
            // timeout: 5000 , // custom timeout just for this one alert
             type: 'success',
             position: 'top center',
             onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
             onClose: () => { this.props.history.push('/')} // callback that will be executed after this alert is removed
           })
    }
    render(){
        return(
            <div>

            </div>
        )
    }
    }
    export default  withAlert(Err2);