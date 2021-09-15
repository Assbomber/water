import {connect} from "react-redux";
import {useState} from "react";
import {Redirect} from "react-router";
import styled from "styled-components";

function Success(props){

    const [redirect,setRedirect]=useState(false);
    return <Container>
        {redirect && <Redirect to="/home"/>}
        <img src="https://nicefuntours.com/wp-content/uploads/2019/12/ShyCautiousAfricanpiedkingfisher-max-1mb.gif" alt=""></img>
        <h1>Hurray, that was fast.</h1>
        <h2>Your order has been successfully accepted.</h2>
        <button onClick={()=>setRedirect(true)}>Take me back to home</button>
    </Container>
}

const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {

    }
}
export default connect  (mapStateToProps,mapDispatchToProps)(Success);

const Container=styled.div`
    width: 100%;
    min-height: 100vh;
    background-color:#C6FFC1;
    padding:10vh 10% 10vh;
    img{
        width:100px;
    }
    h1{
        font-size: 80px;
        color:#B6C867;

        @media (min-width:768px){
            font-size:100px;
        }
    }
    h2{
        margin:20px 0;
        color:#334257;
    }
    h4{
        color:#444444;
    }
    button{
        border:none;
        border-radius: 10px;
        outline:none;
        background-color: #39A2DB;
        color:white;
        width:auto;
        font-size: 18px;
        padding:10px;
        cursor: pointer;
        margin:20px 0;
        &:hover{
            background-color: #39A9DB;
        }

        img{
            width:20px;
        }
    }

`;