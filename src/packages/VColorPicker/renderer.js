import React from 'react';
import { toast, FormItem } from 'amis';
import style from './index.module.scss'

function getRandomColor () {
  var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
  if (rand.length === 6) {
    return `#${rand}`;
  } else {
    return getRandomColor();
  }
}

export default class VColorPickerRender extends React.Component {
  constructor(props) {
    super(props)
    const { value } = props
    const ColorPicker = window.Vue.extend(window.ELEMENT.ColorPicker)
    const picker = new ColorPicker({ propsData: { value } })
    picker.$on('change', this.handleColorChange.bind(this))
    this.picker = picker
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

FormItem({ type: 'v-color-picker', autoVar: true })(VColorPickerRender)