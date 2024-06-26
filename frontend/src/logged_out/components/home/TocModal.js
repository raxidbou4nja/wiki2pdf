import * as React from 'react';
import { Button, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { setSections } from '../../../redux/slices/pdfSlice';
import { useDispatch } from 'react-redux';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function TocModal() {
    const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const toc = useSelector((state) => state.pdf.toc);
  const sections = useSelector((state) => state.pdf.sections);

  const [checkedSections, setCheckedSections] = React.useState([]);

  const handleOnchange = (event) => {
    const { value } = event.target;
    setCheckedSections((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  }

  const submitSections = () => {
    dispatch(setSections(checkedSections));
    setOpen(false);

    console.log(checkedSections);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

return (
    <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
            Choose Sections
        </Button>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Modal title
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                    {toc.map((section) => (
                            <div key={section.index}>
                                    {section.toclevel == 1 && !checkedSections.includes(section.number) && <Checkbox id={section.index} name={section.index} value={section.number} onChange={handleOnchange} checked /> }
                                    {section.toclevel == 1 && checkedSections.includes(section.number) && <Checkbox id={section.index} name={section.index} value={section.number} onChange={handleOnchange} /> }
                                    
                                    <label
                                            htmlFor={section.number}
                                            style={{ paddingLeft: `${section.toclevel * 17}px` }}
                                    >
                                            <b className='pe-1'>{section.number} - </b>
                                            {section.line}
                                    </label>
                            </div>
                    ))}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={submitSections}>
                    Save changes
                </Button>
                <Button autoFocus onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </BootstrapDialog>
    </React.Fragment>
);
}
