import React from "react";
import {Menu} from "antd";
import './css/ant.scss';


export default function AntDemo(){
    return(
        <Menu
            style={{width: '500px'}}
            defaultSelectedKeys={['1']}
            mode='inline'
        >
            <Menu.Item key='1'>
                Menu 1
            </Menu.Item>

            <Menu.Item key='2'>
                Menu 2
            </Menu.Item>

        </Menu>
    )
}
