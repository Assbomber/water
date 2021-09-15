import {ORDERS_SUCCESS,ORDERS_FAILED,GET_ORDERS} from "./actions.js";

const initState={
    loading: false,
    status:0,
    executing:[],
    upcoming:[],
    past:[],
}

const ordersReducer = (state=initState,action)=>{
    switch(action.type){
        case GET_ORDERS:
            return {
                loading: true,
                status:0,
                executing:[],
                upcoming:[],
                past:[],
            }
        case ORDERS_SUCCESS:
            return {
                loading:false,
                status:1,
                executing:action.payload.executing,
                upcoming:action.payload.upcoming,
                past:action.payload.past,
            }
        case ORDERS_FAILED:
            return {
                loading:false,
                status:2,
                executing:[],
                upcoming:[],
                past:[],
            }
        default:return state;
    }
}

export default ordersReducer;