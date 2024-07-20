import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Toggle = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const { top, label } = props

  const toggleVis = () => setVisible(!visible)
  useImperativeHandle(ref, () => ({ toggleVis }))

  return (
    <>
      {top && <button onClick={toggleVis}>{label[+visible]}</button>}
      {visible && <div>{props.children}</div>}
      {!top && <button onClick={toggleVis}>{label[+visible]}</button>}
    </>
  )
})

Toggle.propTypes = {
  top: PropTypes.bool.isRequired,
  label: PropTypes.array.isRequired,
}

Toggle.displayName = 'Toggle'

export default Toggle