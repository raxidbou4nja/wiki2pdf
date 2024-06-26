import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiEndpointHandler from '../apiEndpointHandler';
import { store } from '../store';


export const checkUrlAction = createAsyncThunk('pdf/checkUrl', async (params) => {
    const response = await apiEndpointHandler('pdf/check-url').createItem(params);
    console.log(response.data);
    return response.data;
});

export const getEditorAction = createAsyncThunk('pdf/getEditor', async (params) => {
    const response = await apiEndpointHandler('pdf/get-editor').createItem(params);
    console.log(response.data);
    return response.data;
});

export const generatePdfAction = createAsyncThunk('pdf/generatePdf', async () => {

    const state = store.getState();
    const { lang, theme, links, images, code, sections, infobox, pagination, showInfobox , showPagination ,showToc } = state.pdf;

    const response = await apiEndpointHandler('pdf/generate-pdf').createItem({ lang, theme, links, images, code, sections, infobox, pagination, showInfobox, showPagination, showToc });
    console.log(response.data);
    return response.data;
});


const initialState = {
    url: null,
    title: null,
    lang: null,
    theme: null,
    links: false,
    images: false,
    code: null,
    pageId: null,
    sections: [],
    showInfobox: true,
    showPagination: true,
    showToc: true,
    toc: {},
    resultPage: {},
    showResultPage: false,
    showEditorPanel: false,
    showDownloadPanel: false,
    error: null,   
    themes: {},
    downloadUrl: null,
    previewUrl: null,
    };


const pdfSlice = createSlice({
    name: 'pdf',
    initialState,
    reducers:{
        setSections: (state, action) => {
            state.sections = action.payload;
        },
        setImages: (state, action) => {
            state.images = action.payload;
        },
        setLinks: (state, action) => {
            state.links = action.payload;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setShowInfobox: (state, action) => {
            state.showInfobox = action.payload;
        },
        setShowPagination: (state, action) => {
            state.showPagination = action.payload;
        }
        ,
        setShowToc: (state, action) => {
            state.showToc = action.payload;
        }
        ,
        setClear: (state) => {
            Object.assign(state, initialState);
        }
    
    },
    extraReducers: (builder) => {
        builder.addCase(checkUrlAction.fulfilled, (state, action) => {
            if (action.payload.error){
                state.showResultPage = false;
                state.error = action.payload.error;
            }
            else{
                state.showResultPage = true;
                state.resultPage = action.payload;
            }
        });

        builder.addCase(getEditorAction.fulfilled, (state, action) => {
            state.themes = action.payload.themes;
            state.theme = action.payload.themes[0]?.id ?? null;
            state.toc = action.payload.toc;
            state.code = action.payload.code;

            state.showResultPage = false;
            state.showEditorPanel = true;
            state.error = null;
        });

        builder.addCase(generatePdfAction.fulfilled, (state, action) => {
            state.showResultPage = false;
            state.showEditorPanel = false;
            state.showDownloadPanel = true;
            state.error = null;

            state.downloadUrl = action.payload.downloadUrl;
            state.previewUrl = action.payload.previewUrl;
        });

    },
});

export const { setSections, setImages, setLinks, setTheme, setClear, setShowInfobox, setShowPagination, setShowToc } = pdfSlice.actions;
export default pdfSlice.reducer;