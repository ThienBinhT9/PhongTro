import classNames from "classnames/bind";

import styles from './Province.module.scss'
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function ProvinceItem({data}) {
    return ( 
        <Link className={cx('province')}>
            <div className={cx('image')}>
                <img src={data.image} alt={data.name}/>
            </div>
            <p className={cx('name')}>{data.name}</p>
        </Link>
     );
}

export default ProvinceItem;