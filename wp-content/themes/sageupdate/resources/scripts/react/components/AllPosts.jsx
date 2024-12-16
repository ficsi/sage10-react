import React from 'react'

function AllPosts(data) {
  console.log(data)
  return (
    <div className="news --list">
      <section className="custom-heading">
        <div className="section-heading ">
          <div className="container">

            <div className="row flex jc-center ai-center row--one">
              <div className="row__title">
                <h2>latest news</h2>
              </div>
            </div>

          </div>
        </div>
      </section>
      {data.data.map(post =>
        <div className="container">
          <div className="row flex news-container news-container__latest  padding  fd-row_r ">
            <div className="news-container__desc flex-col-2">
              <div className="p-s">
                <h2>
                  <a className="h2"
                     href="#">{post.title.rendered}</a>
                </h2>
                <span className="date-create">{post.date}</span>
                <div className="p-s short-info"  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
              </div>
              <a className="margin-t-40 btn btn-default btn-s"> Read more</a>

            </div>
            <div className="flex-col-2">
              <a>
                <div className="news-image-wrapper">
                  {
                    <img width="1280" height="720"
                                                     src='https://www.egt.com/wp-content/uploads/2024/12/egt_wla-certificate_announcement_visual_1280x720_web.png'
                                                      // src={post.featured_media !== 0 && ''}
                                                      className="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                                                      alt="" loading="lazy"/>
                  }
                </div>
              </a>
            </div>
          </div>
        </div>,
      )}
    </div>
  )
}

export default AllPosts
