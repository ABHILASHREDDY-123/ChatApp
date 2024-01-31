import ACTION_TYPES from "./actions"
const addUser = (user)=>{
    return {
        type:ACTION_TYPES.LOGIN_USER,
        payload:user
    }
}

const addToken = (token)=>{
    return {
        type:ACTION_TYPES.ADD_TOKEN,
        payload:token
    }
}

const createSuccess = (message)=>{
    return {
        type:ACTION_TYPES.SUCCESS,
        payload:message
    }
}

const createError = (message)=>{
       return {
        type:ACTION_TYPES.ERROR,
        payload:message
    }
}

export {addUser,addToken,createError,createSuccess};