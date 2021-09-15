import styled from "styled-components";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {useState,useEffect} from "react";
import DatePicker from 'react-date-picker';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import postOrderAPI from "../api/postOrderAPI";
import axios from "axios";

function UserPannel(props){
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const [date,setDate]=useState(currentDate);
    const [slotOptions,setSlotOptions]=useState([{value:0,label:"Select"}]);
    const [slot,setSlot]=useState(slotOptions[0]);

    const [durationOptions,setDurationOptions] = useState([{value:0,label:"Select"}]);
    const [duration,setDuration]=useState(durationOptions[0]);

    const [showErr,setShowErr]=useState(false);
    const [showLoading,setShowLoading]=useState(false);

    const [redirect,setRedirect]=useState(false);
    const [showError,setShowError]=useState({value:false,err:""});

    //update slots when date is changed
    useEffect(() =>{
        axios.get("https://waterdeployer.herokuapp.com/availability",{params:{date:date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()}})
        .then((response) =>{
            if(response.status === 200){
                // console.log({date:date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()});
                // console.log(response);
                setSlotOptions(response.data.slotsAvailable);
                // console.log(response.data.slots);
                // console.log(slotOptions);
            }
        }).catch((e)=>{
            console.log(e);
        })
    },[date])

    //update durations when slot is changed
    useEffect(() =>{
        // console.log("slotvalue: "+slot.value)
        var durations=[];
        var count=0;
        try{
        var start=slotOptions.findIndex(o=>o.value===slot.value);
        for(var i=slot.value;i<24;i++){
            // console.log("startvalue: "+start)
            if(i===slotOptions[start].value){
                ++count;
                ++start;
                durations.push({value:count,label:""+count+""});
            }else break;
        }
        }catch(e){
        }
        setDurationOptions(durations);
    },[slot]);

    const postAPI=(data)=>{
        axios.post("https://waterdeployer.herokuapp.com/order",{
            date:data.date,
            time:data.time,
            duration:data.duration,
            email:data.email
        })
        .then(response=>{
            if(response.status===201){
            setShowLoading(false);
            setRedirect(true);
            }else{
                setShowError({value:true,err:response.data.err});
            }
        })
        .catch(e=>{
            setShowError({value:true,err:e.message});
        })
    }

    const handleCreateOrder=()=>{
        if(date && slot.label!=="Select" && duration.label!=="Select"){
            setShowErr(false);
            setShowLoading(true);
            // props.postOrder({email:props.user.email,date:date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear(),time:slot.value,duration:duration.value});
            postAPI({email:props.user.email,date:date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear(),time:slot.value,duration:duration.value});
        }else setShowErr(true);
    }
    return <Container>
        {showError.value && <Error>
        <div>
            <p>{showError.err}</p>
            <button onClick={()=>setShowError({value:false,err:""})}><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-512.png" alt="" width="15px" height="10px"></img></button>
        </div>
    </Error>}
        {redirect && <Redirect to="/success"/>}
        {showLoading && <Loader>
                <img src="https://media4.giphy.com/media/2kWUy53SuDo3IjRd3E/giphy.gif" alt=""></img>
            </Loader>}
        <Profile src="https://hilcare.in/wp-content/uploads/2020/11/Rk6QLKCu_400x400.jpg" width="80px" height="80px"alt=""></Profile>
            <p>{props.user.name ? props.user.name:"Customer Name"}</p>
            <p className="id">User ID: {props.user.email? props.user.email:"example@gmail.com"}</p>
            <NewOrder>
                <p>Create new order</p>
                <Flex>
                    <label htmlFor="datepicker">Select date: </label>
                    <DatePicker id="datepicker" minDate={currentDate} value={date} format="dd-MM-y" onChange={setDate}></DatePicker>
                </Flex>
                <Flex>
                    <label htmlFor="slotpicker">Select slot: </label>
                    <Dropdown id="slotpicker" options={slotOptions} onChange={(e)=>setSlot({value:e.value,label:e.label})} value={slot.label} placeholder="No Slots available" />
                </Flex>
                <Flex>
                    <label htmlFor="durationpicker">Select duration (hours): </label>
                    <Dropdown id="durationpicker" options={durationOptions} onChange={(e)=>setDuration({value:e.value,label:e.label})} value={duration.label} placeholder="No Duration Available" />
                </Flex>
                <CreateOrder onClick={()=>handleCreateOrder()}>New Order</CreateOrder>
                {showErr && <p style={{color:"red"}}>All fields are required</p>}
            </NewOrder>
        
        
    </Container>
}

const mapStateToProps = (state)=>{
    return {
        user:state.user,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        postOrder:(data)=>dispatch(postOrderAPI(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserPannel);

const Container=styled.div`
    text-align: center;
    
    p{
        margin:10px;
        font-size: 15px;
    }
    .id{
        background-color:#5E454B;
        color:white;
        padding:5px;
        border-radius: 2px;
        font-size: 12px;
        display: inline-block;
        margin:10px auto 10px;
    }
`;
const Error=styled.div`
    position: fixed;
    background-color: rgba(0,0,0,0.8);
    top:0;
    right:0;
    bottom:0;
    left:0;
    display:flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    div{
        position: relative;
        width: 95%;
        max-width:400px;
        background-color:white;
        border-radius:10px;
        padding:10px;

        button{
            border: none;
            outline: none;
            background-color:white;
            position: absolute;
            top:5px;right:5px;
        }
    }
`;
const Loader=styled.div`
    position: fixed;
    background-color: rgba(0,0,0,0.8);
    top:0;
    right:0;
    bottom:0;
    left:0;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100;
    img{
        width:70px;
    }
`;
const Profile=styled.img`
    border-radius: 50%;
    width: 80px;
    display: block;
    margin:0 auto;
`;
const NewOrder=styled.div`
background-color:#D7E9F7;
    border:1px solid grey;
    border-radius: 10px;
    p:first-child{
        font-size:20px;
        font-weight: 600;
    }
`;
const Flex=styled.div`
display: flex;
justify-content:space-between;
align-items:center;
margin:5px;
    input{
        width:95px;
        outline: none;
        height: 35px;
    }
`;
const CreateOrder=styled.button`
    border:none;
    outline: none;
    background-color:#3DB2FF;
    color:white;
    width:100%;
    height:40px;
    border-radius: 0 0 5px 5px;
    cursor:pointer;
    &:hover{
        background-color: #3DC9FF;
    }
`;