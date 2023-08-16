import classNames from "classnames/bind";

import styles from './Model.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles)


function Model({onClose, className, content, name, arrMinMax, defaultText, handleSubmit}) {


    const [persent1, setPersent1] = useState(() => {

        if(name === 'price' && arrMinMax.priceArr)
            return arrMinMax?.priceArr[0]
        else if(name === 'area' && arrMinMax.areaArr)
            return arrMinMax?.areaArr[0]
        else 
            return 0
    })
    const [persent2, setPersent2] = useState(() => {
        if(name === 'price' && arrMinMax.priceArr)
            return arrMinMax?.priceArr[1]
        else if(name === 'area' && arrMinMax.areaArr)
            return arrMinMax?.areaArr[1]
        else 
            return 100
    })
    const [activeEl, setActiveEl] = useState('')



    const handleClickTrack = (e, value) => {
        const trackEl = document.getElementById('track')
        const trackReact = trackEl.getBoundingClientRect()
        let persent = value ? value : Math.round((e.clientX - trackReact.left) * 100 / trackReact.width, 0)
        if(Math.abs(persent - persent1) <= (Math.abs(persent - persent2))){
            setPersent1(persent)
        }else
            setPersent2(persent)
    }



    return ( 
        <div className={cx('model')} onClick={onClose}>
            <div className={cx('model__content',{[className]:className})} onClick={(e) => e.stopPropagation()}>
                <div className={cx('header')}>
                    <FontAwesomeIcon icon={faArrowLeft} onClick={onClose}/>
                </div>
                <div className={cx('body')}>
                    {(name === 'category' || name === 'province') && (
                        <div className={cx("body__model")}>
                            <span className={cx("body__model__item__radio")}>
                                <input 
                                    type="radio"
                                    name={name}
                                    value={defaultText || ""}
                                    id="default"
                                />
                                <label htmlFor="default">{defaultText || ""}</label>
                            </span>
                            {content.length > 0 && content.map(item => {
                                return (
                                    <span className={cx("body__model__item__radio")}>
                                        <input 
                                            type="radio"
                                            name={item.code}
                                            value={item.code}
                                            id={item.code}
                                        />
                                        <label htmlFor={item.code}>{item.value}</label>
                                    </span>
                                )
                            })}
                        </div>
                    )}
                    {(name === 'price' || name === 'area') && (
                        <div className={cx("body__model")}>
                            <div className={cx("body__model__range__value")}>Từ 100 - 200</div>
                            <div className={cx('body__model__range__box')}>
                                <div id="track" className={cx('body__model__range__track')} style={{width:'100%'}} onClick={handleClickTrack}></div>
                                <div id="track-active"  className={cx('body__model__range__track')} style={{backgroundColor:'#EA580C', left:`${persent1}%`, right:`${0}%`}} onClick={handleClickTrack}></div>
                                <input 
                                    max='100'
                                    min='0'
                                    step='1'
                                    type="range"
                                    value={persent1}
                                    className={cx('body__model__range__input')}
                                    onChange={(e) => {
                                        setPersent1(e.target.value)
                                    }}
                                />
                                <input 
                                    max='100'
                                    min='0'
                                    step='1'
                                    type="range"
                                    value={persent2}
                                    className={cx('body__model__range__input')}
                                    onChange={(e) => {
                                        setPersent2(e.target.value)
                                    }}
                                />
                            </div>
                            <div>
                                <span>
                                    0
                                </span>
                            </div>
                        </div>
                    )}

                </div>
                {(name === 'price' || name === 'area') && <div className={cx("btn__submit")} onClick={handleSubmit}>ÁP DỤNG</div>}
            </div>
        </div>
    );
}



export default Model;