import React, { Component } from 'react';
import axios from 'axios';
//import Avatar from 'react-avatar-edit'
import { withAlert } from 'react-alert';

import './signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: {
        "name": "",
        "nameError":"",
        "password": "",
        "passwordError":"",
        "email": "",
        "emailError":"",
        "phno": "",
        "phoneNoError":"",
        "address": "",
        "AddressError":"",
        "securityquestion": "",
        "securityanswer": "",


      },
      confirmpassword: "",
    }
    this.signup = this.signup.bind(this);
  }

  signup() {
    console.log(this.state.userdata);   
    if (this.state.confirmpassword === this.state.userdata.password) {
      axios.post('http://52.26.246.107:3005/users', this.state.userdata).then(
        response => {
          const alert = this.props.alert.show('successfully sent' , {
            // timeout: 5000 , // custom timeout just for this one alert
             type: 'success',
             position: 'top center',
             onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
             onClose: () => { this.props.history.push('/login')} // callback that will be executed after this alert is removed
           })

        }
      ).catch(error => {
        console.log(error)
      })
    } else {
      
      const alert = this.props.alert.show('password didnt match' , {
        // timeout: 5000 , // custom timeout just for this one alert
         type: 'success',
         position: 'top center',
         onOpen: () => { console.log('hey') }, // callback that will be executed after this alert open
         onClose: () => { } // callback that will be executed after this alert is removed
       })

  }
   
  }
  componentDidMount(){
    window.scrollTo(0,0)

  }

  render() {
    return (

      <div>

     
          <div className="container">
            <div className="row">
              <div className="block">
                <div className="well-header">
                  <h3 className="text-center text-success"> SignUp </h3>
                  <hr/>
				</div>

                  <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-addon">
                            <i className="glyphicon glyphicon-user"></i>
                          </div>
                          <input type="text" placeholder=" Name" name="txtfname" className="form-control" errorText={this.state.nameError}  onChange={event => this.setState({ userdata: Object.assign(this.state.userdata, { "name": event.target.value }) })}/>
      				          	</div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-addon">
                              <i className="glyphicon glyphicon-user"></i>
                            </div>
                            <input type="text" placeholder="Last Name" name="txtlname" className="form-control"/>
						                	</div>
                          </div>
                        </div>
                      </div> */}

                      <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-addon">
                                <i className="glyphicon glyphicon-lock"></i>
                              </div>
                              <input type="password" minLength="8" maxLength="20" placeholder="Password" name="txtpass" errorText={this.state.passwordError} className="form-control"  onChange={event => this.setState({ userdata: Object.assign(this.state.userdata, { "password": event.target.value }) })}/>
						                	</div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-addon">
                                <i className="glyphicon glyphicon-lock"></i>
                              </div>
                              <input type="password" minLength="8" maxLength="20" placeholder="Confirm your Password" name="txtpass" className="form-control"  onChange={event => this.setState({ confirmpassword: event.target.value })}/>
						                	</div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12 col-xs-12 col-sm-12">
                            <div className="form-group">
                              <div className="input-group">
                                <div className="input-group-addon">
                                  <i className="glyphicon glyphicon-phone"></i>
                                </div>
                                <input type="number" minLength="10" maxLength="12" className="form-control" name="txtmobile" errorText={this.state.phoneNoError} placeholder="Mobile No."  onChange={event => this.setState({ userdata: Object.assign(this.state.userdata, { "phno": event.target.value }) })}/>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12 col-xs-12 col-sm-12">
                            <div className="form-group">
                              <div className="input-group">
                                <div className="input-group-addon">
                                  <i className="glyphicon glyphicon-envelope"></i>
                                </div>
                                <input type="email" className="form-control" name="txtmail" placeholder="E-Mail" errorText={this.state.emailError}  onChange={event => this.setState({ userdata: Object.assign(this.state.userdata, { "email": event.target.value }) })} />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12 col-xs-12 col-sm-12">
                            <div className="form-group">
                              <div className="input-group">
                                <div className="input-group-addon">
                                  <i className="glyphicon glyphicon-list-alt"></i>
                                </div>
                                <textarea className="form-control" name="txtadd" placeholder="Address" errorText={this.state.AddressError}  onChange={event => this.setState({ userdata: Object.assign(this.state.userdata, { "address": event.target.value }) })} ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12 col-xs-12 col-sm-12">
                            <div className="form-group">
                              <div className="input-group">
                                <div className="input-group-addon">
                                  <i className="glyphicon glyphicon-calendar"></i>
                                </div>
                                <input type="text" name="dob" placeholder="Date Of Birth" className="form-control" id="datepicker" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row widget">
                          <div className="col-md-12 col-xs-12 col-sm-12">
                            <button className="btn btn-warning btn-block"onClick={() => this.signup()}> Submit </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


             


              </div>
              )
            }
          }
export default withAlert(Signup);
