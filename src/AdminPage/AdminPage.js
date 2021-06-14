import './AdminPage.css'
import React, {useEffect, useState} from 'react';
import { Hint } from 'react-autocomplete-hint';
import {getAllUsers,getAllLocations,transferFiles,deleteFiles} from '../Service/fileService'


export function AdminPage(){

    const [hintData, setHintData] = useState([""])
    const [text, setText] =useState('')
    const [locations, setLocations] =useState('');

    var locationList = [];
    let prevComma = 0;

    useEffect(() => {
        getAllUsers().then((response) => 
        {
            setHintData(response)
        })
    },[])

        //this fetches the file locations after a user clicks off the input box for emails
    function fetchLocations(){
        var url = document.getElementById('old-email').value;
        url = url.substring(0, url.indexOf('@'))


        getAllLocations(url).then((response) => {
            setLocations(response.location)
        })
        
    }

    function transferOwnership(){

        var oldEmail = document.getElementById('old-email').value;
        var newEmail = document.getElementById('new-email').value;
        var newFileLocation = {
            email : newEmail
        }
        transferFiles(newFileLocation,oldEmail)
        var url = newEmail
        url = url.substring(0, url.indexOf('@'))
        setTimeout(function(){ window.location.replace(`https://main.d31lfvg6uu6z53.amplifyapp.com/user/${url}`) }, 1000);
        deleteFiles(url)
        
    }

    console.log(locations)
    console.log(locationList)
    return (
    <div id="submissionText">
        <div class="container">
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
                    <p>this will transfer the following files</p>
                    <button onClick={transferOwnership} disabled={false}>Transfer</button>
                </div>
                <div id="file-list">
                    
                </div>
            </div>
        </div>
    </div>
)}
export default (AdminPage)