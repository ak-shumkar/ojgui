import React from "react";
import './css/user.css';
import axios from 'axios';
import {Image} from "react-bootstrap";

class User extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/profiles/${this.props.match.params.username}`).then(
            (response) => {
                this.setState({user: response.data});
            }
        ).catch((err) => console.log(err.data))

    }

    render() {
        if( ! this.state.user){
            return null
        }
        console.log('User : ', this.state.user)
        return(
            <div className='profile'>
                <Image src={null}
                       roundedCircle
                       style={{border: 'solid', width: '200px', borderColor: 'gray'}}
                />
            </div>
        )
    }
}
export default User;
