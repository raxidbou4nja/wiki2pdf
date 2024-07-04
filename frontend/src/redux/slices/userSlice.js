import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiEndpointHandler from '../apiEndpointHandler';

export const fetchUsersAction = createAsyncThunk('auth/admin/users', async (params) => {
    const response = await apiEndpointHandler('auth/admin/users').getItems(params);
    return response.data;
});


export const showUserAction = createAsyncThunk('auth/admin/user', async (params) => {
    const response = await apiEndpointHandler('auth/admin/user').getItems(params);
    console.log("data: ", response.data);
    return response.data;
});


export const deleteUserAction = createAsyncThunk('auth/admin/deleteUser', async (params, { dispatch, getState }) => {
    const response = await apiEndpointHandler('auth/admin/user').deleteItem(params);

    if (!response.data.error) {
        await dispatch(fetchUsersAction());
    }
    
    return response.data;
});

const initialState = {
    users: [],
    total: 0,
    user: {},
    loadingUsers: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
            state.users = action.payload.users;
            state.total = action.payload.total;
            state.loadingUsers = false;
        });
        builder.addCase(fetchUsersAction.rejected, (state, action) => {
            state.users = [];
            state.total = 0;
        });
        builder.addCase(showUserAction.fulfilled, (state, action) => {
            state.user = action.payload.user;
        });
        builder.addCase(deleteUserAction.fulfilled, (state, action) => {
        });
    },
});

export default userSlice.reducer;
