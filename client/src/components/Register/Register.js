import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

import "../Join/Join.css"

let socket;

const Register = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassowrd, setCofirmPassowrd] = useState("");

    const ENDPOINT = "localhost:5000";
    const history = useHistory();

    socket = io(ENDPOINT);
    
    function handleName(event) {
        setName(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    function handleConfirmPassword(event) {
        setCofirmPassowrd(event.target.value);
    }

    function passwordCheck(event) {
        socket.emit("register", { name, password }, (isRegistered) => {
            if (isRegistered === -1) {
                alert("Please, Fill the Blank.");
            } else if(isRegistered === 1) {
                if(password !== confirmPassowrd) {
                    event.preventDefault();
                    alert("Password is different. Please Check Again");
                    window.location.reload();
                } else {
                    alert("Your name and password is sucessfully enrolled.");
                    history.push("/");
                }
            } else if(isRegistered === 0) {
                alert("Your ID already has used");
                window.location.reload();
            }
        });
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Register</h1>
                <div> <input onChange={handleName} placeholder="Name" className="joinInput" type="text" /> </div>
                <div> <input onChange={handlePassword} placeholder="Password" className="joinInput mt-20" type="password" /> </div>
                <div> <input onChange={handleConfirmPassword} placeholder="Confirm Password" className="joinInput mt-20" type="password" /> </div>
                <button 
                        onClick={event => passwordCheck(event)} 
                        className="button mt-20 register" 
                        type="submit">Register
                </button>
            </div>
        </div>
    );
}

export default Register;