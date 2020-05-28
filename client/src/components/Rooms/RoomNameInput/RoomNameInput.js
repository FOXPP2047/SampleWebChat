import React, { useState } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import "../Rooms.css";

const RoomNameInput = ({location}) => {
    const { name } = queryString.parse(location.search);
    const [room, setRoom] = useState("");

    function handleRoom(event) {
        setRoom(event.target.value);
    }

    return (
        <div>
            <input className="joinInput mt-20" placeholder="Room Name"  onChange={handleRoom}></input>
            <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={"/chat?name=" + name + "&room=" + room}>
                <button className="make-btn mt-20" type="submit">Join the Room</button>
            </Link>
        </div>
    )
}

export default RoomNameInput;