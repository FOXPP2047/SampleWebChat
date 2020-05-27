import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import queryString from "query-string";

import "../Rooms.css";

let socket;

const RoomHeading = ( { location, handleMakeRoom } ) => {
    const { name } = queryString.parse(location.search);
    
    const ENDPOINT = "localhost:5000";
    const rooms = [];
    const [room, setRoom] = useState([]);
    socket = io(ENDPOINT);
    
    useEffect(() => {
        socket.emit("getRoomData", (roomdatas) => {
            roomdatas.forEach(e => {
                rooms.push(e);
                setRoom(room => [...room, e]);
            });
        });
    }, [location.search]);

    // socket.emit("getRoomData", (roomdatas) => {
    //     roomdatas.forEach(e => {
    //         rooms.push(e);
    //         setRoom(...room, rooms);
    //     });
    // });

    const makeButton = () => {
        const arr = [];
        room.forEach(e => {
            arr.push(
                <Link to={"/chat?name=" + name + "&room=" + e}>
                    <button className="button mt-20 room" type="submit">{e}</button>
                </Link>
            );
        });
        return arr;
    }

    return (
        <div>
            <div className="head"> <h1>Rooms</h1> </div>
            <h2>{makeButton()}</h2>
            <button onClick={handleMakeRoom} className="room-btn mt-20" type="submit"> Make a Room </button>
        </div>
    )
}

export default RoomHeading;