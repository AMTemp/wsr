import Image from 'next/image'
import React from 'react'



const PostItem = ({ item }: any) => {

  const lazyRoot = React.useRef(null)

  return (
    <div ref={lazyRoot} className="item-wrapper w-full h-full relative cursor-pointer">
      {item.media_type === 'image' && (
        <Image lazyRoot={lazyRoot} alt={item.title} src={item.url} layout="fill" objectFit="cover" />
      )}
      {item.media_type === 'video' && (
        <Image lazyRoot={lazyRoot} alt={item.title} src={item.thumbnail_url} layout="fill" objectFit="cover" />
      )}
      {item.title && (
        <div className="font-serif text-lg leading-loose bg-white dark:bg-black opacity-75 backdrop-blur-lg absolute left-0 right-0 bottom-0 w-full p-5">{item.title}</div>
      )}
    </div>
  )
}

export default PostItem