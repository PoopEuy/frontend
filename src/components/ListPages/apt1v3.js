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
import SaveIcon from "@material-ui/icons/Save";
import CodeIcon from "@material-ui/icons/Code";

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

const Apt1v3 = () => {
  const classes = useStyles();
  const router = useRouter().pathname;
  const apt1v3 = {
    noc: "/apt1v3/noc",
    nojsuser: "/apt1v3/nojs",
    detail: "/apt1v3/nojs/detail",
    sla: "/apt1v3/nojs/sla",
    sla2: "/apt1v3/nojs/sla2",
    servicecalls: "/apt1v3/servicecall",
    prtg: {
      sla: "/apt1v3/prtg/sla",
      state: "/apt1v3/prtg/state",
    },
    capacity: "/apt1v3/capacity",
    program: "/apt1v3/program",
  };

  const [state, setState] = useState({
    apt1v3: false,
    apt1v3Nojs: false,
    apt1v3SlaPrtg: false,
  });

  const handleClickApt1v3 = () => {
    setState({
      ...state,
      apt1v3: !state.apt1v3,
    });
  };

  const handleClickApt1v3Nojs = () => {
    if (state.apt1v3SlaPrtg) {
      return setState({
        ...state,
        apt1v3Nojs: true,
        apt1v3SlaPrtg: false,
      });
    }
    setState({
      ...state,
      apt1v3Nojs: !state.apt1v3Nojs,
    });
  };
  const handleClickApt1v3SlaPrtg = () => {
    if (state.apt1v3Nojs) {
      return setState({
        ...state,
        apt1v3Nojs: false,
        apt1v3SlaPrtg: true,
      });
    }
    setState({
      ...state,
      apt1v3SlaPrtg: !state.apt1v3SlaPrtg,
    });
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <ListItem button onClick={handleClickApt1v3}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="APT1v3" />
        {state.apt1v3 ? <ExpandLessIcons /> : <ExpandMoreIcons />}
      </ListItem>

      <Collapse in={state.apt1v3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense={true}>
          <Link href={apt1v3.noc}>
            <ListItem
              button
              className={clsx(classes.nested, {
                [classes.actived]: router == apt1v3.noc,
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
            onClick={handleClickApt1v3Nojs}
          >
            <ListItemIcon>
              <PermContactCalendarIcon />
            </ListItemIcon>
            <ListItemText primary="NOJS" />
            {state.apt1v3Nojs ? <ExpandLessIcons /> : <ExpandMoreIcons />}
          </ListItem>

          <Collapse in={state.apt1v3Nojs} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense={true}>
              <Link href={apt1v3.nojsuser}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt1v3.nojsuser,
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
              <Link href={apt1v3.detail}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt1v3.detail,
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
              <Link href={apt1v3.sla}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt1v3.sla,
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
              <Link href={apt1v3.sla2}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt1v3.sla2,
                  })}
                >
                  <ListItemIcon>
                    <DetailsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sla2" />
                </ListItem>
              </Link>
            </List>
            <Divider />
          </Collapse>
        </List>

        <List component="div" disablePadding dense={true}>
          <Link href={apt1v3.capacity}>
            <ListItem
              button
              className={clsx(classes.nested, {
                [classes.actived]: router == apt1v3.capacity,
              })}
            >
              <ListItemIcon>
                <SaveIcon />
              </ListItemIcon>
              <ListItemText primary="Capacity" />
            </ListItem>
          </Link>
        </List>

        <List component="div" disablePadding dense={true}>
          <Link href={apt1v3.program}>
            <ListItem
              button
              className={clsx(classes.nested, {
                [classes.actived]: router == apt1v3.program,
              })}
            >
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary="Program" />
            </ListItem>
          </Link>
        </List>

        {/* <List component="div" disablePadding dense={true}>
          <ListItem
            button
            className={classes.nested}
            onClick={handleClickApt1v3SlaPrtg}
          >
            <ListItemIcon>
              <PermContactCalendarIcon />
            </ListItemIcon>
            <ListItemText primary="PRTG" />
            {state.apt1v3SlaPrtg ? <ExpandLessIcons /> : <ExpandMoreIcons />}
          </ListItem>

          <Collapse in={state.apt1v3SlaPrtg} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense={true}>
              <Link href={apt1v3.prtg.sla}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt1v3.prtg.sla,
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
              <Link href={apt1v3.prtg.state}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt1v3.prtg.state,
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
          <Link href={apt1v3.servicecalls}>
            <ListItem
              button
              className={clsx(classes.nested, {
                [classes.actived]: router == apt1v3.servicecalls,
              })}
            >
              <ListItemIcon>
                <SettingsApplicationsIcon />
              </ListItemIcon>
              <ListItemText primary="Service Calls" />
            </ListItem>
          </Link>
        </List>

        <List component="div" disablePadding dense={true}>
          <Link href={apt1v3.capacity}>
            <ListItem
              button
              className={clsx(classes.nested, {
                [classes.actived]: router == apt1v3.capacity,
              })}
            >
              <ListItemIcon>
                <SaveIcon />
              </ListItemIcon>
              <ListItemText primary="Capacity" />
            </ListItem>
          </Link>
        </List> */}
      </Collapse>
    </Paper>
  );
};

export default Apt1v3;
