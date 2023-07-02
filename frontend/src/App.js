
import React from 'react';
import axios from 'axios';
const baseUrl='http://localhost:5000'
const addPlacement=(data)=>{
  var promise= new Promise((resolve)=>{
  
    var dataString=`email=${encodeURIComponent(data.email)}&phoneNumber=${encodeURIComponent(data.phoneNumber)}}`;
  fetch("/identify",{"method":"POST","headers":{"Content-Type":"application/x-www-form-urlencoded"} ,"body":dataString
  }).then((response)=>{return response.json();}).then((responseJSON)=>{ resolve(responseJSON); })
  
  })
  return promise;
  }
    

function App() {
  
  
  
  
  return (
    <div >
      <h1>Fulpkart.com </h1>
      <h2>Says hi here!</h2>
      <StudentAddComponent />
      <p id="result" ></p>
    </div>
  );
}



const StudentAddComponent=()=>{
  const [phoneNumber,setphoneNumber]=React.useState("");
  const [email,setemail]=React.useState("");
  const [phoneNumberError,setphoneNumberError]=React.useState("");
  const [emailError,setemailError]=React.useState("");

  const clearAllErrors=()=>{
 
    
  setphoneNumberError("");
  setemailError("");
  }
  const clearForm=()=>{
  setphoneNumber("");
  setemail("");
  }
  const addClickHandler=()=>{
  clearAllErrors();
  var hasErrors=false;
  if(email=="" && phoneNumber=="") 
  {
  setemailError("*");
  setphoneNumberError("*");
  document.getElementById('result').innerHTML="";
  hasErrors=true;
  }
  if(hasErrors==true) return;
  var data={
  "email":email,
  "phoneNumber":phoneNumber,
  };
  addPlacement(data).then((responseJSON)=>{
    document.getElementById('result').innerHTML=JSON.stringify(responseJSON);
  })
  
  }
  const phoneNumberChanged=(ev)=>{
  setphoneNumber(ev.currentTarget.value);
  }
  const emailChanged=(ev)=>{
  setemail(ev.currentTarget.value);
  }
  return (<div> 
  
  
  
  
  <label htmlFor="email">Email</label>&nbsp;
  <input type='text' value={email} onChange={emailChanged} size={45} />
  <span style={{"color":"red"}}>{emailError}</span>
  <br/>
  
  
  
  <label htmlFor='phoneNumber'>Phone Number</label>&nbsp;
  <input type='text' value={phoneNumber} onChange={phoneNumberChanged} size={35}/>
  <span style={{"color":"red"}}>{phoneNumberError}</span>
  <br/>
  <button type='button' onClick={addClickHandler} >Identfiy</button>&nbsp;&nbsp;&nbsp;
  </div>)
  }
  
  
  
export default App;
