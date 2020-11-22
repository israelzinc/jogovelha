import React from 'react'
import './square.css'
import X from '../../assets/X.png'
import O from '../../assets/O.png'

const Square = (props) => {

  const { value, onClick, classCss } = props
  
  return (
    <button className={`square ${classCss}`} onClick={ onClick }>
      {value ? (value === 'X' ? <img src={X} alt="Player X"/> : <img src={O} alt="Player O"/> ) : ''}
    </button>
  )
}

export default Square