import React from "react";
import { Menu, Button } from 'antd';
import 'antd/dist/antd.css';
import {GiTrophyCup, IoMdMedal, MdDashboard} from "react-icons/all";
import {Link} from 'react-router-dom';

const { SubMenu } = Menu;

class AdminMenu extends React.Component {
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const url = this.props.match.url
        return (
            <div style={{ width: 256 }}>
                <Menu
                    mode="inline"
                    theme="light"
                >

                        <Menu.Item key="1" icon={<MdDashboard/>}>
                            <Link to={url}>
                            Dashboard
                            </Link>
                        </Menu.Item>

                    <SubMenu key="sub1" icon={<GiTrophyCup />} title=" ACM Contests">
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<IoMdMedal />} title=" IOI Contests">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default AdminMenu;
