import React, { Component } from 'react';
import './Firebase';
import './css/home.css';



class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.profileData = {};
        this.state = {
            name:null,
            nameCheck:false
        } 
    }

    async componentDidMount(){
        if(this.props.data.auth.currentUser){
        this.getProfileData()
        }
    }
    
    async getProfileData(){
        let profileData = await this.props.data.getDoc('Users',this.props.data.auth.currentUser.uid);
        this.profileData = profileData;
        if(this.profileData){
            this.setState({name:profileData.name})
        }
        else{this.getProfileData()}
    }

    async changeName(){
        if(document.getElementById('name').value !== 'User' && document.getElementById('name').value !== ''){
            await this.props.data.setPlayerName(this.props.data.auth.currentUser.uid, document.getElementById('name').value)
            await this.getProfileData();
        }
    }

    logout() {
        this.props.data.auth.signOut();
    }


    render() {
        return (
        <div className='LoginModul'>
            {this.state.name ? <h1 className='homeText'>Welcome to your account, {this.state.name}!</h1>: <h1 className='homeText'>Please set your name or login!</h1>}
            <h2 className='homesubText'>Try Changing your profile name in our database!</h2>
            <div className='homeSpace'>
                <input className='theInput' id='name' maxLength='21'></input>
                <button className='setName' onClick={()=>this.changeName()}>Set Name</button>
            </div>
            <div className='logoutSpace'>
                <button onClick={()=>this.logout()} className='logout'>Logout</button>
            </div>
        </div>
        );
    }
}

export default Home;