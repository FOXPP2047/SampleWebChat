import React from "react"
import { Link } from "react-router-dom";

import "../Join/Join.css"

const Register = () => {
    
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Register</h1>
                <div> <input placeholder="Name" className="joinInput" type="text" /> </div>
                <div> <input placeholder="Password" className="joinInput mt-20" type="password" /> </div>
                <div> <input placeholder="Confirm Password" className="joinInput mt-20" type="password" /> </div>
                <Link to={"/"}>
                    <button className="button mt-20 register" type="submit">Register</button>
                </Link>
            </div>
        </div>
    );
}

export default Register;