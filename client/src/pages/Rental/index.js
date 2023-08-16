import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'

import styles from './Rental.module.scss'
import Province from '../../components/Province';
import ItemSideBar from '../../components/ItemSideBar';
import List from '../../components/List';
import Pagination from '../../components/Pagination';
import { cateText } from '../../utils/constants';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles)


function Rental() {

    const { posts } = useSelector(state => state.post.getOutstandingPosts)
    const { prices, areas } = useSelector(state => state.site)
    const { price } = prices
    const { area } = areas

    const cateObj = useParams()
    const cate = cateObj['*']

    const text = cateText.find(item => item.CATE === cate)

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2 className={cx('header__title')}>{text.TITLE}</h2>
                <p className={cx('header__description')}>{text.DESCRIPTION}</p>
            </div>
            <Province />
            <div className={cx('content')}>
                <div className={cx('content__left')}>
                    <List />
                    <Pagination />
                </div>
                <div className={cx('sideBar')}>
                    <ItemSideBar content={price} isDouble type='price' title='Xem theo giá'/>
                    <ItemSideBar content={area} isDouble type='area' title='Xem theo diện tích'/>
                    <ItemSideBar content={posts} subpost title='Tin nổi bật'/>
                </div>
            </div>
        </div>
    );
}

export default Rental;