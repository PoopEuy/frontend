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
import ContactsIcon from "@material-ui/icons/Contacts";
import DetailsIcon from "@material-ui/icons/Details";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";

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

const Apt1 = () => {
  const classes = useStyles();
  const router = useRouter().pathname;
  const apt1 = {
    noc: "/apt1/noc",
    nojsuser: "/apt1/nojs",
    detail: "/apt1/nojs/detail",
    sla: "/apt1/nojs/sla",
    sla2: "/apt1/nojs/sla2",
    sla3: "/apt1/nojs/sla3",
    servicecalls: "/apt1/servicecall",
    prtg: {
      sla: "/apt1/prtg/sla",
      state: "/apt1/prtg/state",
    },
  };

  const [state, setState] = useState({
    apt1: false,
    apt1Nojs: false,
    apt1SlaPrtg: false,
  });

  const handleClickApt1 = () => {
    setState({
      ...state,
      apt1: !state.apt1,
    });
  };

  const handleClickApt1Nojs = () => {
    if (state.apt1SlaPrtg) {
      return setState({
        ...state,
        apt1Nojs: true,
        apt1SlaPrtg: false,
      });
    }
    setState({
      ...state,
      apt1Nojs: !state.apt1Nojs,
    });
  };
  const handleClickApt1SlaPrtg = () => {
    if (state.apt1Nojs) {
      return setState({
        ...state,
        apt1Nojs: false,
        apt1SlaPrtg: true,
      });
    }
    setState({
      ...state,
      apt1SlaPrtg: !state.apt1SlaPrtg,
    });
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <ListItem button onClick={handleClickApt1}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="APT1" />
        {state.apt1 ? <ExpandLessIcons /> : <ExpandMoreIcons />}
      </ListItem>

      <Collapse in={state.apt1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense={true}>
          <Link href={apt1.noc}>
            <ListItem
              button
              className={clsx(classes.nested, {
                [classes.actived]: router == apt1.noc,
              })}
            >
              <ListItemIcon>
                <EqualizerIcons />
              </ListItemIcon>
              <ListItemText primary="NOC" />
            </ListItem>
          </Link>
        </List>

        <List component="div" disablePadding dense={true}>
          <ListItem
            button
            className={classes.nested}
            onClick={handleClickApt1Nojs}
          >
            <ListItemIcon>
              <PermContactCalendarIcon />
            </ListItemIcon>
            <ListItemText primary="NOJS" />
            {state.apt1Nojs ? <ExpandLessIcons /> : <ExpandMoreIcons />}
          </ListItem>

          <Collapse in={state.apt1Nojs} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense={true}>
              <Link href={apt1.nojsuser}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt1.nojsuser,
                  })}
                >
                  <ListItemIcon>
                    <DetailsIcon />
                  </ListItemIcon>
                  <ListItemText primary="User" />
                </ListItem>
              </Link>
            </List>

            <List component="div" disablePadding dense={true}>
              <Link href={apt1.detail}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt1.detail,
                  })}
                >
                  <ListItemIcon>
                    <DetailsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Details" />
                </ListItem>
              </Link>
            </List>

            <List component="div" disablePadding dense={true}>
              <Link href={apt1.sla}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt1.sla,
                  })}
                >
                  <ListItemIcon>
                    <DetailsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sla" />
                </ListItem>
              </Link>
            </List>

            <List component="div" disablePadding dense={true}>
              <Link href={apt1.sla2}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt1.sla2,
                  })}
                >
                  <ListItemIcon>
                    <DetailsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sla2" />
                </ListItem>
              </Link>
            </List>
            <List component="div" disablePadding dense={true}>
              <Link href={apt1.sla3}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt1.sla3,
                  })}
                >
                  <ListItemIcon>
                    <DetailsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sla3" />
                </ListItem>
              </Link>
            </List>
            <Divider />
          </Collapse>
        </List>

        <List component="div" disablePadding dense={true}>
          <ListItem
            button
            className={classes.nested}
            onClick={handleClickApt1SlaPrtg}
          >
            <ListItemIcon>
              <PermContactCalendarIcon />
            </ListItemIcon>
            <ListItemText primary="PRTG" />
            {state.apt1SlaPrtg ? <ExpandLessIcons /> : <ExpandMoreIcons />}
          </ListItem>

          <Collapse in={state.apt1SlaPrtg} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense={true}>
              <Link href={apt1.prtg.sla}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt1.prtg.sla,
                  })}
                >
                  <ListItemIcon>
                    <DetailsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sla" />
                </ListItem>
              </Link>
            </List>

            <List component="div" disablePadding dense={true}>
              <Link href={apt1.prtg.state}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt1.prtg.state,
                  })}
                >
                  <ListItemIcon>
                    <DetailsIcon />
                  </ListItemIcon>
                  <ListItemText primary="State" />
                </ListItem>
              </Link>
            </List>
            <Divider />
          </Collapse>
        </List>

        <List component="div" disablePadding dense={true}>
          <Link href={apt1.servicecalls}>
            <ListItem
              button
              className={clsx(classes.nested, {
                [classes.actived]: router == apt1.servicecalls,
              })}
            >
              <ListItemIcon>
                <SettingsApplicationsIcon />
              </ListItemIcon>
              <ListItemText primary="Service Calls" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </Paper>
  );
};

export default Apt1;
