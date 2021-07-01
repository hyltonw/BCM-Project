import "./AdminPage.css";
import React, { useEffect, useState } from "react";
import { Hint } from "react-autocomplete-hint";
import {
  getAllUsers,
  getAllLocations,
  transferFiles,
  deleteFiles,
  addTransferLog,
} from "../Service/fileService";

export function AdminPage() {
  const [hintData, setHintData] = useState([""]);
  const [text, setText] = useState("");
  const [locations, setLocations] = useState("");
  const [newEmail, setNewEmail] = useState("newEmail");

  let locationList = [];
  let prevComma = 0;
  let oldEmail = "oldEmail";
  let isValidEmail = false;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    getAllUsers().then((response) => {
      setHintData(response);
    });
  }, []);

  function removeDuplicates(allLocations) {
    var prevComma = 0;

    allLocations = allLocations.replace(/ /g, "");
    if (allLocations.length > 1 && allLocations.includes(",")) {
      for (var i = 0; i <= allLocations.length; i++) {
        if (allLocations.charAt(i) === "," || i === allLocations.length) {
          var currentLocation = allLocations.substring(prevComma, i);
          if (locationList.includes(currentLocation)) {
            prevComma = i + 1;
          } else {
            locationList.push(currentLocation);
            prevComma = i + 1;
          }
        }
      }
    } else {
      locationList.push(allLocations);
    }
  }

  function updateNewEmail() {
    if (document.getElementById("new-email").value !== null) {
      setNewEmail(document.getElementById("new-email").value);
    } else {
      setNewEmail("");
    }
  }
  isValidEmail = re.test(String(newEmail).toLowerCase());
  //  && hintData.includes(oldEmail);

  function clearLocations() {
    setLocations("");
  }

  //this fetches the file locations after a user clicks off the input box for emails
  async function fetchLocations() {
    var url = document.getElementById("old-email").value.toString();
    url = url.replace(/[^a-z0-9@.]/gi, "");
    if (url === null || url === undefined || url.length === 0) {
      alert("invalid email entered");
    } else {
      url = url.substring(0, url.indexOf("@"));
      getAllLocations(url).then((response) => {
        setLocations(response.location);
      });
    }
  }

  if (
    document.getElementById("old-email") !== null &&
    document.getElementById("new-email") !== null
  ) {
    oldEmail = document.getElementById("old-email").value;
  }

  function transferOwnership() {
    setNewEmail(document.getElementById("new-email").value);
    var newFileLocation = {
      email: newEmail,
      url: newEmail.substring(0, newEmail.indexOf("@")),
    };
    var oldFileLocation = {
      email: oldEmail,
      url: oldEmail.substring(0, oldEmail.indexOf("@")),
    };
    transferFiles(newFileLocation, oldFileLocation.url);
    var transferLog = {
      originalFileOwner: oldEmail,
      newFileOwner: newEmail,
    };
    addTransferLog(transferLog);
    alert("Files transfered");
    setTimeout(function () {
      window.location.reload();
    }, 1000);
    // setTimeout(function(){ window.location.replace(`https://main.d31lfvg6uu6z53.amplifyapp.com/user/${newFileLocation.url}`) }, 1000);
    // deleteFiles(url)
  }

  if (locations !== undefined && locations !== null && locations.length > 1) {
    removeDuplicates(locations);
  }

  return (
    <div id="admin-container">
      <div id="admin-layout">
        <p>
          Select which user you would like to transfer file ownership away from
        </p>
        <p>enter the new email you would like to transfer ownership to</p>

        <div id="user-select">
          <Hint options={hintData} allowTabFill>
            <input
              id="old-email"
              onBlur={fetchLocations}
              placeholder="old email"
              value={text}
              onChange={(e) => setText(e.target.value)}
              pattern="[A-Za-z]"
              onFocus={clearLocations}
            />
          </Hint>
          <input
            id="new-email"
            placeholder="new email"
            onBlur={updateNewEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        {locationList.length > 0 ? (
          <div>
            <div id="transfer-button">
              <p>
                this will transfer the following {locationList.length} files
              </p>
            </div>
            <div id="file-list">
              <ol id="ordered-list">
                {locationList.map((locations) => (
                  <li key={locations}>{locations}</li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <div>
            <p>The files will populate here once and email is entered</p>
          </div>
        )}
      </div>
      <div id="transfer-button-div">
        <button onClick={transferOwnership} disabled={!isValidEmail}>
          Transfer
        </button>
      </div>
    </div>
  );
}
export default AdminPage;
