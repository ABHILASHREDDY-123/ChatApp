import Reducer from "./reducer";
import { legacy_createStore as createStore } from 'redux';


const store = createStore(Reducer);
store.subscribe(()=>{
    console.log("Current State ",store.getState());
})
export default store;
