import classNames from "classnames/bind";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import Button from '../Button'
import styles from './ItemSideBar.module.scss'
import SubPost from '../Post/subPost'
import { memo } from "react";
import { getNumberFromString02 } from '../../utils/common'

const cx = classNames.bind(styles)


function ItemSideBar({title, content, isDouble, type, category, subpost}) {

    return ( 
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>{title}</h3>
                <div className={cx('content')}>
                    {content && content.length > 0 && content.map((item, index) => {
                        if(subpost){
                            return <SubPost key={index} data={item}/>
                        }else if(category){
                            return <Button key={index}  to={item.path} className={cx('content__item',{content__not__double__item: !isDouble, content__double__item: isDouble})} iconLeft={faChevronRight}>{item.value}</Button> 
                        }else if(type === 'price'){
                            return <Button key={index}  to={`?price=${item.code}`} className={cx('content__item',{content__not__double__item: !isDouble, content__double__item: isDouble})} iconLeft={faChevronRight}>{item.value}</Button> 
                            
                        }else if(type === 'area'){
                            return <Button key={index}  to={`?area=${item.code}`} className={cx('content__item',{content__not__double__item: !isDouble, content__double__item: isDouble})} iconLeft={faChevronRight}>{item.value}</Button> 
                        }
                    })}
                </div>
        </div>
    );
}

export default memo(ItemSideBar);