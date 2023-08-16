import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import styles from './Loading.module.scss'

const cx = classNames.bind(styles)

function LoadingSpinner({className}) {
    return ( 
        <div className={cx('spinner',{[className]:className})}>
            <div className={cx("spinner__content")}>
                <FontAwesomeIcon icon={faSpinner} />
            </div>
        </div>
     );
}

export default LoadingSpinner;