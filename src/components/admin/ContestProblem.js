import React, {useState} from "react";
import {useHistory, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";

import {Button, Form, Input, Select} from 'antd'

import Error from "../error/Error";

import '../css/admin.scss'
import axiosInstance from "../../utils/axiosAPI";


const {Option} = Select
const {TextArea} = Input

function ContestProblem(){
    const {cId} = useLocation().state
    const {user} = useSelector(state => state)

    // new problem data
    const [pid, setPid] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [indesc, setIndesc] = useState('')
    const [outdesc, setOutdesc] = useState('')
    const [tl, setTl] = useState(null)
    const [ml, setMl] = useState(null)
    const [samples, setSamples] = useState([])
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')

    const [error, setError] = useState(null)

    const history = useHistory()

    const addProblem = () => {
        const data = {
            author: user,
            contest: cId,
            _id: pid,
            title: title,
            time_limit: tl,
            memory_limit: ml,
            input_description: indesc,
            output_description: outdesc,
            description: description,
            samples: samples,
        }

        axiosInstance.post('admin/contest/problem/', data).then(r => {
            console.log(r.data);
            if(r.status === 400){
                setError(r.data.detail)
            }else{
                history.goBack()
            }

        }).catch(e => {
            console.log(e)
        })

    }

    const addSample = () => {
        setSamples([...samples,{input: input, output: output} ])
    }

    return(
        <div className='compose'>
            <Error error={error}/>
        <Form
            layout='vertical'
            onFinish={addProblem}
            initialValues={{ remember: true }}
        >
            <Form.Item label='Problem id in contest'>
                <Select
                    style={{width: '100px'}}
                    onChange={setPid}
                >
                    <Option value='A'>A</Option>
                    <Option value='B'>B</Option>
                    <Option value='C'>C</Option>
                    <Option value='D'>D</Option>
                    <Option value='E'>E</Option>
                    <Option value='F'>F</Option>
                    <Option value='G'>G</Option>
                    <Option value='H'>H</Option>
                    <Option value='I'>I</Option>
                    <Option value='J'>J</Option>
                    <Option value='K'>K</Option>
                    <Option value='L'>L</Option>
                    <Option value='M'>M</Option>
                    <Option value='N'>N</Option>
                </Select>

            </Form.Item>
            <Form.Item label='Title'>
                <Input
                    onChange={e => setTitle(e.target.value)}
                />
            </Form.Item>
            <Form.Item label='Time limit (milliseconds)'>
                <Input
                    style={{width: '70px'}}
                    onChange={e => setTl(e.target.value)}
                />
            </Form.Item>
            <Form.Item label='Memory limit (megabytes)'>
                <Input
                    style={{width: '70px'}}
                    onChange={e => setMl(e.target.value)}
                />
            </Form.Item>
            <Form.Item label='Description'>
                <TextArea
                    style={{minHeight: '200px'}}
                    onChange={e => setDescription(e.target.value)}
                />
            </Form.Item>

            <Form.Item label='Input description'>
                <TextArea
                    style={{minHeight: '200px'}}
                    onChange={e => setIndesc(e.target.value)}
                />
            </Form.Item>
            <Form.Item label='Output description'>
                <TextArea
                    style={{minHeight: '200px'}}
                    onChange={e => setOutdesc(e.target.value)}
                />
            </Form.Item>

            <Button htmlType='submit' style={{marginTop: '50px'}}>Add</Button>

        </Form>
            <Form
                onSubmitCapture={addSample}
                layout='vertical'
            >
                <Form.Item label='Add samples'>
                    <TextArea
                        style={{minHeight: '200px', width: '350px'}}
                        name='input'
                        onChange={e => setInput(e.target.value)}
                    />

                    <TextArea
                        style={{minHeight: '200px', width: '350px'}}
                        name='output'
                        onChange={e => setOutput(e.target.value)}
                    />

                </Form.Item>
                <Button htmlType='submit' style={{marginLeft: '300px'}}>Add sample</Button>
            </Form>
        </div>
    )
}

export default ContestProblem;
