import React from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import '../css/contest.scss'

import RegisterButton from "./RegisterButton";

import {Table} from 'antd'

class Contests extends React.Component{

    state = {
        futureContests: [],
        pastContests: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/contests/',{
            params: {
                'phase': 'past'
            }
        })
            .then( response => {
                console.log(response.data);
                this.setState({pastContests: response.data});

            })
            .catch(function (error) {
                console.log(error);
            })


        axios.get('http://127.0.0.1:8000/api/contests/',{
            params: {
                'phase': 'future'
            }
        })
            .then( response => {
                console.log(response.data);
                this.setState({futureContests: response.data});

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        const columns = [
            {
                title: '#',
                dataIndex: 'id',
                key: 'id',

            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (new Date()) > (new Date(record.start_time)) ? <Link to={`/contests/${record.id}`}>{text}</Link> : text

            },
            {
                title: 'Rule',
                dataIndex: 'rule',
                key: 'rule',
            },
            {
                title: 'Level',
                dataIndex: 'level',
                key: 'level',
            },
            {
                title: 'Register',
                key: 'register',
                dataIndex: 'id',
                render: (text, record) => <RegisterButton contestId={record.id}/>

            },
        ];

        let futureContests = []
        for(let i=0; i<this.state.futureContests.length; i++){
            futureContests.push({...this.state.futureContests[i], key: i})
        }
        let pastContests = []
        for(let i=0; i<this.state.pastContests.length; i++){
            pastContests.push({...this.state.pastContests[i], key: i})
        }
        return (
            <div className="contests" >
                <Table
                    title={()=> <h5>Future Contests</h5>}
                    bordered
                    dataSource={futureContests}
                    columns={columns}
                    pagination={{ pageSize: 20 }}
                />
                <Table
                    title={()=> <h5>Past Contests</h5>}
                    bordered
                    dataSource={pastContests}
                    columns={columns.slice(0, -1)}
                    pagination={{ pageSize: 20 }}
                />
            </div>
        )
    }

}

export default Contests;
