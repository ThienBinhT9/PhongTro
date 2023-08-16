import classNames from "classnames/bind";

import styles from './User.module.scss'
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom'

const cx = classNames.bind(styles)

function Header() {

    const { category } = useSelector(state => state.site.categories)

    return ( 
        <div className={cx('header')}>
            <div className={cx('inner__header')}>
                <NavLink className={cx('header__item')} to='/'>Trang chủ</NavLink>
                {category.length > 0 && category.map(item => {
                    return (
                        <NavLink className={cx('header__item')} to={`/${item.path}`} key={item.code}>
                            {item.value}
                        </NavLink>
                    )
                })}
            </div>
        </div>
    );
}

export default Header;