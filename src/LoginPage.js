import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './Firebase';
import './css/login.css';
const { default: Database} = require('./Firebase.js')
let data = new Database();

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: '',
      wrongPass: false,
      signupErr:false
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    data.auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{data.checkUserExists(data.auth.currentUser)}).catch((error) => {
        console.log(error);
        this.setState({wrongPass:true});
      });
  }

  signup(e){
    e.preventDefault();
    data.auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)}).then((u)=>{data.checkUserExists(data.auth.currentUser)})
    .catch((error) => {
        console.log(error);
        this.setState({signupErr:true});
      })
  }
  render() {
    return (
      <div className='LoginModul'>
        <div className='column'>
            <div className="col-md-6">
            <form>
                    <div class="form-group">
                    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div class="form-group">
                    <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    {this.props.logReg ? <button type="submit" onClick={this.login} class="loginButton">Login</button> : null}
                    {this.state.wrongPass ? <p class='wrongPassword'>Wrong Password Please Try Again!</p>: null}
                    {!this.props.logReg ?<button onClick={this.signup} className="registerButton">Signup</button>: null}
                    {this.state.signupErr ? <p class='signupErr'>Use "@email.com", Account Exists, or password not secure!</p>: null}
            </form>
            </div>
        </div>
        </div>
    );
  }
}
export default LoginPage;
