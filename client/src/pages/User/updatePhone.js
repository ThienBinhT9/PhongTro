import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";

import styles from './User.module.scss'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useRef } from "react";
import {update_User} from '../../redux/apiRequirest'
import createAxios from "../../utils/instanceAxios";
import { loginSuccess } from "../../redux/authSlice";

const cx = classNames.bind(styles)

function UpdatePhone() {
    const user = useSelector(state => state.auth.currentUser)
    const {msg} = useSelector(state => state.notifi.updateUser)

    const phoneRef = useRef()
    const dispatch = useDispatch()

    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    const formik = useFormik({
        initialValues:{
            phone_New:''
        },
        validationSchema:Yup.object({
            phone_New:Yup.string()
            .required('Bạn chưa nhập trường này')
            .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Bạn chưa nhập đúng định dạng số điện thoại')
        }),
        onSubmit:(values) => {
            const data = {
                phone:values.phone_New
            }
            
            phoneRef.current = values.phone_New
            update_User(data, user._id, user.access_token, axiosJWT, dispatch)
        }
    })
    
    return ( 
        <div className={cx('update')}>
            <h2 className={cx('section__title')}>Đổi số điện thoại</h2>
            <div className={cx('update__content')}>
                <div className={cx('update__content__form')}>
                    <label>Số điện thoại cũ</label>
                    <input type="text" id="phoneOld" disabled style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}} value={user?.phone} />
                </div>
                <span className={cx("update__content__form-message")}>{''}</span>

                <div className={cx('update__content__form')}>
                    <label>Số điện thoại mới</label>
                    <input type="text" id="phone_New"  value={formik.values.phone_New} onChange={formik.handleChange}/>
                </div>
                <span className={cx("update__content__form-message")}>{formik.errors.phone_New}</span>
                {msg && msg !== 'cập nhật thành công' && (phoneRef.current === formik.values.phone_New) && <span style={{color:'red', display:'inline-block', marginLeft:'200px'}}>{msg}</span>}
                {msg && msg === 'cập nhật thành công' && (phoneRef.current === formik.values.phone_New) && <span style={{color:'green', display:'inline-block', marginLeft:'200px'}}>{msg}</span>}
                
                <span className={cx('btn-submit')} onClick={formik.handleSubmit}>Cập nhật</span>
            </div>
        </div>
     );
}

export default UpdatePhone;