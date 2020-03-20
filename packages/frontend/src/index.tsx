import 'typeface-inter';
import 'antd/dist/antd.min.css';
// TODO: We really should move this but VSCode gets mad and I'm too lazy
// to figure out how to fix it right now.
import '../../../css/output.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
