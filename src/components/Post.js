import React from 'react'

import { buildImage, cleanupText } from '../helpers/postsHelpers';
import { AUTHOR } from '../helpers/constants';

export const Post = ({ post }) => {
  const { record: { text, embed } } = post
  const image = buildImage(embed, AUTHOR)
  const cleanText = cleanupText(text)

  return (
    <div key={post.cid} style={{ marginBottom: '5rem' }}>
      {image && <img src={image.src} alt={image.alt} width='400' height='400' />}
      <div style={{ fontSize: '1rem', padding: '1rem 5rem' }}>
        <p>{cleanText}</p>
      </div>
    </div>
  )
}
