import React from "react";
import { useSelector } from "react-redux";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { setClear } from "../../../redux/slices/pdfSlice";


export function DownloadPreview() {
    const dispatch = useDispatch();
    
    const downloadUrl = useSelector((state) => state.pdf.downloadUrl);
    const previewUrl = useSelector((state) => state.pdf.previewUrl);


    const donwloadPDF = () => {
        window.open(downloadUrl, '_blank');
    }

    const previewPDF = () => {
        window.open(previewUrl, '_blank');
    }

    const cancleProccess = () => {
        dispatch(setClear());
    }




    return (
      <div className="row justify-content-center col-md-12">
        <div className="card col-md-8">
          <div className="row no-gutters">
            <div className="col-sm-12">
              <div className="card-body">
                <div className="text-center">
                  <p className="fs-4">Congratulations! Your PDF is ready.</p>
                  <div>
                    <Button variant="outlined" size="large" onClick={donwloadPDF} startIcon={<CheckIcon />} className="mx-2">
                      Download
                    </Button>
                    <Button variant="contained" size="large" color="info" onClick={previewPDF} endIcon={<VisibilityIcon />} className="mx-2">
                      Preview
                    </Button>
                  </div>
                  <div className="mt-3">
                    <Button variant="contained" onClick={cancleProccess} endIcon={<CloseIcon />}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

}