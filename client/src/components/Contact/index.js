import { memo } from "react";
import classNames from "classnames/bind";

import styles from './Contact.module.scss'
import {text} from '../../utils/dataContact'

const cx = classNames.bind(styles)

function Contact({className}) {
    return ( 
        <div className={cx('wrapper',{[className]:className})}>
            <div className={cx('image')}>
                <img src={text.image} alt="image"/>
            </div>
            <p className={cx('content')}>{text.content}</p>
            <div className={cx('contacts')}>
                {
                    text.contacts.map((item, index) => {
                        return (
                            <div className={cx('contact')} key={index}>
                                <h3 className={cx('contact__text')}>{item.text}</h3>
                                <p>Điện thoại: <a href={`tel:${item.phone}`}>{item.phone}</a></p>
                                <p>{item.zalo}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default memo(Contact);