import React from "react";
import {Statistic} from "antd";

const {Countdown} = Statistic;


function CountDown({delta}){

    const val = Date.now() + delta * 1000
    return(
        <div>
            <p>Time left</p>
            <Countdown value={val}/>
        </div>
    )

}
export default CountDown;
