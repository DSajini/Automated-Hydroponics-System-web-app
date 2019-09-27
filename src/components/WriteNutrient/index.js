import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import * as firebase from 'firebase';
import './WriteNutrient.css';

var INITIAL_STATE = {
 
  
  NutriC:0,          //addition 
  
};


class WriteNutrient extends Component {
constructor(props){
      super(props);
      this.state={ ...INITIAL_STATE};
      this.openModal = this.openModal.bind(this);
      
}


openModal() {
  var curuser='';

  if (firebase.auth().currentUser !== null) 
  curuser= firebase.auth().currentUser.uid;

  /*for nod MCU database
  const rootRefup=firebase.database().ref().child("/ESP8266_Test/User 0/Node 1/20190828/Commands");     //update
  const rootRef=firebase.database().ref().child("/ESP8266_Test/User 0/Node 1/20190828/Commands/NutriC");  //read addition 
  
  */

  //for  prototype database
  const rootRefup=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-1/20190915/Commands');     //update
  const rootRef=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-1/20190915/Commands/NutriC');  //read addition 
  
  rootRef.on('value',snap=>{
    this.setState({
     NutriC:snap.val()
   });
  });

/*
  rootRef.on('value',snap=>{
    this.setState({
     NutriC:snap.val()
   });
  });
 */
if(this.state.NutriC==false){
 
rootRefup.update ({
  "NutriC": 1,
  });

}
}


  

render() {
   const { NutriC } = this.state;
      if (this.state.NutriC==true){
          return(
                <div>
                  
                      
                      <p> Change has been done. </p> <br></br>
                      </div>
                      

                 
              
                );
        }

      
      else if(this.state.NutriC==false){
          return (
                 <div class="wrapper">
                       <button onClick={this.openModal}>Add Nutrient</button>
                       
                      
                       </div>
                       
                 
        );
        }

    
   
}


}


export default withFirebase(WriteNutrient);
