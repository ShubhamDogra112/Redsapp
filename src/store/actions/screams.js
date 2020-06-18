import * as actionTypes from './actionTypes'
import axios from '../../serverInstance'


export const getscream = ()=>{
    return dispatch=>{
    
        
        axios.get("/screams")
        .then(res=>{
            // console.log(res)
            dispatch(get_scream_success(res.data))
        })

        .catch(err=>{
            if(err.response){
            dispatch(getScreamFail(err.response.data.message))


            }
        })
    }

}

export const delete_scream_success = (screamId)=>{
    return{
        type:actionTypes.DELETE_SCREAM,
        id:screamId
    }
}

export const create_scream = (data)=>{
    return{
        type:actionTypes.CREATE_SCREAM,
        data:data
    }
}

export const delete_scream = (screamId)=>{
    return dispatch=>{


        dispatch(delete_scream_success(screamId))

        axios.delete(`/scream/${screamId}`)
        .then(res=>{
            // console.log(res)


        })
        .catch(err=>{
            console.log(err)
        })

    }
    
    
}




export const getScreamFail = (err)=>{
    return{
        type:actionTypes.GET_SCREAM_FAILURE,
        err:err
    }
}

export const get_scream_success = (data)=>{
    return{
        type:actionTypes.GET_SCREAM_SUCCESS,
        data:data
    }
}

export const increment_like = (data)=>{
    return{
        type:actionTypes.INCREMENT_LIKE,
        data:data
    }
}


export const decrement_like = (data)=>{
    return{
        type:actionTypes.DECREMENT_LIKE,
        data:data
    }
}