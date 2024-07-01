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
import { showUserAction } from '../../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import EditNoteIcon from '@mui/icons-material/EditNote';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ShowModal(props) {
    const dispatch = useDispatch();

    const { user } = props;

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (user) {
            dispatch(showUserAction(user));
        }
    }, [user]);

    const submitSections = () => {
      
      setOpen(false);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

return (
    <React.Fragment>
        <IconButton variant="outlined" onClick={handleClickOpen}>
            <EditNoteIcon />
        </IconButton>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Select Sections
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
