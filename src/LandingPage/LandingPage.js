import { useParams } from 'react-router-dom'
import {getAllLocations, submitFiles, deleteFiles} from '../Service/fileService'
import React, { useState, useEffect } from 'react';

export function LandingPage(){
// const email = "saniesal@bcm.edu"


const [locations, setLocations] = useState("");
const [displayName, setDisplayName] = useState("USER");
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [email, setEmail] = useState("EMAIL")
const [allChecked, setAllChecked] = useState(false)
var radioCount = document.querySelectorAll(`input`)

const {url} = useParams();

var checkedLocations;
var buttonCount;
var locationList = [];
let prevComma = 0;

useEffect(()=> {
  getAllLocations(url).then((response)=>
  {


    if(response.firstName === "" || response.firstName == null){
        setDisplayName(response.url)
    } else {
        setFirstName(response.firstName)
        setLastName(response.lastName)
        setDisplayName(response.firstName +" "+ response.lastName)
    }
    
    setEmail(response.email)
    setLocations(response.location.replace(/\s/g, ''))
    radioCount = document.querySelectorAll(`input`)
    // console.log(radioCount)
  })
},[])


if(locations.includes(",") && locations.length > 1){
    for(let i=0;i<locations.length;i++ && locations.length!==0){
        if(locations.charAt(i) === ","){
            var lastLocation = locations.slice(prevComma,i)
            if(!locationList.includes(lastLocation)){
                locationList.push(locations.slice(prevComma,i))
                radioCount = document.querySelectorAll(`input`)
            }
        prevComma = i+1;
        }
    }
    if(!locationList.includes(locations.slice(prevComma,locations.length))){
        locationList.push(locations.slice(prevComma,locations.length))
    }
} else {
    locationList.push(locations)
}

function submitForm(){
    if(locationList.length===1){
        // console.log(locationList[0])
        // console.log("ONE")
        const selection = document.querySelectorAll(`input`)
        const ReviewedFile = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            location : locationList[0],
            keepFile : selection[0].checked,
            deleteFile : selection[1].checked,
            sendToIT :selection[2].checked
        }
        // console.log(ReviewedFile)
        submitFiles(ReviewedFile)
        // deleteFiles(url)
    } else {
        for(let i=0,j=0;j<locationList.length;i+=3,j++){
            // console.log(document.querySelectorAll(`input`))
            // const selection = document.querySelectorAll(`input[name="${locationList[i]}"]`)
            const selection = document.querySelectorAll(`input`)
            // console.log(locationList[j])
            // console.log(selection[0])
            // console.log(selection[1])
            // console.log(selection[2])
            const ReviewedFile = {
                firstName : firstName,
                lastName : lastName,
                email : email,
                location : locationList[j],
                keepFile : selection[i].checked,
                deleteFile : selection[i+1].checked,
                sendToIT :selection[i+2].checked
            }
            // console.log(ReviewedFile)
            submitFiles(ReviewedFile)
            // deleteFiles(url)
        }
    }
}

function updateCount(){
    buttonCount = document.querySelectorAll('input')
    if(buttonCount.length>0){
        checkedLocations = 0;
        for(let i=0;i<buttonCount.length;i++){
            if(buttonCount[i].checked === true){
                checkedLocations++;
            }
        }
    }
    setAllChecked(buttonCount.length/3 === checkedLocations)
}

return (
    <div>
        {locations==="WARNING" || locations.length===0 ? (
        <div>
            <div id="warning-container">
                <p>It appears your files have been transfered to an administrator.</p>
                <p>Please contact an administrator if you believe this has been done mistakenly.</p>
            </div>
        </div>

        ) : (
            <div id="items">
            <p>Hello, {displayName}! Please review the files that may contain sensitive information below and select what you would like to do with them.</p>
            <div class="container">
                {locationList.map((locations) => (
                <div id="generated-file">
                    <p id="filePath">{locations}</p>
                    <div id="buttonDiv">
                        <input type="radio" value="save" onChange={updateCount} name={locations} id={locations.substring(locations.length-10,locations.length-5)+"0"}></input>
                        <p>Does not contain sensitive information / Do not delete</p>
                        <input type="radio" value="delete" onChange={updateCount} name={locations} id={locations.substring(locations.length-10,locations.length-5)+"1"}></input>
                        <p>I have deleted this file</p>
                        <input type="radio" value="send to IT" onChange={updateCount} name={locations} id={locations.substring(locations.length-10,locations.length-5)+"2"}></input>
                        <p>send to IT</p>
                    </div>
                </div>
                ))}
            </div>
            <p>Verify that all files are marked before submitting this form</p>
            <button id="submitButton" disabled={!allChecked} onClick={submitForm}>Submit</button>
        </div>
        )}
        
    </div>
)}

//disabled={document.querySelectorAll(`input[name="${locationList[locationList.length-1]}"]`)}
export default (LandingPage)