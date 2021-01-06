import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Register from "./components/auth/Register";
import App from "./App";
import Login from "./components/auth/Login";
import Admin from "./components/admin/Admin";
import Contests from "./components/contest/Contests";

const BaseRouter = () => {
    return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={App}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path="/login" component={Login}/>
                    <Route path="/admin/:username" component={Admin}/>
                    <Route exact path='/contests' component={Contests}/>
                </Switch>
            </BrowserRouter>
    )
}

export default BaseRouter;
