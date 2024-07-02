import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiEndpointHandler from '../apiEndpointHandler';

export const fetchPostsAction = createAsyncThunk('auth/admin/posts', async (params) => {
    const response = await apiEndpointHandler('auth/admin/posts').getItems(params);
    return response.data;
});


export const showPostAction = createAsyncThunk('auth/admin/post', async (id) => {
    const response = await apiEndpointHandler('auth/admin/post').getItemById(id);
    return response.data;
});

export const editPostAction = createAsyncThunk('auth/admin/post', async (params, id) => {
    const response = await apiEndpointHandler('auth/admin/post').updateItem(params, id);
    return response.data;
});

export const createPostAction = createAsyncThunk('auth/admin/post', async (params) => {
    const response = await apiEndpointHandler('auth/admin/post').createItem(params);
    return response.data;
});



export const deletePostAction = createAsyncThunk('auth/admin/deletePost', async (params, { dispatch, getState }) => {
    const response = await apiEndpointHandler('auth/admin/post').deleteItem(params);

    if (!response.data.error) {
        await dispatch(fetchPostsAction());
    }
    
    return response.data;
});

const initialState = {
    posts: [],
    total: 0,
    post: {},
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
            state.posts = action.payload.posts;
            state.total = action.payload.total;
        });
        builder.addCase(fetchPostsAction.rejected, (state, action) => {
            state.posts = [];
            state.total = 0;
        });
        builder.addCase(showPostAction.fulfilled, (state, action) => {
            state.post = action.payload.post;
        });
        builder.addCase(deletePostAction.fulfilled, (state, action) => {
        });
    },
});

export default postSlice.reducer;
