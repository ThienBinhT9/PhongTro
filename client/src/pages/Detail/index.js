import { useEffect } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClock, faHeart} from '@fortawesome/free-regular-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { faDollarSign, faLocationDot, faPhone, faRulerCombined} from '@fortawesome/free-solid-svg-icons'
import {} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'


import styles from './Detail.module.scss'
import Button from '../../components/Button'
import ItemSidebar from '../../components/ItemSideBar'
import SearchItem from '../../components/SearchItem'
import createAxios from '../../utils/instanceAxios'
import { loginSuccess } from '../../redux/authSlice'
import { getDetailPost } from '../../redux/apiRequirest'
import { FormatDate, getNumberFromString } from '../../utils/common'
import Images from "./images";

const cx = classNames.bind(styles)

function Detail() {

    const user = useSelector(state => state.auth.currentUser)
    const post = useSelector(state => state.post.detailPost.post)
    const { posts } = useSelector(state => state.post.getOutstandingPosts)

    const { postId } = useParams()
    
    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    useEffect(() => {
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    },[postId])

    useEffect(() => {
        getDetailPost(postId, axiosJWT, dispatch)
    },[postId])

    const label = post?.type + post?.address?.split(',')[post?.address?.split(',').length - 2]

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Images post={post}/>
                <div className={cx('others')}>
                    <h1 className={cx('title')}>{post?.title}</h1>
                    <p className={cx('label')}>Chuyên mục: <Link>{label}</Link></p>
                    <p className={cx('address')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        {post?.address}
                    </p>
                    <div className={cx('attributes')}>
                        <SearchItem className={cx('attributes__item','attributes__item--price')} text={post?.rent} iconLeft={faDollarSign}/>
                        <SearchItem className={cx('attributes__item')} text={`${getNumberFromString(post?.acreage)}m²`} iconLeft={faRulerCombined}/>
                        <SearchItem className={cx('attributes__item')} text={FormatDate(post?.createdAt)} iconLeft={faClock}/>
                    </div>
                    <div className={cx('description')}>
                        <h3 className={cx('section__title')}>Thông tin mô tả</h3>
                        <div className={cx('section__content')}>
                            {post && JSON.parse(post.description).map((item,index) => {
                                return (
                                    <p key={index}>{item}</p>
                                )
                            })}
                        </div>
                    </div>
                    <div className={cx('overview')}>
                        <h3 className={cx('section__title')}>Đặc điểm tin đăng</h3>
                        <div className={cx('section__content')}>
                            <div className={cx('section__content__item')}>
                                <span>Mã tin:</span>
                                <p>{post?._id}</p>
                            </div>
                            <div className={cx('section__content__item','section__content__item--active')}>
                                <span>Khu vực:</span>
                                <p>{post?.area}</p>
                            </div>
                            <div className={cx('section__content__item')}>
                                <span>Loại tin rao:</span>
                                <p>{post?.type}</p>
                            </div>
                            <div className={cx('section__content__item','section__content__item--active')}>
                                <span>Đối tượng thuê:</span>
                                <p>{post?.target}</p>
                            </div>
                            <div className={cx('section__content__item')}>
                                <span>Ngày đăng:</span>
                                <p>{FormatDate(post?.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('contact')}>
                        <h3 className={cx('section__title')}>Thông tin liên hệ</h3>
                        <div className={cx('section__content')}>
                             <div className={cx('section__content__item')}>
                                <span>Liên hệ:</span>
                                <p>{post?.username}</p>
                            </div>
                            <div className={cx('section__content__item','section__content__item--active')}>
                                <span>Điện thoại:</span>
                                <p>{post?.userphone}</p>
                            </div>
                            <div className={cx('section__content__item')}>
                                <span>Zalo:</span>
                                <p>{post?.userphone}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('map')}>
                        <h3 className={cx('section__title')}>Bản đồ</h3>
                        <div className={cx('section__content')}>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('navbar')}>
                <div className={cx('contact__user')}>
                    <div className={cx('contact__user__avatar')}>
                        <img src={post?.userAval || "https://i.pinimg.com/736x/9d/4b/f5/9d4bf549af4c2b607b284903a08a13cc.jpg"} alt="avatar"/>
                    </div>
                    <h3 className={cx('contact__user__username')}>{post?.username}</h3>
                    <Button href={`tel:0969975192`} className={cx('contact__user__btn')}  iconLeft={faPhone}>{post?.userphone}</Button>
                    <Button className={cx('contact__user__btn')}  iconLeft={faFacebookMessenger}>Nhắn tin</Button>
                    <Button  className={cx('contact__user__btn')} iconLeft={faHeart}>Yêu thích</Button>
                </div>
                <ItemSidebar content={posts} subpost title='Tin nổi bật'/>
                <ItemSidebar content={posts} subpost title='Tin mới đăng'/>
            </div>
        </div>
     );
}

export default Detail;