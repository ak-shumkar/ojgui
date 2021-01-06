import React from "react";
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Button} from "antd";
import axiosInstance from "../../utils/axiosAPI";
import {useHistory} from 'react-router-dom';

function ContestRegister({contest}){
    const {contestId} = useParams()
    const {user} = useSelector(state => state)
    const history = useHistory()

    if(! user) history.push('/login')

    const onRegister = () => {
        const data = {
            contest: contestId,
            user: user.id
        }
        axiosInstance.post('contests/register/', data).then(r => {
            console.log(r.data)
        }).catch(e => {
            console.log(e.data);
        })
    }

    return(
        <div style={{margin: '0 auto'}}>
            <Button htmlType='submit' onClick={onRegister}>Register</Button>
        </div>
    )
}

export default ContestRegister;
