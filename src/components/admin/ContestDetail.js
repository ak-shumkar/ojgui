import React, {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import axiosInstance from "../../utils/axiosAPI";
import {IoIosAddCircleOutline} from "react-icons/io";
import {RiEditCircleLine} from "react-icons/ri";
import {Table} from "antd";

import '../css/admin.scss'

export default function ContestDetail(){

    const[contest, setContest] = useState()

    const {contestId} = useParams()

    useEffect(() => {
        axiosInstance.get(`admin/contest/${contestId}`).then(r => {
            setContest(r.data)
        }).catch(e => {
            console.log(e.response.data)
        })
    }, [])

    if(! contest) return null;

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            // render: (text, record) => (
            //     <Link to={{pathname: `${url}/contests/${record.id}/` }}>
            //         {text}
            //     </Link>
            // )
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
            title: 'Add Test',
            key: 'test',
            dataIndex: 'test',
            // render: (id) => (
            //     <Link to={{pathname: `${url}/contests/${id}/add_problem` }}>
            //         {<IoIosAddCircleOutline size={25} />}
            //     </Link>
            // ),
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
        </div>
    )
}
