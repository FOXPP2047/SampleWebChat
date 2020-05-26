import React, { useState } from "react";

import RoomNameInput from "./RoomNameInput/RoomNameInput.js";
import "./Rooms.css";

const Rooms = ( { location } ) => {
    const [make, setMake] = useState(false);
    
    function handleMakeRoom() {
        setMake(true);
    }

    return (
        <div className="roomsOuterContainer">
            <div className="roomsInnerContainer">
                <div className="head"> <h1>Rooms</h1> </div>
                <button onClick={handleMakeRoom} className="room-btn mt-20" type="submit"> Make a Room </button>
                { make ? <RoomNameInput location={location}/> : null}
            </div>
        </div>
    );
}

export default Rooms;