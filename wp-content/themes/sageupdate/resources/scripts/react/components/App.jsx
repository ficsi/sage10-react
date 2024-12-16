import React from 'react';
import PostsList from '@scripts/react/components/PostsList';
import SinglePostRender from '@scripts/react/components/SinglePostRender';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const BASE_URL = 'https://mysite.local/wp-json/wp/v2/';

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<PostsList url={BASE_URL} />} />
        <Route path="/post/:slug" element={<SinglePostRender />} />
      </Routes>
    </Router>
  );
};

export default App;
