const express = require("express");
const router = express.Router();
const getCurrentUser = require("../../helper/getCurrentUser");

router.post('/', (req, res) => {
    const { name, id, newNote } = req.body;
    const Client = getCurrentUser(req);
    Client.findOne({ name: name })
        .then(client => {
            let flag = false
            client.minutes.forEach(note => {
                if (note._id == id) {
                    note.notes = newNote;
                    client.save();
                    flag = true;
                    return;
                }
            });
            if (flag)
                res.status(200).json({ "msg": "Note updated!" });
            else
                res.status(400).json({ "msg": "Error updating the note" });
        })
        .catch(err => console.log(err));
})

module.exports = router;