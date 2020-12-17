import React from "react";
import axiosInstance from "../axiosApi";
// import axios from 'axios'

export class AuthData extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    render(){
        const users = this.state.users;
        console.log(users)
        console.log(this.state.fetched)
        return (
            <div>
                <ul>
                    { users.map(user => {
                        return <li>{user.username}</li>
                    })}
                </ul>
                Some data
            </div>
        )
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if ( ! this.state.users ) {
            console.log(this.state.fetched);
            axiosInstance.get('http://127.0.0.1:8000/api/users/').then(
                (response) => {
                    let data;
                    // if ( response.status === 401 && response.statusText === "Unauthorized") {
                    //     data = [];
                    // }
                    // else{
                    //     data = response.data;
                    // }
                    console.log(response)
                    data = response.data;
                    this.setState({users: data})
                    return response.data
                }
            ).catch((error) => {
                console.log(error)
            })
        }
    }
}