import React, {useState} from "react";
import '../css/auth.scss'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom'
import {Button, Form, Input, Alert} from 'antd'

import Error from "../error/Error";

function Login(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state)


    const onSaveUser = (username, user) =>  {
        dispatch({type: 'SET_USER', username: username, user: user})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('login user ', user)
        console.log('Submitting')
        try {
                axios.post('http://127.0.0.1:8000/api/account/login/', {
                username: username,
                password: password
            }).then((response) => {
                console.log(response.data);
                localStorage.setItem("refresh_token", response.data.refresh);
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("username", username);
                onSaveUser(username, response.data.user);
                console.log('Login was successful');
                history.goBack()
            }).catch((error) => {
                setError(error.response.data.detail)
            });
            // console(response.data);
        } catch (error) {
            console.log('In catch');
            console.log(error);
        }
    }

    console.log('login user ', user)
    return(
        <div className='auth'>
            <Form
                initialValues={{ remember: true }}
                className='register'
                onSubmitCapture={(event) => handleSubmit(event)}
                layout='vertical'
            >
                {/*<div className='error'>{error}</div>*/}
                <Error error={error}/>
                <Form.Item label='Username' htmlFor='username'>
                <Input
                    type='text'
                    name='username'
                    placeholder='Enter username'
                    onChange={e => {setUsername(e.target.value); setError(null)}}
                />
                </Form.Item>

                <Form.Item label='Password'>
                <Input
                    type='password'
                    name='password'
                    placeholder='Enter password'
                    onChange={e => {setPassword(e.target.value); setError(null)}}
                />
                </Form.Item>
                <Button htmlType='submit'>Login</Button>
            </Form>
        </div>
    )
}

export default Login;
