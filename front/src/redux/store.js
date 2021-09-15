import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import userReducer from "./userReducer.js";
import ordersReducer from "./ordersReducer.js";

const rootReducer = combineReducers({
    user:userReducer,
    orders:ordersReducer
})

const store=createStore(rootReducer,applyMiddleware(thunk));

export default store;