import React from 'react'

const BlogDescription = ({ className }) => {
  return (
    <div className={`content ${className}`}>
      <p>James Kim, a Wellington-based web developer writing about things I learn in web dev. I will be mostly blogging about Wordpress, React, and Elixir</p>

      Come say hi at:
      <ul>
        <li><a href="https://twitter.com/LLHorizon">Twitter</a></li>
        <li><a href="mailto:james.kim.nz92@gmail.com">James.kim.nz92@gmail.com</a></li>
      </ul>
    </div>
  )
}

export default BlogDescription
