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
import { showPostAction } from '../../../redux/slices/postSlice';
import { useDispatch } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';

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

    const { post } = props;

    const [open, setOpen] = React.useState(false);

    const postData = useSelector((state) => state.post.post);
           
            


    const submitSections = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        dispatch(showPostAction(post));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

return (
    <React.Fragment>
        <IconButton variant="outlined" onClick={handleClickOpen}>
            <VisibilityIcon />
        </IconButton>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Post Data
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
                            type="text"
                            id="title"
                            className="form-control"
                            value={postData.title}
                            readOnly
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            className="form-control"
                            value={postData.content}
                            readOnly
                        />
                    </div>

                </form>
                </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </BootstrapDialog>
    </React.Fragment>
);
}
