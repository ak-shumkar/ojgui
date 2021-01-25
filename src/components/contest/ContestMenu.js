import React from "react";
import { Switch, useRouteMatch, Route, useHistory } from "react-router-dom";

import Contest from "./Contest";
import Standing from './Standing'
import Submissions from "../problem/Submissions";

import '../css/contest.scss'

import {Tabs} from 'antd';
import ContestInfo from "./ContestInfo";

const {TabPane} = Tabs;

function ContestMenu(props){

    let {url, path} = useRouteMatch()
    const history = useHistory()

    const handleTabClick = key => {
        history.push(key);      // <== react router v3
    }
    console.log('Contest menu props', props)
    return(
        <>
        <div className='contest-menu'>
            <Tabs
                type="card"
                defaultActiveKey={props.location.pathname}
                onChange={handleTabClick}
            >
                <TabPane tab="Problems" key={`${url}`} />
                <TabPane tab="Submit" key={`${url}/submit`} />
                <TabPane tab="My Submissions" key={`${url}/my_submissions`} />
                <TabPane tab="Standings" key={`${url}/standing`} />

            </Tabs>
        </div>
            <div style={{display: 'flex'}}>

            <Switch>
                <Route exact path={`${path}/standing`}><Standing/></Route>
                <Route exact path={`${path}/my_submissions`}><Submissions/></Route>
                <Route path={path}><Contest {...props}/></Route>
            </Switch>
            <ContestInfo/>
            </div>
        </>
    )
}

export default ContestMenu;
