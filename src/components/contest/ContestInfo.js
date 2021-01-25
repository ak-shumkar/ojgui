import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';

import axios from 'axios';

import {Descriptions} from "antd";

export default function ContestInfo(){

    const {contestId} = useParams()

    const [contest, setContest] = useState({})

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/contests/${contestId}`).then(r => {
            setContest(r.data)
        }).catch(e => {
            console.log(e.response.data)
        })
    }, [])

    return(
        <div className='contest-info'>
            <h6>{contest.name}</h6><br/>
            <p>Author : {contest.user}</p>
        </div>
    )
}
