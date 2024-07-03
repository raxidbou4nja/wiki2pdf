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
import { showPostAction, editPostAction } from '../../../redux/slices/postSlice';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: "900px"
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root' : {
    width: "900px",
    maxWidth: "900px !important",
  }
}));

export default function EditModal(props) {
    const dispatch = useDispatch();

    const { post, pushMessageToSnackbar } = props;

    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState('');
    const [title, setTitle] = React.useState('');

           

    const submitSections = async () => {
        setOpen(false);

        if (!title || !content) {
            setTimeout(() => {
                pushMessageToSnackbar({
                isErrorMessage: true,
                text: "Required Input is Empty",
                });
            }, 1200);
            return;
            
        }

        const data = {
            title: title,
            content: content,
        };


        const response = await dispatch(editPostAction({data, id: post})).unwrap();
        if (response.message)
            {
            setTimeout(() => {
                    pushMessageToSnackbar({
                    isErrorMessage: false,
                    text: "Post Edited successfully",
                    });
                }, 1200);
            }
    };

    const handleClickOpen = async () => {
        const postResponse = await dispatch(showPostAction(post)).unwrap();
        if (postResponse.post.title) {
                setTitle(postResponse.post.title);
                setContent(postResponse.post.content);
            }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

return (
    <React.Fragment>
        <IconButton variant="outlined" onClick={handleClickOpen}>
            <EditIcon />
        </IconButton>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Edit Post { post }
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
            <DialogContent dividers xs={{ width: "200px" }}>
            <form>
                    <div className="form-group mt-3">
                        <label htmlFor="name">Title:</label>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            id="title"
                            className="form-control"
                            value={title}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="content">Content:</label>
                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            id="content"
                            className="form-control"
                            value={content}
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
