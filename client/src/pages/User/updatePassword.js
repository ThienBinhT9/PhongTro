import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";

import styles from './User.module.scss'
import { memo, useRef } from "react";
import createAxios from '../../utils/instanceAxios'
import { loginSuccess } from '../../redux/authSlice'
import { update_User } from '../../redux/apiRequirest'
import {useFormik} from 'formik'
import * as Yup from 'yup'

const cx = classNames.bind(styles)

function UpdatePassword() {

    const user = useSelector(state => state.auth.currentUser)
    const {msg} = useSelector(state => state.notifi.updateUser)

    const passwordOldRef = useRef()
    const passwordNewRef = useRef()

    const dispatch = useDispatch()

    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    const formik = useFormik({
        initialValues:{
            passwordOld:'',
            passwordNew:''
        },
        validationSchema: Yup.object({
            passwordOld:Yup.string()
            .required('Bạn chưa nhập trường này!'),
            passwordNew:Yup.string()
            .required('Bạn chưa nhập trường này')
            .min(6, 'Tối thiểu 6 kí tự')
            .max(12,'Tối thiểu 12 kí tự')
        }),
        onSubmit:(values) => {
            passwordOldRef.current = values.passwordOld
            passwordNewRef.current = values.passwordNew
            const data = {
                password:{
                    passwordOld:values.passwordOld,
                    passwordNew:values.passwordNew
                }
            }
            update_User(data, user._id, user.access_token, axiosJWT, dispatch)
            values.passwordNew = ''
        }
    })

    return ( 
        <div className={cx('update')}>
            <h2 className={cx('section__title')}>Đổi mật khẩu</h2>
            <div className={cx('update__content')}>
                <div className={cx('update__content__form')}>
                    <label>Mật khẩu cũ</label>
                    <input type="password" id="passwordOld" value={formik.values.passwordOld} onChange={formik.handleChange}/>
                </div>
                <span className={cx("update__content__form-message")}>{formik.errors.passwordOld}</span>

                <div className={cx('update__content__form')}>
                    <label>Mật khẩu mới</label>
                    <input type="text" id="passwordNew" value={formik.values.passwordNew} onChange={formik.handleChange}/>
                </div>
                <span className={cx("update__content__form-message")}>{formik.errors.passwordNew}</span>
                {msg && msg !== 'cập nhật thành công' && (passwordNewRef.current === formik.values.passwordNew || passwordOldRef.current === formik.values.passwordOld) && <span style={{color:'red', display:'inline-block', marginLeft:'200px'}}>{msg}</span>}
                {msg && msg === 'cập nhật thành công' && (passwordNewRef.current === formik.values.passwordNew || passwordOldRef.current === formik.values.passwordOld) && <span style={{color:'green', display:'inline-block', marginLeft:'200px'}}>{msg}</span>}
                <span className={cx('btn-submit')} onClick={formik.handleSubmit}>Cập nhật</span>
            </div>
        </div>
    );
}

export default memo(UpdatePassword);