import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./css/contest.css";
import Submit from "./Submit";
import Countdown from "./CountDown";
import Problem from "./Problem";

let Latex = require('react-latex');

class Contest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'statement',
            problems: [],
        }

        this.showSubmit = this.showSubmit.bind(this);
        this.showStatement = this.showStatement.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
        console.log(this.state)
    }

    componentWillMount() {
        axios.get(`http://127.0.0.1:8000/api/v1/problems/`, {
            params: {
                contest: this.props.match.params.id
            }
        })
            .then(response => {
                console.log('Problems : ', response.data);
                response.data.forEach(d => this.setState({problems: [...this.state.problems, d]}))


            })
            .catch(function (error) {
                console.log(error);
            });
    }

    showStatement = () => {
        this.setState({active: 'statement'})
    }
    showSubmit = () => {
        this.setState({active: 'submit'})
    }
    copyToClipboard = (event) => {
        console.log('')
    }

    render() {
        let statementStyle;
        let submitStyle;

        // eslint-disable-next-line no-lone-blocks
        {
            if (this.state.active === 'statement') {
                statementStyle = {
                    backgroundColor: 'darkgray',
                    color: 'white'                }
            }
            if(this.state.active === 'submit'){
                submitStyle = {
                    backgroundColor: 'darkgray',
                    color: 'white'
                }
            }
        }
        const problems = (
            <div className='contest'>
                <table className='table'>
                    <tr>
                        <th>#</th>
                        <th>Problem</th>
                        <th>State</th>
                    </tr>
                        { this.state.problems.map((problem, id) => {
                                return(
                                    <tr key={id}>
                                        <td>{id+1}</td>
                                        <td key={id}><Link to={`problems/problem/${id}`}>{problem.title}</Link></td>
                                        <td>-</td>
                                    </tr>
                                )
                            })
                        }

                </table>

            </div>
        )
        return (
            <>
                <div className='taskMenu'>
                    <span style={statementStyle} onClick={this.showStatement}>Problems</span>
                    <span style={submitStyle} onClick={this.showSubmit}>My Submissions</span>
                </div>
                {/*<Countdown/>*/}
                {problems}
            </>
        )
    }
}


export default Contest;