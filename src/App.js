import React from 'react';
import NavBar from "./components/Navbar";
import Post from "./components/Post";
// import BaseRouter from "./routes";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Register from "./components/Register";
import Problems from "./components/Problems";
import Problem from "./components/Problem";
import Table from "./components/Table";
import Login from "./components/Login";
import Demo from "./components/Demo";
import { AuthData } from "./components/AuthData"
import Matex from "./components/Latex";
import TextToFile from "./components/TextToFile";
import Submit from "./components/Submit";
import User from "./components/User";
import NotFound from "./components/NotFound";
import Contests from "./components/Contests";
import Contest from "./components/Contest";

class App extends React.Component {


    render() {
        return(
            <BrowserRouter>
                    <NavBar/>
                    <Switch>
                        <Route exact path='/users/:username' component={User}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/contests' component={Contests}/>
                        <Route exact path='/contests/:id' component={Contest}/>
                        <Route exact path='/contests/:id/problem/:pid' component={Problem}/>
                        <Route exact path='/problems' component={Problems}/>
                        <Route path="/problems/problem/:id" component={Problem}/>
                        <Route exact path="/problems/submit" component={Submit}/>
                        <Route exact path="/login" component={Login}/>
                        {/*<Route path='*' component={NotFound}/>*/}

                        {/*<Route exact path='/problems/page' component={Table}/>*/}
                    </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
