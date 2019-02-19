import React, { Component } from 'react';
import axios from 'axios';
import trans1 from './images/trans1.png';
import { withAlert } from 'react-alert';
class Tracking extends Component {
    constructor(props) {
      super(props);
      this.state = {
          listData1:[],
          userdata:{},
          invoice_number:0,
          status:'',
          total:'',
          listData2:[],
      }
      this.state.userdata = JSON.parse(localStorage.getItem("user"));
      console.log(this.state.userdata);
    }
    componentDidMount(){
        if(this.state.userdata!=null){
        axios.get("http://192.168.1.130:3001/orders/"+this.state.userdata.uid).then(response => {
            this.setState({ listData1: response.data });
            this.state.listData1=response.data;
            console.log(this.state.listData1)
          })
        }
      
    }
 async   cancel(a){
        console.log(a);
        let arr=new Array();
        arr.push(a);
        console.log(arr);
        arr[0].order_status="cancelled";
        await axios.put("http://192.168.1.130:3001/orders/" +arr[0].order_id,arr[0]).then(response => {
            console.log(response);
            console.log(Object.keys(response));
            

        }).catch(error => console.log(error)
        )
        const alert = this.props.alert.show('Your order cancelled successfully', {
            // timeout: 5000 , // custom timeout just for this one alert
             type: 'success',
             position: 'top center',
             onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
             onClose: () => { this.props.history.push('/track')} // callback that will be executed after this alert is removed
           })
           
    }
    track() {
        console.log(this.state.invoice_number)
        for(var i=0;i<this.state.listData1.length;i++) {
            if(this.state.invoice_number === this.state.listData1[i].invoice_number) {
                // this.setState({status:this.state.listData1[i].order_status});
                // this.state.status=this.state.listData1[i].order_status
               // this.setstate({item:this.state.listData1[i]});
                // this.state.item=this.state.listData1[i];
               // this.setstate({item:this.state.item})
                                //console.log(this.state.status);
                                this.state.total=this.state.listData1[i].total;
                                this.state.listData2.push(this.state.listData1[i]);
            } else {
                    console.log("no match");
            }
        }
        this.setState({listData2:this.state.listData2});
        console.log(this.state.listData2);
    }
    render(){
        return(
            <div>
                                <div className="page-head_agile_info_w3l" >
                    <div className="container" >
                        <h3>Tracking <span>Page </span></h3>

                        <div className="services-breadcrumb">
                            <div className="agile_inner_breadcrumb">

                                <ul className="w3_short">
                                    <li><a href="/">Home</a><i>|</i></li>
                                    <li>Tracking Page </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

               
                          <div style={{fontFamily:"Fantasy"}}>

             <br/>   <input type="text" onChange={event=> this.setState({invoice_number:event.target.value})} />
                {/* {console.log(this.state.invoice_number)} */}
                <button className="btn btn-outline-info btn-xs" onClick={() => this.track()}> Track </button>
                {this.state.listData2!=undefined?( <div>{this.state.listData2.map(a=> 
                  <div style={{backgroundImage: "url(http://funkyimg.com/i/2PAPf.png)",fontFamily:"Fantasy", alignContent:"center"} }>
               
                    <h1 style={{fontFamily:"Fantasy"}} >YOUR ORDER IS:</h1> 
                    <h4 style={{fontFamily:"Fantasy"}}>{a.order_status}</h4>
                    <h3 style={{fontFamily:"Fantasy"}}>ORDER ID:{a.order_id}</h3>
                     <h3 style={{fontFamily:"Fantasy"}}>DETAILS BELOW:</h3>
                    <br/>
                    <h2 style={{fontFamily:"Fantasy"}}>THE ITEM IS:{a.product_name}& PRICE:{a.price}</h2><br/>{a.order_status!="cancelled"?(<div><img src={require('./images/hand.gif')}  height="40%" width="50%" style={{width:"6%"}} /><span style={{color:"blue",textTransform:"uppercase"}}>!! if u wish to cancel the order click the below button to cancel u r order !!</span><br/><button className="btn btn-danger" onClick={()=>this.cancel(a)}>cancel order</button></div>):([])}<br/><br/><br/><br/><br/>
                    
                </div>)}</div>
                ):
                []}
                </div>
            </div>
        )
    }
}
export default withAlert(Tracking);