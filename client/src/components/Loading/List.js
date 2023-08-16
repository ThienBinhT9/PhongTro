import classNames from "classnames/bind";

import styles from './Loading.module.scss'

const cx = classNames.bind(styles)

function LoadingList() {
    return ( 
        <div className={cx('loading-list')}>
            
        </div>
     );
}

export default LoadingList;