import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiEndpointHandler from '../apiEndpointHandler';

export const statisticsAction = createAsyncThunk('auth/admin/dashboard/statistics', async (params) => {
    const response = await apiEndpointHandler('auth/admin/dashboard/statistics').getItems(params);
    return response.data;
});

const initialState = {
    users: [],
    pdfs: [],
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(statisticsAction.fulfilled, (state, action) => {
            if (action.payload.type == 'all')
                {
                    state.users = action.payload.users;
                    state.pdfs = action.payload.pdfs;   
                }

            if (action.payload.type == 'users')
                {
                    state.users = action.payload.users;
                }
            
            if (action.payload.type == 'pdfs')
                {
                    state.pdfs = action.payload.pdfs;
                }

        });
    },
});

export default dashboardSlice.reducer;
