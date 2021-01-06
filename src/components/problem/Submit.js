import React from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import axiosInstance from "../../utils/axiosAPI";
import '../css/problem.scss'
import Error from "../error/Error";
import {getLanguages} from '../../utils/data.js'

import {Form, Input, Select, Button, Upload, Space} from "antd";
import {UploadOutlined}  from "@ant-design/icons";

const {Option} = Select
const {TextArea} = Input

class Submit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            file: null,
            language: null,
            error: null,
            problem: null,

            showTextArea: false,
            languages: []
        }

        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitCode = this.onSubmitCode.bind(this);
        this.onSelectLanguage = this.onSelectLanguage.bind(this);
        this.onUploadFile = this.onUploadFile.bind(this);
        this.onSelectProblem = this.onSelectProblem.bind(this);
        this.handleFileChosen = this.handleFileChosen.bind(this)
    }

    componentDidMount() {
        getLanguages().then(d => this.setState({languages: d}) )
    }


    onSelectLanguage = (e) => {
        this.setState({language: e, error: null})
    }
    onSelectProblem = (e) => {
        this.setState({problem: e, error: null})
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


    handleFileRead = (e) => {
        const content = this.fileReader.result;
        this.setState({code: content})
    };

    handleFileChosen = (file) => {
        this.fileReader = new FileReader();
        this.fileReader.onloadend = this.handleFileRead;
        this.fileReader.readAsText(file);
    };

    onSubmitCode = () => {
        if(! this.state.language){
            this.setState({error: 'Choose a language'})
            return null;
        }
        if(!this.state.file && !this.state.code){
            this.setState({error: 'Please enter code or upload file'})
            return null;
        }

        const {user} = this.props
        console.log('Submitting')
        const data ={
            user: user.id,
            username: user.username,
            language: this.state.language,
            problem: this.state.problem,
            submit_time: (new Date()).toISOString(),
            contest: this.props.match.params.contestId,
            source_code: this.state.code
        }

        axiosInstance.post('http://localhost:8000/api/contest_submission/', data).then((response) => {
            console.log('response : ', response.data)
            if(response.status > 201){
                this.setState({error: response.data.error});
            }
            else{
                this.props.history.push(`/contests/${this.props.match.params.contestId}/my_submissions`)
            }
        }).catch((error) => {
            console.log('error :', error)
            this.setState({error: 'Please sign in to submit'});
        })
    }
    render() {
        const textarea = this.state.showTextArea ? <TextArea cols="60" style={{minHeight: '500px', marginBottom: '20px'}}
                                                             value={this.state.code} onChange={this.onChangeText}/> : null

        const tasks = this.props.problems

        return(

            <div className='submit'>

                <Error error={this.state.error}/>

                <Form layout='vertical' onSubmitCapture={this.onSubmitCode}>
                    <Form.Item label="Select a problem" style={{width: '200px'}}>
                        <Select onChange={this.onSelectProblem}>
                        {
                            tasks.map(task=> {
                                return(
                                    <Option value={task.id}>{task.title}</Option>

                                )
                            })
                        }
                        </Select>
                    </Form.Item>

                    <Form.Item label='Select Language'>
                        <Select name="languages" id="languages" onChange={this.onSelectLanguage} style={{width: '250px'}}>
                            {this.state.languages.map(lang => {
                                return <Option value={lang.id}>{lang.name}</Option>
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item >
                        <Space>
                            <Button onClick={() => this.onClickSourceCode()}>Source Code</Button>
                            or
                            {/*<Upload >*/}
                                <input type='file'  onChange={e => this.handleFileChosen(e.target.files[0])} />
                            {/*<Button icon={<UploadOutlined/>} onChange={e => this.handleFileChosen(e.target.files[0])}>Select File</Button>*/}

                            {/*</Upload>*/}
                        </Space>

                    </Form.Item>

                    {textarea}
                    <Button style={{backgroundColor: 'lightgray'}} htmlType='submit'>Submit</Button>

                </Form>


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(withRouter(Submit));
