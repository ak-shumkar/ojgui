import React from "react";
import { useParams, withRouter} from "react-router-dom";
import axios from 'axios';

import '../css/problem.scss'

let Latex = require('react-latex');

class Problem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            problem: null
        }
        console.log('P props : ', props.match.params)
    }

    componentDidMount() {
        console.log('Did component mount')
        axios.get(`http://127.0.0.1:8000/api/problems/${this.props.match.params.problemId}`)
            .then( response => {
                console.log('RES ', response.data);
                this.setState({problem: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

   render() {
       if(! this.state.problem) return <div>Loading...</div>

        console.log('P props : ', this.props)
       return (
           <div className="problem">
               <div className="statement">
                   <h2>{this.state.problem.title}</h2>
                   <p><Latex>{this.state.problem.description}</Latex></p>
               </div>

               <div className='input-format'>
                   <h3>Input format</h3>
                   <p>{this.state.problem.input_description}</p>
               </div>

               <div className='input-format'>
                   <h3>Output format</h3>
                   <p>{this.state.problem.output_description}</p>
               </div>

               <h4>Sample tests</h4>
               {
                   this.state.problem.samples.map((sample, id) => {
                       return (
                           <div className='sampleTest'>
                               <h5>Sample input {id + 1}</h5>
                               <p>{sample.input}</p>
                               <h5>Sample output {id + 1}</h5>
                               <p>{sample.output}</p>
                           </div>

                       )
                   })
               }
           </div>
       )
   }
}


export default withRouter(Problem);

