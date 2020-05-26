import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join.js";
import Chat from "./components/Chat/Chat.js";
import Register from "./components/Register/Register.js";
import Rooms from "./components/Rooms/Rooms.js";

const App = () => (
    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/register" component={Register}/>
        <Route path="/chat" component={Chat} />
        <Route path="rooms" component={Rooms} />
    </Router>
);

export default App;