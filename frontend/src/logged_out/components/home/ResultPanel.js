import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { getEditorAction, setClear } from "../../../redux/slices/pdfSlice";


export function ResultPanel() {
    const resultPage = useSelector((state) => state.pdf.resultPage);
    const dispatch = useDispatch();

    const handleAccept = async () => {
      const pageId = resultPage.pageId;
      const lang = resultPage.lang;
      const title = resultPage.title;
      try{
        await dispatch(getEditorAction({ pageId, lang, title }));
      }
      catch(error){
        console.log(error);
      }
    }

    const handleClose = () => {
      dispatch(setClear());
    }

  return (
    <div class="row justify-content-center col-md-12">
      <div class="card col-md-8">
        <div class="row no-gutters">
          <div class="col-sm-5 m-auto">
            {resultPage?.image && <img class="card-img-top" src={resultPage?.image} alt="Card image cap" />}
          </div>
          <div class="col-sm-7">
            <div class="card-body">
              <h5 class="card-title">{resultPage?.title}</h5>
              {resultPage?.description && <h6 class="card-subtitle mb-2 text-muted">{resultPage?.description}</h6>}
              <p class="card-text">{resultPage?.extract?.substr(0, 170)}...</p>
              <div class="text-center">
              <Button variant="outlined" onClick={handleAccept} startIcon={<CheckIcon />} className="mx-2">
                Accept
              </Button>
              <Button variant="contained" onClick={handleClose} endIcon={<CloseIcon />} className="mx-2">
                Cancel
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}