import React, { Component } from 'react';
import axios from 'axios';
import queryString from  'query-string';


class Qr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData:[],
            
            userdata: JSON.parse(localStorage.getItem("user")),
            date:0,
        }
      //  this.state.listData = JSON.parse(localStorage.getItem("invoice"));
       // this.state.listData1 = JSON.parse(localStorage.getItem("providerf")); 
        console.log(this.state.listData1)
      //  console.log(this.state.listData);
        var today = new Date();
        this.state.date=today.getFullYear() + '-' + (today.getMonth() +1) + '-' + today.getDate();
        console.log(this.state.date) 


    }
 componentWillMount(){
        window.scrollTo(0,0);
        console.log(queryString.parse(this.props.location.search));
        const values=queryString.parse(this.props.location.search);
        console.log("http://52.26.246.107:3005/ordersid/"+values.in)
         axios.get("http://52.26.246.107:3005/ordersid/"+values.in).then(response => {
        console.log(response.data)   
        this.setState({ listData: response.data });
           // console.log(this.state.listData);
             
          })
      
    }
    render(){
        return(
            <div className="container">
                 <div className="page-head_agile_info_w3l" >
                    <div >
                        <h3>YOUR ORDER DETAILS <span>PAGE </span></h3>

                        <div className="services-breadcrumb">
                            <div className="agile_inner_breadcrumb">

                                <ul className="w3_short">
                                    <li style={{marginLeft:"25px"}}><a href="/">Home</a><i>|</i></li>
                                    <li>Invoice Page </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                {this.state.listData!=undefined && this.state.listData!=null && this.state.listData!=[] ? (
                 this.state.listData.map((a,index)=>
                            <div  className="card mb-2 table-responsive">
                                <table className=" table " style={{align:"center",margin:"auto"}}>
  <thead>
    <tr>
      <th scope="col">PRODUCT_NAME</th>
      <th scope="col">QUANTITY</th>
      <th scope="col">SIZE</th>
      <th scop="col">COLOR</th>
      <th scope="col">PRICE</th>
      <th scope="col">CUSTOMER_EMAIL</th>
      <th scope="col">DELIVERY_ADDRESS</th>
      <th scope="col">PROVIDER_NAME</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td >{a.product_name}</td>
      <td>{a.quantity}</td>
     
      <td>{a.size}</td>
      <td>{a.color}</td>
      <td>{a.price}</td>
      <td>{a.customer_email}</td>
      <td>{a.delivery_address}</td>
      <td>{a.shop_name}</td>
    </tr>
  </tbody>
</table>
                                
                 </div>    )          
        )
    :([])}
    </div>
        )  
}
}
export default Qr;
