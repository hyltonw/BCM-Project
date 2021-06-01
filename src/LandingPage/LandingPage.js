import { useParams } from 'react-router-dom'
import {getAllLocations, submitFiles} from '../Service/fileService'
import React, { useState, useEffect } from 'react';

export function LandingPage(){
// const email = "saniesal@bcm.edu"


const [locations, setLocations] = useState("LOCATION");
const [displayName, setDisplayName] = useState("USER");
const [firstName, setFirstName] = useState("FIRST NAME")
const [lastName, setLastName] = useState("LAST NAME")
const [email, setEmail] = useState("EMAIL")
const [cards, setCards] = useState([]);

const {url} = useParams();

var locationList = [];
let prevComma = 0;

useEffect(()=> {
  getAllLocations(url).then((response)=>
  {
    if(response.firstName != ""){
        setFirstName(response.firstName)
        setLastName(response.lastName)
        setDisplayName(response.firstName +" "+ response.lastName)
    } else {
        setDisplayName(response.url)
    }
    
    setEmail(response.email)
    setLocations(response.location.replace(/\s/g, ''))
  })
},[])

if(locations.includes(",") && locations.length > 1){
    for(let i=0;i<locations.length;i++ && locations.length!=0){
        if(locations.charAt(i) === ","){
            if(!locationList.includes(locations.slice(prevComma,i))){
                locationList.push(locations.slice(prevComma,i))
            }
        prevComma = i+1;
        }
    }
    locationList.push(locations.slice(prevComma,locations.length))
} else {
    locationList.push(locations)
}

function submitForm(){
    if(locationList.length===1){
        console.log(locationList[0])
    }
    for(let i=0;i<locationList.length;i++){
        const selection = document.querySelectorAll(`input[name="${locationList[i]}"]`)
        console.log(locationList[i])
        console.log(document.querySelectorAll(`input[name="${locationList[i]}"]`))
        const ReviewedFile = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            location : locationList[i],
            keepFile : selection[0].checked,
            deleteFile : selection[1].checked,
            sendToIT :selection[2].checked
        }
        console.log(ReviewedFile)
        submitFiles(ReviewedFile)
    }
    
}

return (
    <div>
        <p>Hello, {displayName}! Please review the files that contain sensitive information below and select what you would like to do with them.</p>
        <div id="container">
            {locationList.map((locations) => (
            <div id="generated-file">
                <p id="filePath">{locations}</p>
                <div id="buttonDiv">
                    <input type="radio" value="save" name={locations} id={locations.substring(locations.length-10,locations.length-5)+"0"}></input>
                    <p>Save</p>
                    <input type="radio" value="delete" name={locations} id={locations.substring(locations.length-10,locations.length-5)+"1"}></input>
                    <p>Delete</p>
                    <input type="radio" value="send to IT" name={locations} id={locations.substring(locations.length-10,locations.length-5)+"2"}></input>
                    <p>send to IT</p>
                </div>
            </div>
            ))}
        </div>
        <button id="submitButton"  onClick={submitForm}>Submit</button>
    </div>
)}

//disabled={document.querySelectorAll(`input[name="${locationList[locationList.length-1]}"]`)}
export default (LandingPage)