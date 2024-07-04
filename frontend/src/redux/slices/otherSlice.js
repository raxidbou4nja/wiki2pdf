import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiEndpointHandler from '../apiEndpointHandler';

export const sendMessageAction = createAsyncThunk('sendMessage', async (params) => {
    const response = await apiEndpointHandler('send-message').createItem(params);
    return response.data;
});



const initialState = {
    success: false,
};

const otherSlice = createSlice({
    name: 'other',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendMessageAction.fulfilled, (state, action) => {
            state.success = true;
        });
    },
});

export default otherSlice.reducer;
