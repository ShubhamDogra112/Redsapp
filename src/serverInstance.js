import axios from 'axios'

const instance  = axios.create({
    baseURL:'https://us-central1-redsapp-d5e82.cloudfunctions.net/api',
    // headers:{
    //     authorization:`Bearer ${token}`
    // }

})


export default instance