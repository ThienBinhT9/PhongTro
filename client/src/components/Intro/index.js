import classNames from "classnames/bind";
import { memo } from "react";

import styles from './Intro.module.scss';
import {text} from '../../utils/dataIntro';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)


function Intro() {
    return ( 
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>{text.title}</h3>
            <p className={cx('description')}>{text.description + ' ' + text.description2}</p>
            <div className={cx('statistic')}>
                {text.statistic.map((item, index) => {
                    return (
                        <div className={cx('statistic__item')} key={index}>
                            <h3 className={cx('statistic__item__value')}>{item.value}</h3>
                            <p className={cx('statistic__item__name')}>{item.name}</p>
                        </div>
                    )
                })}
            </div>
            <div className={cx('price')}>{text.price}</div>
            <div className={cx('stars')}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
            </div>
            <p className={cx('comment')}>{text.comment}</p>
            <p className={cx('author')}>{text.author}</p>
            <h3 className={cx('question')}>{text.question}</h3>
            <p className={cx('answer')}>{text.answer}</p>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'54px'}}><span className={cx('btn-create-post')}>Đăng tin ngay</span></div>
        </div>
    );
}

export default memo(Intro);