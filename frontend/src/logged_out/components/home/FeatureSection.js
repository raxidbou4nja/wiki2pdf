import React from "react";
import { Grid, Typography } from "@mui/material";
import calculateSpacing from "./calculateSpacing";
import useMediaQuery from "@mui/material/useMediaQuery";
import { withTheme } from "@mui/styles";
import FeatureCard from "./FeatureCard";
import useWidth from "../../../shared/functions/useWidth";
import CreateIcon from '@mui/icons-material/Create';
import SettingsIcon from '@mui/icons-material/Settings';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import DevicesIcon from '@mui/icons-material/Devices';
import SecurityIcon from '@mui/icons-material/Security';
import ApiIcon from '@mui/icons-material/Code';
import UpdateIcon from '@mui/icons-material/Update';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

const iconSize = 48; // Adjust the icon size as needed

const features = [
  {
    color: "#00C853",
    headline: "Easy Conversion",
    text: "Convert any Wikipedia page to a downloadable PDF with just a few clicks.",
    icon: <CreateIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0",
  },
  {
    color: "#6200EA",
    headline: "Customizable Output",
    text: "Choose the sections and formatting options you want in your PDF.",
    icon: <SettingsIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200",
  },
  {
    color: "#0091EA",
    headline: "High-Quality PDFs",
    text: "Ensure professional-looking PDFs with accurate formatting and images.",
    icon: <PictureAsPdfIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0",
  },
  {
    color: "#d50000",
    headline: "Offline Access",
    text: "Download PDFs for offline reading and reference.",
    icon: <CloudDownloadIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "200",
  },
  {
    color: "#DD2C00",
    headline: "Batch Processing",
    text: "Convert multiple Wikipedia pages to PDFs in one go.",
    icon: <PlaylistAddCheckIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0",
  },
  {
    color: "#64DD17",
    headline: "Cross-Platform Compatibility",
    text: "Access and download PDFs from any device or browser.",
    icon: <DevicesIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "200",
  },
  {
    color: "#304FFE",
    headline: "Secure and Private",
    text: "Your data and downloads are kept secure and private.",
    icon: <SecurityIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0",
  },
  {
    color: "#C51162",
    headline: "API Access",
    text: "Integrate Wikipedia to PDF conversion into your own applications or workflows.",
    icon: <ApiIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200",
  },
  {
    color: "#00B8D4",
    headline: "Regular Updates",
    text: "Stay updated with the latest Wikipedia format changes and improvements.",
    icon: <UpdateIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0",
  },
  {
    color: "#FF6D00",
    headline: "Customer Support",
    text: "Access responsive customer support for any questions or issues.",
    icon: <LiveHelpIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "200",
  },
];

function FeatureSection(props) {
  const { theme } = props;
  const width = useWidth();
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-fluid lg-p-top">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          Features
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width, theme)}>
            {features.map((element) => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={isWidthUpMd ? element.mdDelay : element.smDelay}
                key={element.headline}
              >
                <FeatureCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {};

export default withTheme(FeatureSection);
