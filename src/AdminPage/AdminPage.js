import './AdminPage.css'

export function AdminPage(){
    return (
    <div id="submissionText">
        <div class="container">
            <div id="admin-layout">
                <p>Select which user you would like to transfer file ownership away from</p>
                <p>enter the new email you would like to transfer ownership to</p>
                <div id="user-select">
                    <select>
                        <option>user1</option>
                        <option>user2</option>
                        <option>user3</option>
                        <option>user4</option>
                    </select>
                    <input placeholder="new email"></input>
                </div>
                <div id="transfer-button">
                    <p>this will transfer the following files</p>
                    <button>Transfer</button>
                </div>
                <div id="file-list">
                    
                </div>
            </div>
        </div>
    </div>
)}
export default (AdminPage)