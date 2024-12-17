import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";

function SinglePostRender() {
  const navigate = useNavigate(); // For programmatic navigation

  const location = useLocation();
  const [post, setPost] = useState({});
  const [nextPost, setNextPost] = useState(null);

  useEffect(() => {
    if (nextPost === null) {
      setPost(location.state);
    } else {
      setPost(nextPost)
    }
  }, [post, nextPost, location.state]);

  const handlePostNavigation = async (id) => {
    // Check if id is null or undefined and exit early
    if (id === null || id === undefined) {
      console.log("Invalid ID: Navigation stopped.");
      return; // Exit the function
    }

    console.log("Navigating to post with ID:", id);

    try {
      await fetchNextPost(id);
      console.log("Fetched next post:", nextPost);

      // Update the state and navigate to the new slug
      setPost(nextPost);
      navigate(`/post/${nextPost.slug}`, {replace: true}); // Update URL with new slug
    } catch (error) {
      console.error("Error during navigation:", error);
    }
  };
  const fetchNextPost = async (id) => {
    try {
      const response = await fetch('/wp-json/wp/v2/posts/' + id);
      const data = await response.json();
      setNextPost(data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      {post !== null && Object.keys(post).length &&
        <section className="block block-single-news single-post-render">
          <section className="section pos-r ">
            <div className="container ">
              <div className="background-fw" style={
                post?.background_color
                  ? {background: `#${post.background_color.replace('#', '')}`}
                  : undefined
              }></div>
              <div className="row flex news-container news-container__news --preview padding-s pos-r jc-sb ai-center">
                <div className="news-container__desc flex-col-2 p-s">
                  <h1 className="h1"> {post.title.rendered} </h1>
                  <p className="p-s"> {post.date}</p>
                </div>
                <div className="flex-col-3">
                  <img width="1280" height="720"
                       src={post.post_image.url}
                       className="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" loading="lazy"
                       sizes="(max-width: 1280px) 100vw, 1280px"/>

                  <nav>
                    <a onClick={() => handlePostNavigation(post?.previous_post?.id)}
                       className="swiper-button-prev">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="35" viewBox="0 0 20 35" fill="none"
                           className="svg replaced-svg">
                        <path
                          d="M3.31592 17.2018L18.8299 2.25843C19.3662 1.74175 19.3662 0.904079 18.8299 0.387396C18.2934 -0.129132 17.4238 -0.129132 16.8874 0.387396L0.402189 16.2662C-0.134063 16.7829 -0.134063 17.6206 0.402189 18.1373L16.8874 34.0161C17.4331 34.5238 18.3028 34.5093 18.8299 33.9836C19.344 33.4708 19.344 32.6578 18.8299 32.1451L3.31592 17.2018Z"
                          fill="#414042"></path>
                      </svg>

                    </a>
                    <a onClick={() => handlePostNavigation(post?.next_post?.id)}
                       className="swiper-button-next">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="35" viewBox="0 0 20 35" fill="none"
                           className="svg replaced-svg">
                        <path
                          d="M15.9165 17.1888L0.402552 32.1322C-0.133779 32.6489 -0.133779 33.4865 0.402552 34.0032C0.939045 34.5198 1.80862 34.5198 2.34504 34.0032L18.8302 18.1243C19.3665 17.6076 19.3665 16.7699 18.8302 16.2532L2.34504 0.374308C1.79929 -0.133386 0.929631 -0.118807 0.402554 0.40687C-0.111562 0.91968 -0.111562 1.73262 0.402554 2.24536L15.9165 17.1888Z"
                          fill="#414042"></path>
                      </svg>

                    </a>
                  </nav>
                </div>

              </div>
            </div>
          </section>

          <section className="section pos-r content">
            <div className="container ">
              <div className="row news-container news-container__news --content padding-s"
                   dangerouslySetInnerHTML={{__html: post.content.rendered}}>
              </div>
            </div>
          </section>
        </section>
      }

    </>

  )
}


//TODO: implement close open post
//TODO: implement cache already loaded data
//TODO: implement overall cache


export default SinglePostRender
