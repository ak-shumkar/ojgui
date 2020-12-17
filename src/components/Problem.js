import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./css/problems.css";
import Submit from "./Submit";
let Latex = require('react-latex');

class Problem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'statement',
            problem: {},
            sampleTests: [],
            copySuccess: ''
        }

        this.showSubmit = this.showSubmit.bind(this);
        this.showStatement = this.showStatement.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
        console.log(this.state)
    }

    componentWillMount() {
        axios.get(`http://127.0.0.1:8000/api/v1/problems/${this.props.match.params.id}`)
            .then(response => {
                this.setState({problem: response.data});
                console.log(this.state);

            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://127.0.0.1:8000/api/v1/tests',
            {params: {problem_id: this.props.match.params.id}
            }).then(response => {
                console.log(response.data)
                response.data.forEach(test => {
                    console.log('test', test.input);
                    axios.get(test.input).then((r) => {
                        console.log(r.data);
                        this.setState({sampleTests: [...this.state.sampleTests, r.data]})
                    }).catch((e) => {
                        console.log(e.data);
                    })

                });

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

        const statement = (
            <div className="problems">
                <div className="statement">
                    <h2>{this.state.problem.title}</h2>
                    <p><Latex>{this.state.problem.description}</Latex></p>
                </div>

                <div className='inputFormat'>
                    <h3>Input format</h3>
                    <p>{this.state.problem.input_format}</p>
                </div>

                <div className='inputFormat'>
                    <h3>Output format</h3>
                    <p>{this.state.problem.output_format}</p>
                </div>

                <h4>Sample tests</h4>
                {
                    this.state.sampleTests.map((sampleTest, id) => {
                        return(
                            <div className='sampleTest'>
                                <div className='copyText'>
                                    <button onClick={this.copyToClipboard}>Copy</button>
                                    {this.state.copySuccess}
                                </div>
                                <h5>Sample test {id + 1}</h5>
                                <p>{sampleTest}</p>
                            </div>

                        )
                    })
                }
            </div>
        )

            return (
                <>
                    <div className='taskMenu'>
                        <span style={statementStyle} onClick={this.showStatement}>Statement</span>
                        <span style={submitStyle} onClick={this.showSubmit}>Submit</span>
                    </div>
                    {this.state.active === 'statement' ? statement : <Submit/>}
                </>
            )
        }
}


export default Problem;

