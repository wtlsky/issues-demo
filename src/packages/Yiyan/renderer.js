import React from 'react';
import { Renderer, Spinner } from 'amis';
import { normalizeApi } from 'amis-core'
import style from './scss/index.module.scss'
import { sentenceMap } from './enumType.js'

export default class YiyanRenderer extends React.Component {

  state = {
    data: {},
    loading: false
  }

  componentDidMount () {
    const { initFetch } = this.props
    if (initFetch) {
      this.getYiyan()
    }
  }

  getYiyan (val) {
    const { env, api, sentence } = this.props
    const _api = normalizeApi(api)
    this.setState({ loading: true })
    env.fetcher({ ..._api, data: { c: val || sentence } }).then(({ data }) => {
      this.setState({ data, loading: false })
    }).catch(err => {
      this.setState({ loading: false })
    })
  }

  renderBody () {
    const { children, body, render } = this.props

    return React.createElement('div', { className: 'yiyan-body' }, children ? typeof children === 'function' ? children() : children : body ? render('body', body) : null)
  }

  render () {
    const { className, showAbout, id } = this.props
    const { hitokoto = '我变秃了，也变强了', from = '一拳超人', from_who = 'ONE', type } = this.state.data
    const about = () => (<a className='about' href="https://hitokoto.cn/about">关于一言</a>)

    return (
      <div className={[style['yi-yan'], className].join(' ')}>
        <div className='card' style={{ backgroundImage: `url(https://source.unsplash.com/random/1920x200?x=${id})` }}>
          <div className='container'>
            <div className='content'>{hitokoto}</div>
            <div className='from'>@{from}-{from_who || '佚名'}</div>
            <div className='footer'>
              <Spinner show={this.state.loading}></Spinner>
              <div className='reviewer'>{sentenceMap[type] || '动画'}</div>
              {showAbout && about()}
            </div>
          </div>
        </div>
        {this.renderBody()}
      </div>
    )
  }
}

Renderer({ type: 'yi-yan', autoVar: true })(YiyanRenderer)