import classNames from "classnames/bind";
import SearchItem from "../SearchItem";
import { faChevronRight, faDollarSign, faHome, faLocationDot, faRulerCombined, faSearch } from '@fortawesome/free-solid-svg-icons'
import Model from '../Model'

import styles from './Search.module.scss'
import { memo, useState } from "react";
import {useSelector } from "react-redux";

const cx = classNames.bind(styles);

function Search() {

    const {categories, prices, areas, provinces} = useSelector(state => state.site)

    const { category } = categories
    const { price } = prices
    const { area } = areas
    const { province } = provinces

    const [isModel, setIsModel] = useState(false)
    const [defaultText, setDefaultText] = useState('')
    const [name, setName] = useState('')
    const [content, setContent] = useState([])
    const [arrMinMax, setArrMinMax] = useState({})

    const handleShowModel = (content, name, defaultText) => {
        setContent(content)
        setName(name)
        setDefaultText(defaultText)
        setIsModel(true)
    }

    const handleCloseModel = () => {
        setIsModel(false)
    }

    const handleSearch = () => {

    }


    return ( 
        <>
            <div className={cx('wrapper')}>
                <SearchItem onClick={() => handleShowModel(category, 'category', 'Tìm tất cả')} iconLeft={faHome} iconRight={faChevronRight} defaultText='Chọn tất cả'/>
                <SearchItem onClick={() => handleShowModel(province, 'province', 'Toàn quốc')} iconLeft={faLocationDot} iconRight={faChevronRight} defaultText='Toàn quốc'/>
                <SearchItem onClick={() => handleShowModel(price, 'price', 'Chọn giá')} iconLeft={faDollarSign} iconRight={faChevronRight} defaultText='Chọn giá'/>
                <SearchItem onClick={() => handleShowModel(area, 'area', 'Chọn diện tích')} iconLeft={faRulerCombined} iconRight={faChevronRight} defaultText='Chọn diện tích'/>
                <SearchItem onClick={handleSearch} className={cx('btn-search')} iconLeft={faSearch} defaultText='Tìm kiếm'/>
            </div>
            {isModel && (
                <Model className={cx('search__filter__model')}  onClose={handleCloseModel} content={content} name={name} defaultText={defaultText} arrMinMax={arrMinMax}/>
            )}
        </>
    );
}

export default memo(Search);