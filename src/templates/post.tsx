import React, { useEffect, useState, useCallback } from 'react';
import { graphql } from 'gatsby';

import About from '../components/About';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import PostCover from '../components/PostCover';
import PostCategory from '../components/PostCategory';
import PostDateTime from '../components/PostDateTime';
import PostTags from '../components/PostTags';

import {
  Container,
  Post,
  PostMeta,
  PostBody,
  PostAdditionalInfo,
} from './post-styles';

interface IBlogPostPageProps {
  data: {
    markdownRemark: {
      html: string;
      timeToRead: Number;
      excerpt: String;
      frontmatter: {
        title: string;
        cover: String;
        date: Date;
        language: String;
        category: String;
        tags: String[];
      };
      fields: {
        slug: String;
        date: Date;
      };
    };
  };
}

const PostTemplate: React.FC<IBlogPostPageProps> = ({
  data: { markdownRemark: postNode },
}) => {
  const post = postNode.frontmatter;

  const [coverHeight, setCoverHeight] = useState(0);

  const handleResize = useCallback(() => {
    setCoverHeight(window.innerWidth < 768 ? 160 : 240);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout
      pageTitle={post.title}
      pageRelativeUrl={`blog/${postNode.fields.slug}`}
    >
      <PageTitle title="Blog" blogPostPage />
      <Container>
        <Post>
          <h1>{post.title}</h1>
          <PostCover cover={post.cover} coverHeight={coverHeight} />
          <PostMeta postIndex={0}>
            <PostCategory category={post.category} />
            <PostDateTime
              date={post.date}
              timeToRead={postNode.timeToRead}
              postIndex={0}
            />
          </PostMeta>
          <PostBody dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <PostMeta postIndex={0}>
            <PostTags tags={post.tags} />
          </PostMeta>
        </Post>
        <PostAdditionalInfo>
          <About vertical />
        </PostAdditionalInfo>
      </Container>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $language: String) {
    markdownRemark(
      fields: { slug: { eq: $slug } }
      frontmatter: { language: { eq: $language } }
    ) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        language
        category
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;