import React, { Component } from 'react';
import axios from 'axios';
import Banner2 from '../components/images/banner2.jpg';
import Banner5 from '../components/images/banner5.jpg';
import BB2 from '../components/images/bb2.jpg';
import './men.css';
import { withAlert } from 'react-alert'
class men extends Component {



  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      listData: [],
      listData1: [],
      combine: [],
      data1: "",
      item_product: [],
      //
      userdata: [],
      combine1: [],
      combine2: [] = {
        Id1: Number,
        img: String,
        name: String,
        price: Number,

        prodCategory: String,
        shopCategory: String,
        shortDesc: String,
        longDesc: String,
        size: Number,
        rating: Number,
        discount: Number,
        BrandName: String,
        sku: String,
        tax: Number,
        prodId: Number,
        total: Number,
        available: Number,
        shopName: String,


      }
    };

    this.del = this.del.bind(this);
    this.join = this.join.bind(this);
    this.view = this.view.bind(this);
    // this.item_pro=this.item_pro.bind(this);
    // var j;
    // var key = NaN;
    // var cust_id = null;
    this.state.userdata = JSON.parse(localStorage.getItem("user"));





  }
  totalPrice(pid, j) {
    // for(var i=0;i<this.listData.length;i++){
    //   this.total += (this.listData[i].price * this.listData[i].quantity);
    // }
    pid.total = (pid.price * pid.quantity);
    console.log(pid)
    this.state.listData[j].total = pid.total;

  }
  async    get1() {
    await axios.get("http://13.58.92.162:3000/provider").then(response => {
      this.setState({ listData1: response.data });
      console.log(this.state.listData1);
       localStorage.setItem('selected',JSON.stringify(this.state.listData1));
       console.log(JSON.parse(localStorage.getItem("selected")));
      this.join2();
    })



  }


  add(pid) {
    console.log(pid);
    console.log(this.state.listData)
    for (var i = 0; i < this.state.listData.length; i++) {
      if (this.state.combine[i].Id1 === pid.Id1) {
        this.j = i;
        if (this.state.combine[i].quantity < this.state.combine[i].available) {

          //this.listData[i].quantity += 1;
          this.state.combine[i].quantity += 1;
          this.state.listData[i].available -= 1;
          this.state.combine[i].available = this.state.listData[i].available;

        }
      }
    }


    // console.log(pid);
    console.log(pid)
    console.log(this.j)
    this.totalPrice(pid, this.j);
    if (pid.Id1 !== this.key) {
      this.state.combine1.push(pid);
      this.key = pid.Id1;
    }
    else {
      pid.quantity += 1;
      for (var k = 0; k < this.state.combine1.length; k++) {

      }
    }
    //this.data.getp(this.product);

    alert("Your selected:" + this.state.combine[this.j].quantity + "itemsAnd Total Price is:$" + this.state.listData[this.j].total);
    // console.log(jj[this.j].quantity);
    this.view();
  }
  del(pid) {
    console.log(pid);
    for (var i = 0; i < this.state.combine.length; i++) {
      if (this.state.listData[i].Id1 === pid.Id1) {
        this.j = i;
        if (this.state.combine[i].quantity > 0) {
          //this.listData[i].quantity += 1;
          this.state.combine[i].quantity -= 1;
          this.state.listData[i].available += 1;
          this.state.combine[i].available = this.state.listData[i].available;

        }
      }
    }

    // console.log(pid);
    this.totalPrice(pid, this.j);

    this.state.combine1.pop();
    //this.data.getp(this.product);

    alert("Your selected:" + this.state.combine[this.j].quantity + "itemsAnd Total Price is:$" + this.state.listData[this.j].total);
    // console.log(jj[this.j].quantity);

  }
  view1(pid) {

    this.state.item_product.push(Object.assign(pid, { quantity: 1 }));
    console.log(this.state.item_product);

    if (this.state.userdata != undefined) {
      console.log("here add to cart");
      this.state.combine1.push(pid);
      //<Cart combine1={this.props.combine1} ></Cart>
      console.log(this.state.combine1);

      localStorage.setItem("manoj", JSON.stringify(this.state.combine1));
      this.props.history.push('/order');
    }
    else {
      const alert = this.props.alert.show('pls login first', {
        // timeout: 5000 , // custom timeout just for this one alert
         type: 'success',
         position: 'top center',
         onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
         onClose: () => { this.props.history.push('/login')} // callback that will be executed after this alert is removed
       })
    }
  }
  view() {
    //this.cust_id= this.state.userdata.uid;
    // console.log(this.state.userdata.uid)
    if (this.state.userdata != undefined) {
      console.log("here add to cart");
      //<Cart combine1={this.props.combine1} ></Cart>
      localStorage.setItem("manoj", JSON.stringify(this.state.combine1));
      console.log(this.state.combine1)
      // var product=Object.assign(,this.state.combine2,this.state.combine1); 
      console.log(this.state.listData)
      this.state.listData.map(a =>
        axios.put("http://13.58.92.162:3000/products/" + a.Id1, a).then(response => {
          console.log(response);
        }).catch(error => console.log(error)
        ))

      console.log(this.state.combine1)
      this.state.combine1.map(a =>
        axios.post("http://13.58.92.162:3000/orders/", a).then(response => {
          console.log(response);
        }).catch(error => console.log(error)
        ))

    }
    else {
      const alert = this.props.alert.show('pls login first', {
        // timeout: 5000 , // custom timeout just for this one alert
         type: 'success',
         position: 'top center',
         onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
         onClose: () => { this.props.history.push('/login')} // callback that will be executed after this alert is removed
       })
    }
  }

  componentDidMount() {
    window.scrollTo(0,0)

    this.get1();
  }

 

  join() {
    console.log(this.state.listData);
    // console.log(this.state.listData1);
    this.state.listData.map(ld => {
      this.state.listData1.map(ld1 => {
        if (ld.shopName === ld1.shopname) {
          this.state.combine.push(Object.assign({}, ld, ld1, { quantity: 0 }));

        }
        this.setState({ combine1: this.state.combine1 });

        // Product Filter In Men's Wear 
        var item_pro = this.state.listData.filter(function (combine) {
          return combine.shopCategory == "menswear"

        });
        // console.log(item_pro);
        //this.setState(item_pro);
        this.setState({ item_product: item_pro });
        // console.log(this.state.item_product);


      })

    })
    // var obj = 
    //       console.log(obj);

    console.log(this.state.combine);
    this.setState(this.state.combine);


    //this 
  }
  async join2() {

    var response = await axios.get("http://13.58.92.162:3000/products")
    // console.log(response1);  
    this.setState({ listData: await response.data });
     console.log(this.state.listData)


    this.join();
  }


  render() {

    return (
      <div>
        {/* <!-- /banner_bottom_agile_info --> */}
        {/* <div className="page-head_agile_info_w3l" >
          <div className="container">
            <h3>Men's <span>Wear  </span></h3>

            <div className="services-breadcrumb">
              <div className="agile_inner_breadcrumb">

                <ul className="w3_short">
                  <li><a href="/">Home</a><i>|</i></li>
                  <li>Men's Wear</li>
                </ul>
              </div>
            </div>

          </div>
        </div> 

        <div className="resp-tabs-container" style={{ backgroundColor: "#ffff" }}>
          {/* --/tab_one-- 
          <div className="" >
            {this.state.item_product.map(item => (
              <div className="col-md-3   product-men">
                <div className="men-pro-item simpleCart_shelfItem">
                  <div className="men-thumb-item"  >
                    <img src={item.img} alt="" style={{ width: "250px", height: "300px" }} />
            
                    <div className="men-cart-pro">
                      <div className="inner-men-cart-pro">
                        <a href="/" className="link-product-add-cart">Quick View</a>
                      </div>
                    </div>

                  </div>
                  <div className="item-info-product ">
                    <h4><a href={"/single"}>{item.name}</a></h4>
                    <div className="info-product-price">
                      <span className="item_price">₹{item.price}</span>
                    </div>
                    <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2">

                      <fieldset>
                        <input type="hidden" name="cmd" value="_cart" />
                        <input type="hidden" name="add" value="1" />
                        <input type="hidden" name="business" value=" " />
                        <input type="hidden" name="item_name" value="Formal Blue Shirt" />
                        <input type="hidden" name="amount" value="30.99" />
                        <input type="hidden" name="discount_amount" value="1.00" />
                        <input type="hidden" name="currency_code" value="USD" />
                        <input type="hidden" name="return" value=" " />
                        <input type="hidden" name="cancel_return" value=" " />
                        <input type="submit" name="submit" value="Add to cart" onClick={() => { this.view1(item) }} className="button" />
                      </fieldset>

                    </div>

                  </div>
                </div>
              </div>
            ))}
            <div className="clearfix"></div>
          </div>
      
        </div> */}

        <div className="page-head_agile_info_w3l">
          <div className="container">
            <h3>Men's <span>Wear  </span></h3>
            {/* <!--/w3_short--> */}
            <div className="services-breadcrumb">
              <div className="agile_inner_breadcrumb">

                <ul className="w3_short">
                  <li><a href="/">Home</a><i>|</i></li>
                  <li>Men's Wear</li>
                </ul>
              </div>
            </div>
            {/* <!--//w3_short--> */}
          </div>
        </div>

        {/* <!-- banner-bootom-w3-agileits --> */}
        <div className="banner-bootom-w3-agileits">
          <div className="container" >
            {/* <!-- mens --> */}
            
            <div className="col-md-8 products-right" style={{textAlign:"center"}}>
              <h5>Product <span></span></h5>
              {/* <div className="sort-grid">
                <div className="sorting">
                  <h6>Sort By</h6>
                  <select id="country1" onchange="change_country(this.value)" className="frm-field required sect">
                    <option value="null">Default</option>
                    <option value="null">Name(A - Z)</option>
                    <option value="null">Name(Z - A)</option>
                    <option value="null">Price(High - Low)</option>
                    <option value="null">Price(Low - High)</option>
                    <option value="null">Model(A - Z)</option>
                    <option value="null">Model(Z - A)</option>
                  </select>
                  <div className="clearfix"></div>
                </div>
                <div className="sorting">
                  <h6>Showing</h6>
                  <select id="country2" onchange="change_country(this.value)" className="frm-field required sect">
                    <option value="null">7</option>
                    <option value="null">14</option>
                    <option value="null">28</option>
                    <option value="null">35</option>
                  </select>
                  <div className="clearfix"></div>
                </div>
                <div className="clearfix"></div>
              </div> */}
              <div id="slider">
                <figure>
                  <img alt="" src={Banner2} />
                  <img alt="" src={Banner5} />
                  <img alt="" src={Banner2} />
                </figure>
              </div>
              <div className="men-wear-bottom">
                <div className="col-sm-4 men-wear-left">
                  <img className="img-responsive" src={BB2} alt=" " />
                </div>
                <div className="col-sm-8 men-wear-right">
                  <h4>Exclusive Men's <span>Collections</span></h4>

                  <p>'A man should look as if he had bought his clothes with intelligence, put them on with care, and then forgotten all about them.'
                  'Real luxury is understanding quality, and having the time to enjoy it.'
. </p>
                </div>
                <div className="clearfix"></div>
              </div>
             
              <div className="row" >
            {this.state.item_product.map(item => (
             <div className="col-md-4 product-men">
             <div className="men-pro-item simpleCart_shelfItem">
               <div className="men-thumb-item">
                    <img src={item.img} alt="" style={{ width: "290px", height: "200px" }} />
            
                    {/* <div className="men-cart-pro">
                      <div className="inner-men-cart-pro">
                        <a href="/" className="link-product-add-cart">Quick View</a>
                      </div>
                    </div> */}

                  </div>
                  <div className="item-info-product ">
                    <h4><a href={"/single"}>{item.name}</a></h4>
                    {/* <div className="info-product-price">
                      <span className="item_price">₹{item.price}</span>
                    </div> */}
                    <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2">

                      <fieldset>
                        <input type="hidden" name="cmd" value="_cart" />
                        <input type="hidden" name="add" value="1" />
                        <input type="hidden" name="business" value=" " />
                        <input type="hidden" name="item_name" value="Formal Blue Shirt" />
                        <input type="hidden" name="amount" value="30.99" />
                        <input type="hidden" name="discount_amount" value="1.00" />
                        <input type="hidden" name="currency_code" value="USD" />
                        <input type="hidden" name="return" value=" " />
                        <input type="hidden" name="cancel_return" value=" " />
                        <input type="submit" name="submit" value="Add to cart" onClick={() => { this.view1(item) }} className="button" />
                      </fieldset>

                    </div>

                  </div>
                </div>
              </div>
            ))}
            <div className="clearfix"></div>
          </div>
      
              
              
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
        {/* <!-- //mens --> */}
        {/* <!--/grids--> */}
        <div className="coupons">
          <div className="coupons-grids text-center">
            <div className="w3layouts_mail_grid">
              <div className="col-md-3 w3layouts_mail_grid_left">
                <div className="w3layouts_mail_grid_left1 hvr-radial-out">
                  <i className="fa fa-truck" aria-hidden="true"></i>
                </div>
                <div className="w3layouts_mail_grid_left2">
                <h3>FREE SHIPPING</h3>
                  <p>Buy more than $75 of merchandise and get free shipping
.</p>
                </div>
              </div>
              <div className="col-md-3 w3layouts_mail_grid_left">
                <div className="w3layouts_mail_grid_left1 hvr-radial-out">
                  <i className="fa fa-headphones" aria-hidden="true"></i>
                </div>
                <div className="w3layouts_mail_grid_left2">
                <h3>24/7 SUPPORT</h3>
                  <p>Dress up your sportswear and dress down your formal wear.ur available 24/7 </p>
                </div>
              </div>
              <div className="col-md-3 w3layouts_mail_grid_left">
                <div className="w3layouts_mail_grid_left1 hvr-radial-out">
                  <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                </div>
                <div className="w3layouts_mail_grid_left2">
                <h3>MONEY BACK GUARANTEE</h3>
                  <p>get 50% cashback,for  each delivery.</p>
                </div>
              </div>
              <div className="col-md-3 w3layouts_mail_grid_left">
                <div className="w3layouts_mail_grid_left1 hvr-radial-out">
                  <i className="fa fa-gift" aria-hidden="true"></i>
                </div>
                <div className="w3layouts_mail_grid_left2">
                <h3>FREE GIFT COUPONS</h3>
                  <p>Know first who you are we care about u r happiness,get gift coupens accordingly.</p>                </div>
              </div>
              <div className="clearfix"> </div>
            </div>

          </div>
        </div>
        {/* <!--grids--> */}
      </div>
    );

  }

}

export default withAlert(men);