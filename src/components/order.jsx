import React, { Component } from 'react';
import axios from 'axios';
import { withAlert } from 'react-alert';
import './order.css'
import StarRatingComponent from 'react-star-rating-component';
function searchingfor(term) {
    return function (x) {
      return x.size===term || !term;
    }
  }

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            listData1: [],
            listData2:[],
            available:[],
            combine: [],
            combine2:[],
            provider:[],
            count: 0,
            index2:0,
            showsize:false,
            oldcount:0,
            selected_provider:[],
            product_quantity:0,
            quantitySeleceted: 0,
            Productdata:[],
            Userdata:{
                     "BrandName": [],
                    "Id1": [],
                    "available": [],
                    "createdAt": [],
                    "cust_id": [],
                    "customer_email": [],
                    "customer_mobile_number": [],
                    "delivery_address": [],
                    "discount": [],
                    "img": [],
                    "longDesc": [],
                    "name": [],
                    "order_status": [],
                    "payment_option": [],
                    "price": [],
                    "prodCategory": [],
                    "prodId": [],
                    "provider_id":[],
                    "provider_mobile_number": [],
                    "quantity": [],
                    "rating": [],
                    "review": [],
                    "shopCategory": [],
                    "shopName": [],
                    "shortDesc": [],
                    "size": [],
                    "sku": [],
                    "tax": [],
                    "total": [],
                    "updatedAt": []
            }, 
            rating: 3,
            userdata: JSON.parse(localStorage.getItem("user")),
            combine3:{},
            combine1: [],
            orders:{},
            indexOf:0,
            Productdata1:[],
            provider1:[],
            color:"BLUE",
            size:"",
            select:"false",
            open:1,
            getdata:{},
            colors:[],
            colors1:[],
            color1:[],

        }
        this.state.combine = JSON.parse(localStorage.getItem("manoj"));
        this.state.listData2=JSON.parse(localStorage.getItem("selected"));
        this.state.provider1=JSON.parse(localStorage.getItem("provider"));
        console.log(this.state.provider1);
        console.log(this.state.combine);
        if(this.state.provider1 != null ){
            this.state.provider=this.state.provider1;
        }
        console.log(this.state.provider)
        this.state.Productdata1 = JSON.parse(localStorage.getItem("final"));
        if(this.state.Productdata1 != null) {
            this.state.Productdata = this.state.Productdata1;
        } else {
            this.state.Productdata=[];
        }
        console.log(this.state.Productdata);
          console.log(this.state.combine);
          if(this.state.combine != null){
         this.state.combine2[0]=this.state.combine[this.state.combine.length-1];
          }
         console.log(this.state.combine2)
         // console.log(this.state.combine2[0].cust_id);
          console.log(this.state.orders)
       // console.log(this.state.listData);
      //    console.log(this.state.combine[0].prodId)
         this.add=this.add.bind(this);
         this.del=this.del.bind(this);
         this.buy=this.buy.bind(this);
         this.align=this.align.bind(this);  

         var index=null;
         var provider_id=null;
          // this.state.indexof=this.state.listData[0].prodId.indexOf(this.state.combine[0].prodId);
          // console.log(this.state.indexof)
      }
   async   componentDidMount(){
          window.scrollTo(0,0)
        //   console.log(this.state.listData2);
          if(this.state.listData2 != null ){
          for(var i=0;i<this.state.listData2.length;i++){
            var k=this.state.listData2[i].prodId.indexOf(this.state.combine2[0].prodId);
             if(this.state.combine2[0].prodId==this.state.listData2[i].prodId[k]){
                this.state.available.push(this.state.listData2[i]); 
             } 
          }
          this.setState({available:this.state.available});
          await  this.align();
            console.log(this.state.available)
        }
    }
    async align(){
        for(var i=0;i<this.state.available.length;i++){
        await axios.get("http://192.168.1.130:3001/items/"+this.state.available[i].provider_id).then(response => {
           
        if(response.data.length!=0){
            this.state.getdata=response.data;
           var rv={};
           for(var j=0;j<this.state.getdata.length;j++){
            rv=this.state.getdata[j];
            this.state.listData.push(rv);
               // this.state.listData.push(this.state.getdata);
           }
           
            }
            
            //console.log(this.state.listData);
        })
        
    }
     console.log(this.state.listData); 
     this.setState({listData:this.state.listData})
    }
    // async get() {
    //     if (this.state.combine != undefined) {
    //         this.state.combine.map(a => {
    //             console.log(a.prodId)
    //             axios.get("http://192.168.1.147:3001/provider/" + a.prodId).then(response => {
    //                 this.setState({ listData: response.data });
    //                 console.log(a.prodId)
    //                 console.log(this.state.listData);
    //                 //this.join2();
    //             })
    //         })
    //     }
    //     else {

    //     }

    // }
    // join() {
    //     console.log(this.state.listData);
    //     console.log(this.state.listData1);
    //     this.state.listData.map(ld => {
    //         this.state.listData1.map(ld1 => {
    //             if (ld.shopName == ld1.shopname) {
    //                 this.state.combine.push(Object.assign({}, ld, ld1, { quantity: 0 }));
    //             }
    //         })
    //     })
      
    //     console.log(this.state.combine);
    //     this.setState(this.state.combine);


       
    // }
    // async join2() {

    //     var response = await axios.get("http://13.58.92.162:3000/products") 
    //     this.setState({ listData: await response.data });
    //     console.log(this.state.listData)


    //     this.join();
    // }
    add(pid) {
       // console.log(  (this.state.combine2[0].prodId === this.state.listData[i].prodId&&this.state.size===this.state.listData[i].size));
        if (this.provider_id != undefined) {
            for (var i = 0; i < this.state.listData.length; i++) {
                console.log(  (this.state.combine2[0].provider_id===this.state.listData[i].provider_id&&this.state.size===this.state.listData[i].size));
                if (this.state.combine2[0].prodId === this.state.listData[i].prodId&&this.state.size===this.state.listData[i].size) {
                    if (this.state.listData[i].available[this.index] != 0) {
                        console.log(this.state.combine2[0].quantity)
                        this.state.combine2[0].quantity = this.state.combine2[0].quantity + 1;
                        this.state.combine2[0].total = this.state.combine2[0].quantity * this.state.listData[i].price[this.index];
                        this.state.combine3.available[this.index] = this.state.combine3.available[this.index] - 1;
                        this.setState(this.state.combine2);
                        console.log(this.state.combine2[0].quantity);
                    }
                    else {
                        const alert = this.props.alert.error('out of stock', {
                            // timeout: 5000 , // custom timeout just for this one alert
                             type: 'success',
                             position: 'top center',
                             onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
                             onClose: () => {} // callback that will be executed after this alert is removed
                           })
            
                    }
                }
            }
        } else {
            const alert = this.props.alert.error('select provider first', {
                // timeout: 5000 , // custom timeout just for this one alert
                 type: 'success',
                 position: 'top center',
                 onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
                 onClose: () => {} // callback that will be executed after this alert is removed
               })
       }
    }
   
    del(pid){
        if(this.provider_id!=undefined){
            for(var i=0;i<this.state.listData.length;i++)
            {
                
                if(this.state.combine2[0].prodId===this.state.listData[i].prodId&&this.state.size===this.state.listData[i].size){
    
                    if(this.state.combine2[0].quantity>0){
                        console.log(this.state.combine2[0].quantity);
                        this.state.combine2[0].quantity=this.state.combine2[0].quantity-1;
                        this.state.combine2[0].total=this.state.combine2[0].quantity*this.state.listData[i].price[this.index];
                        this.state.combine3.available[this.index]=this.state.combine3.available[this.index]+1;
                        console.log( this.state.combine3.available[this.index]);
                        this.setState(this.state.combine2);
                        console.log(this.state.combine2);
                        }
                    else{
                    
                        const alert = this.props.alert.error('select a  valid quantity', {
                            // timeout: 5000 , // custom timeout just for this one alert
                             type: 'success',
                             position: 'top center',
                             onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
                             onClose: () => {} // callback that will be executed after this alert is removed
                           })
        
                    }
                }
            }
        }else{
            
            const alert = this.props.alert.show('select provider first', {
                // timeout: 5000 , // custom timeout just for this one alert
                 type: 'success',
                 position: 'top center',
                 onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
                 onClose: () => {} // callback that will be executed after this alert is removed
               })

        }
      }
      oldstate(a){
       if(this.state.combine2[0].quantity!=0){ 
      this.state.combine3.available[this.index]=this.state.combine3.available[this.index]+this.state.combine2[0].quantity;
      this.state.combine2[0].quantity=1;
       }
       else{
        this.state.combine3.available[this.index]=this.state.combine3.available[this.index]+1;  
       }
      }
      selectprovider(a, b) {
        // console.log(a);
        // console.log(a.product_name);
        this.state.oldcount=this.state.oldcount+1;
        if(this.state.oldcount>1){
            this.oldstate();
        }
        this.state.select="true";
         console.log(a.provider_id);
        this.provider_id = a.provider_id;
        
       // this.index = a.indexOf;
        this.index=a.color.indexOf(this.state.color);
        
       // a.prodId.indexOf(this.state.combine2[0].prodId);
        console.log(this.index);
        
        
        // this.moreByProvider();
        // console.log(this.state.moreByProvider);
        this.state.selected_provider=a;
        this.state.combine3 = Object.assign(this.state.combine3, a);
        this.state.combine=Object.assign(this.state.combine3,{index:this.index})
        this.state.combine3=Object.assign(this.state.combine3,{provider_mobile_number:b.provider_mobile_number,provider_name:b.provider_name,provider_address:b.provider_address,})
        this.state.combine3.available[this.index] = this.state.combine3.available[this.index] - 1;
        this.setState({ combine3: this.state.combine3 });
        console.log(this.provider_id)
        console.log(this.state.combine3)
        this.setState({product_id:a.product_id});
        this.state.combine1.push(this.state.combine3);
        // console.log(((this.state.orders.quantity) && (this.state.orders.product_id === this.state.product_id) && (this.state.orders.provider_id === this.state.provider_id)));
        console.log(a);
        
        // this.state.combine1.available[this.index] = this.state.combine1.available[this.index] - this.state.combine[0].quantity;
        // console.log(this.state.combine1)
    }
   
    // moreByProvider(){
    //     console.log(this.state.selected_provider.provider_id);
    // }
   
    //add cart
    // addCart(p, i) {
    //     //let a = this.state.cartShow[i] = true;
    //     //console.log(p);
    //     this.state.selected_provider=p;
    //     this.moreByProvider();
    //     console.log(this.state.selected_provider);
    //     this.setState({ indexOf: p.indexOf });
    //     this.setState({ price: p.price[p.indexOf] });
    //     this.setState({ provider_address: p.provider_address });
    //     this.setState({available:p.available[p.indexOf]});
    //     this.setState({provider_mobile_number:p.provider_mobile_number});
    //     // var price=this.state.p[0].price
    //     // this.setState({price:price})
    //     this.setState({ i: i });
    //     //this.setState({ a });
    //     this.setState({ modalShow: true });
    //     this.moreByProvider();
    //     //alert(id + ' ' +id1);
    //     console.log(this.state.cart.quantity[this.state.i]);
    //     console.log("cart ",this.state.cart.food_id[this.state.i]);
    //     console.log("porduct id ", this.state.food_id);
    //     console.log("cart provider id ",this.state.cart.provider_id);
    //     console.log("provider id ",this.state.provider_id);
    //     console.log(((this.state.cart.quantity[this.state.i]) && (this.state.cart.food_id[this.state.i] === this.state.food_id) && (this.state.cart.provider_id[this.state.i] === this.state.provider_id)));
    // }
    setsize(a,c){
        this.state.index2=c;
        this.state.showsize=true;
        this.state.size=a;
        this.state.combine2[0].size=a;
        this.state.color1=this.state.listData.filter(searchingfor(this.state.size));
        for(var i=0;i<this.state.color1.length;i++){
           for(var j=0;j<this.state.color1[i].color.length;j++){ 
        this.state.colors1.push(this.state.color1[i].color[j]);
           }
        }
        var set = new Set(this.state.colors1);
        this.state.colors=Array.from(set);
        console.log(this.state.colors);
        this.setState({combine2:this.state.combine2});
    }
    setcolor(b){
        // this.state.index2=a;
    
         
        this.state.color=b;
       console.log(this.state.color);
       
     this.setState({color:this.state.color});
    }
    buy() {
        if(this.state.combine2.length!=0 && this.state.userdata!=undefined && this.state.select=="true"){
            if(this.state.showsize==true){
            if(this.state.combine2[0].quantity!=0){
          console.log(this.state.combine3)  
        console.log(typeof(this.state.provider))
         this.state.provider.push(this.state.combine3);
         //this.setstate({provider:this.state.provider});
                  console.log(this.state.provider)
        localStorage.setItem("provider", JSON.stringify(this.state.provider));
        var i=this.state.i;
            console.log(this.state.combine2[0])
        
         // var product1 = Object.assign(this.state.orders, {cust_id:this.state.userdata.uid,product_name:this.state.combine2[0].name,product_image:this.state.combine2[0].img,product_category:this.state.combine2[0].prodCategory,shop_category:this.state.combine2[0].shopCategory,rating:this.state.combine2[0].rating,size:this.state.combine2[0].size,color:this.state.color,price:this.state.combine3.price[this.state.combine3.index],quantity:this.state.combine2[0].quantity,brand_name:this.state.combine2[0].BrandName,discount:this.state.combine2[0].discount,tax:this.state.combine2[0].tax,shop_name:this.state.combine1.provider_name,product_id:this.state.combine2[0].prodId,review:this.state.combine2[0].review,total:this.state.combine2[0].total}   );
         var product1 = Object.assign(this.state.orders, {cust_id:this.state.userdata.uid,product_name:this.state.combine2[0].name,product_image:this.state.combine2[0].img,product_category:this.state.combine2[0].prodCategory,shop_category:this.state.combine2[0].shopCategory,rating:this.state.combine2[0].rating,size:this.state.size,color:this.state.color,price:this.state.combine3.price[this.index],quantity:this.state.combine2[0].quantity,brand_name:this.state.combine2[0].BrandName,discount:this.state.combine2[0].discount,tax:this.state.combine2[0].tax,shop_name:this.state.combine3.provider_name,product_id:this.state.combine2[0].prodId,review:this.state.combine2[0].review,total:this.state.combine2[0].total}   );

        console.log(this.state.orders)
                // this.state.orders.cust_id = this.state.userdata.uid,
                // this.state.orders.product_name = this.state.combine2[0].name,
                // this.state.orders.product_image = this.state.combine2[0].img,
                // this.state.orders.product_category = this.state.combine2[0].prodCategory,
                // this.state.orders.shop_category = this.state.combine2[0].shopCategory,
                // this.state.orders.rating = this.state.combine2[0].rating,
                // this.state.orders.size = this.state.combine2[0].size,
                // this.state.orders.price = this.state.combine2[0].price,
                // this.state.orders.quantity = this.state.combine2[0].quantity,
                // this.state.orders.brand_name = this.state.combine2[0].BrandName,
                // this.state.orders.discount = this.state.combine2[0].discount,
                // this.state.orders.tax = this.state.combine2[0].tax,
                // this.state.orders.shop_name = this.state.combine2[0].shopname,
                // this.state.orders.product_id = this.state.combine2[0].prodId,
                // this.state.orders.review = this.state.combine2[0].review,
                // this.state.orders.total = this.state.combine2[0].total,
                var product = Object.assign(this.state.orders,  {order_status:"placed"} );
                // var product = Object.assign(this.state.orders,   this.state.combine2[0] );
                // this.state.orders.provider_mobile_number = this.state.combine1.provider_mobile_number,
                // this.state.orders.customer_mobile_number = this.state.userdata.phno,
                // this.state.orders.delivery_address = this.state.userdata.address,
                // this.state.orders.provider_id = this.provider_id,
                // this.state.orders.payment_option = "online",
                // this.state.orders.customer_email = this.state.userdata.email,
                // this.state.userData.push(this.state.orders);;   
                var product2 = Object.assign(this.state.orders,{provider_mobile_number:this.state.combine3.provider_mobile_number,provider_address:this.state.combine3.provider_address,customer_mobile_number:this.state.userdata.phno,delivery_address:this.state.userdata.address,provider_id:this.state.combine3.provider_id,payment_option:"online",customer_email:this.state.userdata.email,item_id:this.state.combine3.item_id}    );
                console.log(this.state.orders);
                var name= this.state.orders.BrandName;
                console.log(this.state.Userdata)
                //this.state.Userdata.BrandName.push(name);
             this.state.Productdata.push(this.state.orders);
                // var pro=Object.assign(this.state.userData,this.state.orders)
        console.log(this.state.Productdata)
        localStorage.setItem("final", JSON.stringify(this.state.Productdata));
        localStorage.setItem("orders",JSON.stringify(this.state.orders));
        window.location.reload(true);
        this.props.history.push("/cart");
        console.log(this.state.orders);
            }
            else{
                const alert = this.props.alert.show('pls select a valid quantity', {
                    // timeout: 5000 , // custom timeout just for this one alert
                     type: 'success',
                     position: 'top center',
                     onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
                     onClose: () => { } // callback that will be executed after this alert is removed
                   })
                   
            }
    }
    else{
        const alert = this.props.alert.show('pls select a Size for u r product', {
            // timeout: 5000 , // custom timeout just for this one alert
             type: 'success',
             position: 'top center',
             onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
             onClose: () => {window.location.reload(true) } // callback that will be executed after this alert is removed
           })
           
    }
    }
        else{
            const alert = this.props.alert.show('pls select provider first', {
                // timeout: 5000 , // custom timeout just for this one alert
                 type: 'success',
                 position: 'top center',
                 onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
                 onClose: () => { } // callback that will be executed after this alert is removed
               })

        }
    
}
    // onStarClick(nextValue, prevValue, name) {
    //     this.setState({rating: nextValue});
    //   }
    render() {
        const { rating } = this.state;
        return (
            <div>
                <div className="page-head_agile_info_w3l">
          <div className="container">
            <h3>Order <span>Page  </span></h3>

            <div className="services-breadcrumb">
              <div className="agile_inner_breadcrumb">

                <ul className="w3_short">
                  <li><a href="/">Home</a><i>|</i></li>
                  <li>Order Page</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
                {/* {this.state.listData2.length!=null?( */}
                <div>
            {this.state.combine2 == undefined ? (alert("pls signin first")) : (
                    <div className="container">{console.log(this.state.combine2)}
                        {this.state.combine2.map((a,index) =>
                        
                            <div className="card" key={index}>
                                <div className="container-fliud">
                                    <div className=" row">

                                        <div className="preview col-md-6">

                                            <div className="preview-pic tab-content">
                                                <div className="tab-pane active" id="pic-1"><img src={a.img} style={{ width: "250px", height: "252px" }} /></div>
                                                <div className="tab-pane" id="pic-2"><img src={a.img} style={{ width: "250px", height: "252px" }} /></div>
                                                <div className="tab-pane" id="pic-3"><img src={a.img1} style={{ width: "250px", height: "252px" }} /></div>
                                                <div className="tab-pane" id="pic-4"><img src={a.img2} style={{ width: "250px", height: "252px" }} /></div>
                                                <div className="tab-pane" id="pic-5"><img src={a.img3} style={{ width: "250px", height: "252px" }} /></div>
                                            </div>
                                            <br/><br/>
                                            <ul className="preview-thumbnail nav nav-tabs">
                                                <li className="active"><a data-target="#pic-1" data-toggle="tab"><img src={a.img} style={{ width: "170px", height: "60px" }}/></a></li>
                                                <li><a data-target="#pic-2" data-toggle="tab"><img src={a.img} style={{ width: "170px", height: "60px" }}/></a></li>
                                                <li><a data-target="#pic-3" data-toggle="tab"><img src={a.img1} style={{ width: "170px", height: "60px" }} /></a></li>
                                                <li><a data-target="#pic-4" data-toggle="tab"><img src={a.img2} style={{ width: "170px", height: "60px" }} /></a></li>
                                                <li><a data-target="#pic-5" data-toggle="tab"><img src={a.img3} style={{ width: "170px", height: "60px" }} /></a></li>
                                            </ul>
                                        </div>
                                        <div className="details col-md-6">
                                            <h3 className="product-title">{a.name}</h3>
                                            <div className="rating">
                                            <div className="start">
                                            {/* <h2>Rating from state: {a.rating}</h2> */}
                                                    <StarRatingComponent
                                                        name="rate2"
                                                        editing={false}
                                                        renderStarIcon={() => <span><i className="fa fa-star" aria-hidden="true"></i></span>}
                                                        starCount={5}
                                                        value={a.rating}
                                                    />
                                            </div>
                                                <span className="review-no">41 reviews</span>
                                            </div>
                                            <p className="product-description">'To adapt a phrase from Le Corbusier, the suit is a machine for living in, close-fitting but comfortable armour, constantly revised and reinvented to be, literally, well suited for modern daily life.</p>
                                    
                                            <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
                                           
                                          
                                            <h5 className="sizes" >PREFER YOUR SIZE:<br/>
                                            <img src={require('./images/hand.gif')}  height="40px" width="50px" style={{width:"8%"}} /><span style={{color:"green"}}>!! first select Your Size then choose color !!</span>
                                            <div className="dropdown">
    <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">{this.state.size}
    <span className="caret"></span></button>
    <ul className="dropdown-menu">
      <li><a  className="btn btn-default dropdown-item"  onClick={(e)=>this.setsize("S")}>S</a></li>
      <li><a className="btn btn-default dropdown-item" onClick={(e)=>this.setsize("M")}>M</a></li>
      <li><a className=" btn btn-default dropdown-item"  onClick={(e)=>this.setsize("L")}>L</a></li>

      <li><a className=" btn btn-default dropdown-item"  onClick={(e)=>this.setsize("XL")}>XL</a></li>
    </ul>
  </div>
  


                                            </h5>
                                            <h5 className="colors">PREFER YOUR COLOR:
                                            {this.state.colors.map((a,index4)=> 
                                            <div style={{textAlign:"justify",marginLeft:"15vw"}} key={index4}>
                                 <input type="radio" name="Radio1" id={index}  onChange={() => this.setcolor(a)} />{a}
                                          </div>
                                            )}
                                                         
       </h5> &nbsp;
                                            <div className="columns" >
                                                <span className="input-btn ">
                                                    <button type="button" className="btn btn-default btn-number" data-type="plus" data-field="quant[1] " onClick={() => this.add(a.Id1)}>
                                                        <span className="glyphicon-plus"></span>
                                                    </button>&nbsp;
                                                </span>  {a.quantity} 
                                                <span className="input-btn">&nbsp;&nbsp;
                                                    <button type="button" className="btn btn-danger btn-number" data-type="minus" data-field="quant[2]" onClick={() => this.del(a.Id1)}>
                                                        <span className=" glyphicon-minus"></span>
                                                    </button>
                                                </span>
                                            </div>  &nbsp;
                                            <div className="action ">
                                                <button className="add-to-cart btn btn-default" type="button" onClick={() => this.buy()}> Shop Now</button>&nbsp;
                                             {/* <button className="like btn btn-default" type="button" onClick={() => this.addCart()}><span className="fa fa-heart"></span></button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="card mb-2 table-responsive">
                        <img src={require('./images/hand.gif')}  height="40px" width="50px" style={{width:"6%"}} /><span style={{color:"blue",textTransform:"uppercase"}}>!!  select the anyone of the provider from the below table  that u wish !!</span>
                            <table className=" table table-bordered" style={{align:"center",margin:"auto"}}  >
                                <thead >
                                    <tr>
                                        <th >#</th>   
                                        <th>Price</th>
                                        <th>Provider name</th>
                                        <th>color</th>
                                        <th>Available</th>
                                        <th>Provider Address</th>
                                    </tr>
                                </thead>
                                {console.log(this.state.listData)}
                                {this.state.available.map((b,index4)=>
                                
         this.state.listData.filter(searchingfor(this.state.size)).map((a,index)=>                        
                                <tbody id="myTable" key={index}>
                                
                                   
                                    
                                     
                                         {b.provider_id==a.provider_id?(
                                        <tr>
                                            <td> <input type="radio" name="Radio" id={b.product_id} onChange={() => this.selectprovider(a, b)} /></td>
                                            <td>₹{a.price[a.color.indexOf(this.state.color)]}</td>
                                            
                                            <td>{b.provider_name}</td>
                                            <td>{a.color[a.color.indexOf(this.state.color)]}</td>
                                            <td>{a.available[a.color.indexOf(this.state.color)]}</td>
                                            <td>{b.provider_address}</td>
                                        </tr>):([])}
                                    
                                </tbody>))}
                            </table>
                        </div>
                     

                    </div>
                )}
            </div>
            
            
            </div>

        )
    }


}
export default withAlert(Order);