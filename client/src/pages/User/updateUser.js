import classNames from "classnames/bind";
import { useDispatch, useSelector } from 'react-redux'

import styles from './User.module.scss'
import Input from "../../components/Input";
import { useState } from "react";
import { Link } from "react-router-dom";
import {update_User} from '../../redux/apiRequirest'
import createAxios from '../../utils/instanceAxios'
import { loginSuccess } from "../../redux/authSlice";

const cx = classNames.bind(styles)


function Update() {

    const user = useSelector(state => state.auth.currentUser)

    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [zalo, setZalo] = useState(user?.zalo)
    const [facebook, setFacebook] = useState(user?.facebook)
    const [avatar, setAvatar] = useState(user?.avatar)

    const handleAvatar = (e) => {
        const _avatar = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            const imageData = e.target.result
            setAvatar(imageData)
        }

        reader.readAsDataURL(_avatar)
    }

    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    const handleSubmit = () => {
        const data = {
            name,
            zalo,
            avatar,
            email,
            facebook
        }
        
        update_User(data, user._id, user.access_token, axiosJWT, dispatch)

    }

    return ( 
        <div className={cx('update')}>
            <h2 className={cx('section__title')}>Cập nhật thông tin cá nhân</h2>
            <div className={cx('update__content')}>
                <Input textlabel='Mã thành viên' value={user?._id} disable/>
                <Input textlabel='Số điện thoại' value={user?.phone} disable/>
                <div className={cx('input__section')}>
                    <span></span>
                    <Link to='doi-so-dien-thoai' className={cx('input__section__btn-change')}>Đổi số điện thoại</Link>
                </div>
                <Input textlabel='Tên hiển thị' setValue={setName} value={name}/>
                <Input textlabel='Email' setValue={setEmail} value={email}/>
                <Input textlabel='Số Zalo' setValue={setZalo} value={zalo}/>
                <Input textlabel='Facebook' setValue={setFacebook} value={facebook}/>
                <div className={cx('input__section')}>
                    <span>Mật khẩu</span>
                    <Link to='doi-mat-khau' className={cx('input__section__btn-change')}>Đổi mật khẩu</Link>
                </div>
                <div className={cx('input__section')}>
                    <span>Ảnh đại diện</span>
                    <div className={cx('input__section__img')}>
                        <div className={cx('input__section__img__avatar')}>
                            <img src={avatar}/>
                        </div>
                        <label htmlFor="avatar">Chọn ảnh</label>
                        <input style={{display:'none'}} id="avatar" type="file" accept="image/*" onChange={handleAvatar}/>
                    </div>
                </div>
                <span className={cx('btn-submit')} onClick={handleSubmit}>Lưu & Cập nhật</span>
            </div>
        </div>
     );
}

export default Update;