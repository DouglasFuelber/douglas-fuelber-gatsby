import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import PostListing from "../components/PostListing";
import Layout from "../layout";
import config from "../../data/SiteConfig";

export default class CategoryTemplate extends React.Component {
  render() {
    const { category } = this.props.pageContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <Layout
        location={this.props.location}
        title={category.charAt(0).toUpperCase() + category.slice(1)}
      >
        <Helmet>
          <title>{`Blog | Categoria: ${category} | ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}/blog/categorias/${category}`}/>
        </Helmet>

        <div id="blog-container" className="tertiary_bg">

          <div id="page_title" className="md-grid md-cell--8">
            <Link style={{ textDecoration: "none" }} to="/blog/">
              <h1 className="left-border-area light-border">Blog</h1>
            </Link>
            <h2>Categoria: <span className="md-text-uppercase">{category}</span></h2>
          </div>

          <div id="page_content">
            <PostListing postEdges={postEdges} location={this.props.location} /> 
          </div>
                     
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
            category
          }
        }
      }
    }
  }
`;
