import React from "react";
import Table from "./Table";
import {Link} from "react-router-dom";
import axios from 'axios'
import "./css/problems.css"
import Problem from "./Problem";
class Problems extends React.Component{

    state = {
        problems: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/v1/problems/')
            .then( response => {
                console.log(response.data);
                this.setState({problems: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        // console.log("problems ", this.state.problems)
        return (
            <div className="problems" >
              <h1>
                    Problems list
                    <ul>
                { this.state.problems.map(({ title, id }) => (
                    <li style={{fontSize: '13px'}} key={id}>
                        <Link to={`problems/problem/${id}`}>{ title }</Link>
                    </li>
                ))}
                    </ul>
                </h1>
                {/*<Route path="/problems/problem/:id" component={Problem}/>*/}

             </div>
        )
    }

}

export default Problems;