import timeSlots from "../constants/timeSlots.js";

const orderManager=(data)=>{
    var executing=[];
    var upcoming=[];
    var past=[];
    var date = new Date();
    const currDate=date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    const currHour=date.getHours();
    
    for(var i=0;i<data.length;i++){

        const dataDate=data[i].date.split("-");
        const dataStartHour=timeSlots[data[i].slots[0]].value;
        const dataStartTime=timeSlots[data[i].slots[0]].label;
        const dataEndHour=timeSlots[data[i].slots[data[i].slots.length-1]].value;
        const dataEndTime=timeSlots[data[i].slots[data[i].slots.length-1]+1===24? 0:data[i].slots[data[i].slots.length-1]+1].label;
        const toSend={orderID:data[i]._id,date:data[i].date,start:dataStartTime,end:dataEndTime}
        //today
        if(data[i].date===(currDate)){
            //executing
            if(dataStartHour<=currHour && currHour<=dataEndHour){
                executing.push(toSend);
            }else if(dataStartHour<currHour){
                past.push(toSend);
            }else{
                upcoming.push(toSend);
            }
        }
        //upcoming
        else if(Number(dataDate[2])>date.getFullYear()){
            upcoming.push(toSend);
        }else if(Number(dataDate[2])<date.getFullYear()){
            past.push(toSend);
        }else if(Number(dataDate[1]>(date.getMonth()+1))){
            upcoming.push(toSend);
        }else if(Number(dataDate[1])<(date.getMonth()+1)){
            past.push(toSend);
        }else if(Number(dataDate[0])>date.getDate()){
            upcoming.push(toSend);
        }else{
            past.push(toSend);
        }
    }
    return {executing:executing, past:past,upcoming:upcoming};
}

export default orderManager;