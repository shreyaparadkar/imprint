const express = require("express");
const router = express.Router();
const authenticateToken = require('../../authentication/authenticateToken');
const getCurrentUser = require("../../helper/getCurrentUser");

router.post('/',authenticateToken,(req,res)=>{
    const { name } = req.body;
    const Client = getCurrentUser(req);
    Client.deleteOne({ name: name })
        .then(client => {
            if(client.deletedCount!=0)
                res.status(200).json({ "removed": "Client has been removed!" });
            else 
                res.status(200).json({ "not found": "No such client found." });
        })
        .catch(err => console.log(err));              
})

module.exports=router;