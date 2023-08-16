import classNames from "classnames/bind";
import {memo} from 'react'

import styles from './Input.module.scss'

const cx = classNames.bind(styles)

function Input({textlabel, defaultValue, className, disable, setValue, value, id}) {


    return ( 
        <div className={cx('wrapper',{[className]:className})}>
            <label>{textlabel}</label>
            <input 
                type="text" 
                id={id ? id : ''} 
                value={value} 
                disabled={disable ? true : false} 
                className={cx({disable:disable})} 
                onChange={e => setValue(e.target.value)}
            />
        </div>
    );
}

export default memo(Input);