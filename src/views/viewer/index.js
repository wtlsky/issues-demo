import React from 'react';
import { render as renderAmis } from 'amis';
import { Spinner } from 'amis-ui'
import { env } from '../../config/env.js'

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';

// 注册自定义拓展组件
import '../../packages/registerRenderer.js'
export default class Home extends React.Component {
  state = {
    data: ''
  }

  componentWillMount () {
    const params = new URLSearchParams(window.location.search)
    const type = params.get('type') || ''
    if (type.toLowerCase() === 'page') {
      import('./demo.json').then(json => {
        this.setState({ data: json })
      })
    } else if (type.toLowerCase() === 'app') {
      env.fetcher({ url: '/sites/hello.json', method: 'get' }).then(res => {
        const data = {
          type: 'app',
          ...res.data.data
        }
        this.setState({ data })
      }).catch(err => {
        import('./demo.json').then(json => {
          this.setState({ data: json })
        })
      })
    }
  }

  render () {
    const content = (this.state.data ? <>{renderAmis({ ...this.state.data }, {}, env)}</> : <Spinner tip='加载中...' />)
    return (
      <div className='render-wrap'>
        {content}
      </div>
    )
  }
}