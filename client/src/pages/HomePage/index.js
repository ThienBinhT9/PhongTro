import classNames from 'classnames/bind'
import {useSelector} from 'react-redux'

import styles from './HomePage.module.scss'
import Province from '../../components/Province';
import { text } from '../../utils/constants'
import ItemSideBar from '../../components/ItemSideBar';
import List from '../../components/List';
import Pagination from '../../components/Pagination';

const cx = classNames.bind(styles)


function HomePage() {

    const { categories, prices, areas } = useSelector(state => state.site)
    const { posts } = useSelector(state => state.post.getOutstandingPosts)
    const { category } = categories
    const { price } = prices
    const { area } = areas

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2 className={cx('header__title')}>{text.HOME_TITLE}</h2>
                <p className={cx('header__description')}>{text.HOME_DESCRIPTION}</p>
            </div>
            <Province />
            <div className={cx('content')}>
                <div className={cx('content__left')}>
                    <List />
                    <Pagination />
                </div>
                <div className={cx('sideBar')}>
                    <ItemSideBar content={category} category title='Danh mục cho thuê'/>
                    <ItemSideBar content={price} type='price' isDouble title='Xem theo giá'/>
                    <ItemSideBar content={area} type='area' isDouble title='Xem theo diện tích'/>
                    <ItemSideBar content={posts} subpost title='Tin nổi bật' />
                </div>
            </div>
        </div>
    );
}

export default HomePage;