import {GET_USER,USER_SUCCESS,USER_FAILED,SIGN_OUT} from "./actions.js"

const initState={
    loading: false,
    status:0,
    name:"",
    email:"",
}

const userReducer=(state=initState,action)=>{
    switch(action.type){
        case GET_USER:
            return {
                loading: true,
                status:0,
                name:"",
                email:""
            }
        case USER_SUCCESS:
            return {
                loading:false,
                status:1,
                name:action.payload.name,
                email:action.payload.email,
            }
        case USER_FAILED:
            return {
                loading:false,
                status:2,
                name:"",
                email:""
            }
        case SIGN_OUT:
            return {
                loading:false,
                status:0,
                name:"",
                email:""
            }
        default:
            return state;
    }
}

export default userReducer;