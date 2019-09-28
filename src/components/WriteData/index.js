import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import * as firebase from 'firebase';
import './WriteData.css';

var INITIAL_STATE = {
 
  LightC: 0,    //command
  
  Light1:0,   //status
 
};


class WriteData extends Component {
constructor(props){
      super(props);
      this.state={ ...INITIAL_STATE};
      this.openModal = this.openModal.bind(this);
      
}


openModal() {
  var curuser='';

  var date = new Date().getDate(); //Current Date
  if(date<10){
    date='0'+date;
  }
  var month = new Date().getMonth() + 1; //Current Month
  if(month<10){
    month='0'+month;
  }
  var year = new Date().getFullYear(); //Current Year
 var fulldate= year  +''+ month+''  + date;


  

 if (firebase.auth().currentUser !== null) 
  curuser= firebase.auth().currentUser.uid;


  
 
 
 


  const rootupcom=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-1/'+fulldate+'/Commands'); //update command
  const rootreadlight=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-1/'+fulldate+'/Light_Status/Current/Light1'); //read status
  const rootreadcom=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-1/'+fulldate+'/Commands/LightC');  //read command
  



  rootreadlight.on('value',snap=>{
    this.setState({
     Light1:snap.val()
   });
  });
 

  rootreadcom.on('value',snap=>{
    this.setState({
     LightC:snap.val()
   });
  });


  if (this.state.Light1==true){
  
    rootupcom.update ({
      "LightC": 0,
      });

     
  

    
 }

    if(this.state.Light1==false){
    rootupcom.update ({
      "LightC":1,
      });

     

  }



}

render() {
  const { LightC,Light1 } = this.state;
      if (this.state.Light1==true){
          return(
                <div class="wrapper">
                  
                       <button onClick={this.openModal}>switch off lights</button>
                      

                 
                </div>
                );
        }
      else if(this.state.Light1==false){
          return (
                 <div class="wrapper">
                       <button onClick={this.openModal}>switch on lights</button>
                       
                 </div>
        );
        }
}



}
export default withFirebase(WriteData);
