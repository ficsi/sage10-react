import React from 'react'
import SinglePostRender from "@scripts/react/components/SinglePostRender.jsx";
import {useNavigate} from "react-router-dom";

function RelatedPostsList({data}) {
  const navigate = useNavigate();

  const handleNavigation = (related_post) => {
    console.log(related_post)
    navigate(`/post/${related_post.slug}`, {state: {data: related_post}});
  };
  return (
    <section className="block block-single-news__related">
      <section className="section pos-r">
        <div className="container flex jc-between ai-stretch">
          {data && data.map(related_post =>
            <div key={related_post.id} className="flex-col-3 item">
              <a>
                <div className="top-part">
                  <div className="img-wrapper">
                    <img width="1280" height="720" src={related_post?.custom_fields?.post_image.url} alt="adda"/>
                  </div>
                  <div className="flex jc-center ai-center flex-column">
                    <p className="date-created p-s">{related_post.date}</p>
                    <h3 className="h5">{related_post.title}</h3>
                  </div>
                </div>
                <button className="btn btn-m btn-default" onClick={() => handleNavigation(related_post)}>Прочетете
                  повече
                </button>
              </a>
            </div>,
          )}
        </div>
      </section>
    </section>

  )
}

export default RelatedPostsList
