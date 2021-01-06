import React from "react";
import '../css/auth.scss'
import axios from 'axios'
import {Form, Input} from "antd";
import Error from "../error/Error";

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
          error: null,
          errors : {
              firstname: null,
              lastname: null,
              username: null,
              email: null,
              password: null,
              password_confirmation: null,
          }
      }

      this.onChange = this.onChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
    async handleSubmit(){
        console.log(this.state.errors);
        const errors = this.state.errors;
        if (this.validate()) {
            console.log('Submitting')
            try {
                    await axios.post('http://127.0.0.1:8000/api/account/register/', {
                    first_name: this.state.firstname,
                    last_name: this.state.lastname,
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                }).then((response) => {
                    localStorage.setItem("refresh_token", response.data.refresh);
                    localStorage.setItem("access_token", response.data.access);
                    localStorage.setItem("access_token", this.state.username);
                    console.log(response.data);

                }).catch((error) => {
                    console.log('error ', error.response.data);
                    const data = error.response.data;
                    errors.username = data.username;
                    errors.email = data.email;
                    errors.password = data.password;
                    this.setState({errors});
                });
            } catch (err) {
                console.log(err);
            }
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        event.preventDefault();
        let errors = this.state.errors;
        const {name, value} = event.target;
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
    }

    render() {
        return (
            <div className='auth'>

                <Form onFinish={this.handleSubmit}
                      noValidate
                      layout='vertical'
                >
                        <Form.Item label='Firstname' htmlFor='name'>
                        <Input
                            type='text'
                            name='firstname'
                            // onInvalid={event => this.onChange(event)}
                            value={this.state.firstname}
                            placeholder='Type your name'
                            onChange={this.onChange}
                        />
                        </Form.Item>

                    <Error error={this.state.errors.firstname} />

                        <Form.Item label='Lastname' htmlFor='lastname'>
                            <Input
                                className={this.state.errors.lastname ? 'error': null}
                                type='text'
                                name='lastname'
                                placeholder='Type your lastname'
                                value={this.state.lastname}
                                onChange={this.onChange}
                            />
                        </Form.Item>

                        <Error error={this.state.errors.lastname} />

                        <Form.Item label='Email' htmlFor='email'>
                        <Input
                            type='email'
                            name='email'
                            placeholder='Type your email address'
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                        </Form.Item>

                        <Error error={this.state.errors.email} />

                        <Form.Item label='Username' htmlFor='username'>
                        <Input
                            type='text'
                            name='username'
                            placeholder='Choose a username'
                            value={this.state.username}
                            onChange={this.onChange}
                        />
                        </Form.Item>

                         <Error error={this.state.errors.username} />

                        <Form.Item label='Password' htmlFor='password'>
                        <Input
                            type='password'
                            name='password'
                            placeholder='Type password'
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        </Form.Item>

                    <Error error={this.state.errors.password}/>

                        <Form.Item label='Confirm password' htmlFor='password_confirmation'>
                        <Input
                            type='password'
                            name='password_confirmation'
                            placeholder='Repeat your password'
                            value={this.state.password_confirmation}
                            onChange={this.onChange}
                        />
                        </Form.Item>

                    <Error error={this.state.errors.password_confirmation}/>

                        <button type='submit' className='button'>Register</button>
                </Form>
            </div>
        )
    }
}

export default Register;
