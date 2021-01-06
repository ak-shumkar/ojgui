import React from "react";
import axios from 'axios'
import '../css/problem.scss'
import {Table} from "antd";


class Submissions extends React.Component{

    state = {
        submissions: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/submissions/')
            .then( response => {
                console.log(response.data);
                this.setState({submissions: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        console.log("problems ", this.state.problems)
        console.log("PROPS", this.props)

        const columns = [
            {
                title: '#',
                dataIndex: 'id',
                key: 'id',

            },
            {
                title: 'User',
                dataIndex: 'username',
                key: 'username',
                // render: (text, record) => (new Date()) > (new Date(record.start_time)) ? <Link to={`/contests/${record.id}`}>{text}</Link> : text

            },
            {
                title: 'Problem',
                dataIndex: 'problem',
                key: 'rule',
            },
            {
                title: 'Verdict',
                dataIndex: 'verdict',
                key: 'verdict',
            },
        ];
        let submissions = [];
        for(let i=0; i<this.state.submissions.length; i++){
            submissions.push({...this.state.submissions[i], key: i})
        }
        return (
            <div className='submissions'>
                <Table
                    title={()=> <h5>Submissions</h5>}
                    bordered
                    dataSource={submissions}
                    columns={columns}
                    pagination={{ pageSize: 40 }}
                />
            </div>
        )
    }

}

function Verdict({v}){
    let col;
    switch (v){
        case 'AC':
            col = 'green';
            break;
        case 'WA':
            col = 'red';
            break;
        case 'TLE':
            col = 'orange';
            break;
        default:
            break;
    }
    return(
        <td style={{color: col}}>{v}</td>
    )
}

export default Submissions;
