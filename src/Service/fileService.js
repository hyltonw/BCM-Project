import axios from 'axios'

// async function getAllLocations(email) {
//     return await axios.get(`http://localhost:8080/api/files/${email}`)
//         .then(res => res.data)
//         .catch(err => Promise.reject(err));
// }

export async function getAllLocations(url){
    const locations=await axios.get(`https://bcm-project.bcmfilelverification.com/api/files/${url}`)
    const data=locations.data;
    return data;

}

export function submitFiles(ReviewedFile){
    axios.post(`https://bcm-project.bcmfilelverification.com/api/reviewed/`,ReviewedFile)
    window.location.replace(`https://main.d31lfvg6uu6z53.amplifyapp.com/submitted`)
}

export async function getAllUsers(){
    const users =await axios.get(`https://bcm-project.bcmfilelverification.com/api/files/allUsers`)
    const data = users.data;
    return data;
}

export async function transferFiles(newOwner,oldOwner){
    axios.put(`https://bcm-project.bcmfilelverification.com/api/files/${oldOwner}`,newOwner)
    // axios.put(`http://localhost:8080/api/files/${oldOwner}`,newOwner)
}

export function deleteFiles(url){
    axios.delete(`http://localhost:8080/api/files/${url}`)
}

export default (getAllLocations,submitFiles,getAllUsers,deleteFiles)