import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiEndpointHandler from '../apiEndpointHandler';

export const fetchUsersAction = createAsyncThunk('auth/admin/users', async (params) => {
    const response = await apiEndpointHandler('auth/admin/users').getItems(params);
    return response.data;
});


export const showUserAction = createAsyncThunk('auth/admin/user', async (params) => {
    const response = await apiEndpointHandler('auth/admin/user').getItems(params);
    return response.data;
});

const initialState = {
    users: [],
    total: 0,
    user: {},
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
            state.users = action.payload.users;
            state.total = action.payload.total;
        });
        builder.addCase(showUserAction.fulfilled, (state, action) => {
            state.user = action.payload.user;
        });
    },
});

export default userSlice.reducer;
