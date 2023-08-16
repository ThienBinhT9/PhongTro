import classNames from "classnames/bind";

import styles from './Post.module.scss'
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)


function SubPost({data}) {
    return ( 
        <Link to={`/post/detail/${data._id}`} className={cx('sub-post')}>
            <div className={cx('sub-post__image')}>
                <img src={data.images[0]} alt={data.title}/>
            </div>
            <div className={cx('sub-post__content')}>
                <p className={cx('sub-post__title')}>{data.title}</p>
                <span className={cx('sub-post__price')}>{data.rent}</span>
            </div>
        </Link>
     );
}

export default SubPost;