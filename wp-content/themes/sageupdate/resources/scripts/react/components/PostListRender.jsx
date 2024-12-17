import React, {useState} from 'react'
import SinglePostRender from "@scripts/react/components/SinglePostRender.jsx";
import {renderComponentBasedOnState} from "@scripts/react/helpers/updateUrlPath.jsx";
import {NavLink} from "react-router-dom";

function PostListRender({data}) {
  const [currentPost, setCurrentPost] = useState(null);
  const [loadPost, setLoadPost] = useState(false);

  const handleSelectedPost = (post) => {
    // console.log(post);
    post !== null && setCurrentPost(post);

    setLoadPost(true)

  }

  return (
    <>
      <section className="section pos-r">
        {data?.map((post, index) =>

            <div key={post.id} className="container">
              <div
                className="background-fw"
                style={
                  post.background_color
                    ? {background: `#${post.background_color.replace('#', '')}`}
                    : undefined
                }
              ></div>
              <div className={`row flex news-container news-container__news padding ${index % 2 === 0 && 'fd-row_r'}`}>
                <div className="news-container__desc flex-col-2">
                  <div className="p-s">
                    <h2 className="h1">
                      <a>{post.title.rendered}</a>
                    </h2>
                    <span className="date-create"> {post.date} </span>
                    <div className="p-s short-info" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}>

                    </div>
                  </div>
                  <NavLink key={post.id}
                           to={`/post/${post.slug}`}
                           state={
                             post
                           }
                           className="margin-t-40 btn btn-default btn-s"
                           onClick={() => handleSelectedPost(post)}> Read more</NavLink>
                </div>
                <div className="flex-col-2 news-container__image">
                  <a>
                    <div className="news-image-wrapper">
                      <img width="1280" height="720"
                           src={post?.post_image.url}
                           className="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" loading="lazy"
                           srcSet=""
                           sizes=""/>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ,
        )}
      </section>
      {loadPost && currentPost &&
        <SinglePostRender post={currentPost} imageUrl={currentPost.post_image.url}/>}
    </>
  )
}

export default PostListRender
