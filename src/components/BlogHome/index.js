import React from 'react';
import {Redirect, useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import OriginalBlogListPage from '@theme-original/BlogListPage';

export default function BlogHome(props) {
  const {pathname} = useLocation();
  const home = useBaseUrl('/');        // '/' in dev, '/tonatiuhpp-blog/' in prod
  const welcome = useBaseUrl('/welcome');

  // Redirect ONLY on the homepage, not on /page/1
  if (pathname === home || pathname === '/') {
    return <Redirect to={welcome} />;
  }

  // Otherwise render the normal blog list pages (/page/1, /page/2, ...)
  return <OriginalBlogListPage {...props} />;
}
