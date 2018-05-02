import React from 'react'
import Link from 'gatsby-link'
import '../styles/main.scss'
import { Container } from 'bloomer';
import { Button } from 'bloomer'
import CustomNavbar from '../components/CustomNavbar'

class Template extends React.Component {
  render () {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    if (location.pathname === rootPath) {
      header = (
        <h1 className="is-1 title" style={{marginBottom: "0.5rem"}}>
          <Link className="has-text-dark" to={'/'}>Devlog.</Link>
        </h1>
      )
    } else {
      header = '';
    }
    return (
      <div>
        <CustomNavbar />
        <Container style={{maxWidth: '768px', marginTop: "13vh", marginBottom: "13vh"}}>
          {header}
          {children()}
        </Container>
      </div>
    )
  }
}

export default Template
