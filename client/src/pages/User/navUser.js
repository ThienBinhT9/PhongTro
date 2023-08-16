import classNames from "classnames/bind";

import styles from './User.module.scss'
import { useDispatch, useSelector } from "react-redux";
import Button from '../../components/Button'
import { NavLink, useNavigate } from "react-router-dom";
import { faUserPen, faClockRotateLeft, faBusinessTime, faPhone, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faFileLines, faCreditCard, faClipboard } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import createAxios from '../../utils/instanceAxios'
import { loginSuccess } from '../../redux/authSlice'
import { logout } from '../../redux/apiRequirest'

const cx = classNames.bind(styles)

const navdata = [
    {
        value:'Quản lý tin đăng',
        to:'tin-dang',
        icon:faFileLines
    },
    {
        value:'Sửa thông tin cá nhân',
        to:'cap-nhat-thong-tin-ca-nhan',
        icon:faUserPen
    },
    {
        value:'Nạp tiền vào tài khoản',
        to:'nap-tien',
        icon:faCreditCard
    },
    {
        value:'Lịch sử nạp tiền',
        to:'lich-su-nap-tien',
        icon:faClockRotateLeft
    },
    {
        value:'Lịch sử thanh toán',
        to:'lich-su-thanh-toan',
        icon:faBusinessTime
    },
    {
        value:'Bảng giá dịch vụ',
        to:'/bang-gia-dich-vu',
        icon:faClipboard
    },
    {
        value:'Liên hệ',
        to:'/lien-he',
        icon:faPhone
    },

]

function Navigation() {

    const user = useSelector(state => state.auth.currentUser)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    const handleLogout = () => {
        logout(user._id, user.access_token, axiosJWT, navigate, dispatch)
    }

    return ( 
        <div className={cx('nav')}>
            <div className={cx('nav__header')}>
                <div className={cx('nav__header__avatar')}>
                    <img src={user?.avatar} alt="avatar"/>
                </div>
                <div className={cx('nav__header__info')}>
                    <h3 className={cx('nav__header__info__name')}>{user?.name}</h3>
                    <p className={cx('nav__header__info__phone')}>{user?.phone}</p>
                </div>
            </div>
            <div className={cx('nav__descriptions')}>
                <p className={cx('nav__description__item')}>Mã thành viên: <span>{user?._id}</span></p>
                <p className={cx('nav__description__item')}>TK chính: <span>0</span></p>
            </div>
            <div className={cx('nav__btns')}>
                <Button className={cx('nav__btn')}>Nạp tiền</Button>
                <Button className={cx('nav__btn')} to={'dang-tin-moi'}>Đăng tin</Button>
            </div>
            <div className={cx('nav__main__content')}>
                {navdata.map((item, index) => {
                    return ( 
                        <NavLink className={cx('nav__main__content__item')} key={index} to={item.to}>
                            <FontAwesomeIcon className={cx('nav__main__content__item__icon')} icon={item.icon} />
                            {item.value}
                        </NavLink>            
                    )
                })}
                <span className={cx('nav__main__content__item')} onClick={handleLogout}>
                    <FontAwesomeIcon className={cx('nav__main__content__item__icon')} icon={faRightFromBracket} />
                    Đăng xuất
                </span>
            </div>
        </div>
     );
}

export default Navigation;