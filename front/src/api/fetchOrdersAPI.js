import axios from "axios";
import {ORDERS_SUCCESS,ORDERS_FAILED,GET_ORDERS} from "../redux/actions.js";


function fetchOrdersApi(data){
    return (dispatch)=>{
        console.log(data)
        dispatch({type:GET_ORDERS});
        axios.get("https://waterdeployer.herokuapp.com/orders",{params:{email:data.email}})
        .then(response=>{
            console.log(response)
            dispatch({type:ORDERS_SUCCESS,payload:response.data});
        }).catch(err=>{
            dispatch({type:ORDERS_FAILED,payload:err});
        })
    }
}

export default fetchOrdersApi;