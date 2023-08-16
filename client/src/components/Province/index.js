import classNames from "classnames/bind";

import styles from './Province.module.scss'
import { location } from '../../utils/constants'
import ProvinceItem from "./Item";
import { memo } from "react";

const cx = classNames.bind(styles)


function Province() {
    return ( 
        <div className={cx('wrapper')}>
            {location.map((item, index) => {
                return (
                    <ProvinceItem key={index} data={item}/>
                )
            })}
        </div>
    );
}

export default memo(Province);