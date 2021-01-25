import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import userReducer from "./reducers/userReducer";
import CountDown from 'antd'

const store = createStore(userReducer)
ReactDOM.render(
  <Provider store={store}>
    <App>
    </App>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// import  {  Statistic, Row, Col  } from 'antd';
//
// const { Countdown } = Statistic;
// // const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
// const deadline = new Date('2021-01-12 12:00:00')
//
// function onFinish() {
//     console.log('finished!');
// }
//
// ReactDOM.render(
//     <Row gutter={16}>
//         <Col span={12}>
//             <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
//         </Col>
//         <Col span={12}>
//             <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
//         </Col>
//         <Col span={24} style={{ marginTop: 32 }}>
//             <Countdown title="Day Level" value={deadline} format="D 天 H 时 m 分 s 秒" />
//         </Col>
//     </Row>,
//     document.getElementById('root'),
// );
