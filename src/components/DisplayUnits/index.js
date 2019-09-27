import React, { Component } from 'react';
import Sidebar from "react-sidebar";

import * as firebase from 'firebase';
import WriteData from '../WriteData';
import WriteNutrient from '../WriteNutrient';
import './DisplayUnits.css';
import SignOutButton from '../SignOut';



const INITIAL_STATE = {
  Temp1: 0,
  Water1: 0,
  Light1:0,
  Nutri1:0,
  pH1:0,
 
  
 
  
};
 
class DisplayUnits extends React.Component {
  constructor(props) {
    super(props);
    this.state={ ...INITIAL_STATE};
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }


  openModal(event) {

    var curuser='';
    var name='';

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
          name= firebase.auth().currentUser.email;
    
    var id =event.target.id;
    console.log(fulldate);
    var x = document.getElementById(id).value;
    //console.log(x);


    const rootRef1=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-'+x+'/'+fulldate+'/Temp_Value/Current/Temp1');
    const rootRef2=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-'+x+'/'+fulldate+'/Water_Level/Current/Water1');
    const rootRef3=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-'+x+'/'+fulldate+'/Light_Status/Current/Light1');
    const rootRef4=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-'+x+'/'+fulldate+'/Nutri_Level/Current/Nutri1');
    const rootRef5=firebase.database().ref().child('/ESP8266_Test/ESP8266_Test/'+curuser+'/NODE-'+x+'/'+fulldate+'/pH_Value/Current/pH1');

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
      lightstatus='OFF';
    }
    else if(Light1==0){
      lightstatus='ON';
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



    return (
      <div class="bg">
      <Sidebar
        sidebar={
          <div>
            <br></br>
          <h5>AUTOPONICS - MY UNITS    </h5>
          <br></br><br></br>
          
          <button id="1" value="1" onClick={this.openModal}>Node 1</button>
          <br></br>
          <button id="2" value="2" onClick={this.openModal}>Node 2</button>
          <br></br>
          <button id="3" value="3" onClick={this.openModal}>Node 3</button>
          <br></br>
          <button id="4" value="4" onClick={this.openModal}>Node 4</button>
          <br></br>
          <button id="5" value="5" onClick={this.openModal}>Node 5 </button>
          <br></br>
          <br></br>
          <br></br>
          <SignOutButton />
          
          </div>
          }
          
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      >
       
        <button onClick={() => this.onSetSidebarOpen(true)}>
         MY  UNITS
        </button>

        
      </Sidebar>

      <h1>AUTOPONICS</h1>
      <br></br>
      
            <h3>-  A Smart Way To Monitor Your Hydroponics Systems.  -</h3>
            <h5>Current user   :    {name}   </h5>
            <h5>Current user   :    {curuser}   </h5><br></br>
           
           
                  
        
            <br>
            </br>
            <br></br>
         
          <div class="row">
            <div class="column">
              <div class="card">
                <div class="container">
                  <h4><b>pH value</b></h4> 
                  <h5>Current pH Value    :    {pH1}   </h5><br></br> 
                 
                  


                </div>
              </div>
            </div>

            <div class="column">
              <div class="card">
                <div class="container">
                  <h4><b>Temperature</b></h4> 
                  <h5>Current Temperature    :    {Temp1} C  </h5><br></br> 
                </div>
              </div>
            </div>

            


            <div class="column">
              <div class="card">
                <div class="container">
                  <h4><b>Lights</b></h4> 
                  <h5>  Current Light Status : {lightstatus}  </h5>  
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
                  <h5>  Current Water Level : {waterlevelstatus} </h5> <br></br>
                </div>
              </div>
            </div>

            <div class="column">
              <div class="card">
                <div class="container">
                  <h4><b>Nutrient Level</b></h4> 
                  <h5>  Current Nutrient Level : {nutrientlevelstatus} </h5> <br></br>
                  <WriteNutrient/>
                  
                </div>
              </div>
            </div>

            


            <div class="column">
              <div class="card">
                <div class="container">
                  <h4><b>Additional Data</b></h4> 
                  <h5>  Additional Data</h5> <br></br>
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
 
export default DisplayUnits;