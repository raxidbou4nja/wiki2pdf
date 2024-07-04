import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { checkUrlAction } from '../../../redux/slices/pdfSlice';

export function ConverterForm() {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
  
    async function handleConvert() { 
      const url = inputRef.current.value;
      try{
        await dispatch(checkUrlAction({ url }));
      }
      catch(error){
        console.log(error);
      }
      
    }
  
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Ex: https://wikipedia.org/w/Morocco"
          inputProps={{ 'aria-label': 'wikipedia url' }}
          inputRef={inputRef}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleConvert} >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }