import React from 'react';
import 'katex/dist/katex.min.css';
var Latex = require('react-latex');

class Matex extends React.Component {

    state = {
        text: ""
    }

    handleText = (event) => {
        this.setState({text: event.target.value})
    }
    render() {
        return(
            <div className='main'>
                <textarea  onChange={this.handleText}/>
                <p><Latex>{this.state.text}</Latex></p>
            </div>
        )
    }
}

export default Matex;