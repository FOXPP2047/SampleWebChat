import  React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import io from "socket.io-client";

import "./Join.css";

let socket;

const Join = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    let authenticated = false;
    
    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }
    
    const ENDPOINT = "localhost:5000";
    const history = useHistory();

    socket = io(ENDPOINT);

    function checkLoginIdPassword(event) {
        socket.emit("login", { name, password}, (loginCheck) => {
            if(loginCheck === -2) {
                event.preventDefault();
            } else if(loginCheck === -1) {
                alert("Enter an invalid ID");
                window.location.reload();
            } else if(loginCheck === 0) {
                alert("Enter an invalid Password");
                window.location.reload();
            } else if(loginCheck === 1) {
                history.push("/rooms?name=" + name);
                authenticated = true;
            }
        });
    }
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Welcome to Web Chat Site</h1>
                <div> <input placeholder="Name" className="joinInput" type="text" onChange={handleNameChange} /> </div>
                <div> <input placeholder="Password" className="joinInput mt-20" type="password" onChange={handlePasswordChange} /> </div>
                {/* <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={"/chat?name=" + name + "&room=" + room}>
                    <button className="button mt-20 sign" type="submit">Sign In</button>
                </Link> */}
                <button onClick={event => checkLoginIdPassword(event)} className="sign-button mt-20" type="submit">Sign In</button>

                <Link to={"/register"}>
                    <button className="register-button mt-20" type="button">Register</button>
                </Link>
            </div>
        </div>
    );
}

export default Join;