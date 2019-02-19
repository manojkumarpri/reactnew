import React, { Component } from 'react';
import QRCode from 'qrcode.react';

class Qrcode extends Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
        <div>
            <QRCode value="http://facebook.github.io/react/" />

        </div>
        )
    }
}

export default Qrcode;