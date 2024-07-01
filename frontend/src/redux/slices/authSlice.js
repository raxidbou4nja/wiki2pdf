import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiEndpointHandler from '../apiEndpointHandler';

export const loginAction = createAsyncThunk('auth/login', async (params) => {
    const response = await apiEndpointHandler('auth/login').createItem(params);
    return response.data;
});


export const registerAction = createAsyncThunk('auth/register', async (params) => {
    const response = await apiEndpointHandler('auth/register').createItem(params);
    return response.data;
});

export const logoutAction = createAsyncThunk('auth/logout', async () => {
    const response = await apiEndpointHandler('auth/logout').createItem();
    return response.data;
});

export const verifyToken = createAsyncThunk('auth/verifyToken', async () => {
    const response = await apiEndpointHandler('auth/verifyToken').createItem();
    return response.data;
});

// update profile
export const updateProfileAction = createAsyncThunk('auth/updateProfile', async (params) => {
    const response = await apiEndpointHandler('auth/update-profile').createItem(params);
    return response.data;
});


const initialState = {
    user: null,
    token: null,
    roles: [],
    isAuthenticated: false,
    isLoading: true,
    error: null,
    success: null,
    };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.roles = action.payload.roles;
            state.isLoading = false;
            state.isAuthenticated = true;

            if (state.user && state.token) {
                localStorage.setItem('token', state.token);
                localStorage.setItem('user', JSON.stringify(state.user));
                localStorage.setItem('roles', JSON.stringify(state.roles));
            }
        });
        builder.addCase(registerAction.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            if (state.user && state.token) {
                localStorage.setItem('token', state.token);
                localStorage.setItem('user', JSON.stringify(state.user));
                localStorage.setItem('roles', JSON.stringify(state.roles));
            }
        });
        builder.addCase(logoutAction.fulfilled, (state, action) => {
            state.user = null;
            state.token = null;
            state.roles = [];

            state.isAuthenticated = false;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('roles');

        });
        builder.addCase(verifyToken.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.roles = action.payload.roles;
            state.isLoading = false;
            state.isAuthenticated = true;


            if (state.user && state.token) {
                localStorage.setItem('token', state.token);
                localStorage.setItem('user', JSON.stringify(state.user));
                localStorage.setItem('roles', JSON.stringify(state.roles));
            }
        });
        builder.addCase(verifyToken.rejected, (state, action) => {
            state.user = null;
            state.token = null;
            state.roles = [];
            state.isAuthenticated = false;
            state.isLoading = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('roles');
        });

        builder.addCase(updateProfileAction.fulfilled, (state, action) => {

            if (action.payload.errors) {
                state.error = action.payload.errors;
                return;
            }

            state.user = action.payload.user;
            state.error = null;
            state.success = 'Profile updated successfully';
        });
    },
});

export default authSlice.reducer;