import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
    <div className=''>
      <div className='relative aspect-3/1 mb-12'>
     <Image src='/banner-image.png' alt='banner-image' fill/>
      </div>
    </div>
  )
}

export default Banner
