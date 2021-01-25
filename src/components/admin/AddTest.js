import React, {useState} from "react";
import {Button, Form, Input, Upload} from 'antd';

const {TextArea} = Input;

export default function AddTest(){

    const [input, setInput] =  useState()
    const [output, setOutput] = useState()

    const uploadTest = () => {
        console.log('Uploading tests')
    }

    return(
        <div>
            <Form onFinish={uploadTest}>
                <input type='file' value='Input file'  onChange={e => setInput(e.target.files[0])} />
                <input type='file' value='Expected output file'  onChange={e => setOutput(e.target.files[0])} />

                <Button htmlType='submit'>Upload</Button>
            </Form>

        </div>
    )
}
