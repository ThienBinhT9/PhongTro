import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name:'app',
    initialState:{
        categories:{
            category:[],
            isFetching:false,
            error:false
        },
        prices:{
            price:[],
            isFetching:false,
            error:false
        },
        areas:{
            area:[],
            isFetching:false,
            error:false
        },
        provinces:{
            province:[],
            isFetching:false,
            error:false
        },
    },
    reducers:{
        categoryStart:(state) => {
            state.categories.isFetching = true
        },
        categorySuccess:(state, action) => {
            state.categories.isFetching = false
            state.categories.category = action.payload
        },
        categoryFailed:(state) => {
            state.categories.error = true
        },

        provinceStart:(state) => {
            state.provinces.isFetching = true
        },
        provinceSuccess:(state, action) => {
            state.provinces.isFetching = false
            state.provinces.province = action.payload
        },
        provinceFailed:(state) => {
            state.provinces.error = true
        },

        priceStart:(state) => {
            state.prices.isFetching = true
        },
        priceSuccess:(state, action) => {
            state.prices.isFetching = false
            state.prices.price = action.payload
        },
        priceFailed:(state) => {
            state.prices.error = true
        },

        areaStart:(state) => {
            state.areas.isFetching = true
        },
        areaSuccess:(state, action) => {
            state.areas.isFetching = false
            state.areas.area = action.payload
        },
        areaFailed:(state) => {
            state.areas.error = true
        },
    }
})

export const { categoryStart, categorySuccess, categoryFailed, provinceStart, provinceSuccess, provinceFailed, priceStart, priceSuccess, priceFailed, areaStart, areaSuccess, areaFailed } = appSlice.actions
export default appSlice.reducer