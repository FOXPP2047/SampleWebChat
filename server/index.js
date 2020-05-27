const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 5000;

const router = require("./router.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

mongoose.connect("mongodb://localhost:27017/chatDB", {useNewUrlParser: true, useUnifiedTopology: true});

const chatUserDBSchema = {
    name: String,
    password: String
};

const roomDBSchema = {
    name: String,
    users: [String],
};

const User = mongoose.model("User", chatUserDBSchema);
const Room = mongoose.model("Room", roomDBSchema);

io.on("connect", (socket) => {
    socket.on("join", async ( {name, room}, callback ) => {
        const result = await Room.findOne({name: room});
        if(!result) {
            const newRoom = new Room({
                name: room,
            });
            newRoom.users.push(name);
            newRoom.save();
        } else {
            result.users.push(name);
            result.save();
        }
        const {error, user} = addUser({id: socket.id, name, room});

        if(error) {
            return callback(error);
        }
        socket.join(user.room);

        socket.emit("message", { user: "admin", text: user.name + ", welcome to the room " + user.room});
        socket.broadcast.to(user.room).emit("message", { user: "admin", text: user.name + ", has joined"});
        
        io.to(user.room).emit("roomData", {room: user.room, users: getUsersInRoom(user.room)});
        callback();
    });

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        
        io.to(user.room).emit("message", {user: user.name, text: message});
        callback();
    });

    socket.on("register", async ({ name: getName, password: getPassword }, callback) => {
        if(!getName || !getPassword) {
            callback(-1);
            return;
        }
        const newUser = new User({
            name: getName,
            password: getPassword
        });
        const result = await User.findOne({name: newUser.name});
        if(result) {
            callback(0);
        } else {
            newUser.save();
            callback(1);
        }
    });

    socket.on("login", async ({ name: getName, password: getPassword }, callback) => {
        if(!getName || !getPassword) {
            callback(-2);
            return;
        }

        const result = await User.findOne({name: getName});

        if(!result) {
            callback(-1);
        } else {
            if(result.password === getPassword) {
                callback(1);
            } else {
                callback(0)
            }
        }
    });
    socket.on("disconnect", async () => {
        const userData = getUser(socket.id);

        if(userData) {
            let userName = userData.name;
            let roomName = userData.room;

            const result = await Room.findOne({name: roomName});
            result.users.forEach((element, index) => {
                if(element === userName) {
                    result.users.splice(index, 1);
                }
            });

            if(!result.users.length) {
                console.log(result.id + " successfully deleted");
                Room.deleteOne({ name: result.name });
            }
            result.save();
        }

        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit("message", { user: "admin", text: user.name + " has left." });
            io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
        }
    });
});

server.listen(PORT, () => console.log("Server has started on port " + PORT));