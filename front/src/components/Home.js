import styled from "styled-components";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import UserPannel from "./UserPannel";
import fetchOrdersAPI from "../api/fetchOrdersAPI.js";
import {useState,useEffect} from "react";
import axios from "axios";
 
function Home(props){

    const [loading,setLoading]=useState(false);
    const [redirect,setRedirect] = useState(false);
    const [showError,setShowError]=useState({value:false,err:""});
    useEffect(() =>{
        props.fetchOrders({email:props.user.email});
    },[])

    const handleDelete=(orderID)=>{
        setLoading(true)
        axios.post("https://waterdeployer.herokuapp.com/delete",{orderID:orderID})
        .then(response=>{
            if(response.status===201){
                setRedirect(true);
            }else{
                setShowError({value:true,err:response.data.err});
            }
        })
        .catch(e=>{
            setShowError({value:true,err:e.message});
        })
    }
    return <Container>
    {showError.value && <Error>
        <div>
            <button onClick={()=>setShowError({value:false,err:""})}><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-512.png" alt="" width="15px" height="10px"></img></button>
        </div>
    </Error>}
    {(props.orders.loading || loading) && 
            <Loader>
                <img src="https://media4.giphy.com/media/2kWUy53SuDo3IjRd3E/giphy.gif" alt=""></img>
            </Loader>}
    {(props.user.status===0 && <Redirect to="/"/>)}
    {redirect && <Redirect to="/deleted"/>}
    <Nav>
        <img src="https://wateragri.eu/wp-content/uploads/2020/05/WATERAGRI-LOGO-1-2-1536x857.png" alt=""></img>
        <Out onClick={()=>props.logOut()}>Log out</Out>
    </Nav>
    <Main>
        <UserPannel/>
        <Tracker1>
            <Head>Executing Orders</Head>
            {props.orders.executing.length===0 ? <p style={{color:"grey",textAlign:"center",padding:"15px 0"}}>No Orders here...</p>:
            <Orders>
                {props.orders.executing.map((o)=>{
                    return <Card><img title="Executing Order" src="https://cdn2.hubspot.net/hubfs/4298533/Standalone%20Items/7_suprising_benefits_animated_infographic/static/gif/sprinkler-gif.gif" alt=""/>
                    <p>Order ID: {o.orderID}</p>
                    <p>Date: {o.date}</p>
                    <p>Time: {o.start} / {o.end}</p>
                </Card>
                })}
            </Orders>}
            
        </Tracker1>
        <Tracker2>
            <Head>Upcoming Orders</Head>
            {props.orders.upcoming.length===0 ? <p style={{color:"grey",textAlign:"center",padding:"15px 0"}}>No Orders here...</p>:
            <Orders>
                {props.orders.upcoming.map((o)=>{
                    return <Card>
                    <button onClick={()=>handleDelete(o.orderID)} title="Cancel order"><img src="https://www.pngall.com/wp-content/uploads/5/Delete-Bin-Trash-PNG-Clipart.png" alt=""/></button>
                    <p>Order ID: {o.orderID}</p>
                    <p>Date: {o.date}</p>
                    <p>Time: {o.start} / {o.end}</p>
                </Card>
                })}
            </Orders>}
        </Tracker2>
        <Tracker3>
            <Head>Past Orders</Head>
            {props.orders.past.length===0 ? <p style={{color:"grey",textAlign:"center",padding:"15px 0"}}>No Orders here...</p>:
            <Orders>
                {props.orders.past.map((o)=>{
                    return <Card>
                    <p>Order ID: {o.orderID}</p>
                    <p>Date: {o.date}</p>
                    <p>Time: {o.start} / {o.end}</p>
                </Card>
                })}
            </Orders>}
        </Tracker3>
    </Main>
    </Container>
}
const mapStateToProps = (state)=>{
    return {
        user:state.user,
        orders:state.orders,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        logOut:()=>dispatch({type:"SIGN_OUT"}),
        fetchOrders:(data)=>dispatch(fetchOrdersAPI(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const Container=styled.div`
    width: 100%;
    min-height:100vh;
    background-color:#F8F0DF;
    padding-top:100px;
    padding-bottom: 60px;
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
    img{
        width:70px;
    }
`;

const Nav=styled.div`
    padding:0 15%;
    position: fixed;
    top:0;
    z-index:100;
    width: 100%;
    height: 60px;
    border-radius: 0 0 70px 70px;
    background-color: #005082;
    display:flex;
    justify-content: space-between;
    align-items: center;
    img{
        width: 70px;
    }
`;
const Out=styled.button`
    width: 70px;
    height: 30px;
    border:none;
    outline: none;
    border-radius:10px;
    cursor:pointer;
    &:hover{
        border-color: #D7E9F7;
        background-color:#D7E9F7;
    }
`;
const Main=styled.div`
    width: 95%;
    max-width: 1170px;
    background-color: white;
    margin:0 auto 0;
    border-radius: 15px;
    padding:20px;
    grid-template-columns: auto 22% 22% 22%;
    column-gap: 20px;
    &>div{
        margin-top:10px;
        border-radius:10px;
    }
    @media (min-width: 768px) {
        display:grid;
        div{
            margin-top:0;
        }
    }

`;


const Head=styled.div`
    width: 100%;
    height:40px;
    color:white;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content:center;
    align-items:center;
    box-shadow: 1px 7px 19px -7px rgba(0,0,0,0.75);
-webkit-box-shadow: 1px 7px 19px -7px rgba(0,0,0,0.75);
-moz-box-shadow: 1px 7px 19px -7px rgba(0,0,0,0.75);
`;
const Card=styled.div`
    width:100%;
    background-color: white;
    box-shadow: 1px 8px 19px -3px rgba(0,0,0,0.75);
    -webkit-box-shadow: 1px 8px 19px -3px rgba(0,0,0,0.75);
    -moz-box-shadow: 1px 8px 19px -3px rgba(0,0,0,0.75);
    border-radius: 10px;
    margin:15px 0;
    padding:10px;
    p{
        font-size: 14px;
        &:nth-child(2){
            color:grey;
            font-size: 12px;
        }

    }
    img{
        float:right;
        width:30px;
        margin-left: 5px;
        padding-top:10px;
    }
`;
const Tracker1=styled.div`
/* background-color:#FFFEB7; */
padding:40px 5px 5px;

position: relative;
    ${Head}{
        background-color: #57CC99;
        position: absolute;
        top:0;
        left:0;
    }
    ${Card}{
        border-left:10px solid #57CC99;
    }

`;
const Tracker2=styled.div`
/* background-color:#D7E9F7; */
padding:40px 5px 5px;
position: relative;
    ${Head}{
        background-color: #00C1D4;
        position: absolute;
        top:0;
        left:0;
    }
    ${Card}{
        border-left:10px solid #00C1D4;
    }
    img{
        float:none;
    }
    button{
        float:right;
        background-color:white;
        border:none;
        cursor: pointer;
    }
`;
const Tracker3=styled.div`
/* background-color:#FDD2BF; */
padding:40px 5px 5px;
position: relative;
    ${Head}{
        background-color: #FF4848;
        position: absolute;
        top:0;
        left:0;
    }
    ${Card}{
        border-left:10px solid #FF4848;
        background-color:#F8F5F1;
        p{
        font-size: 14px;
        &:nth-child(1){
            color:grey;
            font-size: 12px;
        }

        }
    }
`;

const Orders=styled.div`
    padding:10px 0;
`;






