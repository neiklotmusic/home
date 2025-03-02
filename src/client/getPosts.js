import axios from 'axios'

const BSKY_PUBLIC_API_URL = 'https://public.api.bsky.app'

const getPostsFromAuthor = async (actor) => {
  const getAuthorFeedPath = '/xrpc/app.bsky.feed.getAuthorFeed'
  const baseURL = BSKY_PUBLIC_API_URL + getAuthorFeedPath
  const query = `?actor=${actor}&filter=posts_and_author_threads&includePins=true&limit=30`

  const url = baseURL + query
  const response = await axios.get(url)

  return response.data
}

export default getPostsFromAuthor
