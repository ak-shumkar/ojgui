import React from "react";
import {Alert} from "antd";

export default function Error({error}){

    if(error) {
        return(
            <Alert
                style={{marginBottom: '20px', color: 'red'}}
                message={null}
                description={error}
                type="error"
            />
        )
    }else{
        return null
    }

}
