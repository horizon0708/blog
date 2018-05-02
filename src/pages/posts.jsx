import React from "react";
import Link from "gatsby-link";
import get from "lodash/get";
import uniq from "lodash/uniq";
import Helmet from "react-helmet";
import { navigateTo } from "gatsby-link";
import { renderExcerpts } from "../utilities/renderHelper";
import Tags from "../components/filter/tags";
import Categories from "../components/filter/categories";
import StatusText from "../components/filter/statusText";
import {
  constructQuery,
  processParamToArray,
  processParamToString,
  getArrayQueryString,
  getSingleQueryString,
  arrIncludes
} from "../utilities/urlParamHelper";

class Posts extends React.Component {
  filterByTag(posts) {
    const tags = processParamToArray('tags', this.props.location.search);
    if (tags) {
      return posts.filter(({ node }) => {
        return tags.some(tag => node.frontmatter.tags.includes(tag));
      });
    }
    return posts;
  }

  filterByCategory(posts) {
    const category = processParamToString('category', this.props.location.search);
    if (category) {
      return posts.filter(({ node }) => {
        return node.frontmatter.category === category;
      });
    }
    return posts;
  }

  handleTagClick = tag => event => {
    const raw = this.props.location.search
    const t = getArrayQueryString('tags', raw, tag)
    const cat = getSingleQueryString('category', raw);
    navigateTo(constructQuery([t, cat], '/posts'))    
  };

  handleCategoryClick = category => event => {
    const raw = this.props.location.search
    const tag = getArrayQueryString('tags', raw)
    const cat = getSingleQueryString('category', raw, category);
    navigateTo(constructQuery([tag, cat], '/posts'))    
  };

  renderTags() {
    const posts = get(this, `props.data.allMarkdownRemark.edges`);
    const allTags = [].concat( ...posts.map(x=> x.node.frontmatter.tags));

    const currentTags = processParamToArray('tags', this.props.location.search);
    const tags = uniq(allTags);
    const injected = tags.map(x => {
      return {
        name: x,
        clicked: arrIncludes(x, currentTags)
      };
    });
    return <Tags tags={injected} onClick={this.handleTagClick} />;
  }

  renderCategories() {
    const posts = get(this, `props.data.allMarkdownRemark.edges`);
    const allTags = posts.map(x => x.node.frontmatter.category);
    const currentCategory = processParamToString('category' , this.props.location.search);
    const tags = uniq(allTags);
    const injected = tags.map(x => {
      return {
        name: x,
        clicked: x === currentCategory
      };
    });
    return (
      <Categories categories={injected} onClick={this.handleCategoryClick} />
    );
  }

  // wow i really wish JS had pipe operators
  renderPosts() {
    const all = get(this, `props.data.allMarkdownRemark.edges`);
    const filteredPosts = this.filterByCategory(this.filterByTag(all));
    return renderExcerpts(filteredPosts);
  }

  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");

    return (
      <div>
        <Helmet title={siteTitle} />
        <h1 className="is-1 title">Posts</h1>
        {this.renderCategories()}
        {this.renderTags()}
        <StatusText
          tags={processParamToArray('tags', this.props.location.search)}
          category={processParamToString('category', this.props.location.search)}
        />
        <hr />
        {this.renderPosts()}
      </div>
    );
  }
}

export default Posts;

export const pageQuery = graphql`
  query FilterQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { status: { eq: "published" } } }
    ) {
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
`;
