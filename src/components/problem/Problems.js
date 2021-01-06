import React, {useState} from "react";
import axios from 'axios'
import { Route } from 'react-router-dom';
import Submissions from "./Submissions";
import StyledLink from "../Component";

class Problems extends React.Component{

    state = {
        problems: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/problems/')
            .then( response => {
                console.log(response.data);
                this.setState({problems: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        console.log("problems ", this.state.problems)
        console.log("PROPS", this.props)

        return (
            <div>
            <Menu url={this.props.match.url}/>
                <Route exact path={this.props.match.path}><TaskList problems={this.state.problems}/></Route>
                <Route exact path={`${this.props.match.path}/submissions`} component={Submissions}/>

            </div>
        )
    }

}

function TaskList({problems}){
    return(
        <div className="problems" >
            <table className='table'>
                <tr>
                    <th>#</th>
                    <th>Problem</th>
                    <th>Difficulty</th>
                </tr>
                { problems.map((problem) => (
                    <tr>
                        <td>{problem.id}</td>
                        <td key={problem.id}>
                            <StyledLink to={`problems/problem/${problem.id}`}>{ problem.title }</StyledLink>
                        </td>
                        <td>{problem.difficulty}</td>
                    </tr>
                ))}

            </table>

        </div>
    )
}

function Menu({url}){
    const [active, setActive]  = useState('pb')

    const showStatement = () => {
        setActive('pb')
    }
    const showSubmit = () => {
        setActive('sb')
    }

    const showSubmissions = () => {
        setActive('sbs')
    }
    let pbStyle;
    let sbStyle;
    let sbsStyle;
    if (active === 'pb') {
        pbStyle = {
            backgroundColor: 'darkgray',
            color: 'white'                }
    }
    if(active === 'sb') {
        sbStyle = {
            backgroundColor: 'darkgray',
            color: 'white'
        }
    }
    if(active === 'sbs'){
        sbsStyle = {
            backgroundColor: 'darkgray',
            color: 'white'
        }
    }

    return(
        <div className='taskMenu'>
            <StyledLink to={url}><span style={pbStyle} onClick={showStatement}>Problems</span></StyledLink>
            <StyledLink to={url}><span style={sbStyle} onClick={showSubmit}>Submit</span></StyledLink>
            <StyledLink to={`${url}/submissions`}><span style={sbsStyle} onClick={showSubmissions}>Submissions</span></StyledLink>

        </div>
    )
}


export default Problems;
