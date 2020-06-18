import * as actionTypes from '../actions/actionTypes'

const intitialState  = {
    data:null,
    error:null,
    createScream:false
}


const screamReducer = (state = intitialState ,action)=>{

    switch(action.type){
    

        case actionTypes.GET_SCREAM_SUCCESS:
            return{
                ...state,
                data: action.data
            }

        case actionTypes.GET_SCREAM_FAILURE:
            return{
                ...state,
                error:action.err
            }

        case actionTypes.INCREMENT_LIKE:
            return{
                ...state,
                data:action.data
            }

        case actionTypes.DECREMENT_LIKE:
            return{
                ...state,
                data:action.data
            }

        case actionTypes.DELETE_SCREAM:
            const data = state.data.filter((scream)=>scream.id !== action.id)
            return{
                ...state,
                data:data
            }

        case actionTypes.CREATE_SCREAM:
            const scream = [...state.data]
            const newArray = [action.data]
            const screamData = newArray.concat(scream)
            return{
                ...state,
                data:screamData
            }

        default : return state
    }
}

export default screamReducer