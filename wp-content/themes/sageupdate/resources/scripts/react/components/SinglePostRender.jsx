import React, {Suspense, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import RelatedPostsList from "@scripts/react/components/RelatedPostsList.jsx";
import LoadingOverlay from "@scripts/react/components/LoadingOverlay.jsx";

function SinglePostRender() {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState(location.state || null);

  // Fetch post on initial load or refresh
  useEffect(() => {

    if (location.state) {
      setRelated(location.state.data)
    }

    if (!location.state) {
      const fetchOnRefresh = async () => {
        try {
          const slug = window.location.pathname.split("/post/")[1];
          const response = await fetch(`https://mysite.local/wp-json/wp/v2/posts?slug=${slug}`);
          const data = await response.json();
          setPost(data[0]);
        } catch (error) {
          console.error(error);
        }
      };
      fetchOnRefresh();

    } else {
      setPost(location.state);
    }
  }, [location.state]);
  // Dynamic update post meta from SEOPress
  //TODO: need to be refactor & get outside the component
  useEffect(() => {
    if (post) {

      // Update document title
      document.title = post.seopress_titles_title || post.title?.rendered || related.title.rendered;
      // Update meta description
      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = post.seopress_titles_desc || "";

      // Add Open Graph tags dynamically
      let ogTitle = document.querySelector("meta[property='og:title']");
      if (!ogTitle) {
        ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        document.head.appendChild(ogTitle);
      }
      ogTitle.content = post.seopress_social_fb_title || post.title?.rendered || related.content.rendered;

      let ogUrl = document.querySelector("meta[property='og:url']");
      if (!ogUrl) {
        ogUrl = document.createElement("meta");
        ogUrl.setAttribute("property", "og:url");
        document.head.appendChild(ogUrl);
      }
      ogUrl.content = window.location.href;

      let ogDescription = document.querySelector("meta[property='og:description']");
      if (!ogDescription) {
        ogDescription = document.createElement("meta");
        ogDescription.setAttribute("property", "og:description");
        document.head.appendChild(ogDescription);
      }
      ogDescription.content = post.seopress_social_fb_desc || "";

      let ogImage = document.querySelector("meta[property='og:image']");
      if (!ogImage) {
        ogImage = document.createElement("meta");
        ogImage.setAttribute("property", "og:image");
        document.head.appendChild(ogImage);
      }
      ogImage.content = post.seopress_social_fb_img || "";
    }
  }, [post]);

  useEffect(() => {
    // console.log('post: ', post)
    // console.log('related: ', related)
    if (post === null && (related !== 'undefined' || related !== null)) {
      if (related !== null) {
        console.log(related)
        setPost(related ? related : related.data)
      }
    }
  }, [related]);
  // Handle navigation to next/previous posts
  const handlePostNavigation = async (id) => {

    if (!id) return;

    try {
      const response = await fetch(`https://mysite.local/wp-json/wp/v2/posts/${id}`);
      const data = await response.json();
      setPost(data); // Update current post
      navigate(`/post/${data.slug}`, {replace: true}); // Update URL with new slug
    } catch (error) {
      console.error("Error navigating to post:", error);
    }
  };

  if (!post) return <Suspense fallback={<LoadingOverlay/>}>Loading...</Suspense>;

  return (
    <>
      <section className="block block-single-news single-post-render">
        <section className="section pos-r">
          <div className="container">
            <div className="background-fw"
                 style={post.background_color ? {background: `#${post.background_color.replace("#", "")}`} : undefined}></div>
            <div className="row flex news-container news-container__news --preview padding-s pos-r jc-sb ai-center">
              <div className="news-container__desc flex-col-2 p-s">
                <h1 className="h1">{post.title?.rendered || post.data.title}</h1>
                <p className="p-s">{post.date}</p>
              </div>
              <div className="flex-col-3">
                <img src={post.post_image?.url || post.data.custom_fields.post_image?.url} alt=""/>
                <nav>
                  <a onClick={() => handlePostNavigation(post.previous_post?.id)} className="swiper-button-prev">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="35" viewBox="0 0 20 35" fill="none"
                         className="svg replaced-svg">
                      <path
                        d="M3.31592 17.2018L18.8299 2.25843C19.3662 1.74175 19.3662 0.904079 18.8299 0.387396C18.2934 -0.129132 17.4238 -0.129132 16.8874 0.387396L0.402189 16.2662C-0.134063 16.7829 -0.134063 17.6206 0.402189 18.1373L16.8874 34.0161C17.4331 34.5238 18.3028 34.5093 18.8299 33.9836C19.344 33.4708 19.344 32.6578 18.8299 32.1451L3.31592 17.2018Z"
                        fill="#414042"></path>
                    </svg>
                  </a>
                  <a onClick={() => handlePostNavigation(post.next_post?.id)} className="swiper-button-next">
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
          <div className="container">
            <div dangerouslySetInnerHTML={{__html: post.content?.rendered || post.data.content}}></div>
          </div>
        </section>
      </section>
      {post && post.relation_news && post.relation_news.length > 0 && <RelatedPostsList data={post.relation_news} related_data={post}/>}
    </>
  );
}

export default SinglePostRender;
