import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          margin: '2rem 0'
        }}
      >
        <img
          className="profile-pic"
          src={profilePic}
          alt={`James Kim`}
          style={{
            marginRight: '1rem',
            marginBottom: 0,
            width: '4rem',
            height: '4rem',
          }}
        />
        <p className="content">
          James Kim - a junior web developer living in Wellington.{' '}
            Say hi to me on{` `}
          <a href="https://twitter.com/LLHorizon">
            Twitter
          </a>
          !
        </p>
      </div>
    )
  }
}

export default Bio
