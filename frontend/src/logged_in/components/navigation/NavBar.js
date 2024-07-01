import React, { Fragment, useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Tooltip,
  Box,
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ImageIcon from "@mui/icons-material/Image";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MenuIcon from "@mui/icons-material/Menu";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import MessagePopperButton from "./MessagePopperButton";
import SideDrawer from "./SideDrawer";
import Balance from "./Balance";
import NavigationDrawer from "../../../shared/components/NavigationDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { store } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { loginAction, logoutAction } from "../../../redux/slices/authSlice";
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const styles = (theme) => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  appBarToolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  accountAvatar: {
    backgroundColor: theme.palette.secondary.main,
    height: 24,
    width: 24,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
    },
  },
  drawerPaper: {
    height: "100%vh",
    whiteSpace: "nowrap",
    border: 0,
    width: theme.spacing(7),
    overflowX: "hidden",
    marginTop: theme.spacing(8),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
    backgroundColor: theme.palette.common.black,
  },
  smBordered: {
    [theme.breakpoints.down("sm")]: {
      borderRadius: "50% !important",
    },
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  iconListItem: {
    width: "auto",
    borderRadius: theme.shape.borderRadius,
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  mobileItemSelected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
  },
  username: {
    paddingLeft: 0,
    paddingRight: theme.spacing(2),
  },
  justifyCenter: {
    justifyContent: "center",
  },
  permanentDrawerListItem: {
    justifyContent: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});




function NavBar(props) {
  const { selectedTab, messages, classes, openAddBalanceDialog, theme } = props;
  // Will be use to make website more accessible by screen readers
  const links = useRef([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const isWidthUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useDispatch();


  const openMobileDrawer = useCallback(() => {
    setIsMobileOpen(true);
  }, [setIsMobileOpen]);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false);
  }, [setIsMobileOpen]);

  const openDrawer = useCallback(() => {
    setIsSideDrawerOpen(true);
  }, [setIsSideDrawerOpen]);

  const closeDrawer = useCallback(() => {
    setIsSideDrawerOpen(false);
  }, [setIsSideDrawerOpen]);

  const handleLogout = () => {
    dispatch(logoutAction());
  }
  
  const menuItems = [
    {
      link: "/c/dashboard",
      name: "Dashboard",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <DashboardIcon
            className={
              selectedTab === "Dashboard" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <DashboardIcon className="text-white" />,
      },
      show: store.getState().auth?.roles?.includes("admin")
    },
    {
      link: "/c/posts",
      name: "Posts",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <ImageIcon
            className={
              selectedTab === "Posts" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <ImageIcon className="text-white" />,
      },
      show: store.getState().auth?.roles?.includes("admin")
    },
    {
      link: "/c/pdf",
      name: "Pdf",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <PictureAsPdfIcon
            className={
              selectedTab === "Pdf"
                ? classes.textPrimary
                : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <PictureAsPdfIcon className="text-white" />,
      },
      show: store.getState().auth?.roles?.includes("admin")
    },
    {
      link: "/c/users",
      name: "Users",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <GroupIcon
            className={
              selectedTab === "Users"
                ? classes.textPrimary
                : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <GroupIcon className="text-white" />,
      },
      show: store.getState().auth?.roles?.includes("admin")
    }
    ,
    {
      link: "/c/my-profile",
      name: "My Profile",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <AccountCircleIcon
            className={
              selectedTab === "Profile"
                ? classes.textPrimary
                : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <AccountCircleIcon className="text-white" />,
      },
      show: store.getState().auth?.roles?.includes("admin")
    }
  ];
  return (
    <Fragment>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.appBarToolbar}>
          <Box display="flex" alignItems="center">
            <Hidden smUp>
              <Box mr={1}>
                <IconButton
                  aria-label="Open Navigation"
                  onClick={openMobileDrawer}
                  color="primary"
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Hidden>
            <Hidden smDown>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="primary"
              >
                Wiki2
              </Typography>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="secondary"
              >
                Pdf
              </Typography>
            </Hidden>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >
            <ListItem
              disableGutters
              className={classNames(classes.iconListItem, classes.smBordered)}
            >
              <Avatar
                alt="profile picture"
                src={`https://ui-avatars.com/api/?name=${ store.getState().auth?.user?.name}&color=FFFFFF&background=09090b`}
                className={classNames(classes.accountAvatar)}
              />
              {isWidthUpSm && (
                <ListItemText
                  className={classes.username}
                  primary={
                    <Typography color="textPrimary">{ store.getState().auth?.user?.name }</Typography>
                  }
                />
              )}
            </ListItem>
          </Box>
          <IconButton
            onClick={handleLogout}
            color="primary"
            aria-label="Open Sidedrawer"
            size="large"
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Hidden smDown>
        <Drawer //  both drawers can be combined into one for performance
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={false}
        >
          <List>
            {menuItems.map((element, index) => (
              element.show && (
                <Link
                  to={element.link}
                  className={classes.menuLink}
                  onClick={element.onClick}
                  key={index}
                  ref={(node) => {
                    links.current[index] = node;
                  }}
                >
                  <Tooltip
                    title={element.name}
                    placement="right"
                    key={element.name}
                  >
                    <ListItem
                      selected={selectedTab === element.name}
                      button
                      divider={index !== menuItems.length - 1}
                      className={classes.permanentDrawerListItem}
                      onClick={() => {
                        links.current[index].click();
                      }}
                      aria-label={
                        element.name === "Logout"
                          ? "Logout"
                          : `Go to ${element.name}`
                      }
                    >
                      <ListItemIcon className={classes.justifyCenter}>
                        {element.icon.desktop}
                      </ListItemIcon>
                    </ListItem>
                  </Tooltip>
                </Link>
              )
            ))}
          </List>
        </Drawer>
      </Hidden>
      <NavigationDrawer
        menuItems = { menuItems.map((element) => (
          {
          link: element.link,
          show: element.show,
          name: element.name,
          icon: element.icon.mobile,
          onClick: element.onClick,
        }))}
        anchor="left"
        open={isMobileOpen}
        selectedItem={selectedTab}
        onClose={closeMobileDrawer}
      />
    </Fragment>
  );
}

NavBar.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTab: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(NavBar);
