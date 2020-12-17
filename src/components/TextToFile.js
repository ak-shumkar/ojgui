import React, {useState} from "react";

function TextToFile(){
    const [text, setText] = useState('')
    const handleChange = (event) => {
        event.preventDefault();
        setText(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let fs = require('browserify-fs');

        fs.mkdir('/', function() {
            fs.writeFile('/magic.txt', text, function() {
                fs.readFile('/magic.txt', 'utf-8', function(err, data) {
                    console.log(data);
                });
            });
        });

    }
    return(
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
            <textarea onChange={(event) => handleChange(event)}/>
            <button type='submit' >Submit</button>
            </form>
        </div>
    )
}

export default TextToFile;