import * as actionTypes from '../actions/actionTypes'
import scream from '../../Components/Scream/scream';

const initialState = {
    credentials:null,
    likes:null,
    notifications:null,
    error:null
}

 const userReducer = (state = initialState , action)=>{

    switch(action.type){
        case actionTypes.GET_AUTH_USER_DETAILS_SUCCESS:
            return{
                ...state,
                credentials:action.userDetails.credentials,
                likes:action.userDetails.likes,
                notifications:action.userDetails.notifications,

            }

        

        case actionTypes.GET_AUTH_USER_DETAILS_FAILURE:
            return{
                ...state,
                error:action.error,
            }


        case actionTypes.LIKESCREAM:
            
            return{
                ...state,
                likes:[...state.likes ,action.like]

            }

        case actionTypes.UNLIKESCREAM:
            const updatedlikes = state.likes.filter((like)=>like.screamId !== action.id)
            
            return{
                ...state,
                likes:updatedlikes
            }

        case actionTypes.REMOVE_USER_DETAILS:
            return{
                ...state,
                credentials:null,
                likes:null,
                notifications:null,
                error:null

            }

        case actionTypes.MARK_NOTIFICATIONS_READ:

            state.notifications.forEach(not=>{
                not.read = true
            })
            return{
                ...state

            }

        default: return state
    }

}


export default userReducer;