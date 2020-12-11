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
        <div className='loginPage'>
          <div className='displayButtons'>
          <div>
            {!this.state.showAction ? <button className='theButtons' onClick={()=>this.loginClick()}>Login</button>: null}
          </div>
          <div>
            {!this.state.showAction ? <button className='theButtons' onClick={()=>this.registerClick()}>Sign Up</button>: null}
          </div>
          </div>
          {this.state.showAction ? <LoginPage data={data} logReg={this.log}/> : null}
          <div className='reverseSpace'>
            {this.state.showAction ? <button className='reverse' onClick={()=>this.reverseButtonClick()}>Return</button>: null}
          </div>
      </div>
    );
  }
}
export default Login;
