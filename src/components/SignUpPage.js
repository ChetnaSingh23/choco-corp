import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as actions from '../actions/index';


class SignUpPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rut:"",
      password:"",
      everFocusedRut: false,
      everFocusedPassword: false,
      inFocus: "",
      errors : {},
      blockError : false,
      invalidRut: false,
      errorStatus : false,
      validRut : false,
      wentWrong : false,
      isLoading : false,
      invalidRutPassword : false,
    }

    this.handleRutChange = this.handleRutChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCheckValidRut = this.onCheckValidRut.bind(this)

  }

 

  handleRutChange(name,rutt){
    

    this.setState({ rut : rutt})

  }

  handlePasswordChange(evt){
    document.getElementById('wentWrong').style.display = "none";
    this.setState({ password: evt.target.value,isLoading : false,invalidRutPassword : false  });
    var rutError = document.getElementById("rut");
    rutError.classList.remove("invalid-field");
    var passwordError = document.getElementById("password");
    passwordError.classList.remove("invalid-field");
  }

  onCheckValidRut(){
    var checkString = document.getElementById("rut").value;
    if (/[^A-Za-z0-9._-\d]/.test(checkString)) {
      this.setState({errorStatus : true,everFocusedRut:true})
      document.getElementById("rut").classList.remove("formLogin");
      document.getElementById("rut").classList.add("error");
      return (false);
    }
    if (this.state.validRut === false) {
       this.setState({invalidRut : true})
       document.getElementById("rut").classList.add("error");
    }
    else {
       this.setState({invalidRut : false,errorStatus : false,everFocusedRut:false})
       document.getElementById("rut").classList.remove("error");
    }
  }

  handleSubmit(evt){
    evt.preventDefault();
    
  }

  render() {

    return (
      <div className="user-pages login-page">
        
        <div className="container user-container">
          <div className="logo">
            <img src="" />
          </div>
          <div className="user-content">
          {this.state.blockError ?
              <div className="msg error">
                <div className="icon">
                  <i className="fa fa-warning"></i>
                </div>
                <div className="content">
                  <p>user-blocked</p>
                </div>
              </div>
              : ""}

              {this.state.wentWrong ?
              <div className="msg error">
                <div className="icon">
                  <i className="fa fa-warning"></i>
                </div>
                <div className="content">
                  <p>something-went-wrong</p>
                </div>
              </div>
              : ""}
                <div id= "wentWrong" className="msg error">
                <div className="icon">
                  <i className="fa fa-warning"></i>
                </div>
                <div className="content">
                  <p>something-went-wrong</p>
                </div>
              </div>
            {this.state.invalidRut ?
              <div className="msg error">
                <div className="icon">
                  <i className="fa fa-warning"></i>
                </div>
                <div className="content">
                  <p>invalid-rut</p>
                </div>
              </div> : "" }

              {this.state.invalidRutPassword ?
              <div className="msg error">
                <div className="icon">
                  <i className="fa fa-warning"></i>
                </div>
                <div className="content">
                  <p>invalid-rut-password</p>
                </div>
              </div> : "" }

            {this.state.errorStatus ?
            <div className="msg error">
              <div className="icon">
                <i className="fa fa-warning"></i>
              </div>
              <div className="content">
                {this.state.errors.rut ? <p>{this.state.errors.rut}</p> : ""}
                {this.state.errors.password ? <p>{this.state.errors.password}</p> : ""}
              </div>
            </div> : ""}
            <div className="form-header">
              <h2>Login</h2>
            </div>
            <div className="user-form">
              <form>
                <div className="form-group">
                  <input type="text" id="rut" className="form-control" name="rut" value={this.state.rut} onChange={(e)=> this.handleRutChange("rut" , e.target.value)}  onBlur={this.onCheckValidRut}  placeholder="userid" maxLength="12"/>
                  <div className="hint">example 12345678-3</div>
                </div>
                <div className="form-group">
                  <input type="password" id="password" className="form-control" name="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="password" maxLength="8"/>
                </div>
                <div className="form-actions">
                  <div>
                    <a href="/signup">Sign Up</a>
                  </div>
                  <div>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};



export default  SignUpPage;


