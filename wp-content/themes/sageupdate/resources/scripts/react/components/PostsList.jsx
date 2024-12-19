import React, {Suspense, useEffect, useState, useTransition} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import PostListRender from '@scripts/react/components/PostListRender.jsx';
import LoadingOverlay from '@scripts/react/components/LoadingOverlay.jsx';


function PostsList({url}) {
  const [categories, setCategories] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [postsByCatId, setPostsByCatId] = useState(null);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const fetchCategories = async () => {
    try {
      const response = await fetch(url + 'categories');
      const dataCategories = await response.json();
      setCategories(dataCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const response = await fetch(url + 'posts');
      const dataAllPosts = await response.json();
      setAllPosts(dataAllPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        await fetchCategories();
        await fetchAllPosts();
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchData();
  }, []);

  const handleCategoryEnter = async (id) => {
    if (id === 'undefined' || id === null) {
      return;
    }
    fetch(url + 'posts?categories=' + id)
      .then((response) => response.json())
      .then((data) => startTransition(() => {
        setPostsByCatId(data);
        setIsActive(prev => !prev);
      }))
      .catch((error) => console.error(error));
  };

  // Navigate to SinglePostRender with post data
  const handlePostClick = (post) => {
    navigate(`/post/${post.slug}`);
  };

  return (
    <>
      <Suspense fallback={<LoadingOverlay/>}>
        <ul className="categories">
          {categories?.map((category) => (
            <li
              onClick={async () => await handleCategoryEnter(category.id)}
              data-category={category.id}
              key={category.id}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </Suspense>

        {postsByCatId ? (
          <PostListRender data={postsByCatId} onPostClick={handlePostClick}/>
        ) : (
          'No post selected'
        )}

    </>
  );
}

export default PostsList;
