import get from 'lodash/get'
import React from 'react'
import Link from 'gatsby-link'

export function renderExcerpts(posts){
  return posts.map(({ node }) => {
    const title = get(node, 'frontmatter.title') || node.fields.slug
    return (
      <div key={node.fields.slug} style={{margin: "2rem 0"}}>
        <h3 className="title is-3 is-marginless">
          <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
            {title}
          </Link>
        </h3>
        <small>{node.frontmatter.date}</small>
        <div className="is-clearfix" style={{height: '1rem'}}>
        </div>
        <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        <div style={{marginTop: '1rem'}} className="tags">
        {renderTags(node.frontmatter.tags)}
        </div>
      </div>
    )
  })
}

export function renderTags(tags){
  return tags.map((x,i)=>{
    return <span key={x+i}className="tag is-light is-medium">
      {x}
    </span> 
  });
}