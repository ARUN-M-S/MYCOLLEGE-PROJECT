const mongoose = require("mongoose");
const groupChatSchema=mongoose.Schema({
    channelName:String,
    conversation:[
        {
            message:String,
            timestamp:String,
            user:{
                displayName:String,
                email:String,

            }
        }
    ]
})
module.exports = mongoose.model('conversations',groupChatSchema)