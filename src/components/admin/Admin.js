import React, {useEffect, useState} from 'react';
import '../css/admin.scss'
import Button from "@material-ui/core/Button";
import AdminMenu from "./AdminMenu";
import ContestProblem from "./ContestProblem";
import {Switch, Route, useRouteMatch, useParams, useHistory, Link} from 'react-router-dom'
import {Table} from 'antd'
import ContestCompose from "./ContestCompose";
import {useSelector} from "react-redux";
import axiosInstance from "../../utils/axiosAPI";
import {IoIosAddCircleOutline} from 'react-icons/io'
import {RiEditCircleLine} from "react-icons/ri";
import ContestEdit from "./ContestEdit";
import ContestDetail from "./ContestDetail";


function Admin(props){
    const {path, url} = useRouteMatch()
    const {username} = useParams()
    const [contests, setContests] = React.useState([]);

    const history = useHistory();
    console.log('Url and path', url, path)
    return(
        <div className='admin'>
            <AdminMenu {...props}/>
            <div className='adminPage'>

                <Switch>
                    <Route exact path={path}><ContestList/></Route>
                    <Route exact path={`${path}/contests/compose`}> <ContestCompose/></Route>
                    <Route exact path={`${path}/contests/edit/:contestId`}> <ContestEdit/> </Route>
                    <Route exact path={`${path}/contests/:contestId/add_problem`}> <ContestProblem/></Route>
                    <Route exact path={`${path}/contests/:contestId`}> <ContestDetail/></Route>
                </Switch>

            </div>

        </div>
    )
}

function ContestList(){

    const {user} = useSelector(state => state)
    const [contests, setContests] = useState([])

    useEffect(() => {
        axiosInstance.get('/contests', {
            params: {
                author: user
            }
        }).then((r) => {
            setContests(r.data)
        }).catch(e => {
            console.log(e)
        })
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Link to={{pathname: `${url}/contests/${record.id}/` }}>
                    {text}
                </Link>
            )
        },
        {
            title: 'Rule',
            dataIndex: 'rule',
            key: 'rule',
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: 'Add problem',
            key: 'action',
            dataIndex: 'id',
            render: (id) => (
                <Link to={{pathname: `${url}/contests/${id}/add_problem` }}>
                    {<IoIosAddCircleOutline size={25} />}
                </Link>
            ),
        },
        {
            title: 'Edit',
            key: 'edit',
            dataIndex: 'id',
            render: (id) => (
                <Link to={{pathname: `${url}/contests/edit/${id}`}}
                >
                    {<RiEditCircleLine size={25} />}
                </Link>
            ),
        },
    ];
    const {url} = useRouteMatch()

    let data = [];
    for(let i=0; i<contests.length; i++){
        data.push({...contests[i], key: i})
    }


    return(
        <div>

            <Table
                title={()=> <h4>Contests</h4>}
                bordered
                dataSource={data}
                columns={columns}
                pagination={{ pageSize: 20 }}
            />

            <Link to={`${url}/contests/compose`}>
                <Button className='compose' variant="outlined">
                    Compose Contest
                </Button>
            </Link>

        </div>
    )
}

export default Admin;
