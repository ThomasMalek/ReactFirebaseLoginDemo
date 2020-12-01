import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './Firebase';
import './css/login.css';
import './LoginPage';
import LoginPage from './LoginPage';
const { default: Database} = require('./Firebase.js')
let data = new Database();

class Login extends Component {
  constructor(props) {
    super(props);
    this.log = null;
    this.state = {
      email: '',
      password: '',
      showAction: false,
    };
  }

  loginClick(){
    this.log = true
    this.setState({showAction:true})
  }

  registerClick(){
    this.log = false
    this.setState({showAction:true})
  }

  reverseButtonClick(){
    this.setState({showAction:false})
    this.truth = null;
  }

  render() {
    return (
      <div>
        <div className='leftSide'>
          {!this.state.showAction ? <button className='loginShow' onClick={()=>this.loginClick()}>Login</button>: null}
          {!this.state.showAction ? <button className='registerShow' onClick={()=>this.registerClick()}>Sign Up</button>: null}
          {this.state.showAction ? <LoginPage data={data} logReg={this.log}/> : null}
          <div className='reverse'>
          {this.state.showAction ? <button className='hideModul' onClick={()=>this.reverseButtonClick()}>Return</button>: null}
          </div>
        </div>
      <div className='rightSide'>
      </div>
      </div>
    );
  }
}
export default Login;
