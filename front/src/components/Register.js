import styled from "styled-components";
import {useState} from "react";

import {fetchUserAPI } from "../api/fetchUserAPI";
import {connect} from "react-redux";
import {Redirect} from "react-router"
import axios from "axios";


function Register(props){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const [emailErr,setEmailErr]=useState(false);
    const [showError,setShowError]=useState({value:false,err:""});
    const [redirect,setRedirect]=useState(false);


    const handleRegister=()=>{
        if(!validateEmail(email)){
            setEmailErr(true);
            return;
        }
        setEmailErr(false);
        axios.post("https://waterdeployer.herokuapp.com/register",{name:name,email:email,password:password})
        .then(response=>{
            if(response.status===201){
                setShowError({value:true,err:"User Registered! Redirecting to Login in 3 seconds..."})
                setTimeout(()=>{
                    setRedirect(true);
                },3000);
            }else{
                setShowError({value:true,err:response.data.err});
            }
        }).catch(e=>{
            setShowError({value:true,err:e.message});
        })
        
    }

    function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    }

    return <Container>
            {redirect && <Redirect to="/"/>}
            
            {showError.value && <Error>
                <div>
                    <p>{showError.err}</p>
                  <button onClick={()=>setShowError({value:false,err:""})}><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-512.png" alt="" width="15px" height="10px"></img></button>
             </div>
            </Error>}
            {props.user.loading && 
            <Loader>
                <img src="https://media4.giphy.com/media/2kWUy53SuDo3IjRd3E/giphy.gif" alt=""></img>
            </Loader>}
            {props.user.status===1 && <Redirect to="/"/>}
          <p>Built by <a href="https://github.com/assbomber">Aman kumar</a></p>
                <LoginBox>
                      <img src="https://wateragri.eu/wp-content/uploads/2020/05/WATERAGRI-LOGO-1-2-1536x857.png" alt=""></img>
                      <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Aman kumar" value={name} onChange={(e)=>setName(e.target.value)}></input>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="example@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                     {emailErr && <p style={{color:"red",margin:"10px 0 10px"}}>Invalid email</p>}
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="asd123ABC" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    <Verify onClick={()=>handleRegister()}>Sign Up</Verify>
                    <p>Aready a user? <a href="/">Log in</a></p>
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

export default connect(mapStateToProps,mapDispatchToProps)(Register);

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