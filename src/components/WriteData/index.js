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


  /*for node MCU database
  const rootRefup=firebase.database().ref().child("/ESP8266_Test/User 0/Node 1/20190828/Commands");     //update command
  const rootRefupst=firebase.database().ref().child("/ESP8266_Test/User 0/Node 1/20190828/Light_Status/Current");     //update status
  const rootRef=firebase.database().ref().child("/ESP8266_Test/User 0/Node 1/20190828/Commands/LightC");  //read
  */


 if (firebase.auth().currentUser !== null) 
  curuser= firebase.auth().currentUser.uid;
// name= firebase.auth().currentUser.email;
/*
    var id =event.target.id;
    //console.log(id);
    var x = document.getElementById(id).value;
*/

  //for prototype database
  //const rootRefup=firebase.database().ref().child("/ESP8266_Test/ESP8266_Test/User 0/Node 1/20190915/Commands");     //update command
 
 
 
 /*
  const rootRefupst=firebase.database().ref().child("/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-'+x+'/20190915/Light_Status/Current"); //update status
  const rootRef=firebase.database().ref().child("/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-'+x+'/20190915/Light_Status/Current/Light1");  //read
*/



  //const rootRefupst=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-1/20190915/Light_Status/Current'); //update status
  const rootRefupst=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-1/'+fulldate+'/Light_Status/Current'); //update status
  const rootRef=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-1/'+fulldate+'/Light_Status/Current/Light1');  //read
  



  rootRef.on('value',snap=>{
    this.setState({
     Light1:snap.val()
   });
  });
 /*
  if (this.state.LightC==true){
  
    rootRefup.update ({
      "LightC": 1,
      });

      rootRefupst.update ({
        "Light1": 0,
        });
  

    
 }

    if(this.state.LightC==false){
    rootRefup.update ({
      "LightC": 1,
      });

      rootRefupst.update ({
        "Light1": 1,
        });
  

  }
 */

 if(this.state.Light1==true){
  rootRefupst.update ({
    "Light1": 0,
    });

 }
 if(this.state.Light1==false){
  rootRefupst.update ({
    "Light1": 1,
    });
 }
  
}


  

render() {
   const { LightC,Light1 } = this.state;
      if (this.state.Light1==true){
          return(
                <div class="wrapper">
                  
                       <button onClick={this.openModal}>switch on lights</button>
                      

                 
                </div>
                );
        }
      else if(this.state.Light1==false){
          return (
                 <div class="wrapper">
                       <button onClick={this.openModal}>switch off lights</button>
                       
                 </div>
        );
        }
}



}


export default withFirebase(WriteData);
