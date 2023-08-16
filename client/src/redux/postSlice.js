import {createSlice} from '@reduxjs/toolkit'

export const PostSlice = createSlice({
    name:'post',
    initialState:{
        getPosts:{
            totalPost:0,
            posts:[],
            isFetching:false,
            error:false
        },
        getOutstandingPosts:{
            posts:[],
            isFetching:false,
            error:false
        },
        detailPost:{
            post:null,
            isFetching:false,
            error:false
        }
    },
    reducers:{
        
        getPostsStart:(state) => {
            state.getPosts.isFetching = true
        },
        getPostsSuccess:(state,action) => {
            state.getPosts.isFetching = false
            state.getPosts.posts = action.payload.posts
            state.getPosts.totalPost = action.payload.totalDocs
        },
        getPostsFailed:(state) => {
            state.getPosts.isFetching = false
            state.getPosts.error = true
        },
        getOutstandingPostsStart:(state) => {
            state.getOutstandingPosts.isFetching = true
        },
        getOutstandingPostsSuccess:(state,action) => {
            state.getOutstandingPosts.isFetching = false
            state.getOutstandingPosts.posts = action.payload
        },
        getOutstandingPostsFailed:(state) => {
            state.getOutstandingPosts.isFetching = false
            state.getOutstandingPosts.error = true
        },

        //DETAIL POST
        getDetailPostStart:(state) => {
            state.detailPost.isFetching = true
        },
        getDetailPostSuccess:(state,action) => {
            state.detailPost.isFetching = false
            state.detailPost.post = action.payload
        },
        getDetailPostFailed:(state) => {
            state.detailPost.isFetching = false
            state.detailPost.error = true
        },
    }
})

export const {getPostsStart, getPostsSuccess, getPostsFailed, getDetailPostStart, getDetailPostSuccess, getDetailPostFailed, getOutstandingPostsStart, getOutstandingPostsSuccess, getOutstandingPostsFailed} = PostSlice.actions
export default PostSlice.reducer
