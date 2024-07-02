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
import VisibilityIcon from '@mui/icons-material/Visibility';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function EditModal(props) {
    const dispatch = useDispatch();

    const { user } = props;

    const [open, setOpen] = React.useState(false);

    const userData = useSelector((state) => state.user.user);
           
            


    const submitSections = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        dispatch(showUserAction({ id: user }));
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
                User Data
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
                    <div class="text-center">
                        <img
                            src={`https://ui-avatars.com/api/?name=${userData.name}&color=FFFFFF&background=09090b`}
                            alt="User"
                            className="rounded-circle"
                            style={{ width: '150px', height: '150px' }}
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={userData.name}
                            readOnly
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={userData.email}
                            readOnly
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Registred at:</label>
                        <input
                            type="text"
                            id="text"
                            className="form-control"
                            value={userData.created_at}
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
