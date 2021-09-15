import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Users from "./DBSchemas/usersSchema.js";
import Orders from "./DBSchemas/ordersSchema.js";
import Slots from "./DBSchemas/slotSchema.js";
import e from "express";
import createSlots from "./microFunctions/createSlots.js"
import timeSlots from "./constants/timeSlots.js"
import orderManager from "./microFunctions/orderManager.js";

//app config-----------------------------------------
const app = express();
const port = process.env.PORT || 3001;
const connection_url = "mongodb+srv://admin:admin@cluster0.nujk8.mongodb.net/WaterDeployDB?retryWrites=true&w=majority";

app.use(express.json());
app.use(Cors());

//DB config---------------------------------------------------------------------------------
try {
    mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (e) {
    console.log("EROoor=-----------------------------")
}

// endpoints----------------------------------------------------------------------------------
app.get('/', (req, res) => {
    res.status(200).send("Working //--> server by Aman kumar");
})
app.get("/auth",(req,res)=>{
    
    const creds=req.query;
    Users.findOne({email:creds.email,password:creds.password},(err,data)=>{
        if(err){
            res.status(406).send({status:2});
        }else if(data===null){
            res.status(406).send({status:2,data:data});
        }else{
            res.status(201).send({status:1,data:data});
        }
    })
})
//------------------------------------------------------------------------REGISTER USER
app.post("/register", (req, res) => {
    //requesting user details from header
    const newUser = req.body;

    //creating user
    Users.findOne({email:newUser.email},(err,data)=>{
        if(err){
            res.status(406).send({err:err.message});
        }else if(data!==null){
            res.status(404).send({err:"User already exists"});
        }else{
            Users.create(newUser, (err, data) => {
        if (err) {
            res.status(406).send({err:err.message});
        } else {
            res.status(201).send(data);
        }
    })
        }
    })
    

})

//-------------------------------------------------------------------------POST DELETE

app.post("/delete",(req,res)=>{
    const id=req.body.orderID;
    // console.log(id);
    Orders.findByIdAndDelete(id, (err, data) => {
        if(err){
            res.status(406).send({err:err.message});
        }else{
            // console.log(data);
            Slots.findOne({date:data.date},(error,result)=>{
                    if(error){
                        res.status(406).send({err:error.message});
                    }else if(result===null){
                        res.status(200).send(result)
                    }else{
                        
                        const newArray=result.slots.filter(i=>!data.slots.includes(i))
                        Slots.findOneAndUpdate({date:result.date},{slots:newArray},(er,re)=>{
                            if(er){
                                res.status(406).send({err:er.message});
                            }else{
                                res.status(201).send({status:"deleted",Slottoremove:data.slots,prevSlot:result.slots,newSlot:newArray});
                            }
                        })
                    }
                })
        }
    })
})
//-------------------------------------------------------------------------POST ORDER
app.post("/order",(req,res)=>{
    //requesting order details from header
    const newOrder=req.body;
    //d t d e
    var slots=createSlots(newOrder);
    if(slots===false){
        res.status(406).send({err:"Slot(s) not available"});
    }else{
        slots.sort(function(a, b){return a - b});
        Orders.create({email:newOrder.email,date:newOrder.date,slots:slots},(err,data)=>{
            if(err){
                res.status(406).send({err:err.message});
            }else{
                //date if exists
                Slots.findOne({date:newOrder.date},(error,result)=>{
                    if(error){
                        res.status(406).send({err:error.message});
                    }else if(result===null){
                        Slots.create({date:newOrder.date,slots:slots},(e,r)=>{
                            if(e){
                                res.status(406).send({err:e.message});
                            }else{
                                res.status(201).send(data);
                            }
                        })
                    }else{
                        const newArray=[...result.slots,...slots].sort(function(a, b){return a - b});
                        Slots.findOneAndUpdate({date:newOrder.date},{slots:newArray},(er,re)=>{
                            if(er){
                                res.status(406).send({err:er.message});
                            }else{
                                res.status(201).send(data);
                            }
                        })
                    }
                })
            }
        })
    }
    
})
//-------------------------------------------------------------------------GET ORDER
app.get("/orders",(req,res)=>{
    const email=req.query.email;
    Orders.find({email:email},(err,data)=>{
        if(err){
            res.status(406).send({err:err.message});
        }else{
            const object=orderManager(data);
            res.status(200).send(object);
        }
    })
})

//-------------------------------------------------------------------------GET AVAILABILITY
app.get("/availability",(req,res)=>{
    // console.log("logger");
    // console.log(req.query);
    const re=req.query;
    Slots.findOne({date:re.date},(err,data)=>{
        if(err){
            res.status(406).send({err:err.message});
        }else if(data==null){
            res.status(200).send({slotsAvailable:timeSlots});
        }
        else{
            const slotsUsed=data.slots;
            var slotsAvailable=[];
            for(var i=0;i<24;i++){
                if(!slotsUsed.includes(i)){
                    slotsAvailable.push(timeSlots[i]);
                }
            }
            res.status(200).send({slotsAvailable:slotsAvailable});
        }
    })
})



// listner---------------------------------------------
app.listen(port, () => {
    console.log("Server listening at port " + port);
})





