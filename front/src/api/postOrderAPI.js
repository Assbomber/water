import axios from "axios";

function postOrderAPI(data){
    return (dispatch)=>{
        axios.post("https://waterdeployer.herokuapp.com/order",{
            date:data.date,
            time:data.time,
            duration:data.duration,
            email:data.email
        })
        .then(response=>{

        })
        .catch(e=>{

        })
    }
}

export default postOrderAPI;

