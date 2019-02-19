import React, { Component } from 'react';
import './cart.css';
import './payment.css';
import StarRatingComponent from 'react-star-rating-component';
import { withAlert } from 'react-alert';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      combine1: [],
      combine: [],
      listData1:[],
      listData:[],
      rating: 5,
      check:[],
      check1:[],
      show:false,
      provider:[],
      profinal:[],
    }
    // this.get=this.get.bind(this);
    this.state.combine = JSON.parse(localStorage.getItem("final"));
    this.state.show = JSON.parse(localStorage.getItem("show"));
    console.log(this.state.combine);
    // this.setState({combine:this.state.combine})
    this.state.check1=JSON.parse(localStorage.getItem("check"));
    this.state.provider=JSON.parse(localStorage.getItem("provider"));
    console.log(this.state.provider)
    if(this.state.check1!=null){
      this.state.check=this.state.check1;
    }
    else{
      this.state.check=[];
    }

    
  }
  componentDidMount(){
    window.scrollTo(0,0)

  }
  show(a) {
    console.log(a);
    const alert = this.props.alert.show('Your cart is Empty', {
      // timeout: 5000 , // custom timeout just for this one alert
       type: 'success',
       position: 'top center',
       onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
       onClose: () => { this.props.history.push('/')} // callback that will be executed after this alert is removed
     })
     
  }

  
  Remove(id) {
    //alert("hai")
    // localStorage.setItem("final");
    console.log(this.state.provider);
    for(var j=0;j<this.state.provider.length;j++){
      if(this.state.provider[j].prodId==id){
          this.state.provider.splice(j,1);
      }
  }
  console.log(this.state.provider);
  localStorage.setItem("provider",JSON.stringify(this.state.provider))
  console.log(this.state.combine)
    for(var i=0;i<this.state.combine.length;i++){
      if(this.state.combine[i].product_id==id){
        this.state.combine.splice(i, 1);
      }
    }
    localStorage.setItem("final", JSON.stringify(this.state.combine));
console.log(this.state.combine)
     window.location.reload();
     this.props.history.push("/cart");
  }
  Reload(){
    window.location.reload();
  }
  checkout(a){
    console.log(a)
    this.state.show=true;
    localStorage.setItem("show", JSON.stringify(this.state.show));
    for(var j=0;j<this.state.provider.length;j++){
      if(this.state.provider[j].item_id==a.item_id){
          this.state.profinal.push(this.state.provider[j]);
      }
  }
  console.log(this.state.profinal)
  localStorage.setItem("providerf", JSON.stringify(this.state.profinal));
    this.state.check.push(a);
    localStorage.setItem("check", JSON.stringify(this.state.check));
    console.log(this.state.combine);

    for(var i=0;i<this.state.combine.length;i++){
      if(this.state.combine[i].item_id==a.item_id && this.state.combine[i].color==a.color){
        this.state.combine.splice(i, 1);
      }
    }
    console.log(this.state.combine);
    this.setState({show:this.state.show});
    localStorage.setItem("final", JSON.stringify(this.state.combine));
    if(this.state.combine.length==0){
      this.props.history.push("/checkout");
      window.location.reload();
    }
      // window.location.reload();
    //  this.props.history.push("/cart");


   // this.props.history.push("/checkout");

  }
  checkout1(){
    this.props.history.push("/checkout");
  }
  
  // onStarClick(nextValue, prevValue, name) {
  //   this.setState({rating: nextValue});
  //  }



  //    this.setState({combine1:localStorage.getItem("manoj")});

  render() {
    
    const { rating } = this.state;

    
    
    console.log((this.state.combine));
    if (this.state.combine == []) {
      console.log('alling get');
    }
    return (
      <div>
        <div className="page-head_agile_info_w3l">
          <div className="container">
            <h3>Cart <span>Page  </span></h3>

            <div className="services-breadcrumb">
              <div className="agile_inner_breadcrumb">

                <ul className="w3_short">
                  <li><a href="/product">Home</a><i>|</i></li>
                  <li>Cart Page</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
        <br/>
        <div> {this.state.combine!=undefined  && this.state.combine!=null && this.state.combine.length!=0 ?(
         <div>
        <div className="container table-responsive">
       {this.state.combine.map((a,index) =>
       <div>
        <hr/>
               
        
          <table id="cart" className="card mb-2 table-responsive" key={index}>
            <thead>
              <tr>
                <th style={{ width: "50%" }}>Product</th>
                <th style={{ width: "10%" }}>Price</th>
                <th style={{ width: "8%"  }}>Quantity</th>
                <th style={{ width: "22%" }} className="text-center">Subtotal</th>
                <th style={{ width: "10%" }}></th>
              </tr>
            </thead>
           
            <tbody>
              <tr>
                <td data-th="Product">
                  <div className="row">
                    <div className="col-sm-2  hidden-xs">
                    <img src={a.product_image} alt="..." className="img-responsive" />
                    </div>
                    <div className="col-sm-10">
                      <h4 className="nomargin">{a.name}</h4>
                        <StarRatingComponent
                          name="rate2"
                          editing={false}
                          renderStarIcon={() => <span><i className="fa fa-star" aria-hidden="true"></i></span>}
                          starCount={5}
                          value={a.rating}
                        />
                      <p>Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                </td>
                <td data-th="Price"> Rs.{a.price}</td>
                <td data-th="Quantity">
                  {/* <input type="number" className="form-control text-center" value={a.quantity} /> */}
                  <p>{a.quantity}</p>
                </td>
                <td data-th="Subtotal" className="text-center"> Rs.{a.price * a.quantity}</td>
                <td className="actions" data-th="">
                
                  <button className="btn btn-danger btn-sm" onClick={() => this.Remove(a.product_id)}><i className="fa fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
           
            <tfoot>
              <tr className="visible-xs">
                <td className="text-center"><strong>Total Rs.{a.price * a.quantity}</strong></td>
              </tr>
              <tr>
                <td><a href="/product" className="btn btn-warning"><i className="fa fa-angle-left"></i> Continue Shopping</a></td>
                <td colSpan="2" className="hidden-xs"></td>
                <td className="hidden-xs text-center"><strong>Total Rs.{a.price * a.quantity}</strong></td>
                <td><button  className="btn btn-info btn-lg glow" onClick={()=>this.checkout(a)}>add to checkout</button></td>
              </tr>
            </tfoot>
          </table>
        </div> )}
        
        </div><div>{this.state.combine!=null?(<div>{this.state.combine.length!=0 ?(
        <div>{ this.state.show==true  ?(
          <div><img src={require('./images/hand.gif')}  height="40px" width="50px" style={{width:"5%"}} /><span style={{color:"red"}}>!! Before clicking  the below button verify that u have select atleast one of  the above products using addto checkout button !! </span> <br/>
        <button className="btn btn-success" onClick={()=>this.checkout1()}>Go to checkout</button></div>
         ):([])} </div>):([this.props.history.push('/checkout')])}</div>):([])}</div> </div>):(
          <div>
             {this.props.history.push('/err')}
                     </div>
      
          )}</div>
        {/* {this.state.combine != undefined ? (
          <div> */}
        {/* <h1>YOUR CART DETAILS BELOW:</h1>
              
              
                  <table className="table table-bordered">
                          <thead>
                            <tr><th>ID</th>
                              <th>Image</th>
                              <th>Name</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Product category</th>
                              <th>Shop category</th>
                              <th>Short description</th>
                              <th>Long Description</th>
                              <th>Size</th>
                              <th>Ratings</th>
                              <th>Discount</th>
                              <th>Brand name</th>
                              <th>Sku</th>
                              <th>Tax</th>
                              <th>Product id</th>
                              <th>TotalPrice</th>
                            </tr>
                            </thead>
                            <tbody>
                          {this.state.combine!=undefined ? (   this.state.combine.map(a =>
                               <tr > <td>{a.Id1}</td>
                                <td><img src={a.img} className="img-thumbnail"  />
                                </td><td>{a.name}</td>
                                <td>{a.price}</td><td>
                          {a.quantity}</td>
                          <td>{a.prodCategory}</td>
                          <td>{a.shopCategory}</td>
                          <td>{a.shortDesc}</td>
                          <td>{a.longDesc}</td>
                          <td>{a.size}</td>
                          <td>{a.rating}</td>
                          <td>{a.discount}</td>
                          <td>{a.randName}</td>
                          <td>{a.sku}</td>
                          <td>{a.tax}</td>
                          <td>{a.prodId}</td>
                          <td>{a.total}</td>
                          </tr> 
                                ) ):(
                                    alert("please sign in first")
                                )}
                          </tbody></table> */}

        {/*            
            <div className="wrap cf">
              <h1 className="projTitle">Responsive Table<span>-Less</span> Shopping Cart</h1>
              <div className="heading cf">
                <h1>My Cart</h1>
                <a href="/" className="continue">Continue Shopping</a>
              </div>
              <div className="cart">
               
                {this.state.combine.map(a =>
                  <li className="items even">
                    <div className="infoWrap">
                      <div className="cartSection info">
                        <img src={a.product_image} alt="" className="itemImg" style={{width:"35%",height:"30%"}} />
                        
                        <h3>{a.product_name}</h3>
                        <p> <input type="text" className="qty" placeholder={a.quantity} /> x ₹{a.price}</p>
                        <p className="stockStatus"> In Stock</p>
                      </div>
                      <div className="prodTotal cartSection">
                        <p>₹{a.total}</p>
                      </div>
                      <div className="cartSection removeWrap">
                        <a  className="remove" onClick={() => this.Remove(a.id)}>x</a>
                      </div>
                    </div>
                   
                  </li>
                )}
                
              </div>
              
              {this.state.combine.map(a =>
                <div className="subtotal cf">
                  <ul>
                    <li className="totalRow"><span className="label">Subtotal</span><span className="value">₹{a.total}.00</span></li>
                    <li className="totalRow"><span className="label">Shipping</span><span className="value">₹5.00</span></li>
                    <li className="totalRow"><span className="label">GST</span><span className="value">₹4.00</span></li>
                    <li className="totalRow final"><span className="label">Total</span><span className="value">₹{a.total + 5 + 4}.00</span></li>
                    <li className="totalRow"><a href="/product/checkout" className="btn continue">Checkout</a></li>
                  </ul>
                </div>
              )}
            </div>
          </div>) : (
            alert("Cart is Empty", this.props.history.push("/"))
           
          )} */}
      </div>
    )
  }
}
export default withAlert(Cart);