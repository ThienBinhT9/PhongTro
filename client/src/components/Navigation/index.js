import classNames from "classnames/bind";
import { useDispatch, useSelector } from 'react-redux'

import styles from './Navigation.module.scss'
import './Navigation.css'
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { getCategory, getPrice, getArea, getProvince, getOutstandingPosts } from '../../redux/apiRequirest'

const cx = classNames.bind(styles)

function Navigation() {

    const categories = useSelector(state => state.site.categories.category)

    const dispatch = useDispatch()

    useEffect(() => {
        getCategory(dispatch)
        getProvince(dispatch)
        getPrice(dispatch)
        getArea(dispatch)
        getOutstandingPosts(dispatch)
    },[])

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                    <NavLink key='CT' to='/' className={cx('inner__item')}>Trang chủ</NavLink>
                {
                    categories.length > 0 && categories.map(cate => {
                        return(
                            <NavLink key={cate.code} to={cate.path} className={cx('inner__item')}>
                                {cate.value}
                            </NavLink>
                        )
                    })
                }
            </div>
        </div>
     );
}

export default Navigation;