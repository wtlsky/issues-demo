import React from 'react';
import { toast, FormItem } from 'amis';
import style from './index.module.scss'
import Vue from 'vue'
import Vtest from './index.vue'

export default class VTestRenderer extends React.Component {
  constructor(props) {
    super(props)
    const { value } = props
    const COM = Vue.extend(Vtest)
    this.picker = new COM({
      propsData: {
        value
      }
    })
    this.vueRoot = React.createRef();
  }

  componentDidMount () {
    const { current } = this.vueRoot
    this.picker.$mount(current)
  }

  componentDidUpdate () {
    const { value } = this.props
    this.picker.value = value
  }

  componentWillUnmount () {
    this.picker.$destroy()
    this.picker = null
  }

  handleColorChange (e) {
    const { onChange } = this.props
    onChange(e)
    toast.success(e)
  }

  render () {
    const { className } = this.props

    return (
      <div className={[style.vuePicker, className].join(' ')}>
        <div ref={this.vueRoot}></div>
      </div>
    )
  }
}

FormItem({ type: 'v-test', autoVar: true })(VTestRenderer)