const mongoose = require("mongoose");

const client = new mongoose.Schema({
  name: String,
  minutes: [
      new mongoose.Schema({
        date: { type: Date, default: Date.now},
        notes: {type:String},
        follow_up:{type:Boolean, default:false},
        follow_up_status:{type:Boolean,default:false},
        follow_up_after:{type:Number,default:0}
      })
    ]
});

module.exports = client;
