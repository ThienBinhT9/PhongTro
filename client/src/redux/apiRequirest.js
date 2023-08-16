import axios from 'axios'

import {
    registerStart,
    registerSuccess,
    registerFailed,
    loginStart,
    loginSuccess,
    loginFailed,
    logoutSuccess,
    updateUserStart,
    updateUserSuccess,
    updateUserFailed
} from './authSlice'

import {
    notifiLogin,
    notifiRegister,
    updateUser
} from './notifiSlice'

import {
    categoryStart,
    categorySuccess,
    categoryFailed,
    provinceStart,
    provinceSuccess,
    provinceFailed,
    priceStart,
    priceSuccess,
    priceFailed,
    areaStart,
    areaSuccess,
    areaFailed

} from './siteSlice'

import {
    getPostsStart,
    getPostsSuccess,
    getPostsFailed,
    getDetailPostStart,
    getDetailPostSuccess,
    getDetailPostFailed,
    getOutstandingPostsStart,
    getOutstandingPostsSuccess,
    getOutstandingPostsFailed
} from './postSlice'

//Auth
export const register = async(data, dispatch, navigate) => {
    try {
        dispatch(registerStart())
        const res = await axios.post('/auth/register', data)
        dispatch(registerSuccess(res.data))
        navigate('/login')
    } catch (error) {
        dispatch(registerFailed())
        dispatch(notifiRegister(error.response.data.msg || error.message))
    }
}

export const login = async(data, dispatch, navigate) => {
    try {
        dispatch(loginStart())
        const res = await axios.post('/auth/login',data, dispatch, navigate)
        dispatch(loginSuccess(res.data))
        navigate('/')
    } catch (error) {
        dispatch(loginFailed())
        dispatch(notifiLogin(error.response.data || error.message))
    }
}

export const logout = async(id, accessToken, axiosJWT, navigate, dispatch) => {
    try {
        await axiosJWT.post('/auth/logout', id, {
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(logoutSuccess())
        navigate('/')
    } catch (error) {
        console.log('Logout Failed');
    }
}

//SITE
export const getCategory = async(dispatch) => {
    try {
        dispatch(categoryStart())
        const res = await axios.get('/category')
        dispatch(categorySuccess(res.data))
    } catch (error) {
        dispatch(categoryFailed())
    }
}

export const getProvince = async(dispatch) => {
    try {
        dispatch(provinceStart())
        const res = await axios.get('/province')
        dispatch(provinceSuccess(res.data))
    } catch (error) {
        dispatch(provinceFailed())
    }
}

export const getPrice = async(dispatch) => {
    try {
        dispatch(priceStart())
        const res = await axios.get('/price')
        dispatch(priceSuccess(res.data))
    } catch (error) {
        dispatch(priceFailed())
    }
}

export const getArea = async(dispatch) => {
    try {
        dispatch(areaStart())
        const res = await axios.get('/area')
        dispatch(areaSuccess(res.data))
    } catch (error) {
        dispatch(areaFailed())
    }
}
//USER
export const update_User = async(data, userId, access_token, axiosJWT, dispatch) => {
    try {
        dispatch(updateUserStart())
        const res = await axiosJWT.put(`/user/${userId}`, data, {
            headers:{
                token: `Bearer ${access_token}`
            }
        })
        dispatch(updateUserSuccess(res.data))
        dispatch(updateUser('cập nhật thành công'))
    } catch (error) {
        dispatch(updateUserFailed())
        dispatch(updateUser(error.response.data || error.message))
    }
}

//POST
export const getPosts = async(cate, query, page, axiosJWT, dispatch) => {
    try {
        dispatch(getPostsStart())
        const res = await axiosJWT.get(`/post/${cate}?${query}&page=${page}`)
        dispatch(getPostsSuccess(res.data))
    } catch (error) {
        dispatch(getPostsFailed())
    }
}

export const getDetailPost = async(postId, axiosJWT, dispatch) => {
    try {
        dispatch(getDetailPostStart())
        const res = await axiosJWT.get(`/post/detail/${postId}`)
        dispatch(getDetailPostSuccess(res.data))
    } catch (error) {
        dispatch(getDetailPostFailed())
    }
}

export const getOutstandingPosts = async(dispatch) => {
    try {
        dispatch(getOutstandingPostsStart())
        const res = await axios.get('/post/outstanding')
        dispatch(getOutstandingPostsSuccess(res.data))
    } catch (error) {
        dispatch(getOutstandingPostsFailed())
    }
}