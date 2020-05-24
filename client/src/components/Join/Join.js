import  React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    
    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleRoomChange(event) {
        setRoom(event.target.value);
    }
    
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Welcome to Web Chat Site</h1>
                <div> <input placeholder="Name" className="joinInput" type="text" onChange={handleNameChange} /> </div>
                <div> <input placeholder="Room" className="joinInput mt-20" type="text" onChange={handleRoomChange} /> </div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={"/chat?name=" + name + "&room=" + room}>
                    <button className="button mt-20 sign" type="submit">Sign In</button>
                </Link>
                <Link to={"/register"}>
                    <button className="button mt-20 register" type="button">Register</button>
                </Link>
            </div>
        </div>
    );
}

export default Join;