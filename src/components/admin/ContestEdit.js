import React from 'react';
import {Select, Input, Form, DatePicker, Space, Button} from 'antd'
import '../css/admin.scss'
import axiosInstance from "../../utils/axiosAPI";
import Error from "../error/Error";

import { withRouter } from "react-router-dom";

const {Option} = Select
const {TextArea} = Input

class ContestEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            contest: {}
        }

        this.onConfirm = this.onConfirm.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        console.log('props : ', this.props)

    }

    componentDidMount() {
        axiosInstance.get(`contests/${this.props.match.params.contestId}`).then(r => {
            console.log('Initial data :', r.data);
            this.setState({contest: r.data})
        })
    }


    onConfirm = () => {
        const {id, name, rule, start_time, end_time, author, description, level} = this.state.contest;
        if(! rule){
            this.setState({error: 'Select contest rule type'})
            return
        }
        if(!end_time){
            this.setState({error: 'Select end time'})
            return
        }
        if(!start_time){
            this.setState({error: 'Select start time'})
            return
        }
        if(! level){
            this.setState({error: 'Select level'})
            return
        }
        if(! description){
            this.setState({error: 'Write contest description and announcement'})
            return
        }

        const data = {
            // id: id,
            author: author,
            rule: rule,
            start_time: start_time,
            end_time: end_time,
            description: description,
            level: level,
            name: name,
        }

        console.log('Edited data: ', data)
        axiosInstance.put(`admin/contest/edit/${id}`, data ).then((response) => {
            console.log('response : ', response.data)
            if(response.status === 400) {
                this.setState({error: response.data.error})
            }else{
                this.props.history.goBack()
            }
        }).catch(e => {
            console.log('err : ', e)
        })


    }

    onChangeStartTime(value, dateString){
        this.setState({contest: {...this.state.contest, start_time: dateString}})
    }

    onChangeEndTime(value, dateString){
        this.setState({contest: {...this.state.contest, end_time: dateString}})
    }

    render() {
        if(! this.state.contest) return null;

        const {contest} = this.state;
        const {name, rule, description, level} = contest;

        console.log('contest : ', contest)
        return (
            <div className='compose'>
                <Error error={this.state.error}/>
                <Form
                    onFinish={this.onConfirm}
                    // initialValues={{ ['name']: name}}
                >
                        <Form.Item name="name" label="Name">
                            <Input
                                value={name}
                                onChange={e => this.setState({contest: {...contest, name: e.target.value} })}
                            />
                        </Form.Item>

                        <Form.Item label='Contest Rule Style' rules={[{ required: true }]}>
                            <Select
                                value={rule}
                                style={{width: 80, margin: '0 8px'}}
                                onChange={e => this.setState({contest: {...contest, rule: e} })}
                                required={true}
                            >
                                <Option value="ICPC">ICPC</Option>
                                <Option value="IOI">IOI</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label='Start date and time'
                            required={true}
                        >
                            <Space direction="vertical">
                                <DatePicker showTime onChange={this.onChangeStartTime} />
                            </Space>
                        </Form.Item>

                        <Form.Item
                            label='End date and time'
                            required={true}
                        >
                            <Space direction="vertical">
                                <DatePicker showTime onChange={this.onChangeEndTime} />
                            </Space>
                        </Form.Item>

                        <Form.Item
                            label='Level'
                            required={true}
                        >
                            <Select
                                value={level}
                                onChange={e => this.setState({contest: {...contest, level: e} })}
                                style={{width: '120px'}}
                            >
                                <Option value='novice'>Novice</Option>
                                <Option value='standard'>Standard</Option>
                                <Option value='general'>General</Option>
                                <Option value='major'>Major</Option>
                            </Select>
                        </Form.Item>

                    <Form layout='vertical'>
                        <Form.Item label='Description and announcement' required={true}>
                            <TextArea style={{minHeight: '200px'}}
                                      value={description}
                                      onChange={e => this.setState({contest: {...contest, description: e.target.value} })}
                            />
                        </Form.Item>

                    </Form >
                    <Button htmlType='submit' style={{backgroundColor: 'gray', color: 'white'}}>
                        Confirm
                    </Button>
                </Form>
            </div>
        )
    }

}

export default withRouter(ContestEdit);





