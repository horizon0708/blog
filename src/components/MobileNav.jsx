import React from 'react'

const MobileNav = ({ open, children, onClose }) => {
  const renderChildren = () => {
    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        onClick: onClose
      })
    })
  } 
  
  return (
    <nav className={`overlay ${ open ?'open' : 'closed'}`}>
      <a href="#" className="closebtn" onClick={onClose}>&times;</a>
      <div className='overlay-content'>
          {renderChildren()}
      </div>
    </nav>
  )
}

export default MobileNav
