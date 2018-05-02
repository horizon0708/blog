import React from 'react'

const Tags = ({ tags, onClick }) => {
  return (
    <div style={{marginBottom: '1rem'}}>
      {tags.map((x, i) => {
        return (
          <span
            onClick={onClick(x.name)}
            style={{marginRight: '0.5rem'}}
            className={`tag is-medium ${x.clicked ? 'is-dark' : 'is-light'}`}
            key={i}
          >
            {x.name}
          </span>
        )
      })}
    </div>
  )
}

export default Tags
