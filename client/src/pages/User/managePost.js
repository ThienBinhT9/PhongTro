import classNames from "classnames/bind";

import styles from './User.module.scss'

const cx = classNames.bind(styles)

function Manage() {
    return ( 
        <div className="manage_post">
            <h2 className={cx('section__title')}>Quản lý tin đăng</h2>
        </div>
     );
}

export default Manage;