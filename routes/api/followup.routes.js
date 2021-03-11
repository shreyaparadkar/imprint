const express = require("express");
const router = express.Router();
const authenticateToken = require('../../authentication/authenticateToken');
const getCurrentUser = require("../../helpers/getCurrentUser");

router.get('/', authenticateToken, (req, res) => {
    var date = new Date()
    const Client = getCurrentUser(req);
    Client.find({})
        .then(client => {
            let client_list = [];
            client.forEach(data => {
                let temp = {};
                temp['name'] = data.name;
                temp['minutes'] = [];
                data.minutes.forEach(note => {
                    let temp1 = {};
                    let x = parseInt((date - note.date) / (1000 * 60 * 60 * 24));
                    if (note.follow_up && !note.follow_up_status && x >= note.follow_up_after) {
                        temp1['id'] = note._id;
                        temp1['date'] = note.date.toUTCString();
                        temp1['notes'] = note.notes;
                        temp1['follow_up'] = note.follow_up;
                        temp1['follow_up_status'] = note.follow_up_status;
                        temp['minutes'].push(temp1);
                    }
                })
                if (temp['minutes'].length > 0) {
                    client_list.push(temp);
                }
            })
            res.status(200).json(client_list);
        })
        .catch(err => { res.status(400).json("no new notifs") });
})

router.post('/',authenticateToken,(req,res)=>{
    const { name, id } = req.body;
    let completed = false;
    const Client = getCurrentUser(req);
    Client.findOne({ name })
        .then(client => {
            client['minutes'].forEach(data => {
                if (data._id.toString() === id) {
                    data.follow_up_status = true;
                    client.save();
                    completed = true;
                }
            })
            if (completed)
                res.status(200).json({ "msg": "Follow up status updated!!" });
            else
                res.status(400).json({ "err": "Sorry could not update the status." })
        }).catch((err) => console.log(err));
})

module.exports = router;