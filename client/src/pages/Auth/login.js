import classNames from "classnames/bind";
import { useFormik } from 'formik'
import * as Yup from 'yup'

import styles from './Auth.module.scss'
import { Link, useNavigate } from "react-router-dom";
import { login } from '../../redux/apiRequirest'
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../components/Loading/Spinner";
import { useRef } from "react";

const cx = classNames.bind(styles)

function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isFetching} = useSelector(state => state.auth.login)
    const { msg } = useSelector(state => state.notifi.login)

    const phoneRef = useRef()
    const passwordRef = useRef()

    const formik = useFormik({
        initialValues:{
            phone:'',
            password:''
        },
        validationSchema: Yup.object({
            phone: Yup.string()
            .length(10, 'Nhập chưa đúng định dạng số điện thoại')
            .required('Bạn chưa nhập trường này'),
            password: Yup.string()
            .min(6, 'Tối thiểu 6 kí tự')
            .max(12, 'Tối thiểu 12 kí tự')
            .required('Bạn chưa nhập trường này')
        }),
        onSubmit:(values) =>{
            phoneRef.current = values.phone
            passwordRef.current = values.password
            login(values, dispatch, navigate)
        }
    })

    return ( 
        <div className={cx("wrapper__auth")}>
            <div className={cx('auth__form')}>
                {isFetching && <LoadingSpinner />}
                <>
                    <h3 className={cx('auth__title')}>Đăng nhập</h3>
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
                    {msg && (phoneRef.current === formik.values.phone) && (passwordRef.current === formik.values.password) && <span style={{color:'red', marginBottom:'24px', display:'inline-block'}}>{msg}</span>}
                    <div className={cx('btn-submit')} onClick={formik.handleSubmit}>Đăng nhập</div>
                    <div className={cx('form__options__others')}>
                        <span>Quên mât khẩu</span>
                        <Link to='/register'>Đăng kí</Link>
                    </div>
                </>
            </div>
        </div>
     );
}

export default Login;