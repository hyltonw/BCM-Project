import axios from 'axios'

// async function getAllLocations(email) {
//     return await axios.get(`http://localhost:8080/api/files/${email}`)
//         .then(res => res.data)
//         .catch(err => Promise.reject(err));
// }

export async function getAllLocations(url){
    const locations=await axios.get(`http://bcmapplication-env.eba-yuipzc2r.us-east-2.elasticbeanstalk.com/api/files/${url}`)
    // console.log(locations.data)
    const data=locations.data;
    return data;

}

export function submitFiles(ReviewedFile){
    axios.post(`http://bcmapplication-env.eba-yuipzc2r.us-east-2.elasticbeanstalk.com/api/reviewed`,ReviewedFile)
}

export default (getAllLocations,submitFiles)