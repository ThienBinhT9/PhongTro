import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({href, to, children, iconLeft, iconRight, primary, text, className, onClick, ...passProps}) {

    let Comp = 'button'

    const props = {
        onClick,
        ...passProps
    }

    if(to){
        Comp = Link
        props.to = to
    }else if(href){
        Comp = 'a'
        props.href = href
    }

    const classes = cx('wrapper',{
        primary,
        text,
        [className]:className
    })

    return ( 
        <Comp className={classes} {...props}>
            <FontAwesomeIcon icon={iconLeft} />
            <span>{children}</span>
            <FontAwesomeIcon icon={iconRight} />
        </Comp>
    );
}

export default Button;