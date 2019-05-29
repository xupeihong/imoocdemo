import React from 'react';
import logo from './logo.svg';
import './App.css';
import './demo.less'
import {Button} from 'antd'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='p20'>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
        <Button type="primary">提交</Button>
      </header>
    </div>
  );
}

export default App;
