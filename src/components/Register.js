import React from "react";
import './css/register.css'
import axiosInstance from "../axiosApi";
import axios from 'axios'


class Register extends React.Component{

    constructor(props) {
      super(props);
      this.handleSubmit.bind();
      this.state = {
          firstname: '',
          lastname: '',
          email: '',
          username: '',
          password: '',
          password_confirmation: '',
          errors : {
              firstname: null,
              lastname: null,
              email: null,
              password: null
          }
      }

      this.onChange = this.onChange.bind(this);
    }

    validate = () => {
        let errors = this.state.errors;
        if (this.state.name === ''){
            errors.name = 'Name is required'
        }
        if (this.state.lastname === null){
            errors.lastname = 'Lastname is required'
        }
        if (this.state.email === null){
            errors.email = 'Email is required'
        }
        if (!this.state.email.includes("@")){
            errors.email = 'Invalid email'
        }
        if (this.state.username === null){
            errors.username = 'Email is required'
        }
        if (this.state.password === null || this.state.password.length < 1){
            errors.password = 'Password is too short'
        }
        if (this.state.password_confirmation !== this.state.password){
            errors.password_confirmation = 'Wrong password'
        }

        let valid = true;
        for (let val of Object.values(errors)){
            valid = valid && !val
        }
        this.setState({errors})
        return valid
    }
    async handleSubmit(event){
        event.preventDefault();
        console.log(this.state.errors);
        const errors = this.state.errors;
        if (this.validate()) {
            console.log('Submitting')
            try {
                    await axiosInstance.post('http://127.0.0.1:8000/api/account/register/', {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    password_confirmation: this.state.password_confirmation
                }).then((response) => {
                    localStorage.setItem("refresh_token", response.data.refresh);
                    localStorage.setItem("access_token", response.data.access);
                    localStorage.setItem("access_token", this.state.username);
                    console.log(response.data);

                }).catch((error) => {
                    const data = error.response.data;
                    console.log("Register Component : " + data);
                    errors.username = data.username_error;
                    errors.email = data.email;
                    this.setState({errors});
                });
                // console(response.data);
            } catch (error) {
                console.log(error);
            }
            // errors = onRegister(this.state)
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
            case 'name':
                errors.name = !value ? 'name is required' : null;
                break
            case 'lastname':
                errors.lastname = !value ? 'lastname is required' : null;
                break
            case 'username':
                errors.username = !value ? 'username is required' : null;
                break
            case 'email':
                errors.email = !value ? 'email is required' : null;
                break
            case 'password':
                errors.password = !value ? 'password is required' : null;
                break
            case 'password_confirmation':
                errors.password_confirmation = !value ? 'Confirm password' : null;
                break
            default:
                break
        }

        this.setState({errors})
        console.log(this.state.errors);
        console.log(this.state)

    }

    render() {
        return(
            <div id='main'>
                <form className='register' onSubmit={(event) => this.handleSubmit(event)} noValidate>
                        <label htmlFor='name'>Name</label><br/>
                        <input
                            type='text'
                            name='firstname'
                            // onInvalid={event => this.onChange(event)}
                            value={this.state.firstname}
                            placeholder='Type your name'
                            onChange={this.onChange}
                        />
                        <div className='error'>{this.state.errors.firstname}</div>
                        <label htmlFor='lastname'>Lastname</label>
                        <input
                            className={this.state.errors.lastname ? 'error': null}
                            type='text'
                            name='lastname'
                            placeholder='Type your lastname'
                            value={this.state.lastname}
                            onChange={this.onChange}
                        />
                    <div className='error'>{this.state.errors.lastname}</div>

                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Type your email address'
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                    <div className='error'>{this.state.errors.email}</div>

                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            name='username'
                            placeholder='Choose a username'
                            value={this.state.username}
                            onChange={this.onChange}
                        />
                    <div className='error'>{this.state.errors.username}</div>

                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Type password'
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    <div className='error'>{this.state.errors.password}</div>

                        <label htmlFor='password_confirmation'>Confirm password</label>
                        <input
                            type='password'
                            name='password_confirmation'
                            placeholder='Repeat your password'
                            value={this.state.password_confirmation}
                            onChange={this.onChange}
                        />
                    <div className='error'>{this.state.errors.password_confirmation}</div>

                    <button type='submit' className='button'>Register</button>
                </form>
            </div>
        )
    }
}



export default Register;