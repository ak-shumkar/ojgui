import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axiosInstance from "../../utils/axiosAPI";

export default function RegisterButton(props){
    const {user} = useSelector(state => state);
    const {contestId} = props
    const [ratings, setRatings] = useState([])

    useEffect(() => {
        axiosInstance.get('contests/ranking/', {
            params: {contest: contestId}
        }).then(r => {
            setRatings(r.data)
        }).catch(e => {
            console.log(e.data)
        })
    }, [])

    if(! user) return <Link to={`contests/${contestId}/register`}><p>Register</p></Link>

    if(! ratings) return null;

    const is_registered = search_user(user.id, ratings)

    console.log('ratings : ', ratings)
    if(is_registered){
        return (<p style={{color: 'green'}}> Registered </p>)
    }else{
            return(
            <Link to={`contests/${contestId}/register`}><p>Register</p></Link>

            )
        }

}

function search_user(value, array){
    for (let i=0; i < array.length; i++) {
        if (array[i].user === value) {
            return true;
        }
    }
    return false;
}
