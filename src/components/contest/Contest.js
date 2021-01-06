import React, {useEffect, useState} from "react";
import {Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
import '../css/contest.scss'
import Submit from "../problem/Submit";
import Countdown from "./CountDown";
import Problem from "../problem/Problem";
import StyledLink from '../Component'
import Submissions from "../problem/Submissions";
import ContestMenu from "./ContestMenu";

import {Table} from 'antd'
import {AiOutlineSend} from "react-icons/ai";

let Latex = require('react-latex');

class Contest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problems: [],
        }

        console.log(this.state)
    }

    componentWillMount() {
        axios.get(`http://127.0.0.1:8000/api/problems/`, {
            params: {
                contest: this.props.match.params.contestId
            }
        })
            .then(response => {
                console.log('Problems : ', response.data);
                response.data.forEach(d => this.setState({problems: [...this.state.problems, d]}))


            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let url = this.props.match.url
        let path = this.props.match.path

        const columns = [
            {
                title: '#',
                dataIndex: 'id',
                key: 'cid',

            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'name',
                render: (text, record) => <Link to={`${url}/problem/${record.id}`}>{text}</Link>

            },
            {
                title: 'Difficulty',
                dataIndex: 'difficulty',
                key: 'rule',
            },
            {
                title: 'Submit',
                key: 'submit',
                dataIndex: 'id',
                render: (id) => (
                    <Link to={{pathname: `/contests/${id}/submit/`}}>
                        {<AiOutlineSend size={20}/>}
                    </Link>
                ),
            },
        ];

        const tasks = []
        for(let i=0; i<this.state.problems.length; i++){
            tasks.push({...this.state.problems[i], key: i})
        }

        const problems = (
            <div className='contest'>
                <Table
                    title={()=> <h5>Tasks</h5>}
                    bordered
                    dataSource={tasks}
                    columns={columns}
                    pagination={{ pageSize: 20 }}
                />
            </div>
        )
            return (
                <>
                    <Switch>
                        <Route exact path={`${path}/submit`}><Submit problems={this.state.problems}/></Route>
                        <Route exact path={path}>{problems}</Route>
                        <Route exact path={`${path}/problem/:problemId/`}> <Problem {...this.props}/> </Route>
                    </Switch>
                </>
            )
        }
}

export default Contest;
