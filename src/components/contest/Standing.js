import React, {useEffect, useState} from "react";
import { useParams} from 'react-router-dom';
import axiosInstance from "../../utils/axiosAPI";
import {Table} from "antd";

export default function Standing(){

    const {contestId} = useParams()

    console.log('contestId: ', contestId)
    const [rating, setRating] = useState([])

    useEffect(() => {
        axiosInstance.get('contests/ranking/', {
            params: {contest: contestId}
        }).then(r => {
            setRating(r.data)
        }).catch(e => {
            console.log(e.data)
        })
    }, [])

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',

        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            // render: (text, record) => (new Date()) > (new Date(record.start_time)) ? <Link to={`/contests/${record.id}/`}>{text}</Link> : text

        },
        {
            title: 'Score',
            dataIndex: 'point',
            key: 'point',
        },
        {
            title: 'Rating change',
            dataIndex: 'rating_change',
            key: 'level',
        },
    ];

    const ranking = []
    for(let i=0; i<rating.length; i++){
        ranking.push({...rating[i], key: i})
    }

    return(
        <div className='standing'>
            <Table
                bordered
                dataSource={ranking}
                columns={columns}
                pagination={{ pageSize: 40}}
            />
        </div>
    )
}
