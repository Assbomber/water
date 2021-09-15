import styled from "styled-components";
import {useState} from "react";

import {fetchUserAPI } from "../api/fetchUserAPI";
import {connect} from "react-redux";
import {Redirect} from "react-router"


function Login(props){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [emailErr,setEmailErr]=useState(false);

    const handleVerify=()=>{
        if(!validateEmail(email)){
            setEmailErr(true);
            return;
        }
        setEmailErr(false);
        props.fetchUser({email:email,password:password});
        
    }

    function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    }

    return <Container>
            {props.user.loading && 
            <Loader>
                <img src="https://media4.giphy.com/media/2kWUy53SuDo3IjRd3E/giphy.gif" alt=""></img>
            </Loader>}
            {props.user.status===1 && <Redirect to="/home"/>}
          <p>Built by <a href="https://github.com/assbomber">Aman kumar</a></p>
                <LoginBox>
                      <img src="https://wateragri.eu/wp-content/uploads/2020/05/WATERAGRI-LOGO-1-2-1536x857.png" alt=""></img>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="example@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                     {emailErr && <p style={{color:"red",margin:"10px 0 10px"}}>Invalid email</p>}
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="asd123ABC" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    <Verify onClick={()=>handleVerify()}>Sign In</Verify>
                    {props.user.status===2 && <p style={{color:"red",margin:"10px 0 10px"}}>Incorrect password / User does not exist</p>}
                    <p>A new user? <a href="/register">Sign up</a></p>
                </LoginBox>
                
    </Container>
}

const mapStateToProps = (state) =>{
    return {
        user:state.user,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        fetchUser: (data)=>dispatch(fetchUserAPI(data)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);

const Container=styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D4ECDD;
    & > p{
        position: fixed;
        bottom:10px;
        right:10px;
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
    img{
        width:70px;
    }
`;

const LoginBox=styled.div`
    max-width: 400px;
    width: 95%;
    background-color:#FFF8E5;
    border-radius: 10px;
    box-shadow: -2px 1px 23px -8px rgba(0,0,0,0.75);
    -webkit-box-shadow: -2px 1px 23px -8px rgba(0,0,0,0.75);
    -moz-box-shadow: -2px 1px 23px -8px rgba(0,0,0,0.75);
    padding:10px;
    img{
        display:block;
        margin:0 auto;
        width:100px;
        margin-bottom:10px;
    }
    label{
        font-size: 12px;
        font-weight: 700;
    }
   input{
       width: 100%;
       height:40px;
       margin-bottom: 10px;
       border-radius:5px;
       padding:5px;
       border:2px solid #D7E9F7;
       font-size: 14px;
       outline: none;
       &:focus{
           border:2px solid #00A19D;
       }
   }
   p{
       font-size:13px;
       text-align: center;
   }
`;

const Verify=styled.a`
    display: block;
    text-decoration: none;
    background-color: #00A19D;
    width: 100%;
    height: 40px;
    color:white;
    text-align: center;
    padding-top:10px;
    border-radius: 5px;
    margin:10px 0 10px;
    cursor: pointer;

    &:hover{
        background-color: #297F87;
    }
`;