import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, IconButton, Table, TableBody, TableCell, TablePagination, TableRow, Avatar } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import EnhancedTableHead from "../../../shared/components/EnhancedTableHead";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAction, deletePostAction } from "../../../redux/slices/postSlice";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";
import { useLoading } from '../../../shared/components/LoadingContext';
import ShowModal from "./ShowModal";
import EditModal from "./EditModal";

const styles = theme => ({
  tableWrapper: {
    overflowX: "auto",
    width: "100%"
  },
  blackBackground: {
    backgroundColor: theme.palette.primary.main
  },
  contentWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    },
    width: "100%"
  },
  dBlock: {
    display: "block !important"
  },
  dNone: {
    display: "none !important"
  },
  firstData: {
    paddingLeft: theme.spacing(3)
  }
});

const rows = [
  {
    id: "Image",
    numeric: false,
    label: "Image"
  }
  ,
  {
    id: "Title",
    numeric: false,
    label: "Title"
  },
  {
    id: "CreatedAt",
    numeric: false,
    label: "Created At"
  },
  {
    id: "Actions",
    numeric: false,
    label: "Actions"
  }
];

const rowsPerPage = 5;

function PostTable(props) {

  const { theme, classes, pushMessageToSnackbar } = props;
  const dispatch = useDispatch();
  const { posts, loadingPosts, total } = useSelector(state => state.post) || [];
  const { showLoading, hideLoading } = useLoading();

  const [page, setPage] = useState(0);
  const [isDeletePostDialogOpen, setIsDeletePostDialogOpen] = useState(false);
  const [isDeletePostDialogLoading, setIsDeletePostDialogLoading] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);



  const onDelete = useCallback((code) => {
    setIsDeletePostDialogOpen(true);
    setDeletePostId(code);
  }, [setIsDeletePostDialogOpen]);

  const closeDeletePostDialog = useCallback(() => {
    setIsDeletePostDialogOpen(false);
    setIsDeletePostDialogLoading(false);
  }, [setIsDeletePostDialogOpen, setIsDeletePostDialogLoading]);


  const deletePost = useCallback(() => {
    setIsDeletePostDialogLoading(true);
    dispatch(deletePostAction(deletePostId)).then(() => {
      setIsDeletePostDialogLoading(false);
      setIsDeletePostDialogOpen(false);
    });
  }, [dispatch, deletePostId]);

  useEffect(
    () => {
      showLoading();
      dispatch(fetchPostsAction()).then(() => hideLoading());
    },
    [dispatch]
  );

  const handleChangePage = useCallback(
    (_, newPage) => {
      showLoading();
      setPage(newPage);
      dispatch(fetchPostsAction({page: newPage + 1})).then(() => hideLoading());
    },
    [setPage]
  );

  


  if (loadingPosts) return null;



  if (posts.length > 0) {
    return (
      <div className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={posts.length} rows={rows} />
          <TableBody>
            {posts
              .map((post, index) => (
                <TableRow hover tabIndex={-1} key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    <Avatar
                          className={classes.avatar}
                          src={post.image}
                        />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    {post.title}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  > 
                    {post.created_at}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    <ShowModal post={post.id}  />
                    <EditModal post={post.id} pushMessageToSnackbar={pushMessageToSnackbar} />
                    <IconButton onClick={() => onDelete(post.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>        
                </TableRow>
                
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onPageChange={handleChangePage}
          classes={{
            select: classes.dNone,
            selectIcon: classes.dNone,
            actions: posts.length > 0 ? classes.dBlock : classes.dNone,
            caption: posts.length > 0 ? classes.dBlock : classes.dNone
          }}
          labelRowsPerPage=""
        />
          <ConfirmationDialog
            open={isDeletePostDialogOpen}
            title="Confirmation"
            content="Do you really want to delete the Post?"
            onClose={closeDeletePostDialog}
            loading={isDeletePostDialogLoading}
            onConfirm={deletePost}
          />
      </div>
      
    );
  }
  return (
    <div className={classes.contentWrapper}>
      <HighlightedInformation>
        No posts received yet.
      </HighlightedInformation>
    </div>
  );
}

PostTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PostTable);
