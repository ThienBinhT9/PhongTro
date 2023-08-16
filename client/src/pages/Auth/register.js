import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import styles from './Auth.module.scss'
import { register } from '../../redux/apiRequirest'
import LoadingSpinner from "../../components/Loading/Spinner";
import { memo, useRef } from "react";
const cx = classNames.bind(styles)

function Register() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isFetching } = useSelector(state => state.auth.register)
    const { msg } = useSelector(state => state.notifi.register)

    const phone = useRef()

    
    const formik = useFormik({
        initialValues:{
            name:'',
            phone:'',
            password:''
        },
        validationSchema: Yup.object({
            name: Yup.string()
            .max(30, 'Tối đa 30 kí tự')
            .min(1, 'Tối thiểu 1 kí tự')
            .required('Bạn chưa nhập trường này'),
            phone: Yup.string()
            .length(10, 'Nhập chưa đúng định dạng số điện thoại')
            .required('Bạn chưa nhập trường này'),
            password: Yup.string()
            .min(6, 'Tối thiểu 6 kí tự')
            .max(12, 'Tối thiểu 12 kí tự')
            .required('Bạn chưa nhập trường này')
        }),
        onSubmit:(values) => {
            phone.current = values.phone
            register(values, dispatch, navigate)
        }
    })

    return ( 
        <div className={cx('wrapper__auth')}>
            <div className={cx('auth__form')}>
                {isFetching && <LoadingSpinner />}
                <>
                    <h3 className={cx('auth__title')}>Đăng kí tài khoản</h3>
                    <div className={cx('form')}>
                        <label>Họ tên</label>
                        <input type="text" id="name" value={formik.values.name} onChange={formik.handleChange}/>
                        <span className={cx("form__message")}>{formik.errors.name}</span>
                    </div>
                    <div className={cx('form')}>
                        <label>Số điện thoại</label>
                        <input type="text" id="phone" value={formik.values.phone} onChange={formik.handleChange}/>
                        <span className={cx("form__message")}>{formik.errors.phone}</span>
                    </div>
                    <div className={cx('form')}>
                        <label>Mật khẩu</label>
                        <input type="password" id="password" value={formik.values.password} onChange={formik.handleChange}/>
                        <span className={cx("form__message")}>{formik.errors.password}</span>
                    </div>
                    {msg && (phone.current === formik.values.phone) && <span style={{color:'red', marginBottom:'24px', display:'inline-block'}}>{msg}</span>}
                    <div className={cx('btn-submit')} onClick={formik.handleSubmit}>Đăng kí</div>
                    <div className={cx('form__options__others')}>
                        <span>Quên mât khẩu</span>
                        <Link to='/login'>Đăng nhập</Link>
                    </div>
                </>
            </div>
        </div>
     );
}

export default memo(Register);