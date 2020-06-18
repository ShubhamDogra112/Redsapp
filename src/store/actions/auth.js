import * as actionTypes from './actionTypes'
import axios from '../../serverInstance'
import jwtDecode from 'jwt-decode'



export const auth_start = ()=>{
    return{
        type:actionTypes.AUTH_START
    }

}

export const auth_check_timeout = (time)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(auth_logout())
        } , time)
    }

}

export const auth_logout= ()=>{

    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    delete axios.defaults.headers.common["authorization"]

    return{
        type:actionTypes.LOGOUT
    }

}

export const auth_failure= (error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        err:error
    }

}

export const auth_success= (token)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        token:token
    }
}

export const auth= ( email , password , props , handle , confirmPassword)=>{
    return dispatch=>{

        dispatch(auth_start())

        let user;
        let url;


        if(handle.trim() === ''){
            user = {
                email:email,
                password:password
            }
    
             url = "/login"

            

        }

        else{
            user={
                email:email,
                password:password,
                confirmPassword:confirmPassword,
                handle:handle
            }

            url= '/signUp'
        }

        

     
        axios.post(url,user)
        .then(res=>{

            const token = res.data.token
            let decodedToken = jwtDecode(token)
            let expirationDate = new Date(decodedToken.exp *1000);
            localStorage.setItem('token',token)
            localStorage.setItem('expirationDate',expirationDate)

            dispatch(auth_success(token))
            props.history.push("/home")

            axios.defaults.headers.common['authorization'] = `Bearer ${token}`

            return axios.get('/user')
        })
        .then(res=>{
            dispatch(auth_user_success(res.data))
        })
        .catch(err=>{
            if(err.response){   

            dispatch(auth_failure(err.response.data.message))

            }

//when internet is not connected
            else dispatch(auth_failure(err.message))
        })



    }
}

export const auth_check = ()=>{

    return dispatch=>{
        let token = localStorage.getItem('token');
        let expirationDate = new Date(localStorage.getItem('expirationDate'))

      
        if(!token){
          
          dispatch(auth_logout())

        }

        else if(expirationDate > new Date()){

            axios.defaults.headers.common['authorization'] = `Bearer ${token}`

            dispatch(get_user_details())
            dispatch(auth_success(token))
            dispatch(auth_check_timeout((expirationDate.getTime() - new Date().getTime())))
        }

        else{
            dispatch(auth_logout())
        }
        }

}


export const auth_user_failure =(err)=>{
    return{
        type:actionTypes.GET_AUTH_USER_DETAILS_FAILURE,
        error:err
    }
}

export const get_user_details = ()=>{
    return dispatch=>{

    
        axios.get('/user')
    .then(res=>{
        console.log(res)
        dispatch(auth_user_success(res.data))
    })
    .catch(err=>{
        if(err.response){
            
        }
    })

    }
    
}

export const remove_user_details = ()=>{
    return{
        type:actionTypes.REMOVE_USER_DETAILS
    }
}



export const auth_user_success =(userDetails)=>{
    return{
        type:actionTypes.GET_AUTH_USER_DETAILS_SUCCESS,
        userDetails:userDetails
    }
}


export const likescream = (like)=>{
    return{
        type:actionTypes.LIKESCREAM,
        like:like
    }
}

export const unlikescream = (screamId)=>{
    return{
        type:actionTypes.UNLIKESCREAM,
        id:screamId
    }
}


export const marknotificationsRead = (notificationsIds)=>{

    return dispatch=>{

    axios.post("/notifications" , notificationsIds)


        .then(res=>{
            // console.log(res)
            dispatch({
                type:actionTypes.MARK_NOTIFICATIONS_READ
            })
    
        })
    
        .catch(err=>{
    
            console.log(err)
    
        })

    }
 

}



