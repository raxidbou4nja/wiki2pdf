import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, IconButton, Table, TableBody, TableCell, TablePagination, TableRow } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import EnhancedTableHead from "../../../shared/components/EnhancedTableHead";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import { useDispatch, useSelector } from "react-redux";
import { listPdfsAction, deletePdfAction } from "../../../redux/slices/pdfSlice";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";
import { useLoading } from '../../../shared/components/LoadingContext';


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
    id: "Title",
    numeric: false,
    label: "Title"
  },
  {
    id: "WithImages",
    numeric: false,
    label: "Images"
  },
  {
    id: "WithPagination",
    numeric: false,
    label: "Pagination"
  },
  {
    id: "WithInfobox",
    numeric: false,
    label: "Infobox"
  },
  {
    id: "WithToc",
    numeric: false,
    label: "Toc"
  },
  {
    id: "WithLinks",
    numeric: false,
    label: "Links"
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

const rowsPerPage = 25;

function PdfTable(props) {

  const { theme, classes } = props;
  const dispatch = useDispatch();
  const { pdfs, loadingPdfs } = useSelector(state => state.pdf) || [];
  const { showLoading, hideLoading } = useLoading();

  const [page, setPage] = useState(0);
  const [isDeletePdfDialogOpen, setIsDeletePdfDialogOpen] = useState(false);
  const [isDeletePdfDialogLoading, setIsDeletePdfDialogLoading] = useState(false);
  const [deletePdfId, setDeletePdfId] = useState(null);


  const appUrl = process.env.REACT_APP_API_URL;

  const onDelete = useCallback((code) => {
    setIsDeletePdfDialogOpen(true);
    setDeletePdfId(code);
    console.log(isDeletePdfDialogOpen)
  }, [setIsDeletePdfDialogOpen]);

  const closeDeletePdfDialog = useCallback(() => {
    setIsDeletePdfDialogOpen(false);
    setIsDeletePdfDialogLoading(false);
  }, [setIsDeletePdfDialogOpen, setIsDeletePdfDialogLoading]);


  const deletePdf = useCallback(() => {
    setIsDeletePdfDialogLoading(true);
    dispatch(deletePdfAction(deletePdfId)).then(() => {
      setIsDeletePdfDialogLoading(false);
      setIsDeletePdfDialogOpen(false);
    });
  }, [dispatch, deletePdfId]);

  useEffect(
    () => {
      showLoading();
      dispatch(listPdfsAction()).then(() => hideLoading());
    },
    [dispatch]
  );

  const handleChangePage = useCallback(
    (_, newPage) => {
      setPage(newPage);
    },
    [setPage]
  );

  


  if (loadingPdfs) return null;



  if (pdfs.length > 0) {
    return (
      <div className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={pdfs.length} rows={rows} />
          <TableBody>
            {pdfs
              .map((pdf, index) => (
                <TableRow hover tabIndex={-1} key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    {pdf.title}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    {pdf.images ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  > 
                    {pdf.pagination ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  > 
                    {pdf.infobox ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  > 
                    {pdf.toc ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  > 
                    {pdf.links ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  > 
                    {pdf.created_at}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.firstData}
                  >
                    <IconButton onClick={() => window.open(`${appUrl}/pdf/download-pdf/${pdf.code}/${pdf.updated_at}`, "_blank")}>
                      <DownloadIcon />  
                    </IconButton>
                    <Button onClick={() => window.open(`${appUrl}/pdf/preview-pdf/${pdf.code}/${pdf.updated_at}`, "_blank")}>
                    <VisibilityIcon />  
                    </Button>
                    <IconButton onClick={() => onDelete(pdf.code)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>        
                </TableRow>
                
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={pdfs.length}
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
            actions: pdfs.length > 0 ? classes.dBlock : classes.dNone,
            caption: pdfs.length > 0 ? classes.dBlock : classes.dNone
          }}
          labelRowsPerPage=""
        />
          <ConfirmationDialog
            open={isDeletePdfDialogOpen}
            title="Confirmation"
            content="Do you really want to delete the Pdf?"
            onClose={closeDeletePdfDialog}
            loading={isDeletePdfDialogLoading}
            onConfirm={deletePdf}
          />
      </div>
      
    );
  }
  return (
    <div className={classes.contentWrapper}>
      <HighlightedInformation>
        No pdfs received yet.
      </HighlightedInformation>
    </div>
  );
}

PdfTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PdfTable);
