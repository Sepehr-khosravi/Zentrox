const express = require("express");
const app = express();
//for server can read the json files :
app.use(express.json());
//for public files :
app.use(express.static("public"));

//for connection with frontend:
const cors = require("cors");
app.use(cors());

//for cybersecerity:
const helmet = require("helmet");
app.use(helmet());

//for writing api:
const router = require("./src/routes");
app.use("/api" , router);


//for getting environment varaible : //example : PORT 
const config = require("config");

const PORT = config.get("PORT");

//for socket server:
const http = require("http");

const {Server} = require("socket.io");
const server = http.createServer(app);//for listening the socket server.
const io = new Server(server , {
    cors : {
        origin : ["http://192.168.98.110:8081" , "exp://192.168.98.110:8081"] ,
        methods : ["GET" , "POST" ] ,
        allowedHeaders : ["X-Client-Type"] ,
        credentials : true , 
    }
})
//for importing the io to socket file:
require("./core/socket")(io);


server.listen(PORT , ()=>{
    console.log("server is running on port:" , PORT);
});