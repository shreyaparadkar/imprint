const express = require("express");
const router = express.Router();
const authenticateToken = require("../../authentication/authenticateToken");
const getCurrentUser = require("../../helper/getCurrentUser");

const queryByDate = (date) => {
    var d = new Date(date)
    var x = parseInt(d.toISOString().slice(8, 10)) + 1;
    var y = parseInt(d.toISOString().slice(8, 10));
    var d1 = new Date(d.toISOString().slice(0, 8) + x)
    var d2 = new Date(d.toISOString().slice(0, 8) + y)
    return [d1, d2];
}

const setNotesDate = (note) => {
    let temp1 = {};
    temp1['id'] = note._id;
    temp1['date'] = note.date.toUTCString();
    temp1['notes'] = note.notes;
    temp1['follow_up'] = note.follow_up;
    temp1['follow_up_status'] = note.follow_up_status;
    return temp1;
}

const setResponseFormat = (client,dates,reverseStatus) => {
    let temp = {};
    temp['name'] = client.name;
    let clientArr = reverseStatus ? client.minutes.reverse() : client.minutes;
    let temp1 = [];
    clientArr.forEach(note => {
        if (dates) {
            if (note.date > dates[1] && note.date < dates[0]) {
                temp1.push(setNotesDate(note));
            }
        } else {
            temp1.push(setNotesDate(note));
        }
    });
    temp['minutes'] = temp1;
    return [temp];
}

router.post('/',authenticateToken,(req,res)=>{
    const {name,date}=req.body;
    const Client = getCurrentUser(req);
    if(name && date){
        const dates = queryByDate(date)
        let response;
        const clientName = `^${name}$`
        Client.findOne({ name: { $regex: new RegExp(clientName, "i") } })
        .then(client=>{
            if (client){
                response = setResponseFormat(client, dates,false)
            }
        if(response[0].minutes.length>=1)
            res.status(200).json(response)
        else
            res.status(400).json({"msg":"No such entry found!"})
        })
        .catch(err=>console.log(err))
        
    }

    else if(name){
    const clientName = `^${name}$`
        Client.findOne({ name: { $regex: new RegExp(clientName, "i") } })
        .then(client=>{
            if(client){
                res.status(200).json(setResponseFormat(client,null,true));
            }
            else{
                res.status(400).json("No such entry found!")
            }
            
        })
        .catch(err=>console.log(err));
    }


    else if(date){
        const dates = queryByDate(date);
        Client.find({})
        .then(client=>{
            let response=[];
            client.forEach(data=>{
                let temp = setResponseFormat(data, dates, false);
                if(temp[0].minutes.length>1){
                response.push(temp[0]);
            }
            })
            if(response.length>=1)
                res.status(200).json(response);
            else
                res.status(400).json({"msg":"No such entry found!"})
        })
        .catch(err=>console.log(err))
    }

    else{
        Client.find({})
        .then(client=>{
            let clientList=[];
            client.forEach(data=>{
                let temp = setResponseFormat(data, null, true);
                clientList.push(temp[0]);
            });
            if(clientList.length>=1)
                res.status(200).json(clientList);
            else
                res.status(400).json({"msg":"No client information added"})
        })
    }
    
})

module.exports = router;