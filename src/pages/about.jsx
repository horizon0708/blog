import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import BlogDescription from '../components/BlogDescription'

class About extends React.Component {
  render () {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <div>
        <Helmet title={siteTitle} />
        <h1 className="is-1 title">About</h1>
        <BlogDescription/>
        This blog is built with GatsbyJS. Check out the source on <a href="">github</a>.
      </div>
    )
  }
}

export default About
