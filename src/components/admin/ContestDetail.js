import React, {useEffect, useState} from "react";
import {Link, useParams, useRouteMatch} from 'react-router-dom';
import axiosInstance from "../../utils/axiosAPI";
import {IoIosAddCircleOutline} from "react-icons/io";
import {Button, Table} from "antd";

import '../css/admin.scss'

export default function ContestDetail(){

    const {url} = useRouteMatch()

    const[contest, setContest] = useState()

    const {contestId} = useParams()

    useEffect(() => {
        axiosInstance.get(`admin/contest/${contestId}`).then((r) => {
            console.log(r.data);
            setContest(r.data);
        }).catch(e => {
            console.log(e)
        })
    }, [])


    if(! contest) return null;

    const columns = [
        {
            title: '#',
            dataIndex: '_id',
            key: '_id',

        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <Link to={{pathname: `${url}/contests/${record.id}/` }}>
                    {text}
                </Link>
            )
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: 'Number of tests',
            key: 'test_count',
            dataIndex: 'test_count',
        },
        {
            title: 'Add test',
            key: 'add_test',
            dataIndex: '...',
            render: (text, record) => (
                    <Link to={{pathname: `/admin/problem/${record.id}/add_test` }}>
                        {<IoIosAddCircleOutline size={25} />}
                    </Link>
            ),
        },
    ];

    let problems = [];
    for(let i=0;i<contest.problems.length;i++){
        problems.push({...contest.problems[i], key: i})
    }
    console.log('contest : ', contest)
    return(

        <div>
            <Table
                title={()=> <h4>Tasks</h4>}
                bordered
                dataSource={problems}
                columns={columns}
                pagination={false}
            />

            <Link to={{pathname: `${url}/add_problem`}}
            >

                <Button style={{marginTop: '30px'}}> Add problem </Button>
            </Link>
        </div>
    )
}
