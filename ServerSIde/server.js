const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const socket=require("socket.io")
const Pusher =require("pusher")

require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes")

const PORT = process.env.PORT || process.env.PORT_API;




const pusher = new Pusher({
  appId: "1440768",
  key: "e71dd58d4b6350e700eb",
  secret: "2f9232cb7970f7c0a12a",
  cluster: "ap2",
  useTLS: true
});


const app = express();

app.use(express.json());
app.use(cors());

//register the route
app.use("/", authRoutes);
app.use("/admin",adminRoutes)
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server Listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DataBase connection Failed, Server is not started");
    console.log(err);
  });

  mongoose.connection.once('open',()=>{
    console.log("DB IS CONNECTED");


    const changeStream=mongoose.connection.collection('conversations').watch()
    changeStream.on('change',(change)=>{
      if(change.operationType==='insert'){
        pusher.trigger("channels", "newChannel", {
          'change':change
        });
        
      }else if(change.operationType==='update'){
        pusher.trigger("conversation", "newMessage", {
          'change':change
        });
        
      }else{
        console.log("Error trigering pusher");
      }

    })
  })

  // const io=socket(server,{
  //   cors:{
  //     origin:"http://localhost:3000",
  //     credentials:true,
  //   }
  // })

  // global.onlineUsers = new Map()
  // io.on("connection",(socket)=>{
  //   global.chatSocket=socket;
  //   socket.on("add-user",(userId)=>{
  //     onlineUsers.set(userId,socket.id)
  //   })
  // })
  // socket.on("send-msg",(data)=>{
  //   const sendUserSocket=onlineUsers.get(data.to)
  //   if(sendUserSocket){
  //     socket.to(sendUserSocket).emit("mes-recieve",data.msg)
  //   }

  // })

  // // socket.on('connection',function(socket) {
  // //   console.log('made socket connection');
  // //   socket.on('chat', function(data){
  // //     // io.sockets.emit('chat',data);
  // //     console.log(data);
  // //   });
  // // });
  