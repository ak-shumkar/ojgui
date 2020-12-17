import React from "react";
import Table from "./Table";
import {Link} from "react-router-dom";
import axios from 'axios'
import "./css/problems.css"

class Contests extends React.Component{

    state = {
        contests: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/v1/contests/')
            .then( response => {
                console.log(response.data);
                this.setState({contests: response.data});

            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        const m = this.state.contests.length === 0 ? "No available contests" : null
        return (
            <div className="problems" >
                <h1>
                    Contest list
                    <p style={{fontSize: '16px', color: 'red'}}>{ m }</p>
                    <ul>
                        { this.state.contests.map(({ name, id }) => (
                            <li style={{fontSize: '13px'}} key={id}>
                                <Link to={`/contests/${id}`}>{ name }</Link>
                            </li>
                        ))}
                    </ul>
                </h1>
                {/*<Route path="/problems/problem/:id" component={Problem}/>*/}

            </div>
        )
    }

}

export default Contests;