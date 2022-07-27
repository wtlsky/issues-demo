import { Editor } from 'amis-editor';
import './disabledEditorPlugin'
import buildInPlugins from '../../packages/registerPlugin'
import '../../packages/registerRenderer'
import { Button, confirm } from 'amis';
import { env } from '../../config/env.js'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/css/v4-shims.css'
import 'amis/lib/themes/default.css'
import 'amis/lib/helper.css'
import 'amis/sdk/iconfont.css'
import 'amis-editor/dist/style.css'
import './index.scss'
import React from 'react';

class App extends React.Component {
  state = {
    preview: false,
    data: {},
    hasChange: false
  }

  handleClick = () => {
    this.setState({
      preview: !this.state.preview
    })
  }

  handleCopyClick = () => {
    env.copy(JSON.stringify(this.state.data))
  }

  handleExitClick = () => {
    if (this.state.hasChange) {
      confirm('检测到页面发生变化是否放弃保存并退出?', '退出提示', '确定退出').then(status => {
        if (status) {
          window.history.back()
        }
      })
    } else {
      window.history.back()
    }
  }

  handleDataChange = (value) => {
    this.setState({
      data: value,
      hasChange: true
    })
  }

  handleLoadMock = () => {
    import('../viewer/demo.json').then(value => {
      this.setState({ data: value })
    })
  }

  render () {
    return (
      <>
        <header className='header'>
          <div className='logo'>假装有个logo</div>
          <div className='operate-list'>
            <Button className='btn' level="primary" onClick={this.handleClick}>{this.state.preview ? '编辑' : '预览'}</Button>
            <Button className='btn' onClick={this.handleCopyClick}>复制代码</Button>
            <Button className='btn' onClick={this.handleLoadMock}>加载测试代码</Button>
            <Button className='btn' onClick={this.handleExitClick}>退出</Button>
          </div>
        </header>
        <div className="container">
          <Editor amisEnv={env} preview={this.state.preview} value={this.state.data} plugins={[...Object.values(buildInPlugins)]} onChange={this.handleDataChange}></Editor>
        </div>
      </>
    );
  }
}

export default App;
