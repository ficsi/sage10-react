import React, {useEffect, useState, useTransition} from 'react'
import SinglePost from "@scripts/react/components/SinglePost.jsx";

function PostsList(data) {
  const [categories, setCategories] = useState([]);
  const [postsByCatId, setPostsByCatId] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [isSinglePostOpen, setIsSinglePostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const fetchCategories = async () => {
    try {
      const response = await fetch(data.url + 'categories');
      const dataCategories = await response.json();
      setCategories(dataCategories);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await fetchCategories();
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
    fetch(data.url + 'posts?categories=' + id)
      .then((response) => response.json())
      .then((data) => startTransition(() => setPostsByCatId(data)))
      .catch((error) => console.error(error));

  }


  const handleSinglePostOpen = (content) => {
    if (content.id) {
      setSelectedPost(content);
      setIsSinglePostOpen(true);
    }
  }
  const handleSinglePostClose = () => {
    setIsSinglePostOpen(false);
    setSelectedPost(null);
  }

  return (
    <>
      <div>PostsList</div>
      <ul className={'categories'}>
        {categories?.map((category) =>
          <li onMouseEnter={async () => await handleCategoryEnter(category.id)}
              data-category={category.id}
              key={category.id}>
            {category.name}
          </li>,
        )}
      </ul>
      {
        postsByCatId ?
          <ul className={'posts'}>
            {postsByCatId?.map((post) =>
              <li onClick={() => handleSinglePostOpen(post)} key={post.id}>
                {post.title.rendered}
              </li>,
            )}
          </ul> : 'Select Category ...'
      }
      {isSinglePostOpen && selectedPost && (
        <SinglePost data={selectedPost} onClose={handleSinglePostClose} />
      )}
    </>
  )
}

export default PostsList
