import React, { useEffect, useState } from 'react'
import './App.css';
import getPostsFromAuthor from './client/getPosts';
import { filterFeedPosts } from './helpers/postsHelpers';
import { AUTHOR, BUTTON_NAMES } from './helpers/constants';

import { Button } from './components/Button'
import { Post } from './components/Post'

const App = () => {
  const [authorFeed, setAuthorFeed] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchFeed = async () => {
      const { feed } = await getPostsFromAuthor(AUTHOR)
      setAuthorFeed(feed)
    }

    fetchFeed()
  }, []);

  const buttonClicked = (name) => async () => {
    const facet = name.toLowerCase() + 'stories'
    const posts = filterFeedPosts(authorFeed, AUTHOR, facet)
    setPosts(posts)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Neiklot</h1>

        <div style={{ marginBottom: '10px' }}>
          {BUTTON_NAMES.map((name) => (<Button key={name} onClick={buttonClicked(name)} name={name} />))}
        </div>
        {posts && posts.map((post) => <Post post={post} />)}
      </header>
    </div>
  );
}

export default App;
