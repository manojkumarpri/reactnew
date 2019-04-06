import React,{ Component } from "react";
import axios from 'axios';
import { withAlert } from 'react-alert';

class footer extends Component{
constructor(props) {
	super(props);
	this.state={
		mail:"",
		listData:{},
	}

}
email() {
	
	
	this.state.listData.email=this.state.mail;

	axios.post("http://52.26.246.107:3005/mails", this.state.listData).then(response => {
		console.log(response);
		//console.log(j,this.state.deliver.length)
		this.props.alert.show('thanks for showing u r intrest to shineLogics connecting with us')

	}).catch(error => console.log(error)
	)
}
email1(a){
	this.state.mail=a;
	this.setState({mail:this.state.mail});
	console.log(this.state.mail);
}

    render(){
        return(
            <div className="footer">
	<div className="footer_agile_inner_info_w3l">
		<div className="col-md-3 footer-left">
			<h2><a href="index.html"><span>S</span>mart Shopping </a></h2>
			<p>The place where u can Enjoy your Real time Shopping And direct provider customer communication.</p>
			<ul className="social-nav model-3d-0 footer-social w3_agile_social two">
							<li><a href="" className="google-plus">
								<div className="front"><i className="fab fa-google" aria-hidden="true"></i></div>
								<div className="back"><i className="fab fa-google" aria-hidden="true"></i></div></a></li>
							<li><a href="#" className="facebook">
								<div className="front"><i className="fab fa-facebook" aria-hidden="true"></i></div>
								<div className="back"><i className="fab fa-facebook" aria-hidden="true"></i></div></a></li>
							<li><a href="#" className="twitter">
								<div className="front"><i className="fab fa-twitter" aria-hidden="true"></i></div>
								<div className="back"><i className="fab fa-twitter" aria-hidden="true"></i></div></a></li>
							<li><a href="#" className="instagram">
								<div className="front"><i className="fab fa-instagram" aria-hidden="true"></i></div>
								<div className="back"><i className="fab fa-instagram" aria-hidden="true"></i></div></a></li>
							<li><a href="#" className="pinterest">
								<div className="front"><i className="fab fa-linkedin" aria-hidden="true"></i></div>
								<div className="back"><i className="fab fa-linkedin" aria-hidden="true"></i></div></a></li>
						</ul>
		</div>
		<div className="col-md-9 footer-right">
			<div className="sign-grds">
				<div className="col-md-4 sign-gd">
					<h4>Our <span>Information</span> </h4>
					<ul>
						<li><a href="/">Home</a></li>
						<li><a href={"/men"}>Men's Wear</a></li>
						<li><a href={"/women"}>Women's wear</a></li>
						<li><a href="about.html">About</a></li>
						{/* <li><a href="typography.html">Short Codes</a></li>
						<li><a href={"/contact"}>Contact</a></li> */}
					</ul>
				</div>
				
				<div className="col-md-5 sign-gd-two">
					<h4>Store <span>Information</span></h4>
					<div className="w3-address">
						<div className="w3-address-grid">
							<div className="w3-address-left">
								<i className="fa fa-phone" aria-hidden="true"></i>
							</div>
							<div className="w3-address-right">
								<h6>Phone Number</h6>
								<p>9500037221</p>
							</div>
							<div className="clearfix"> </div>
						</div>
						<div className="w3-address-grid">
							<div className="w3-address-left">
								<i className="fa fa-envelope" aria-hidden="true"></i>
							</div>
							<div className="w3-address-right">
								<h6>Email Address</h6>
								<p>Email :<a href="mailto:sen@shinelogics.com?subject=E-mail%20from%20productapp"> sen@shinelogics.com</a></p>
							</div>
							<div className="clearfix"> </div>
						</div>
						<div className="w3-address-grid">
							<div className="w3-address-left">
								<i className="fa fa-map-marker" aria-hidden="true"></i>
							</div>
							<div className="w3-address-right">
								<h6>Location</h6>
								<p>Thiruvanmaiyur-chennai. 
								
								</p>
							</div>
							<div className="clearfix"> </div>
						</div>
					</div>
				</div>
				{/* <div className="col-md-3 sign-gd flickr-post">
					<h4>Flickr <span>Posts</span></h4>
					<ul>
						<li><a href="single.html"><img src={t1} alt=" " className="img-responsive" /></a></li>
						<li><a href="single.html"><img src={t2} alt=" " className="img-responsive" /></a></li>
						<li><a href="single.html"><img src={t3} alt=" " className="img-responsive" /></a></li>
						<li><a href="single.html"><img src={t4} alt=" " className="img-responsive" /></a></li>
						<li><a href="single.html"><img src={t1} alt=" " className="img-responsive" /></a></li>
						<li><a href="single.html"><img src={t2} alt=" " className="img-responsive" /></a></li>
						<li><a href="single.html"><img src={t3} alt=" " className="img-responsive" /></a></li>
						<li><a href="single.html"><img src={t2} alt=" " className="img-responsive" /></a></li>
						<li><a href="single.html"><img src={t4} alt=" " className="img-responsive" /></a></li>
					</ul>
				</div> */}
				<div className="clearfix"></div>
			</div>
		</div>
		<div className="clearfix"></div>
			<div className="agile_newsletter_footer">
					<div className="col-sm-6 newsleft">
				<h3>SIGN UP FOR NEWSLETTER !</h3>
			</div>
			<div className="col-sm-6 newsright">
				
					<input type="email" onChange={event=>this.email1(event.target.value)} placeholder="Enter your email..." name="email"value={this.state.mail} required=""/>
					<input type="submit" onClick={()=>this.email()} value="Submit"/>
				
			</div>

		<div className="clearfix"></div>
	</div>
		<p className="copy-right"> 2018 SmartShopping. All rights reserved | Design by <a href="Shinelogics.com/">Shinelogics InfoTech</a></p>
	</div>
</div>



        );

    }


}
export default withAlert(footer);
