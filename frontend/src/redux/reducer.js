import ACTION_TYPES from "./actions";
import {toast} from "react-toastify";
const  tokenName = "chat-app-token";
const userName = "chat-app-user";
const initialState = {
    User : localStorage.getItem(userName)?JSON.parse(localStorage.getItem(userName)).payload:{},
    token : localStorage.getItem(tokenName),
    Chats : [],
    Recents : [],
    ErrorMessage : "",
    EventMessage : "",
    path:"/login",
    searchResults : []
}

const handleUserLogin = (state,payload)=>{
    localStorage.setItem(userName,JSON.stringify({payload}));
    return {...state,User:payload}
}

const handleUserLogOut = () =>{
    localStorage.removeItem(tokenName);
    return {...initialState,token:""};
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

const handleRecents = (state,payload)=>{
    return {...state,Recents:payload};
}

const clearChats = (state)=>{
    return {...state,Chats:[]};
}

const handleSearchResults = (state,payload)=>{
    return {...state,searchResults:payload}
}

const handleUpdateRecents = (state,payload)=>{
    let newRecents = [];
    newRecents.push({id:payload[0],name:payload[1],time:payload[2]});
    console.log(newRecents);
    state.Recents.map((r)=>{
        if(r.id != payload[0]){newRecents.push(r);}
    })
    return {...state,Recents:newRecents}
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
            return handleAddToken(state,action.payload);
        
        case ACTION_TYPES.SUCCESS:
            return handleSuccess(state,action.payload);
        
        case ACTION_TYPES.ERROR:
            return handleError(state,action.payload);
        
        case ACTION_TYPES.ADD_RECENTS:
            return handleRecents(state,action.payload); 
        
        case ACTION_TYPES.CLEAR_CHAT:
            return clearChats(state);
        
        case ACTION_TYPES.SEARCH_RESULTS:
            return handleSearchResults(state,action.payload);
        
        case ACTION_TYPES.UPDATE_RECENTS:
            return handleUpdateRecents(state,action.payload);
        
        default :
            return state;
   }
};

export default Reducer;