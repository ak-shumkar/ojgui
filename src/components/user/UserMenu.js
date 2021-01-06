import React from 'react';
import { Menu, Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import StyledLink from '../Component'
import {IoMdMedal, IoSettingsOutline, AiOutlineUser} from "react-icons/all";

const {SubMenu} = Menu;

function UserMenu(props){

    const dispatch = useDispatch()
    const history = useHistory()
    const username = props.username

    const handleLogout = (event) => {
        console.log('Logging out ...')
        dispatch({type: 'LOGOUT'})
    }

    const userProfile = (event) => {
        console.log('history : ', history)
        history.push(`/profiles/${username}`)
    }

    const handleAdminPage = () => {
        history.push(`/admin/${username}`)
    }

    const menu = (
        <Menu style={{width: '120px'}}>
            <Menu.Item key="1" icon={AiOutlineUser()} onClick={userProfile}>
                Profile
            </Menu.Item>

            <Menu.Item key="4" icon={<IoSettingsOutline  />} onClick={handleAdminPage} >
                Admin
            </Menu.Item>

            <Menu.Item key="3" icon={null} onClick={handleLogout}>
                <StyledLink to='/'>
                    Logout
                </StyledLink>
            </Menu.Item>
        </Menu>
    );

        return(
        <Space wrap>
            <Dropdown overlay={menu}>
                <Button>
                    {username} <DownOutlined />
                </Button>
            </Dropdown>
        </Space>
        )
}
export default UserMenu;
