const express = require("express");
const router = express.Router();
const getCurrentUser = require('../../helper/getCurrentUser');

router.post('/', (req, res) => {
    const { name, id } = req.body;
    const Client = getCurrentUser(req);
    Client.findOne({ name: name })
        .then(client => {
            var flag = false;
            client.minutes.forEach(note => {
                if (note._id == id) {
                    note.remove();
                    client.save();
                    flag = true;
                    return;
                }
            });
        if (flag)
            res.status(200).json({ "msg": "Note has been deleted" });
        else
            res.status(400).json({ 'msg': 'Error in deleting the note' });
    })
    .catch(err => console.log(err))
})

module.exports = router;