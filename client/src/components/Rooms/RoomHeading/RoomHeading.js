import React from "react";

import "../Rooms.css";

const RoomHeading = ( { handleMakeRoom } ) => {
    return (
        <div>
            <div className="head"> <h1>Rooms</h1> </div>
            <button onClick={handleMakeRoom} className="room-btn mt-20" type="submit"> Make a Room </button>
        </div>
    )
}

export default RoomHeading;