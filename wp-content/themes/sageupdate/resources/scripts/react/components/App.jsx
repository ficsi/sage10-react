import React, {useState} from 'react';
import {sendMessage} from '../components/openai';
import PostsList from "@scripts/react/components/PostsList.jsx";
import SinglePost from "@scripts/react/components/SinglePost.jsx";

const BASE_URL = 'https://mysite.local/wp-json/wp/v2/'

const App = () => {

  return (
    <>
      <h1>Hello, React!</h1>
      <PostsList url={BASE_URL}/>
    </>
  )
    ;
};

export default App;
