import axios from 'axios'
import './SingleLocation.css'

function SingleLocation(fileLocation) {


    return(
        <div id="singleFile">
            <p id="fileLocation">{fileLocation}</p>
            <div id="radioDiv">
                <input type="radio" value="keep" name="selection"></input>
                <label>keep</label>
                <input type="radio" value="delete" name="selection"></input>
                <label>delete</label>
                <input type="radio" value="admin" name="selection"></input>
                <label>admin</label>
            </div>
        </div>
    )
} 

export default (SingleLocation)