const createSlots=(data)=>{
    if((data.duration)+data.time>24) return false;
    var slots=[];
    console.log(data);
    for(let i=data.time;i<data.duration+data.time;i++){
        console.log(i);
        slots=[...slots,i];
    }
    return slots;
}

export default createSlots;