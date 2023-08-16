import classNames from "classnames/bind";
import {Link} from 'react-router-dom'

import styles from './Post.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import { getNumberFromString } from '../../utils/common'

const cx = classNames.bind(styles)

function Post({data}) {

    let images = data.images
    if(data.images.length > 4) {
        images = images.slice(0,4)
    }
   
    const location = data.address.split(',')[data.address.split(',').length - 2] + ',' + data.address.split(',')[data.address.split(',').length - 1]

    const overview = JSON.parse(data.description)

    return ( 
        <div className={cx('wrapper')}>
            <Link to={`/post/detail/${data._id}`} className={cx('images')}>
                <div className={cx('image')}><img src={images[0]} alt="anh1"/></div>
                <div className={cx('image')}><img src={images[1]} alt="anh2"/></div>
                <div className={cx('image')}><img src={images[2]} alt="anh3"/></div>
                <div className={cx('image')}><img src={images[3]} alt="anh4"/></div>
                <span className={cx('images__quantity')}>{data.images.length} ảnh</span>
            </Link>
            <div className={cx('content')}>
                <Link to={`/post/detail/${data._id}`} className={cx('title')}>
                    <FontAwesomeIcon style={{color:"#d8e539"}} icon={faStar} />
                    <FontAwesomeIcon style={{color:"#d8e539"}} icon={faStar} />
                    <FontAwesomeIcon style={{color:"#d8e539"}} icon={faStar} />
                    <FontAwesomeIcon style={{color:"#d8e539"}} icon={faStar} />
                    <FontAwesomeIcon style={{color:"#d8e539"}} icon={faStar} />
                    <span className={cx('title__text')}>{data.title}</span>
                </Link>
                <div className={cx('attributes')}>
                    <span className={cx('price')}>{data.rent}</span>
                    <span>{getNumberFromString(data.acreage)}m²</span>
                    <span className={cx('location')}>{location}</span>
                </div>
                <div className={cx('overview')}>{`${overview[0]} ${overview[1]} ${overview[2]} ${overview[3]} ${overview[4]}`}</div>
                <div className={cx('contact')}>
                    <div className={cx('user')}>
                        <div className={cx('avatar')}><img src={data.userAva || "https://i.pinimg.com/564x/62/7e/49/627e49a5328263b1caabcb0ca1f03979.jpg"} alt="avatar"/></div>
                        <Link className={cx('username')}>{data.username}</Link>
                    </div>
                    <div className={cx('contact__btn')}>
                        <span className={cx('contact__btn__tel')}>Gọi <a href="tel:0969975192">{data.userphone}</a></span>
                        <span className={cx('contact__btn__mes')}>Nhắn Zalo</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;