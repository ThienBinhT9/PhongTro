import classNames from "classnames/bind";
import {Swiper, SwiperSlide} from 'swiper/react'

import styles from './Detail.module.scss'
import { memo, useState } from "react";

const cx = classNames.bind(styles)

function Images({post}) {

    const [activeIndex, setActiveIndex] = useState(1)


    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex + 1)
    } 


    return ( 
            <div className={cx('images')}>
                <Swiper
                    grabCursor={true}
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={handleSlideChange}
                >
                    {post && post.images.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={cx('image')}>
                                    <img src={item} alt={index}/>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                    <span className={cx('images__quantity')}>{`${activeIndex}/${post?.images.length}`}</span>
                </Swiper>
            </div>
     );
}

export default memo(Images);