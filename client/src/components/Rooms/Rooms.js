import React, { useState } from "react";

import RoomHeading from "./RoomHeading/RoomHeading.js";
import RoomNameInput from "./RoomNameInput/RoomNameInput.js";

const Rooms = ( { location } ) => {
    const [make, setMake] = useState(false);
    
    function handleMakeRoom() {
        setMake(true);
    }

    return (
        <div className="roomsOuterContainer">
            <div className="roomsInnerContainer">
                { make ? <RoomNameInput location={location}/> : <RoomHeading handleMakeRoom={handleMakeRoom}/>}
            </div>
        </div>
    );
}

export default Rooms;