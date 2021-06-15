import './AdminPage.css'
import React, {useEffect, useState} from 'react';
import { Hint } from 'react-autocomplete-hint';
import {getAllUsers,getAllLocations,transferFiles,deleteFiles} from '../Service/fileService'


export function AdminPage(){

    const [hintData, setHintData] = useState([""])
    const [text, setText] =useState('')
    const [locations, setLocations] =useState([]);

    var locationList = [];
    let prevComma = 0;
    var oldEmail = "oldEmail";
    var newEmail = "newEmail";

    useEffect(() => {
        getAllUsers().then((response) => 
        {
            setHintData(response)
        })
    },[])

        //this fetches the file locations after a user clicks off the input box for emails
    function fetchLocations(){
        var url = document.getElementById('old-email').value.toString();
        url = url.replace(/[^a-z0-9@.]/gi,'');
        if(url == null || url == undefined || url.length === 0){

        } else {
            url = url.substring(0, url.indexOf('@'))
            getAllLocations(url).then((response) => {
                setLocations(response.location)
            })
        }    
    }

    if(document.getElementById('old-email')!= undefined && document.getElementById('new-email')!=undefined){
        oldEmail = document.getElementById('old-email').value;
        console.log(oldEmail)
        console.log(newEmail)

    }

    function transferOwnership(){
        newEmail = document.getElementById('new-email').value;
        var newFileLocation = {
            email : newEmail
        }
        transferFiles(newFileLocation,oldEmail)
        var url = newEmail
        url = url.substring(0, url.indexOf('@'))
        setTimeout(function(){ window.location.replace(`https://main.d31lfvg6uu6z53.amplifyapp.com/user/${url}`) }, 1000);
        // deleteFiles(url)
    }
    if(hintData.includes(oldEmail)){
        if(locations.length > 1 &&locations.includes(",")){
            for(let i=0;i<locations.length;i++ && locations.length!==0){
                if(locations.charAt(i) === ","){
                    var lastLocation = locations.slice(prevComma,i)
                    if(!locationList.includes(lastLocation)){
                        locationList.push(locations.slice(prevComma,i))
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
    }

    console.log(locationList)

    return (
    <div id="admin-container">
        <div id="admin-layout">
            <p>Select which user you would like to transfer file ownership away from</p>
            <p>enter the new email you would like to transfer ownership to</p>
            <div id="user-select">
                <Hint options={hintData} allowTabFill>
                    <input 
                    id="old-email"
                    onBlur={fetchLocations}
                    placeholder="old email"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    pattern="[A-Za-z]"
                    />
                </Hint>

                {/* <input
                id="old-email"
                onBlur={fetchLocations}
                placeholder="old email"
                value={text}
                onChange={e => setText(e.target.value)}
                /> */}

                <input
                id="new-email"
                placeholder="new email"
                />
            </div>
            <div id="transfer-button">
            </div>
            {locationList.length>0 ? (
            <div>
                <div id="transfer-button">
                    <p>this will transfer the following {locationList.length} files</p>
                    <button onClick={transferOwnership} disabled={false}>Transfer</button>
                </div>
                <div id="file-list">
                <ol>
                    {locationList.map((locations) => (
                    <li>{locations}</li>
                    ))}
                </ol>
            </div>
            </div>
            ):(
            <div>
                <p>The files will populate here once and email is entered</p>
            </div>
            )}
            
        </div>
    </div>
)}
export default (AdminPage)