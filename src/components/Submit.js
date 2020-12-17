import React from "react";
import { connect} from "react-redux";
import axios from 'axios';


class Submit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            showTextArea: false,
            file: null,
            language: null,
            // userId: this.props.userId,
            error: null
        }

        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitCode = this.onSubmitCode.bind(this);
        this.onSelectLanguage = this.onSelectLanguage.bind(this);
        this.onUploadFile = this.onUploadFile.bind(this);
    }


    onSelectLanguage = (e) => {
        if(e.target.value){
        this.setState({language: e.target.value, error: null})
        }
        else{
            this.setState({error: 'Choose a language'})
        }
    }

    onUploadFile = (e) => {
        console.log(e.target.files[0])
        if(e.target.files){
            this.setState({file: e.target.files[0], error: null})
        }
    }
    onChangeText = (event) => {
        if(event.target.value) {
            this.setState({code: event.target.value, error: null})
        }
    }

    onClickSourceCode = () => {
        this.setState({showTextArea: !this.state.showTextArea})
    }

    onSubmitCode = () => {
        if(! this.state.language){
            this.setState({error: 'Choose a language'})
            return null;
        }
        if(!this.state.file && !this.state.code){
            this.setState({error: 'Please enter code or upload file'})
            return null;
        }

        console.log('Submitting')
        let formData = new FormData()
        formData.append('language', this.state.language)
        if (this.state.file) {
            formData.append('file', this.state.file)
        }else{
            formData.append('content', this.state.code)
        }
        axios.post('http://localhost:8000/submissions/',
            formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
        }).then((response) => {
                console.log(response.data);
        }).catch((error) => {
            console.log(error.data);
        })
    }
    render() {
        const textarea = this.state.showTextArea ? <textarea value={this.state.code} onChange={this.onChangeText}/> : null
        // console.log("PROPS  ", this.props)
        console.log("language  ", this.state.language)
        console.log("error  ", this.state.error)

        return(
            <div className='submit'>
                <div className='error'>{this.state.error}</div>
                    <div className='submitMenu'>
                            <label htmlFor="language">Language:</label>
                            <select name="languages" id="languages" onChange={this.onSelectLanguage}>
                                <option value={null}>{null}</option>
                                <option value="C++">C++</option>
                                <option value="Python 3">Python 3</option>
                                <option value="Java">Java</option>
                                <option value="Other">Other</option>
                            </select>
                            <input type='button' value='Source code' onClick={() => this.onClickSourceCode()}/>
                            or
                            <input type='file' name='file' onChange={this.onUploadFile}/>
                    </div>

                    {textarea}
                    <div className='Submit'><input type='submit' onClick={this.onSubmitCode}/></div>

            </div>
        )
    }
}


// const mapStateToProps = (state) => {
//     return {
//         userId: state.user.id
//     }
// }

export default connect(null, null)(Submit);