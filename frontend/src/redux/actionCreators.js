import ACTION_TYPES from "./actions";
const addUser = (user) => {
  return {
    type: ACTION_TYPES.LOGIN_USER,
    payload: user,
  };
};

const addToken = (token) => {
  return {
    type: ACTION_TYPES.ADD_TOKEN,
    payload: token,
  };
};

const createSuccess = (message) => {
  return {
    type: ACTION_TYPES.SUCCESS,
    payload: message,
  };
};

const createError = (message) => {
  return {
    type: ACTION_TYPES.ERROR,
    payload: message,
  };
};

const createLogOut = () => {
  return {
    type: ACTION_TYPES.LOGOUT_USER,
  };
};

const addRecents = (payload) => {
  return {
    type: ACTION_TYPES.ADD_RECENTS,
    payload: payload,
  };
};

const addSingleChat = (payload) => {
  return {
    type: ACTION_TYPES.ADD_SINGLE_CHAT,
    payload: payload,
  };
};

const initialiseChat = (payload) => {
  return {
    type: ACTION_TYPES.INITIALISE_CHAT,
    payload: payload,
  };
};

const clearChat = () => {
  return {
    type: ACTION_TYPES.CLEAR_CHAT,
  };
};

const handleSearchResults = (payload) => {
  return {
    type: ACTION_TYPES.SEARCH_RESULTS,
    payload: payload,
  };
};

const updateRecents = (payload) => {
  return {
    type: ACTION_TYPES.UPDATE_RECENTS,
    payload: payload,
  };
};

export {
  addUser,
  addToken,
  createError,
  createSuccess,
  handleSearchResults,
  updateRecents,
  createLogOut,
  clearChat,
  addRecents,
  addSingleChat,
  initialiseChat,
};
