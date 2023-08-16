import { createSlice } from '@reduxjs/toolkit'

export const notifiSlice = createSlice({
    name:'notifi',
    initialState:{
        register:{
            msg:''
        },
        login:{
            msg:''
        },
        updateUser:{
            msg:''
        }
    },
    reducers:{
        notifiRegister(state, action) {
            state.register.msg = action.payload
        },
        notifiLogin(state, action) {
            state.login.msg = action.payload
        },
        updateUser(state, action) {
            state.updateUser.msg = action.payload
        }
    }
})

export const {notifiLogin, notifiRegister, updateUser} = notifiSlice.actions
export default notifiSlice.reducer