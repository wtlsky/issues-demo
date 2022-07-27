import React from 'react';
import { render as renderAmis } from 'amis';
import { env } from '../../config/env.js'

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';

import '../../packages/registerRenderer.js'

import amisJSON from './demo.json'
export default class Home extends React.Component {
  render () {
    return (
      <div className='render-wrap'>
        {renderAmis(amisJSON, {}, env)}
      </div>
    )
  }
}