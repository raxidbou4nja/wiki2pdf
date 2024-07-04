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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import JoditEditor from 'jodit-react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root' : {
    width: "900px",
    maxWidth: "900px !important",
  }
}));

export default function CreateModal(props) {
    const dispatch = useDispatch();

    const { post, pushMessageToSnackbar } = props;

    const editor = React.useRef(null);
    const titleRef = useRef();
    const imageRef = useRef();
    const [published, setPublished] = React.useState(false);
    const [content, setContent] = React.useState('');
    const [open, setOpen] = React.useState(false);


    const config = React.useMemo(() => ({
            readonly: false,
            placeholder: 'Start typings...',
        }),
        []
    );

    const submitSections = async () => {
        

        if (!titleRef.current.value || !content || !imageRef.current.files[0]) {
            setTimeout(() => {
                pushMessageToSnackbar({
                    isErrorMessage: true,
                    text: "Please fill all the fields",
                });
                }, 1200);
            return;
        }

 

        const formData = new FormData();

        formData.append('title', titleRef.current.value);
        formData.append('content', content);
        formData.append('image', imageRef.current.files[0]);
        formData.append('published', published ? 1 : 0);

        const response = await dispatch(createPostAction(formData)).unwrap();
        if (response.message) {
            setTimeout(() => {
            pushMessageToSnackbar({
                isErrorMessage: false,
                text: "Post Created successfully",
            });
            }, 1200);
        
            setOpen(false);
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
                    <label htmlFor="image">Image:</label>
                    <input
                        ref={imageRef}
                        type="file"
                        id="image"
                        className="form-control"
                    />
                </div>
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
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            tabIndex={1}
                            onBlur={newContent => setContent(newContent)}
                            onChange={newContent => {}}
                        />
                    </div>
                    <div class="mt-3">
                    <FormControlLabel control={<Switch onChange={() => setPublished(!published)} checked={published} />} label="Published" />
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
