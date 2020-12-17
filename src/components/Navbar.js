import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import './css/navbar.css'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class NavBar extends React.Component {

    handleLogout = (event) => {
        this.props.logout();
    }

    render() {
        const login_nav = (
            <div className="login">
                <ul>
                    <Link to='/register' className='link'>
                    <li>Register</li>
                    </Link>
                    <Link to='/login' className='link'> <li>Login </li></Link>
                </ul>
            </div>
        );

        const logout_nav = (
            <div className='logout'>
                <button type='button'> {this.props.username} </button>
                <button type='button' onClick={event => this.handleLogout(event)}> Logout</button>
            </div>
        );
        return(
                <Navbar id='navbar'>
                    <ul id='menu'>
                        <Link to='' className='link'><li>Home</li></Link>
                        <Link to='/problems' className='link'><li> Problems </li></Link>
                        <li> <Link to='/contests' className='link'> Contests </Link></li>
                        <li> <Link to='/articles' className='link'>Articles </Link></li>
                       <Link to='/blogs' className='link'>  <li> Blogs </li></Link>
                    </ul>

                        { this.props.isAuthenticated ? logout_nav : login_nav }
                </Navbar>
        )
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated,
        username: state.username
    }
}

const mapDispatchToProps = dispatch => {
    return{
        logout: () => dispatch({type: 'LOGOUT'})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);