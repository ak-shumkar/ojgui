import React from "react";
import './css/register.css'
import axiosInstance from "../axiosApi";
import axios from 'axios'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.handleSubmit.bind();
        this.state = {
            username: '',
            password: '',
            errors : {
                username: null,
                password: null,
                general: null,
            }
        }

        this.onChange = this.onChange.bind(this);
    }


    validate = () => {
        let errors = this.state.errors;

        if (this.state.username === null){
            errors.username = 'Username is required'
        }
        if (this.state.password === null || this.state.password.length < 1){
            errors.password = 'Password is too short'
        }

        let valid = true;
        for (let val of Object.values(errors)){
            valid = valid && !val
        }
        this.setState({errors})
        return valid
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.state.errors;
        if (this.validate()) {
            console.log('Submitting')
            try {
                    axios.post('http://127.0.0.1:8000/api/token/obtain/', {
                    username: this.state.username,
                    password: this.state.password
                }).then((response) => {
                    console.log(response.data);
                    localStorage.setItem("refresh_token", response.data.refresh);
                    localStorage.setItem("access_token", response.data.access);
                    localStorage.setItem("username", this.state.username);
                    this.props.onSaveUser(this.state.username);
                    console.log('Login was successful');
                    this.props.history.push("/");
                }).catch((error) => {
                    errors.general = error.response.data.detail;
                    console.log('ERROR : ', error)
                        this.setState({error: errors})
                });
                // console(response.data);
            } catch (error) {
                console.log('In catch');
                console.log(error);
            }
        }
    }

    onChange(event) {
        // this.setState({event.target.value})
        this.setState({
            [event.target.name]: event.target.value
        })
        event.preventDefault();
        // console.log('Change is made')
        let errors = this.state.errors;
        const {name, value} = event.target;
        // console.log(name, value)
        switch (name){
            case 'username':
                errors.username = !value ? 'username is required' : null;
                break
            case 'password':
                errors.password = !value ? 'password is required' : null;
                break
            default:
                break
        }

        this.setState({errors})
        console.log(this.state.errors);
        console.log(this.state)

    }

    render() {
        // console.log(this.props.isAuthenticated);
        // if (this.props.isAuthenticated){
        //     return <Redirect to="/"/>
        // }
        return(
            <div id='main'>
                { this.props.isAuthenticated ? <Redirect to='/'/> : null}
                <form className='register' onSubmit={(event) => this.handleSubmit(event)} noValidate>
                    <div className='error'>{this.state.errors.general}</div>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        name='username'
                        placeholder='Enter username'
                        value={this.state.username}
                        onChange={this.onChange}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Enter password'
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    <ul id='button'>
                        <li><button type='submit' className='button'>Login</button></li>
                        {/*<li><button type='submit' className='button'>Create account</button></li>*/}
                    </ul>
                </form>
            </div>
        )
    }
}

// mapStateToProps = state => {
//
// }

const mapDispatchToProps = dispatch => {
    return {
        onSaveUser:(username) =>  dispatch({type: 'SET_USER', username: username})
}
}
export default connect(null, mapDispatchToProps)(Login);