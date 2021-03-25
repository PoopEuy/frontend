import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

//material ui core
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import { Divider } from "@material-ui/core";

//material ui icons
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLessIcons from "@material-ui/icons/ExpandLess";
import ExpandMoreIcons from "@material-ui/icons/ExpandMore";
import EqualizerIcons from "@material-ui/icons/Equalizer";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  child: {
    paddingLeft: theme.spacing(6),
  },
  paper: {
    marginBottom: 7,
    width: "96%",
  },
  actived: {
    // textDecorationLine: "underline",
    // color: "red",
    pointerEvents: "none",
    borderRight: "8px solid red",
    opacity: 0.65,
  },
}));

const Setting = () => {
  const classes = useStyles();
  const router = useRouter().pathname;
  const setting = {
    vendor: "/setting/vendor",
    cutoff: "/setting/cutoff",
  };

  const [state, setState] = useState({
    setting: false,
  });

  const handleClick = () => {
    setState({
      ...state,
      setting: !state.setting,
    });
  };

  return (
    <>
      <Paper className={classes.paper} elevation={3}>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <SettingsApplicationsIcon />
          </ListItemIcon>
          <ListItemText primary="Setting" />
          {state.apt1 ? <ExpandLessIcons /> : <ExpandMoreIcons />}
        </ListItem>

        <Collapse in={state.setting} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense={true}>
            <Link href={setting.vendor}>
              <ListItem
                button
                className={clsx(classes.nested, {
                  [classes.actived]: router == setting.vendor,
                })}
              >
                <ListItemIcon>
                  <EqualizerIcons />
                </ListItemIcon>
                <ListItemText primary="Vendor" />
              </ListItem>
            </Link>
          </List>

          <List component="div" disablePadding dense={true}>
            <Link href={setting.cutoff}>
              <ListItem
                button
                className={clsx(classes.nested, {
                  [classes.actived]: router == setting.cutoff,
                })}
              >
                <ListItemIcon>
                  <OfflineBoltIcon />
                </ListItemIcon>
                <ListItemText primary="Cutoff" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </Paper>

      <Paper className={classes.paper} elevation={3}>
        <List component="div" disablePadding dense={true}>
          <Link href="/ticket">
            <ListItem
              button
              className={clsx({
                [classes.actived]: router == "/ticket",
              })}
            >
              <ListItemIcon>
                <ConfirmationNumberIcon />
              </ListItemIcon>
              <ListItemText primary="Ticket" />
            </ListItem>
          </Link>
        </List>
      </Paper>
    </>
  );
};

export default Setting;
