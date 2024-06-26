// panelEditor.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RadioGroup, FormControlLabel, Radio, Checkbox, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import TocModal from './TocModal';
import { setImages, setLinks, setTheme, generatePdfAction, setClear } from '../../../redux/slices/pdfSlice';

export function PanelEditor() {
    const dispatch = useDispatch();

    const themes = useSelector((state) => state.pdf.themes);

    const [selectedTheme, setSelectedTheme] = useState(themes[0].id);
    const [pdfImages, setPdfImages] = React.useState('withImages');
    const [pdfLinks, setPdfLinks] = React.useState('withLinks');

    const handleThemeChange = (event) => {
        setSelectedTheme(event.target.value);
        dispatch(setTheme(event.target.value));
    };

    const handleChangeImages = (event, newOption) => {
        if (newOption !== null) {
            setPdfImages(newOption);
            dispatch(setImages(newOption === 'withImages' ? true : false));
        }
    }

    const handleChangeLinks = (event, newOption) => {
        if (newOption !== null) {
            setPdfLinks(newOption);
            dispatch(setLinks(newOption === 'withLinks' ? true : false));
        }
    }

    const handleGeneratePDF = () => {
        dispatch(generatePdfAction());
    }

    const cancelProccess = () => {
        dispatch(setClear());
    }

    return (
        <div className="row justify-content-center col-md-12">
            <RadioGroup
                name="theme"
                value={selectedTheme}
                onChange={handleThemeChange}
                row
                className='col-md-5'
            >
                {themes.map((theme) => (
                    <FormControlLabel
                        key={theme.id}
                        value={theme.id}
                        control={<Radio />}
                        labelPlacement="top"
                        label={
                            <img
                                src={theme.images}
                                alt={theme.title}
                                style={{ width: '130px', height: '219px' }}
                            />
                        }
                    />
                ))}
            </RadioGroup>
            <div className='col-md-4'>
                <div>
                <ToggleButtonGroup
                    color="primary"
                    value={pdfImages}
                    exclusive
                    onChange={handleChangeImages}
                    aria-label="Images"
                    >
                    <ToggleButton value="withImages">With Images</ToggleButton>
                    <ToggleButton value="withoutImages">Without Images</ToggleButton>
                </ToggleButtonGroup>
                </div>
                <div class="my-5">
                <ToggleButtonGroup
                    color="primary"
                    value={pdfLinks}
                    exclusive
                    onChange={handleChangeLinks}
                    aria-label="Links"
                    >
                    <ToggleButton value="withLinks">With Links</ToggleButton>
                    <ToggleButton value="withoutLinks">Without Links</ToggleButton>
                </ToggleButtonGroup>
                </div>
                <div>
                    <TocModal />
                </div>

            </div>
            <div className='col-md-3 d-block'>
                <Button onClick={handleGeneratePDF} variant="outlined" color="primary" className='h-50 w-100 mb-3'>Generate PDF</Button>
                <Button onClick={cancelProccess} variant="outlined" color="secondary" className='h-25 w-100'>Cancel</Button>
            </div>
        </div>
    );
}