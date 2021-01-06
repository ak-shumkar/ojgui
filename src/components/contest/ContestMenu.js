import React, {useEffect, useState} from "react";
import { Link, Switch, useRouteMatch, Route } from "react-router-dom";
import axios from 'axios';
import Submit from "../problem/Submit";
import Contest from "./Contest";
import StyledLink from '../Component'
import Problem from "../problem/Problem";
import Standing from './Standing'
import '../css/contest.scss'
import Submissions from "../problem/Submissions";
let Latex = require('react-latex');


function ContestMenu(props){

    let {url, path} = useRouteMatch()
    let pbStyle;
    let submitStyle;
    let msStyle;
    let stStyle;
    const style = {
        backgroundColor: 'darkgray',
        color: 'white',
        fontWeight: 'bolder',
        borderColor: 'darkgray'
    }
    const [active, setActive] = useState('pb');
    // eslint-disable-next-line no-lone-blocks
    {

        if (active === 'pb') {
            pbStyle = style
        }
        if (active === 'submit') {
            submitStyle = style
        }
        if (active === 'st') {
            stStyle = style
        }
        if (active === 'ms') {
            msStyle = style
        }

    }

    const onSetActive = (e) => {
        console.log(e)
        const name = e.target.name
        console.log("name : ", name)
        setActive(name);
        console.log('Active : ', active)
    }
    console.log('Contest menu props', props)
    return(
        <>
        <div className='contest-menu'>
            <StyledLink to={`${url}`}><input style={pbStyle} type='button' name='pb' value='Problems' onClick={onSetActive}/></StyledLink>
            <StyledLink to={`${url}/submit`}><input style={submitStyle} type='button' name='submit' value='Submit' onClick={onSetActive}/></StyledLink>
            <StyledLink to={`${url}/my_submissions`}><input style={msStyle} type='button' name='ms' value='My Submissions' onClick={onSetActive}/></StyledLink>
            <StyledLink to={`${url}/standing`}><input style={stStyle} type='button' name='st' value='Standing' onClick={onSetActive}/></StyledLink>

        </div>


            <Switch>
                <Route exact path={`${path}/standing`}><Standing/></Route>
                <Route exact path={`${path}/my_submissions`}><Submissions/></Route>
                <Route path={path}><Contest {...props}/></Route>

            </Switch>
            </>
    )
}

export default ContestMenu;
