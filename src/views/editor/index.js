import { Editor } from 'amis-editor';
import './disabledEditorPlugin'
import buildInPlugins from '../../packages/registerPlugin'
import '../../packages/registerRenderer'
import { Button } from 'amis';
// import demo from '../viewer/demo.json'
import { env } from '../../config/env.js'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/css/v4-shims.css'
import 'amis/lib/themes/default.css'
import 'amis-editor/dist/style.css'
import './index.scss'
import React from 'react';

const demo = {}

class App extends React.Component {
  state = {
    preview: false
  }

  handleClick = () => {
    this.setState({
      preview: !this.state.preview
    })
  }
  render () {
    return (
      <>
        <header className='header'>
          <div className='logo'>假装有个logo</div>
          <div className='operate-list'>
            <Button className='btn' level="primary"  onClick={this.handleClick}>{this.state.preview ? '编辑' : '预览'}</Button>
            <Button className='btn'>退出</Button>
          </div>
        </header>
        <div className="container">
          <Editor amisEnv={env} preview={this.state.preview} value={demo} plugins={[...Object.values(buildInPlugins)]} onChange={(value) => console.log(value)}></Editor>
        </div>
      </>
    );
  }
}

export default App;
