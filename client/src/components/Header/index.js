import classnames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { faChevronDown, faPlus, faList, faClockRotateLeft, faCircleUser, faRightFromBracket, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons'
import {faCreditCard, faBookmark} from '@fortawesome/free-regular-svg-icons'

import Button from '../Button';
import styles from './Header.module.scss'
import logo from '../../assets/images/logo.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../../redux/apiRequirest'
import createAxios from '../../utils/instanceAxios'
import { loginSuccess } from '../../redux/authSlice'

const cx = classnames.bind(styles)

function Header() {

    const user = useSelector(state => state.auth.currentUser)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const headerRef = useRef()

    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    const handleLogout = () => {
        logout(user._id, user.access_token, axiosJWT, navigate, dispatch)
    }

    return ( 
        <div className={cx('wrapper')} ref={headerRef}>
            <div className={cx('inner')}>
                <div className={cx('inner__left')}>
                    <Link to='/' className={cx('logo')}>
                        <img src={logo} alt='logo'/>
                    </Link>
                    <Link to='/'>Ở đây có phòng trọ nè!</Link>
                </div>
                <div className={cx('inner__right')}>
                    {user?.access_token && <>
                        <div className={cx('cmdUser')}>
                            <div className={cx('avatar')}>
                                <img src={user.avatar}/>
                            </div>
                            <FontAwesomeIcon className={cx('icon-down')} icon={faChevronDown} />
                            <div className={cx('cmdUser__menu')}>
                                <Button iconLeft={faFileCirclePlus} className={cx('cmdUser__menu__item')}>Đăng tin cho thuê</Button>
                                <Button iconLeft={faList} className={cx('cmdUser__menu__item')}>Quản lý tin viết</Button>
                                <Button iconLeft={faCreditCard} className={cx('cmdUser__menu__item')}>Nạp tiền</Button>
                                <Button iconLeft={faClockRotateLeft} className={cx('cmdUser__menu__item')}>Lịch sử nạp tiền</Button>
                                <Button to={`/user/${user._id}/cap-nhat-thong-tin-ca-nhan`} iconLeft={faCircleUser} className={cx('cmdUser__menu__item')} >Thông tin cá nhân</Button>
                                <Button iconLeft={faBookmark} className={cx('cmdUser__menu__item')}>Tin đã lưu</Button>
                                <Button iconLeft={faRightFromBracket} className={cx('cmdUser__menu__item')} onClick={handleLogout}>Đăng xuất</Button>
                            </div>

                        </div>
                    </>}
                    {!user?.access_token && <>
                        <Button to='/login' text>Đăng nhập</Button>
                        <Button to='/register' text>Đăng kí</Button>
                    </>}
                    <Button primary to={`${user ? `/user/${user?._id}/dang-tin-moi` : '/login'}`} iconLeft={faPlus}>Đăng bài mới</Button>
                </div>
            </div>
        </div>
    );
}

export default Header;