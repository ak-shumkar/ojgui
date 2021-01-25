import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import './css/navbar.scss'
import { connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import StyledLink from './Component'
import UserMenu from "./user/UserMenu";
import {Menu} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {BsListTask, VscHome, GiTrophyCup, RiArticleLine} from "react-icons/all";

// const {TabPane} = Tabs;

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showUserMenu: false,
        }
    }

    handleLogout = (event) => {
        this.props.logout();
    }


    render() {
        console.log('prpr : ', this.props.location.pathname)
        const login_nav = (
            <div className="authBar">
                <ul>
                    <StyledLink to='/register' className='link'>
                        <li>Register</li>
                    </StyledLink>
                    <StyledLink to='/login' className='link'>
                        <li>Login</li>
                    </StyledLink>
                </ul>
            </div>
        );

        const logout_nav = (
            <div className='authBar'>
                <UserMenu username={this.props.username}/>
            </div>
        );
        return(
                <nav className='navbar'>
                    {/*<ul>*/}
                    {/*    <StyledLink to='' className='link'><li>Home</li></StyledLink>*/}
                    {/*    <StyledLink to='/problems' className='link'><li> Problems </li></StyledLink>*/}
                    {/*    <StyledLink to='/contests' className='link'><li>  Contests </li> </StyledLink>*/}
                    {/*    <StyledLink to='/articles' className='link'><li> Articles </li></StyledLink>*/}
                    {/*   <StyledLink to='/blogs' className='link'>  <li> Blogs </li></StyledLink>*/}
                    {/*</ul>*/}

                    <Menu
                        style={{width: '500px'}}
                        defaultSelectedKeys={[this.props.location.pathname]}
                        mode='horizontal'
                    >
                        <Menu.Item icon={<VscHome/>} key="/">
                            <StyledLink to='/'><span>Home</span></StyledLink>
                        </Menu.Item>

                        <Menu.Item key="/contests" icon={<GiTrophyCup/>}>
                            <StyledLink to='/contests'><span>Contests</span></StyledLink>
                        </Menu.Item>

                        <Menu.Item key="/problems" icon={<BsListTask/>}>
                            <StyledLink to='/problems'><span>Problems</span></StyledLink>
                        </Menu.Item>

                        <Menu.Item key="/articles" icon={<RiArticleLine/>}>
                            <StyledLink to='/articles'><span>Articles</span></StyledLink>
                        </Menu.Item>
                    </Menu>


                    { this.props.isAuthenticated ? logout_nav : login_nav }
                </nav>
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
