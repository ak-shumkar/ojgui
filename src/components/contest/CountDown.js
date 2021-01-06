import React, { Component } from "react";


class Countdown extends Component {
    state = {
        timerOn: false,
        timerStart: 0,
        timerTime: 0,
        totalTime: 2 * 60 * 60 * 1000 + 15 * 60 * 1000
    };

    startTimer = () => {
        this.setState({
            timerOn: true,
            timerTime: this.state.timerTime,
            timerStart: Date.now() - this.state.timerTime
        });
        this.timer = setInterval(() => {
            this.setState({
                timerTime: Date.now() - this.state.timerStart
            });
        }, 10);
    };
    stopTimer = () => {
        this.setState({ timerOn: false });
        clearInterval(this.timer);
    };
    resetTimer = () => {
        this.setState({
            timerStart: 0,
            timerTime: 0,
            totalTime: 2 * 60 * 60 * 1000 + 15 * 60 * 1000
        });
    };
    render() {
        const {timerOn, timerStart, timerTime, totalTime} = this.state

        let seconds = ("0" + ((Math.floor((totalTime - timerTime) / 1000) % 60)) %60).slice(-2);
        let minutes = ("0" + ((Math.floor((totalTime - timerTime) / 60000) % 60)) %60).slice(-2);
        let hours = ("0" + (Math.floor((totalTime - timerTime) / 3600000))).slice(-2);
        return (
            <div className="Countdown">
                <div className="Countdown-header">Time left</div>
                <div className="Countdown-time">
                    {hours} : {minutes} : {seconds}
                </div>
                {/*<div className="Countdown-display">*/}
                {/*    <button onClick={() => this.adjustTimer("incHours")}>&#8679;</button>*/}
                {/*    <button onClick={() => this.adjustTimer("incMinutes")}>&#8679;</button>*/}
                {/*    <button onClick={() => this.adjustTimer("incSeconds")}>&#8679;</button>*/}
                {/*    <button onClick={() => this.adjustTimer("decHours")}>&#8681;</button>*/}
                {/*    <button onClick={() => this.adjustTimer("decMinutes")}>&#8681;</button>*/}
                {/*    <button onClick={() => this.adjustTimer("decSeconds")}>&#8681;</button>*/}
                {/*</div>*/}
                <div style={{marginTop: '40px'}}>
                {timerOn === false &&
                (timerStart === 0 || timerTime === timerStart) && (
                    <button onClick={this.startTimer}>Start</button>
                )}
                {timerOn === true && timerTime >= 1000 && (
                    <button onClick={this.stopTimer}>Stop</button>
                )}
                {timerOn === false &&
                (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
                    <button onClick={this.startTimer}>Resume</button>
                )}
                {(timerOn === false || timerTime < 1000) &&
                (timerStart !== timerTime && timerStart > 0) && (
                    <button onClick={this.resetTimer}>Reset</button>
                )}
                </div>
            </div>
        );
    }
}
export default Countdown;
