import React, {useState} from 'react';
import {useParams, useHistory, useRouteMatch, useLocation} from 'react-router-dom'
import {useSelector} from "react-redux";
import {Select, Input, Form, DatePicker, Space, TimePicker, Button} from 'antd'
import '../css/admin.scss'
import moment from 'moment'
import axiosInstance from "../../utils/axiosAPI";
import Error from "../error/Error";

const {Option} = Select
const {TextArea} = Input

function ContestCompose(props){

    const [rule, setRule] = useState('')
    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [level, setLevel] = useState(null)
    const [description, setDescription] = useState(null)
    const [error, setError] = useState(null)

    const {user} = useSelector(state => state)
    const history = useHistory()

    const onStartDatePick = (date, dateString) => {
        setStartDate(dateString)
    }

    const onStartTimePick = (time, timeString) => {
        setStartTime(timeString)
    }
    const onEndDatePick = (date, dateString) => {
        setEndDate(dateString)
    }

    const onEndTimePick = (time, timeString) => {
        setEndTime(timeString)
    }

    const onCompose = () => {
        if(! rule){
            setError('Select contest rule type')
            return
        }
        if(!endDate || !endTime){
            setError('Select end date and date')
            return
        }
        if(!startTime || !startDate){
            setError('Select start date and time')
            return
        }
        if(! level){
            setError('Select contest level')
            return
        }
        if(! description){
            setError('Write contest description and announcement')
            return
        }

        const data = {
            author: user,
            rule: rule,
            start_time: startDate + ' ' + startTime,
            end_time: endDate + ' ' + endTime,
            description: description,
            level: level,
            name: title,
        }
        axiosInstance.post('admin/contest/', data).then((response) => {
            console.log('response : ', response.data)
            if(response.status === 400) {
                setError(response.data.error)
            }else{
                history.goBack()
            }
        }).catch(e => {
            console.log('err : ', error)
        })


    }

    console.log('props : ', useLocation())
    return (
        <div className='compose'>
            <Error error={error}/>
            <Form
                onFinish={onCompose}
                initialValues={{ remember: true }}
            >
            <Form>
                <Form.Item name="note" label="Title">
                    <Input
                        onChange={e => setTitle(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label='Contest Rule Style' rules={[{ required: true }]}>
                <Select
                    value={rule}
                    style={{width: 80, margin: '0 8px'}}
                    onChange={setRule}
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
                        <DatePicker onChange={onStartDatePick} />
                        <TimePicker onChange={onStartTimePick} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                    </Space>
                </Form.Item>

                <Form.Item
                    label='End date and time'
                    required={true}
                >
                    <Space direction="vertical">
                        <DatePicker onChange={onEndDatePick} />
                        <TimePicker onChange={onEndTimePick} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                    </Space>
                </Form.Item>

                <Form.Item
                    label='Level'
                    required={true}
                >
                    <Select onChange={setLevel} style={{width: '120px'}}>
                        <Option value='novice'>Novice</Option>
                        <Option value='standard'>Standard</Option>
                        <Option value='general'>General</Option>
                        <Option value='major'>Major</Option>
                    </Select>
                </Form.Item>
            </Form>

            <Form layout='vertical'>
                <Form.Item label='Description and announcement' required={true}>
                    <TextArea style={{minHeight: '200px'}} onChange={e => setDescription(e.target.value)}/>
                </Form.Item>

            </Form >
                <Button htmlType='submit' style={{backgroundColor: 'gray', color: 'white'}}>
                    Compose
                </Button>
            </Form>
        </div>
    )
}

export default ContestCompose;
