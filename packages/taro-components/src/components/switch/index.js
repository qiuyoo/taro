import Nerv from 'nervjs'
import omit from 'omit.js'
import classNames from 'classnames'

const types = {
  switch: 'switch',
  checkbox: 'check'
}
function parseType (type) {
  if (!types[type]) throw new Error('unexpected type')
  return types[type]
}
class Switch extends Nerv.Component {
  constructor () {
    super(...arguments)
    this.state = {
      checked: this.props.checked
    }
    this.switchChange = this.switchChange.bind(this)
  }

  switchChange (e) {
    const { onChange } = this.props
    Object.defineProperty(e, 'detail', {
      enumerable: true,
      value: {
        value: e.target.checked
      }
    })
    onChange && onChange(e)
  }

  render () {
    const { type = 'switch', className } = this.props
    const cls = classNames(
      {
        [`weui-${parseType(type)}`]: true
      },
      className
    )
    return (
      <input
        {...omit(this.props, ['className', 'checked', 'onChange'])}
        className={cls}
        checked={this.state.checked}
        type='checkbox'
        onChange={this.switchChange}
      />
    )
  }
}

export default Switch
