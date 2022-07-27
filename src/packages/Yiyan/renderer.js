import React from 'react';
import { Renderer } from 'amis';
import style from './scss/index.module.scss'
import { sentenceMap } from './enumType.js'

export default class YiyanRenderer extends React.Component {

  state = {
    data: {}
  }

  componentDidMount () {
    this.getYiyan()
  }

  getYiyan () {
    const { env, link, sentence } = this.props
    env.fetcher({ url: link, data: { c: sentence } }).then(({ data }) => {
      this.setState({ data })
    })
  }

  renderBody () {
    const { children, body, render } = this.props

    return React.createElement('div', { className: 'yiyan-body' }, children ? typeof children === 'function' ? children() : children : body ? render('body', body) : null)
  }

  render () {
    const { theme, showAbout, id } = this.props
    const { hitokoto, from, from_who, type } = this.state.data
    const about = () => (<a className='about' href="https://hitokoto.cn/about">关于一言</a>)

    return (
      <div className={[style['yi-yan'], theme].join(' ')} style={{ backgroundImage: `url(https://source.unsplash.com/random/1920x200?x=${id})` }}>
        <div className='container'>
          <div className='content'>{hitokoto}</div>
          <div className='from'>@{from}-{from_who || '佚名'}</div>
          <div className='footer'>
            <div className='reviewer'>{sentenceMap[type] || '动画'}</div>
            {showAbout && about()}
          </div>
        </div>
        {this.renderBody()}
      </div>
    )
  }
}

Renderer({ type: 'yi-yan', autoVar: true })(YiyanRenderer)