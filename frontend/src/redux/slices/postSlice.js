import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiEndpointHandler from '../apiEndpointHandler';

export const fetchPostsAction = createAsyncThunk('auth/admin/posts', async (params) => {
    const response = await apiEndpointHandler('auth/admin/posts').getItems(params);
    return response.data;
});


export const showPostAction = createAsyncThunk('auth/admin/showPost', async (id) => {
    const response = await apiEndpointHandler('auth/admin/post').getItemById(id);
    return response.data;
});

export const editPostAction = createAsyncThunk('auth/admin/editPost', async (params, { dispatch, getState }) => {
    const response = await apiEndpointHandler('auth/admin/edit-post').createItem(params);

    if (!response.data.error) {
        await dispatch(fetchPostsAction());
    }

    return response.data;
});

export const createPostAction = createAsyncThunk('auth/admin/createPost', async (params, { dispatch, getState }) => {
    const response = await apiEndpointHandler('auth/admin/post').createItem(params);
    
    if (!response.data.error) {
        await dispatch(fetchPostsAction());
    }
    
    return response.data;
});



export const deletePostAction = createAsyncThunk('auth/admin/deletePost', async (params, { dispatch, getState }) => {
    const response = await apiEndpointHandler('auth/admin/post').deleteItem(params);

    if (!response.data.error) {
        await dispatch(fetchPostsAction());
    }
    
    return response.data;
});


// fatchData 
export const fetchBlogPostsAction = createAsyncThunk('fetchPosts', async (params) => {
    const response = await apiEndpointHandler('posts').getItems(params);
    return response.data;
});

export const fetchBlogPostAction = createAsyncThunk('fetchPost', async (id) => {
    const response = await apiEndpointHandler('post').getItemById(id);
    return response.data;
});


const initialState = {
    posts: [],
    total: 0,
    post: {},
    loadingPosts: true,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
            state.posts = action.payload.posts;
            state.total = action.payload.total;
            state.loadingPosts = false;
        });
        builder.addCase(fetchPostsAction.rejected, (state, action) => {
            state.posts = [];
            state.total = 0;
        });
        builder.addCase(editPostAction.fulfilled, (state, action) => {

        });
        builder.addCase(showPostAction.fulfilled, (state, action) => {
            state.post = action.payload.post;
        });
        builder.addCase(deletePostAction.fulfilled, (state, action) => {
        });

        builder.addCase(fetchBlogPostsAction.fulfilled, (state, action) => {
            state.posts = action.payload.posts;
            state.total = action.payload.total;
            state.loadingPosts = false;
        });

        builder.addCase(fetchBlogPostAction.fulfilled, (state, action) => {
            state.post = action.payload.post;
        });

    },
});

export default postSlice.reducer;
