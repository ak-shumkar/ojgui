import React from 'react';
import NavBar from "./components/Navbar";
// import Post from "./components/Post";
// import BaseRouter from "./routes";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Register from "./components/auth/Register";
// import Problems from "./components/Problems";
import Problem from "./components/problem/Problem";
// import Table from "./components/Table";
import Login from "./components/auth/Login";
// import Demo from "./components/UserMenu";
// import { AuthData } from "./components/AuthData"
// import Matex from "./components/Latex";
// import TextToFile from "./components/TextToFile";
// import Submit from "./components/Submit";
// import User from "./components/User";
// import NotFound from "./components/NotFound";
import Contests from "./components/contest/Contests";
// import Contest from "./components/Contest";
import ContestRegister from "./components/contest/ContestRegister";
import ContestMenu from "./components/contest/ContestMenu";
// import PageContainer from "./components/draft/Demo";
// import './components/css/draft.css'
import Admin from "./components/admin/Admin";
import Demo from "./components/Demo";
import ContestEdit from "./components/admin/ContestEdit";
import AntD from "./components/AntD";
import AddTest from "./components/admin/AddTest";

class App extends React.Component {

    render() {
        return(
            <BrowserRouter>
                    {/*<Demo/>*/}
                    {/*<AntD/>*/}
                    <NavBar/>
                {/*<PageContainer/>*/}
                    <Switch>
                        {/*<Route exact path='/profiles/:username' component={User}/>*/}
                        <Route exact path='/register' component={Register}/>
                        <Route exact path="/contests/:contestId/register" component={ContestRegister}/>
                        <Route exact path='/contests' component={Contests}/>
                        {/*<Route exact path='/contests/:cId/problem/:problemId' component={Problem}/>*/}
                        <Route path='/contests/:contestId' component={ContestMenu}/>
                        {/*<Route path='/problems' component={Problems}/>*/}
                        {/*<Route path="/problems/problem/:problemId" component={Problem}/>*/}
                        {/*<Route exact path="/problems/submit" component={Submit}/>*/}
                        {/*<Route exact path="/contests/:cId/submit" component={Submit}/>*/}
                        <Route exact path="/login" component={Login}/>
                        {/*<Route exact path='/admin/:username/contests/edit/:contestId' component={ContestEdit}/>*/}
                        <Route path="/admin/problem/:problemId/add_test" component={AddTest}/>
                        <Route path="/admin/:username" component={Admin}/>

                        {/*<Route path='*' component={NotFound}/>*/}

                        {/*<Route exact path='/problems/page' component={Table}/>*/}
                    </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
