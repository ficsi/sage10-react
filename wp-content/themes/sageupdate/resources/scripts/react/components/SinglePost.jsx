import React, {useEffect} from 'react'

function SinglePost(post) {
  console.log(post)
  useEffect(() => {
    console.log('SinglePost mounted');
  }, []);
  return (
    <>
      <article className={post.data.class_list.map(clas => `${clas}`)}>
        <h2 className="post-title">{post.data.title.rendered}</h2>
        <p className="post-meta">{post.data.date}</p>
        <p className="post-meta">{post.data.tags.map(tag => tag.name)}</p>
        <p className="post-content" dangerouslySetInnerHTML={{__html: post.data.content.rendered}}>
        </p>
      </article>

    </>

  )
}


//TODO: implement close open post
//TODO: implement cache already loaded data
//TODO: implement overall cache



export default SinglePost
