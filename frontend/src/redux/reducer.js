import ACTION_TYPES from "./actions";
import {toast} from "react-toastify";
const initialState = {
    User : {},
    tokenName : "chat-app-token",
    token : localStorage.getItem("chat-app-token"),
    Chats : [],
    Recents : [],
    ErrorMessage : "",
    EventMessage : "",
}

const handleUserLogin = (state,payload)=>{
    return {...state,User:payload}
}

const handleUserLogOut = () =>{
    localStorage.removeItem("chat-app-token");
    return initialState;
}

const handleInitialiseChat = (state,payload) =>{
    return {...state,Chats:payload}
}

const handleSingleChat = (state,payload) =>{
    return {...state,Chats:[...state.Chats,payload]};
}

const handleMultiChats = (state,payload)=>{
    return {...state,Chats:[...state.Chats,...payload]}
}

const handleClearChats = (state)=>{
    return {...state,Chats:[]};
}

const handleAddToken = (state,payload)=>{
    return {...state,token:payload}
}

const handleError = (state,error)=>{
    toast.error(error);
    return {...state,ErrorMessage:error}
}

const handleSuccess = (state,message)=>{
    toast.success(message);
    return {...state,EventMessage:message}
}

const Reducer = (state=initialState,action)=>{
   switch(action.type){
        case ACTION_TYPES.LOGIN_USER : 
            return handleUserLogin(state,action.payload);

        case ACTION_TYPES.LOGOUT_USER :
            return handleUserLogOut();
        
        case ACTION_TYPES.INITIALISE_CHAT :
            return handleInitialiseChat(state,action.payload);

        case ACTION_TYPES.ADD_SINGLE_CHAT :
            return handleSingleChat(state,action.payload);

        case ACTION_TYPES.ADD_MULITPLE_CHATS:
            return handleMultiChats(state,action.payload);

        case ACTION_TYPES.CLEAR_CHATS:
            return handleClearChats(state);

        case ACTION_TYPES.ADD_TOKEN:
            return handleAddToken(state);
        
        case ACTION_TYPES.SUCCESS:
            return handleSuccess(state,action.payload);
        
        case ACTION_TYPES.ERROR:
            return handleError(state,action.payload);
        
        default :
            return state;
   }
};

export default Reducer;