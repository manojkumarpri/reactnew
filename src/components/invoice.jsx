import React, { Component } from 'react';
import QRCode from 'qrcode.react';


class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData:[],
            listData2:[],
            listData1:[],
            userdata: JSON.parse(localStorage.getItem("user")),
            date:0,
            path:'',
            pro:new Set()
        }
        this.state.listData = JSON.parse(localStorage.getItem("invoice"));
        // this.state.listData1=this.state.listData;
         this.state.listData.map((m)=>{
            this.state.pro.add(m.invoice_number);
         })
         console.log(this.state.pro);
        this.state.listData1= this.filterfun();
         // var man=new Set(this.state.listData2);
        // var man1=Array.from(man);
        // this.state.listData1=man1;
        // console.log(man1);
        console.log(this.state.listData1)
        console.log(this.state.listData);
        var today = new Date();
        this.state.date=today.getFullYear() + '-' + (today.getMonth() +1) + '-' + today.getDate();
        console.log(this.state.date) 

console.log(this.state.listData)
    }
    filterfun(){
        let arr=new Array(this.state.pro.size);
        // arr.map((a,i)=>{arr[i]=new Array();})
        Array.from(this.state.pro).map((a,i)=>{
            arr[i]=new Array();
            this.state.listData.map((b)=>{

                if(b.invoice_number==a){
                    console.log(arr,b.invoice_number==a);
                    arr[i].push(b);
                }
            })

            
        });
        return arr;

    }
    componentWillMount(){
        window.scrollTo(0,0)
        if (typeof window !== 'undefined') {
            this.state.path = window.location.protocol + '//' + "103.207.1.123:3002"+ '/product/qr?in='; // (or whatever)
            console.log(this.state.path)
            this.setState({path:this.state.path}); 
        } 
             }
            
    render(){
        return(
            <div className="container">
                 <div className="page-head_agile_info_w3l" >
                    <div >
                        <h3>Invoice <span>Page </span></h3>

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
                {this.state.listData1!=undefined && this.state.listData1!=null && this.state.listData1!=[] ? (
                 <div style={{backgroundColor:"#DBE6DD"}}>{this.state.listData1.map((b,i)=>
                      
                
                            <div  >
                                
                            {b.length!=0?(
   <div >
       {/* {console.log(b.price[b.price.indexOf(a.prodId)])} */}
                                <div class="card-header" ><h2 style={{textAlign:"left",marginLeft:"25px",color:"#EF6F3B",fontFamily: "Fantasy"}}>{b[0].shop_name}</h2><p style={{textAlign:"left",marginLeft:"25px",fontFamily: "Fantasy ",fontSize:"18px"}}>{b[0].provider_mobile_number},</p><p style={{textAlign:"left",marginLeft:"25px",fontFamily:"Fantasy ",fontSize:"20px"}}>{b[0].provider_address}</p><p style={{textAlign:"right",marginRight:"25px",fontFamily: "Fantasy",fontSize:"20px",color:"#F1A484"}}>{this.state.userdata.name}</p><p style={{textAlign:"right",marginRight:"25px",fontFamily:"Fantasy ",fontSize:"18px"}}>{b[0].delivery_address}<br/>{this.state.userdata.phno}</p></div><br/>
    <div class="card-body" style={{fontFamily:"Arial Black"}}>                     
        <div><br/>
        <p style={{textAlign:"left",marginLeft:"25px",fontFamily:"fantasy"}}>INVOICE NUMBER:{b[0].invoice_number}</p><p style={{textAlign:"left",marginLeft:"25px",fontFamily:"fantasy"}}>DATE ISSUED:{this.state.date }</p>
    <div    className="card mb-2 table-responsive">
        <table className=" table table-bordered" style={{align:"center",margin:"auto"}}>
  <thead>
    <tr>
      <th scope="col">DESCRIPTION</th>
      <th scope="col">PRICE</th>
      <th scope="col">QTY</th>
      <th scope="col">{b[0].price>=1120?("GST(CGST(6%)+SGST(6%))"):(["GST(CGST(2.5%)+SGST(2.5%))"])}</th>
      <th scope="col">TOTAL</th>
    </tr>
  </thead>
  <tbody>{b.map(c=>
    <tr>
      <td >{c.product_name}</td>
      <td>{c.price>1120?(c.price-(((c.price/(100+12))*12).toFixed(2))):([c.price-(((c.price/(100+5))*5).toFixed(2))])}</td>
     
      <td>{c.quantity}</td>
      <td>{c.price>1120?(((c.price/(100+12))*12).toFixed(2)):([((c.price/(100+5))*5).toFixed(2),])}</td>
      <td>{(c.price*c.quantity)}</td>
    </tr>
  )}</tbody>
</table>{console.log(this.state.path+b[0].invoice_number)}


</div><br/>
<QRCode value={this.state.path+b[0].invoice_number} style={{textAlign:"left"}}/>


        </div> 
            </div>                  
                       
                </div>):([]
                                    )}</div>)}
                <div style={{minHeight:"100px",backgroundColor:"#EF6F3B",fontFamily:"Fantasy"}}><br/>
                <h2>TOTAL(INCLUDING GST)<br/><i class="fas fa-rupee-sign">{this.state.listData[0].total}</i><br/> </h2>© 2009 - 2018 Digital Marketing & Telecommunication
               

                </div>

                </div>
        )
    :([])}
    </div>
        )  
}
}
export default Invoice;
