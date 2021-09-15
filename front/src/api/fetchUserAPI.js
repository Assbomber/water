import axios from "axios";
import {GET_USER,USER_SUCCESS,USER_FAILED} from "../redux/actions.js";

const fetchUserAPI=(data)=>{
    return (dispatch)=>{
        dispatch({type:GET_USER,payload:{}});
        setTimeout(()=>{
            axios.get("https://waterdeployer.herokuapp.com/auth",{params:{email:data.email,password:data.password}})
        .then((response)=>{
            dispatch({type:USER_SUCCESS,payload:response.data.data})})
        .catch((error)=>dispatch({type:USER_FAILED}))
        },1000
        )
        
        
        
    }
}

export {fetchUserAPI};