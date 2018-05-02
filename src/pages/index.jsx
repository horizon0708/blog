import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import BlogDescription from '../components/BlogDescription'
import { renderExcerpts } from '../utilities/renderHelper'

class BlogIndex extends React.Component {
  
  filterPostsByCategory(posts, category){
    return posts.filter(({ node}) => {
      return node.frontmatter.category === category;
    }); 
  }
  
  renderFilteredPosts(posts, category){
    return renderExcerpts(this.filterPostsByCategory(posts, category));
  }

  render () {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <Helmet title={siteTitle} />
        <BlogDescription/>
        <hr/>
        <h2 className="title is-2">Blog Posts</h2>
        {this.renderFilteredPosts(posts, 'post')}          
        <hr/>
        <h2 className="title is-2 is-marginless">Snippets</h2>
        <div className="content">
          <p>Snippets are short snippets of thoughts and study notes that is not comprehensive to be a full blog post.</p>
        </div>
        {this.renderFilteredPosts(posts, 'snippet')}
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: {frontmatter: {status:{ eq: "published"}}}) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            category
            tags
          }
        }
      }
    }
  }
`
