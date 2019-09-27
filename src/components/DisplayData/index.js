import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import * as firebase from 'firebase';

import './DisplayData.css';
import WriteData from '../WriteData';
import WriteNutrient from '../WriteNutrient';






const INITIAL_STATE = {
  Temp1: 0,
  Water1: 0,
  Light1:0,
  Nutri1:0,
  pH1:0,
 // uname:'',
  
 
  
};


class DisplayData extends Component {
constructor(props){
      super(props);
      this.state={ ...INITIAL_STATE};
}



componentDidMount(){

  var curuser='';
  var name='';



  if (firebase.auth().currentUser !== null) 
        curuser= firebase.auth().currentUser.uid;
        name= firebase.auth().currentUser.email;
       
       
       // refnode = firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/3') ;     


 
  const rootRef1=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/1/20190828/Temp_Value/Current/Temp1');
  const rootRef2=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/1/20190828/Water_Level/Current/Water1');
  const rootRef3=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/1/20190828/Light_Status/Current/Light1');
  const rootRef4=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/1/20190828/Nutri_Level/Current/Nutri1');
  const rootRef5=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/1/20190828/pH_Value/Current/pH1');

 
 
 
 rootRef1.on('value',snap=>{
    this.setState({
     Temp1:snap.val()
   });
  });


  rootRef2.on('value',snap=>{
    this.setState({
     Water1:snap.val()
   });
  });

  rootRef3.on('value',snap=>{
    this.setState({
     Light1:snap.val()
   });
  });


  rootRef4.on('value',snap=>{
    this.setState({
     Nutri1:snap.val()
   });
  });

  rootRef5.on('value',snap=>{
    this.setState({
     pH1:snap.val()
   });
  });

  
 }



  
render() {
   const { Temp1,Water1,Light1,Nutri1,pH1} = this.state;
   var lightstatus='';
   var waterlevelstatus='';
   var nutrientlevelstatus='';
   var curuser='';
   var name='';
   
  

   
  
   
      if(Light1==1){
          lightstatus='On';
      }
      else if(Light1==0){
        lightstatus='Off';
      }
      if(Water1==1){
        waterlevelstatus='Normal';
      }

      else if(Water1==0){
        waterlevelstatus='Low';
      }
      if(Nutri1==1){
        nutrientlevelstatus='Normal';
      }
      else if(Nutri1==0){
        nutrientlevelstatus='Low';
      }
      
      if (firebase.auth().currentUser !== null) 
        curuser= firebase.auth().currentUser.uid;
        name= firebase.auth().currentUser.email;
        



 
        //get date  2019-09-08
        var today = new Date();
        var date=today.toISOString().substring(0, 10)
        //console.log(date);


       //checking the no of nodes the user has

        var ref= firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser) ;
        
        var count=0;
        var j=0;
  
   

       
        


        
        
        
      return(
        <div class="bg">
            <h1>SMARTPONICS</h1>
            <br></br>
      
            <h3>-  A Smart Way To Monitor Your Hydroponics Systems.  -</h3>
            <p>Current user   :    {name}   </p>
            <p>Current user   :    {curuser}   </p><br></br>
           
           
            <p>Date :    {date}   </p>
        
        
            <br>
            </br>
            <br></br>
         
          <div class="row">
            <div class="column">
              <div class="card">
                <div class="container">
                  <h4><b>pH value</b></h4> 
                  <p>Current pH value    :    {pH1}   </p><br></br> 
                 
                  


                </div>
              </div>
            </div>

            <div class="column">
              <div class="card">
                <div class="container">
                  <h4><b>Temperature</b></h4> 
                  <p>Current Temperature    :    {Temp1} C  </p><br></br> 
                </div>
              </div>
            </div>

            


            <div class="column">
              <div class="card">
                <div class="container">
                  <h4><b>Lights</b></h4> 
                  <p>  Current light status : {lightstatus}  </p>  
                  <WriteData/>
                </div>
              </div>
            </div>
          </div>
          <br>
          </br>

          <div class="row">
          <div class="column">
              <div class="card">
                <div class="container">
                  <h4><b>Water Level</b></h4> 
                  <p>  Current Water level : {waterlevelstatus} </p> <br></br>
                </div>
              </div>
            </div>

            <div class="column">
              <div class="card">
                <div class="container">
                  <h4><b>Nutrient Level</b></h4> 
                  <p>  Current Nutrient level : {nutrientlevelstatus} </p> <br></br>
                  <WriteNutrient/>
                  
                </div>
              </div>
            </div>

            


            <div class="column">
              <div class="card">
                <div class="container">
                  <p><b>Additional Data</b></p> 
                  <p>  Additional data</p> <br></br>
                </div>
              </div>
            </div>



          </div>

          

          <br></br>
          <br></br>




        
            
           
            
         

            
               
               
            
            


        </div>
        );
}

}

export default withFirebase(DisplayData);
