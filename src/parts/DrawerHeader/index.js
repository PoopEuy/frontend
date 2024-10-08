import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import Link from "next/link";

//material ui core
import {
  makeStyles,
  ThemeProvider,
  useTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//material ui icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

//import images
import Sundaya from "public/images/sundaya.png";
import SundayaText from "public/images/sundaya-text.png";

//components OR parts local
import BreadcrumbsComponen from "./BreadcrumbsComponen";
import {
  readDarkModeLocalStorage,
  setDarkModeLocalStorage,
} from "src/configThemeMode";
import { themeConfig } from "src/theme";
// import Clock from "@components/Clock";
import ClockNavbar from "@components/ClockNavbar";
import TooltipComponent from "@components/TooltipComponent";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    // marginTop: 1.5,
    zIndex: 5,
    backgroundColor: theme.palette.secondary.main,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    minHeight: 55,
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  main: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  noc: {
    minHeight: 30,
  },
}));

const DrawerHeader = ({ listPage, mainPage, noc }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [darkState, setDarkState] = useState(false);
  const matches = useMediaQuery("(min-width:500px)");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleThemeChange = () => {
    setDarkState(!darkState);
    setDarkModeLocalStorage(!darkState);
  };

  useEffect(() => {
    setDarkState(readDarkModeLocalStorage());
  }, []);

  return (
    <MuiThemeProvider theme={themeConfig(darkState)}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          style={{ zIndex: 111 }}
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar style={{ minHeight: 54 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <span className={classes.title}>
              <BreadcrumbsComponen />
            </span>
            <TooltipComponent
              title={`Toggle ${darkState ? "Light" : "Dark"} Theme`}
              onClick={handleThemeChange}
            >
              {darkState ? <Brightness7Icon /> : <Brightness4Icon />}
            </TooltipComponent>
            <TooltipComponent title="Logout">
              <ExitToAppIcon />
            </TooltipComponent>
            {matches && <ClockNavbar />}
          </Toolbar>
        </AppBar>
        <Drawer
          style={{ zIndex: 1 }}
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <List>
              <img
                src={Sundaya}
                alt="sundaya"
                style={{ height: 30, marginTop: 5 }}
              />
            </List>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <List style={{ marginLeft: "4%" }}>{listPage}</List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div
            // className={classes.drawerHeader}
            className={clsx(classes.drawerHeader, {
              [classes.noc]: noc,
            })}
          />
          {mainPage}
        </main>
      </div>
    </MuiThemeProvider>
  );
};

DrawerHeader.propTypes = {
  listPage: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  mainPage: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  noc: PropTypes.bool,
};
export default DrawerHeader;
