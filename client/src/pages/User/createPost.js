import classNames from "classnames/bind";

import styles from './User.module.scss'

const cx = classNames.bind(styles)


function CreatePost() {
    return ( 
        <div className={cx('reaharge_history')}>
            <h2 className={cx('section__title')}>Đăng tin mới</h2>
            <div>
                
            </div>
        </div>
     );
}

export default CreatePost;