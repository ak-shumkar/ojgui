import React from "react";
import './css/user.css';
import axios from 'axios';

class User extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            account: null,
            profile: null,
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/accounts/${this.props.username}`).then(
            (response) => {
                this.setState({account: response.data});
            }
        ).catch((err) => console.log(err.data))

        axios.get(`http://localhost:8000/api/profiles/${this.props.username}`).then(
            (response) => {
                this.setState({profile: response.data});
            }
        ).catch((err) => console.log(err.data))
    }

    render() {
        return(
            <div className='profile'>
                Some User
            </div>
        )
    }
}
export default User;