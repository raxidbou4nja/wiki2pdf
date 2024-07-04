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
import JoditEditor from 'jodit-react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

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
    
    const editor = React.useRef(null);

    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [published, setPublished] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [preImage, setPreImage] = React.useState(null);

    const config = React.useMemo(() => ({
        readonly: false,
        placeholder: 'Start typing...',
    }), []);

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

        const formData = new FormData();
        formData.append('id', post);
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }
        formData.append('published', published ? 1 : 0);


        const response = await dispatch(editPostAction(formData)).unwrap();
        if (response.message) {
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
            setPreImage(postResponse.post.image);
            setTitle(postResponse.post.title);
            setContent(postResponse.post.content);
            setPublished(postResponse.post.published);
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
                    Edit Post {post}
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
                        { preImage  ? (
                            <>
                            <img src={preImage} alt="preview" />
                            <div className="mt-3">
                                <Button onClick={() => setPreImage(null)} >
                                    Remove Image
                                </Button>
                            </div>
                            </>
                            
                        ) : 
                        <div className="form-group mt-3">
                            <label htmlFor="image">Image:</label>
                            <input
                                onChange={(e) => setImage(e.target.files[0])}
                                type="file"
                                id="image"
                                className="form-control"
                            />
                        </div>
                        }
                        <div className="form-group mt-3">
                            <label htmlFor="title">Title:</label>
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
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1}
                                onBlur={newContent => setContent(newContent)}
                                onChange={newContent => {}}
                            />
                        </div>
                        <div className="mt-3">
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