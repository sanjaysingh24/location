import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server);
io.on('connection',(socket)=>{
    console.log('a new user is connected',socket.id);
    socket.on("send-location",(data)=>{
        io.emit("receive-location",{id:socket.id,...data})
    })
    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id);
    })
})
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname,)))
app.get('/',(req,res)=>{
    res.render('./index');
})

server.listen(port,()=>{
    console.log(`listening on ${port}`);
})