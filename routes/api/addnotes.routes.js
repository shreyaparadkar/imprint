const express = require("express");
const router = express.Router();
const authenticateToken = require('../../authentication/authenticateToken');
const getCurrentUser = require('../../helper/getCurrentUser');

router.post('/',authenticateToken,(req,res)=>{
    const { name, date, notes, follow_up, follow_up_status, follow_up_after } = req.body;
    const Client = getCurrentUser(req);
    Client.findOne({ name: name })
        .then(client => {
            if (!client) {
                let clientTemp = {
                    name: '',
                    minutes: [
                        {
                            date: new Date(),
                            notes: '',
                            follow_up: '',
                            follow_up_status: '',
                            follow_up_after: 0
                        }
                    ]
                };
                clientTemp.name = name;
                clientTemp.minutes[0].date = date;
                clientTemp.minutes[0].notes = notes;
                clientTemp.minutes[0].follow_up = follow_up;
                clientTemp.minutes[0].follow_up_status = follow_up_status;
                clientTemp.minutes[0].follow_up_after = follow_up_after;
                let clientModel = new Client(clientTemp);
                clientModel.save();
                res.status(200).json("New client created and note added");
            }

            else {
                client.minutes.push({
                    notes: notes, date: date,
                    follow_up: follow_up, follow_up_status: follow_up_status, follow_up_after: follow_up_after
                });
                client.save();
                res.status(200).json("Client notes have been updated");
            }
        })
        .catch(err => console.log(err));
})


    
module.exports = router;