import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Protected } from "./protected.js";

import Join from "./components/Join/Join.js";
import Chat from "./components/Chat/Chat.js";
import Register from "./components/Register/Register.js";
import Rooms from "./components/Rooms/Rooms.js";

const App = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Join} />
            <Route path="/register" component={Register}/>
            <Protected path="/chat" component={Chat} />
            <Protected path="/rooms" component={Rooms} />
            <Route path="*" component={() => <h1>404 Page NOT FOUND</h1>} />
        </Switch>
    </Router>
    /* <Router>
        <Route path="/" exact component={Join} />
        <Route path="/register" component={Register}/>
        <Route path="/chat" component={Chat} />
        <Route path="/rooms" component={Rooms} />
    </Router> */
);

export default App;