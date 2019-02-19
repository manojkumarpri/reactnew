import React, { Component } from 'react';
import axios from 'axios';
import './checkout.css'
import StripeCheckout from 'react-stripe-checkout';
import StarRatingComponent from 'react-star-rating-component';
import { withAlert } from 'react-alert';

//import Modal from 'react-bootstrap4-modal';

const PAYMENT_SERVER_URL = '3RD_PARTY_SERVER';
const CURRENCY = 'USD';

function searchingfor(term) {
    return function (x) {
        console.log(x.delivery_address)
      return x.delivery_address.toLowerCase().includes(term.toLowerCase()) || !term;
    }
  }

class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedout: false,
            username: '',
            show: false,
            show1: false,
            view:false,
            view1:false,
            newaddress: false,
            userdata: JSON.parse(localStorage.getItem("user")),
            delivery_address: "",
            listData: [],
            resource:[],
            places:[],
            places2:[],
            listData2: {
                "cust_id": 0,
                "product_name": "",
                "product_image": "",
                "product_category": "",
                "shop_category": "",
                "rating": 0,
                "size": 0,
                "price": 0,
                "quantity": 0,
                "brand_name": 0,
                "discount": 0,
                "tax": 0,
                "shop_name": "",
                "product_id": 0,
                "review": "",
                "total": 0,
                "order_status": "proceed",
                "provider_mobile_number": 0,
                "customer_mobile_number": 0,
                "delivery_address": "",
                "provider_id": 0,
                "payment_option": "",
                "customer_email": "",
                "invoice_number": "",
                "delivered_on": "45 minutes",

            },
            checkin:{},
            deliver_address:"",
            modal: false,
            listData1: [],
            combine: [],
            payment: "nothing",
            total: "",
            invoice_number: "",
            delivered_on: "45 mins",
            image: "",
            indexOf: 0,
            cust_id:0,
        }
        this.searchHandler=this.searchHandler.bind(this);
        this.searchHandlers=this.searchHandlers.bind(this);
         console.log(localStorage.getItem("check"))
        this.state.listData = JSON.parse(localStorage.getItem("check"));
        
        // this.setState({listData:JSON.parse(localStorage.getItem("final"))});
       console.log("data via local storage ", this.state.listData)
        // this.setState(this.state.listData)
        this.state.listData1= JSON.parse(localStorage.getItem("providerf"));
        console.log(this.state.listData1);
        console.log(this.state.listData)
        if (this.state.userdata) {
            this.state.delivery_address = this.state.userdata.address;
        }
        if(this.state.listData!=undefined &&  this.state.listData1!=null){
        var product = Object.assign(this.state.listData1, { quantity: this.state.listData.quantity });
          
        // this.state.image = this.state.listData.img;
        // this.state.title = this.state.listData.name;
        // this.state.rating = this.state.listData.rating;
        // this.setState({ image: this.state.image });
        // this.setState({ title: this.state.title });
        // this.setState({ rating: this.state.rating });

        
        console.log(this.state.listData1)

        this.setState({ listData1: this.state.listData1 })

        this.setState({ listData: this.state.listData })


        console.log("list data after value set ", this.state.listData)
        console.log(this.state.userdata);
        }
        this.addrtoggle = this.addrtoggle.bind(this);
        this.changeaddr = this.changeaddr.bind(this);
        if (this.state.listData != undefined) {
            this.state.total = this.state.listData.quantity * this.state.listData.price;
           // console.log(this.state.total)
            this.setState({ total: this.state.total })
           // console.log(this.state.listData.provider_id);

        }
    }
    componentDidMount() {
        window.scrollTo(0,0)
       // console.log(this.state.listData.cust_id);
        if( this.state.listData!=null&&this.state.listData.length!=0) {
            axios.get("http://192.168.1.130:3001/orders/"+this.state.listData[0].cust_id).then(response => {
             this.state. places= response.data;
             console.log(this.state.places);
             })
         }
       
        // if (this.state.userdata != undefined) {
        //     axios.get("http://13.58.92.162:3000/orders/" + this.state.userdata.uid).then(response => {
        //         console.log(response.data)
        //         this.setState({ listData: response.data });
        //     });
        //}
        // console.log("hello",this.state.listData);
    }
//     async  componentWillMount(){
//         window.scrollTo(0,0)
//         if(this.state.listData){
//             console.log("no list data");
        
// } else {
//     await axios.get("http://localhost:3001/orders/"+this.state.listData[0].cust_id).then(response => {
//             this.state. places= response.data;
//             console.log(this.state.places);
//     })
// }
      
   // }
  //}
   
    searchHandler(a){
        console.log(a);
       // console.log(this.state.showof)
         // this.state.view="true";
        
          
          console.log(this.state.deliver_address);
          this.state.delivery_address=this.state.deliver_address;
          this.setState({delivery_address:this.state.deliver_address});
          if(this.state.deliver_address.length>0){
          for(var i=0;i<this.state.listData.length;i++){
            this.state.listData[i].delivery_address=this.state.deliver_address;
        }
             //  alert("Delivery Address  changed");
               const alert = this.props.alert.show('Delivery Address  changed', {
                // timeout: 5000 , // custom timeout just for this one alert
                 type: 'success',
                 position: 'top center',
                 onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
                 onClose: () => { } // callback that will be executed after this alert is removed
               })
               this.setState({view1:false});
    }
    else{
     //  alert("Delivery Address not changed");
       const alert = this.props.alert.show('Delivery Address not changed', {
        // timeout: 5000 , // custom timeout just for this one alert
         type: 'success',
         position: 'top center',
         onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
         onClose: () => { } // callback that will be executed after this alert is removed
       })

        
    }
        
        console.log(this.state.listData)
        localStorage.setItem("check", JSON.stringify(this.state.listData));

        
      }
    
    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }

    login() {
        this.props.history.push('/login');
        this.setState({ show: true });
        this.setState({ show1: false });
    }
    signup() {
        this.props.history.push('/signup');
        this.setState({ show1: true });
        this.setState({ show: false });
    }
    search(){
       for(var i=0;i<this.state.places.length;i++){
           var j=i+1;
           if(j<this.state.places.length){
           if(this.state.places[i].delivery_address!=this.state.places[j].delivery_address){
             this.state.places2.push(this.state.places[i]);              
           }
        }
           
                
                }
                console.log(this.state.places2);
                //this.state.view=true;
                this.setState({view:true});
                this.state.view1= false;
                //this.setState({view1:"false"});
    }
    addrtoggle() {
        this.setState({ view1: true });
        this.setState({view: false});
    }
    changeaddr(e) {
        this.state.deliver_address=e;
        //this.state.view1="true";
       // this.state.view="false";
        console.log(this.state.deliver_address);
        this.setState({deliver_address:this.state.deliver_address});

           }

    close() {
        this.setState({ modal: false });
        this.confirmorder1();
    }

    Remove(id) {
        // localStorage.setItem("final");
        console.log(id);
        for(var j=0;j<this.state.listData1.length;j++){
            if(this.state.listData1[j].prodId[this.state.listData1[j].index]==id.product_id&&this.state.listData1[j].item_id==id.item_id){
                this.state.listData1.splice(j,1);
            }
        }
        localStorage.setItem("provider",JSON.stringify(this.state.listData1))
        console.log(this.state.listData)
        for(var i=0;i<this.state.listData.length;i++){
            console.log(this.state.listData[i].product_id,id)
            if(this.state.listData[i].item_id==id.item_id&&id.color==this.state.listData[i].color){
              this.state.listData.splice(i, 1);
              
            }
          }
          console.log(this.state.listData)
          localStorage.setItem("check", JSON.stringify(this.state.listData));
      
          window.location.reload();
          this.props.history.push("/checkout");
      

             }
      
    confirmorder() {
        this.setState({modal:true});
    }
 async   confirmorder1() {
        console.log(this.state.listData);
         for(var i=0;i<this.state.listData.length;i++){
        this.state.listData2.cust_id = this.state.listData[i].cust_id;
        this.state.listData2.product_name = this.state.listData[i].name;
        this.state.listData2.product_image = this.state.listData[i].img;
        this.state.listData2.product_category = this.state.listData[i].product_category;
        this.state.listData2.rating = this.state.listData[i].rating;
        this.state.listData2.shop_category = this.state.listData[i].shop_category;
        this.state.listData2.size = this.state.listData[i].size;
        this.state.listData2.price = this.state.listData[i].price;
        this.state.listData2.quantity = this.state.listData[i].quantity;
        this.state.listData2.brand_name = this.state.listData[i].brand_name;
        this.state.listData2.discount = this.state.listData[i].discount;
        this.state.listData2.tax = this.state.listData[i].tax;
        this.state.listData2.shop_name = this.state.listData[i].shop_name;
        this.state.listData2.product_id = this.state.listData[i].prodId;
        this.state.listData2.review = this.state.listData[i].review;
        this.state.listData2.total = this.state.listData[i].total;
        this.state.listData2.provider_mobile_number = this.state.listData[i].provider_mobile_number;
        this.state.listData2.customer_mobile_number = this.state.listData[i].customer_mobile_number;
        this.state.listData2.delivery_address = this.state.deliver_address;
        this.state.listData2.provider_id = this.state.listData[i].provider_id;
        this.state.listData2.payment_option = this.state.payment;
        this.state.listData2.customer_email = this.state.listData[i].customer_email;
        this.state.listData2.invoice_number = Date.now();


        this.state.invoice_number = Date.now();
        console.log(this.state.invoice_number);
        
         
        // var product = Object.assign(this.state.combine, { payment_option: this.state.payment,invoice_number:this.state.invoice_number,delivered_on:this.state.delivered_on });
        // var product1=Object.assign(this.state.listData,this.state.combine)
        console.log(this.product1);
        console.log(this.state.listData.product_id)
        console.log(this.state.listData1)
        console.log(this.state.listData);
        this.state.resource.push(this.state.listData2);
         }
         for(var i=0;i<this.state.listData1.length;i++){
        axios.put("http://13.58.92.162:3000/provider/" + this.state.listData[i].provider_id, this.state.listData1[i]).then(response => {
            console.log(response);
        }).catch(error => console.log(error)
        )
    }
        for(var i=0;i<this.state.resource.length;i++){
        axios.post("http://13.58.92.162:3000/orders", this.state.resource[i]).then(response => {
            console.log(response);
        }).catch(error => console.log(error)
        )
    }
        axios.get('http://api.msg91.com/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=' + this.state.listData2.customer_mobile_number + '&authkey=243177AyunGcNGL5bc6ed47&message=' + this.state.userdata.name + ' has purchased. Total amount is ' + this.state.listData2.total, { headers: { 'crossDomain': true, } });


    }
    searchHandlers(a){
        this.state.deliver_address=a;
        console.log(this.state.deliver_address); 
        for(var i=0;i<this.state.listData.length;i++){
            this.state.listData[i].delivery_address=this.state.deliver_address;
        }
        const alert = this.props.alert.show('Delivery Address  changed', {
            // timeout: 5000 , // custom timeout just for this one alert
             type: 'success',
             position: 'top center',
             onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
             onClose: () => { } // callback that will be executed after this alert is removed
           })
        
        console.log(this.state.listData)
        localStorage.setItem("check", JSON.stringify(this.state.listData));

        this.state.view=false;
        this.setState({view:false});
       // this.scrollToMyRef();
      }


    onToken = (token) => {
        axios.post(PAYMENT_SERVER_URL,
            {
                description: "hiii",
                source: token.id & token,
                currency: CURRENCY,
                amount: ""
            })
            .then(200)
            .catch(400);
    }
    render() {
        const { rating } = this.state;
        //console.log(this.state.listData);
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            console.log("The payment was succeeded!", payment);
            this.confirmorder();
            console.log(this.confirmorder);

            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }

        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        // let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

        const client = {
            sandbox: 'AZOydPphjOEGhm-gS8iPiBdESForP9ExEeUsUXQkOg4Y_TM97VH9ZKUrpUbkt_ePXbmCEm1wVC1-2vHm',
            production: 'YOUR-PRODUCTION-APP-ID',
        }


        return (
            <div  >
                
                <div className="page-head_agile_info_w3l" >
                    <div className="container" >
                        <h3>Checkout <span>Page </span></h3>

                        <div className="services-breadcrumb">
                            <div className="agile_inner_breadcrumb">

                                <ul className="w3_short">
                                    <li><a href="/">Home</a><i>|</i></li>
                                    <li>Checkout Page </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                
               


    {this.state.userdata != undefined && this.state.listData !=undefined && this.state.listData.length !=0 ?  (
        
            
            
                <div >

                       
                <div >
                
                    {/* <!-- tittle heading --> */}
                    <h3 className="tittle-w3l">Checkout 
				<span className="heading-style">
                            <i></i>
                            <i></i>
                            <i></i>
                        </span>
                    </h3>
                    {/* <!-- //tittle heading --> */}
                    <div className="checkout-right">
                        <h4>Your shopping cart contains-
					<span>Products List</span>
                        </h4>
                        <div className="table-responsive">
                            <table className="timetable_sub">
                                <thead>
                                    <tr>
                                        <th>SL No.</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Product Name</th>

                                        <th>Price</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                {this.state.listData.map((a,index)=>     
                                <tbody>
                                
                                    <tr>
                                    {/* {console.log(a.img)} */}
                                        <td >{index+1}</td>
                                        <td className="invert-image">
                                            <a href="single2.html">
                                                <img src={a.product_image} alt=" " className="img-responsive" />
                                            </a>
                                        </td>
                                        <td className="invert">
                                            <div className="quantity">
                                                <div className="quantity-select">
                                            
                                                    <div className="entry value">
                                                        <span>{a.quantity}</span>
                                                    </div>
                                            
                                                </div>
                                            </div>
                                        </td>
                                        <td className="invert">{a.product_name}</td>
                                        <td className="invert">₹{a.price}</td>
                                        <td className="invert">
                                    
                                        
                                            <div className="rem">
                                                <div className="close1"> <button className="btn btn-danger btn-sm" onClick={() => this.Remove(a)}><i className="fa fa-trash"></i></button> </div>
                                            </div>
                    
                                        </td>
                                    </tr>
                                    
                                   </tbody>
                                    )} 
                            </table>
                        </div>
                    </div>
                    <div >
                        <div className="address_form_agile"><br/>
                            <h4>Your Delivery Address</h4>

                                <div style={{textAlign:"center"}}>
                                    
                                    <p>{this.state.listData[0].delivery_address}</p><br/>
                                </div>
                                
                                <div className="row">
                                    <div className="col-sm-6">
                                        <button data-toggle="tooltip" title="select your previous order address" className="btn btn-primary" onClick={()=>this.search()}>Select previous shipping address</button>

                                        {this.state.places2.map(a=> 
                                            <ul >
                                                {this.state.view === true? (     
                                                <li><button className="btn btn-link" onClick={(e)=>this.searchHandlers(a.delivery_address)}>{a.delivery_address}</button></li>
                                                ):([])}
                                           </ul>
                                         )}
                                    </div>

                                    <div className="col-sm-6">
                                        <button data-toggle="tooltip" title="to enter new order address" className="btn btn-primary"  onClick={() => this.addrtoggle()}>New shipping address</button>
                                       
                                        {this.state.view1 === true ? (
                                                            <div>
                                                                   <input type="search" style={{alignContent:"left"}}  placeholder="Type the  cityname.." onChange={event=>this.changeaddr(event.target.value)} value={this.state.deliver_address} />
                                                                    <button className="btn btn-success" onClick={()=>this.searchHandler(this.state.deliver_address)} >submit</button>     
                                                           </div>            
                                                    ) :([])}
                                     
                                    </div>
                                </div>

                               
                            
                            <div className="checkout-right-basket">
                                <a href="/product/payment">Make a Payment
							<span className="fa fa-hand-o-right" aria-hidden="true"></span>
                                </a>
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>
            
            ):(
             this.props.history.push('/err1')
        )}
                
        

            </div>
           

        );
    }
}
export default withAlert(CheckOut);