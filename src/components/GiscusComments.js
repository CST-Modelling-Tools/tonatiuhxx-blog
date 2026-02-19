import React from 'react';
import Giscus from '@giscus/react';

export default function GiscusComments() {
  return (
    <Giscus
      repo="CST-Modelling-Tools/tonatiuhpp-blog"
      repoId="R_kgDOQCS6Ig"
      category="General"
      categoryId="DIC_kwDOQCS6Is4CwrAa"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
}