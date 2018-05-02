import React from 'react'
import { navigateTo } from "gatsby-link";

const StatusText = ({ tags, category }) => { 
  const constructTagText = tags => {
    if(tags && tags.length > 0){
      return tags.reduce((a,b,i,arr)=> {
        if(arr.length > 1 && i == arr.length - 1){
          return a + ' or ' + b + '';
        }
        return a +', ' + b;
      })
    }
    return null
  }

  const createText = (tags, category) => {
    const tagText = constructTagText(tags)
    const catText = constructCategoryText(category)
    if(tagText === null && catText === '') {
      return <p>showing off everything! Gee what a show off.</p>
    }
    return <p>showing all {catText}{tagText ? ` with tags ${tagText}`: ''}. <a onClick={() => navigateTo("/posts")}> clear filter. </a></p> ;
  }

  const constructCategoryText = category => {
    if(category && category.length > 0) {
      return `${category}s`
    }    
    return ''
  }
  
  
  return createText(tags,category);
}

export default StatusText