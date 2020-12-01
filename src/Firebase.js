import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/database'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyC1Vrf1bALKPsoVHB0JlV6LifrrJPh6_iQ",
  authDomain: "loginwebsite-16429.firebaseapp.com",
  databaseURL: "https://loginwebsite-16429.firebaseio.com",
  projectId: "loginwebsite-16429",
  storageBucket: "loginwebsite-16429.appspot.com",
  messagingSenderId: "814029324718",
  appId: "1:814029324718:web:6f199237e35981db17483f",
  measurementId: "G-90VJHGZTJ8",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
export const authPersistance = firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
export const auth = firebase.auth()


export default class Database {
  constructor(){
    this.fire = fire;
    this.auth = auth;
  }

  async pushDoc(collection, docID, data){
    let theData = await db.collection(collection).doc(docID).set(data);
    return theData
    }

  async getDoc(collection, docID){
    let data = (await db.collection(collection).doc(docID).get()).data();
    return data;
    }

  async updateDoc(collection, docID, data){
    let update = await db.collection(collection).doc(docID).update(data);
    return update;
  }

  async getColl(collection){ 
    let data = (await db.collection(collection).get()).docs;
    console.log(data);
    return data;
  }

  async deleteDoc(collection, doc){
    await db.collection(collection).doc(doc).delete();
    return true
  }

  async getDocID(collection, doc){
    let data = await db.collection(collection).doc(doc).id;
    return data
  }

  async setPlayerName(userID, newName){
    await db.collection('Users').doc(userID).update({'name':newName})
    return true
  }

  async checkDocExists(collPath, docID){
    let docs = await this.getColl(collPath);
    let truth = false;
    docs.forEach(i =>{
      if(i.id === docID){
        truth = true;
      }
    })
    return truth
  }

  async checkUserExists(userObject){
    let truth = await this.checkDocExists('Users', userObject.uid);
    if(truth){
      return true
    }
    else{
      db.collection('Users').doc(userObject.uid).set({'email':userObject.email, 'name':'User',})
      return false 
    }
  }

}








  