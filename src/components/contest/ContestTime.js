import React from "react";
import {Statistic} from "antd";

const {Countdown} = Statistic;

export default function ContestTime({contest}){
    const {until_contest, time_left} =contest;
    const days = Math.round(contest.until_contest / (24 * 60 * 60)) + 1

    if(until_contest <= 0){
        const tl = Math.round(time_left)
        console.log('time left : ', tl)
        return(
            <div>
                <p style={{fontSize: '10px', color: 'gray'}}>Contest is running</p>
                <Countdown valueStyle={{fontSize: '12px'}} value={Date.now() + tl * 1000}/>
            </div>
        )
    }
    if(days > 0){
        return(
            <div>
                <p style={{fontSize: '10px', color: 'gray'}}>Until contest</p>
                <p style={{fontSize: '12px'}}>{days} days</p>
            </div>
        )
    }else{
        console.log('Hourly')
        return(
            <div>
                <p>Until contest</p>
                <Countdown value={Math.round(until_contest) * 1000} format="H:m:s" />
            </div>
        )
    }
}
