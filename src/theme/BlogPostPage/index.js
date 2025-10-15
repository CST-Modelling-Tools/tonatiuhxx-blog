import React from 'react';
import OriginalBlogPostPage from '@theme-original/BlogPostPage';
import GiscusComments from '@site/src/components/GiscusComments';

export default function BlogPostPage(props) {
  return (
    <>
      <OriginalBlogPostPage {...props} />
      <div style={{ marginTop: '3rem' }}>
        <GiscusComments />
      </div>
    </>
  );
}