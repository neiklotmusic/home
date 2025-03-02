const isPostFromAuthor = (post, author) => post.author.did === author

const postHasFacet = (facets, facet) => {
  if (!facets) {
    return false
  }

  return facets.some((facetObject) => {
    return facetObject.features.some((feature) => feature.tag === facet)
  })
}

const postHasImages = (post) => post.record.embed?.images?.length > 0

export const filterFeedPosts = (feed, author, facet) => {
  return feed.reduce((filteredPosts, feedObject) => {
    const { post } = feedObject
    const { record: { facets } } = post

    if (isPostFromAuthor(post, author) && postHasFacet(facets, facet) && postHasImages(post)) {
      filteredPosts.push(post)
    }

    return filteredPosts
  }, [])
}

const BSKY_CDN_URL = 'https://cdn.bsky.app/img/feed_thumbnail/plain/'

export const buildImage = (embed, author) => {
  const { images } = embed
  const image = images[0]
  const imageData = image.image

  if (!imageData.ref) {
    return ''
  }

  const src = BSKY_CDN_URL + author + '/' + imageData.ref.$link + '@jpeg'

  return { ...image, src }
}

export const cleanupText = (text) => {
  const words = text.split('\n').join(' ').split(' ')
  const filteredWords = words.filter((word) => !word.startsWith('#') && !word.startsWith('\n'))

  return filteredWords.join(' ')
}
