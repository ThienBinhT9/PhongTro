import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name:'auth',
    initialState:{
        currentUser:null,
        register:{
            isFetching:false,
            user:null
        },
        login:{
            isFetching:false,
            user:null
        },
        updateUser:{
            isFetching:false,
            error:false
        }
    },
    reducers:{
        //register
        registerStart(state){
            state.register.isFetching = true
        },
        registerSuccess(state, action){
            state.register.isFetching = false
            state.register.user = action.payload
        },
        registerFailed(state){
            state.register.isFetching = false
        },

        //login
        loginStart(state){
            state.login.isFetching = true
        },
        loginSuccess(state, action){
            state.login.isFetching = false
            state.login.user = action.payload
            state.currentUser = action.payload
        },
        loginFailed(state){
            state.login.isFetching = false
        },

        //logout
        logoutSuccess(state) {
            state.currentUser = null
        },

        //update user
        updateUserStart(state) {
            state.updateUser.isFetching = true
        },
        updateUserSuccess(state,action) {
            state.updateUser.isFetching = false
            state.currentUser = action.payload
        },
        updateUserFailed(state) {
            state.updateUser.isFetching = false
            state.updateUser.error = true
        }

    }
})

export const {registerStart, registerSuccess, registerFailed, loginStart, loginSuccess, loginFailed, logoutSuccess, updateUserStart, updateUserSuccess, updateUserFailed} = authSlice.actions
export default authSlice.reducer