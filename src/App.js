import React, {Component} from 'react';
import './Firebase';
import Login from './Login';
import Home from './Home';
import './css/app.css';
const { default: Database} = require('./Firebase.js')
let data = new Database();


window.onload = function(){
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:{}
    }
  }

  componentDidMount(){
    this.authListener();
  }

  authListener(){
    data.auth.onAuthStateChanged((user) => {
      console.log(user); 
      if (user){
        this.setState({user});
        localStorage.setItem('user', user.uid);
      }
      else{
        this.setState({user:null});
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return(
    <div className="App">
      <script src="https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js"></script>
      <script src="./Firebase" type='text/javascript'></script>
      <script src="https://www.gstatic.com/firebasejs/7.23.0/firebase-firestore.js"></script>
      <script src="/__/firebase/8.1.1/firebase-app.js"></script>
      <script src="/__/firebase/8.1.1/firebase-analytics.js"></script>
      <script src="/__/firebase/init.js"></script>
      <div className='display'>
        <div className='colorCover'>
        <div className='leftSide'>
          {this.state.user ? (<Home data={data} />) : (<Login data={data}/>)}
        </div>
        <div className='rightSide'>
          <div className='headerBox'>
            <h1 className='headText'>Welcome to my Firebase Authentication Demo!</h1>
          </div>
          <div className='subheaderBox'>
            <a href='https://www.linkedin.com/in/thomas-m-mccarthy/'>
              <h4 className='subheadText'>Designed and Deployed by Thomas McCarthy</h4>
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
    )};
};

export default App;
