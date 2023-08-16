import classNames from "classnames/bind";

import styles from './Pagination.module.scss'
import { Link, useParams, useSearchParams } from "react-router-dom";
import {useSelector} from 'react-redux'
import { memo, useEffect, useState } from "react";

const cx = classNames.bind(styles)

function Pagination() {

    const totalPost = useSelector(state => state.post.getPosts.totalPost)

    const [searchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [arrPage, setArrPage] = useState([])
    const [isHideStart, setIsHideStart] = useState(false)
    const [isHideEnd, setIsHideEnd] = useState(false)

    const cateObj = useParams()
    const cate = cateObj['*']

    const priceQuery = searchParams.get('price')
    const areaQuery = searchParams.get('area')

    let to = ''

    if(priceQuery && areaQuery){
        to = `price=${priceQuery}&area=${areaQuery}&`
    }else if(priceQuery){
        to = `price=${priceQuery}&`
    }else if(areaQuery){
        to = `area=${areaQuery}&`
    }


    useEffect(() => {
        let page = searchParams.get('page')
        page && +page !== currentPage && setCurrentPage(+page)
        !page && setCurrentPage(1)
        
    },[searchParams, currentPage])

    useEffect(() => {
        let maxPage = Math.ceil(totalPost/5)
        let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2)
        let start = (currentPage - 2) <= 1 ? 1 : (currentPage - 2)
        let temp = []
        for(let i = start; i <= end; i++) temp.push(i)
        setArrPage(temp)

        currentPage >= (maxPage - 2) ? setIsHideEnd(true) : setIsHideEnd(false)
        currentPage <= 3 ? setIsHideStart(true) : setIsHideStart(false)
    },[totalPost, currentPage])

    useEffect(() => {
        window.scrollTo({
            top:600
        })
    },[currentPage])
    

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {!isHideStart && <Link className={cx('item')} onClick={() => setCurrentPage(prev => prev - 1)} to={cate ? `/${cate}?${to}page=${currentPage - 1}` : `/post/${cate}?${to}page=${currentPage - 1}`}>{'<<'}</Link>}
                {!isHideStart && <span className={cx('item','disable')}>...</span>}
                {
                    arrPage.length > 0 && arrPage.map((item, index) => {
                        return <Link to={cate ? `/${cate}?${to}page=${item}` : `/post/${cate}?${to}page=${item}`} key={index}  onClick={() => setCurrentPage(item)} className={cx('item',{active: currentPage === item})}>{item}</Link>
                    })
                }
                {!isHideEnd && <span className={cx('item','disable')}>...</span>}
                {!isHideEnd && <Link className={cx('item')} onClick={() => setCurrentPage(prev => prev+1)} to={cate ? `/${cate}?${to}page=${currentPage + 1}` : `/post/${cate}?${to}page=${currentPage + 1}`}>{'>>'}</Link>}
            </div>
        </div>
    );
}

export default memo(Pagination);