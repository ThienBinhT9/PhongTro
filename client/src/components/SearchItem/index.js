import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './SearchItem.module.scss'

const cx = classNames.bind(styles)

function SearchItem({iconLeft, iconRight, text, defaultText, className, onClick}) {
    return ( 
        <div className={cx('wrapper',{[className]:className})} onClick={onClick}>
            <FontAwesomeIcon className={cx('icon','iconLeft')} icon={iconLeft} />
            <span>{text || defaultText}</span>
            <FontAwesomeIcon className={cx('icon','iconRight')} icon={iconRight} />
        </div>
    );
}

export default SearchItem;