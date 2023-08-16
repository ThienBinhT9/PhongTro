import classNames from 'classnames/bind'
import { Outlet } from 'react-router-dom'

import styles from './User.module.scss'
import Header from './headerUser';
import Navigation from './navUser';
import Contact from '../../components/Contact'

const cx = classNames.bind(styles)

function User() {
    return ( 
        <div className={cx('wrapper')}>
            <Header />
            <Navigation />
            <div className={cx('wrapper__content')}>
                <Outlet />
                <Contact className={cx('wrapper__content__contact')}/>
            </div>
            
        </div>
     );
}

export default User;