import classNames from "classnames/bind";

import styles from './List.module.scss'
import Post from '../Post'
import {useDispatch, useSelector} from 'react-redux'

import { getPosts } from '../../redux/apiRequirest'
import { memo, useEffect } from "react";
import createAxios from '../../utils/instanceAxios'
import { loginSuccess } from "../../redux/authSlice";
import { useParams, useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles)

function List() {

    const user = useSelector(state => state.auth.currentUser)
    const {posts, isFetching} = useSelector(state => state.post.getPosts)

    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)
    const [searchParams] = useSearchParams()
    let page = searchParams.get('page')
    let priceQuery = searchParams.get('price')
    let areaQuery = searchParams.get('area')
    if(!page){
        page = 1
    }

    let query = ''

    if( priceQuery && areaQuery){
        query = `price=${priceQuery}&area=${areaQuery}`
    }else if(areaQuery) {
        query = `area=${areaQuery}`
    }else if(priceQuery){ 
        query = `price=${priceQuery}`
    }

    const cateObj = useParams()
    const cate = cateObj['*']
    


    useEffect(() => {
        getPosts(cate, query,page, axiosJWT, dispatch)
    },[page, cate, query])


    return ( 
        <div className={cx('wrapper')}>
            <h3 style={{marginBottom:'12px'}}>Danh sách đăng tin</h3>
            <div className={cx('arrange')}>
                <span className={cx('arrange__text')}>Sắp xếp: </span>
                <button className={cx('arrange__btn',{activeArrange:true})}>Mặc định</button>
                <button className={cx('arrange__btn')}>Mới nhất</button>
                <button className={cx('arrange__btn')}>Có video</button>
            </div>
            <div className={cx('list__post')}>
                {!isFetching && posts.length > 0 && posts.map((post, index) => {
                    return <Post key={index} data={post}/>
                })}
                {posts.length <= 0 && <h1>Không tìm thấy kết quả</h1>}
            </div>
        </div>
     );
}

export default memo(List);