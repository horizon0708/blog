import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import { Title } from 'bloomer'
import Bio from '../components/Bio'
import { DiscussionEmbed } from 'disqus-react'

class BlogPostTemplate extends React.Component {
  render () {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pathContext
    const disqusShortname = 'jameskim0708'
    const disqusConfig = {
        url: `https://blog.jameskim.co.nz` + this.props.location.pathname,
        identifier: post.id,
        title: post.frontmatter.title
    }
    return (
      <div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <Title className="is-marginless" isSize={1} tag='h1'>{post.frontmatter.title}</Title>
        <p style={{marginBottom: '3rem'}}>{post.frontmatter.date}</p>
        {/* <p>{post.frontmatter.category}</p> */}
        <div className="content" dangerouslySetInnerHTML={{ __html: post.html }} />

        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig}/>
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel='prev'>
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel='next'>
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        category
      }
    }
  }
`
