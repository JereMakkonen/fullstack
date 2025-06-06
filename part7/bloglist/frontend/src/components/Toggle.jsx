import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleVisibility, setVisibility } from '../reducers/toggleReducer'

const Toggle = ({ id, label, children }) => {
  const dispatch = useDispatch()
  const visible = useSelector(state => state.toggle[id])

  useEffect(() => {
    dispatch(setVisibility(id))
  }, [dispatch])

  return (
    <div>
      {visible && <div>{children}</div>}
      <button onClick={() => dispatch(toggleVisibility(id))}>{label[+visible]}</button>
    </div>
  )
}

export default Toggle
