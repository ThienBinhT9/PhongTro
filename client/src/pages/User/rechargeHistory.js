import classNames from "classnames/bind";

import styles from './User.module.scss'

const cx = classNames.bind(styles)


function ReahargeHistory() {
    return ( 
        <div className={cx('reaharge_history')}>
            <h2 className={cx('section__title')}>Lịch sử nạp tiền</h2>
        </div>
     );
}

export default ReahargeHistory;