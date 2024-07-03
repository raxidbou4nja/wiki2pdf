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
import { createPostAction } from '../../../redux/slices/postSlice';
import { useDispatch } from 'react-redux';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useRef } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CreateModal(props) {
    const dispatch = useDispatch();

    const { post, pushMessageToSnackbar } = props;

    const [open, setOpen] = React.useState(false);
    const contentRef = useRef();
    const titleRef = useRef();

    const submitSections = async () => {
        setOpen(false);

        if (!titleRef.current.value || !contentRef.current.value) {
            return;
        }

        const data = {
            title: titleRef.current.value,
            content: contentRef.current.value,
        };


        const response = await dispatch(createPostAction(data)).unwrap();
        if (response.message)
            {
            setTimeout(() => {
                    pushMessageToSnackbar({
                    isErrorMessage: false,
                    text: "Post Created successfully",
                    });
                }, 1200);
            }
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
            <AddBoxIcon /> ADD Post
        </Button>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Create Blog Post
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
            <form>
                    <div className="form-group mt-3">
                        <label htmlFor="name">Title:</label>
                        <input
                            ref={titleRef}
                            type="text"
                            id="title"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="content">Content:</label>
                        <textarea
                            ref={contentRef}
                            id="content"
                            className="form-control"
                        />
                    </div>
                    
                </form>
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
