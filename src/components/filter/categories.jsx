import React from 'react'

const Categories = ({ categories, onClick }) => {
  return (
    <div style={{marginBottom: '1rem'}}>
      {categories.map((x, i) => {
        return (
          <span
           className="category-button"
            onClick={onClick(x.name)}
            style={{marginRight: '1rem'}}
            key={i}
          >
            <h2
              style={{display: 'inline'}} 
              className={` title is-2 ${x.clicked ? "has-text-dark" : "has-text-grey-light"}`}>{x.name}s</h2>
          </span>
        )
      })}
    </div>
  )
}

export default Categories
