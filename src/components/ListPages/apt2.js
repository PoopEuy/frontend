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

const Apt2 = () => {
  const classes = useStyles();
  const router = useRouter().pathname;
  const apt2 = {
    noc: "/apt2/noc",
    nojsuser: "/apt2/nojs",
    detail: "/apt2/nojs/detail",
    sla: "/apt2/nojs/sla",
    sla2: "/apt2/nojs/sla2",
    servicecalls: "/apt2/servicecall",
    prtg: {
      sla: "/apt2/prtg/sla",
      state: "/apt2/prtg/state",
    },
    capacity: "/apt2/capacity",
    program: "/apt2/program",
  };

  const [state, setState] = useState({
    apt2: false,
    apt2Nojs: false,
    apt2SlaPrtg: false,
  });

  const handleClickApt2 = () => {
    setState({
      ...state,
      apt2: !state.apt2,
    });
  };

  const handleClickApt2Nojs = () => {
    if (state.apt2SlaPrtg) {
      return setState({
        ...state,
        apt2Nojs: true,
        apt2SlaPrtg: false,
      });
    }
    setState({
      ...state,
      apt2Nojs: !state.apt2Nojs,
    });
  };
  const handleClickApt2SlaPrtg = () => {
    if (state.apt2Nojs) {
      return setState({
        ...state,
        apt2Nojs: false,
        apt2SlaPrtg: true,
      });
    }
    setState({
      ...state,
      apt2SlaPrtg: !state.apt2SlaPrtg,
    });
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <ListItem button onClick={handleClickApt2}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="APT2" />
        {state.apt2 ? <ExpandLessIcons /> : <ExpandMoreIcons />}
      </ListItem>

      <Collapse in={state.apt2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense={true}>
          <Link href={apt2.noc}>
            <ListItem
              button
              className={clsx(classes.nested, {
                [classes.actived]: router == apt2.noc,
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
            onClick={handleClickApt2Nojs}
          >
            <ListItemIcon>
              <PermContactCalendarIcon />
            </ListItemIcon>
            <ListItemText primary="NOJS" />
            {state.apt2Nojs ? <ExpandLessIcons /> : <ExpandMoreIcons />}
          </ListItem>

          <Collapse in={state.apt2Nojs} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense={true}>
              <Link href={apt2.nojsuser}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt2.nojsuser,
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
              <Link href={apt2.detail}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt2.detail,
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
              <Link href={apt2.sla}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt2.sla,
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
              <Link href={apt2.sla2}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt2.sla2,
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
          <ListItem
            button
            className={classes.nested}
            onClick={handleClickApt2SlaPrtg}
          >
            <ListItemIcon>
              <PermContactCalendarIcon />
            </ListItemIcon>
            <ListItemText primary="PRTG" />
            {state.apt2SlaPrtg ? <ExpandLessIcons /> : <ExpandMoreIcons />}
          </ListItem>

          <Collapse in={state.apt2SlaPrtg} timeout="auto" unmountOnExit>
            <List component="div" disablePadding dense={true}>
              <Link href={apt2.prtg.sla}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt2.prtg.sla,
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
              <Link href={apt2.prtg.state}>
                <ListItem
                  button
                  className={clsx(classes.child, {
                    [classes.actived]: router == apt2.prtg.state,
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
          <Link href={apt2.servicecalls}>
            <ListItem
              button
              className={clsx(classes.nested, {
                [classes.actived]: router == apt2.servicecalls,
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
          <Link href={apt2.capacity}>
            <ListItem
              button
              className={clsx(classes.nested, {
                [classes.actived]: router == apt2.capacity,
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
          <Link href={apt2.program}>
            <ListItem
              button
              className={clsx(classes.nested, {
                [classes.actived]: router == apt2.program,
              })}
            >
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary="Program" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
    </Paper>
  );
};

export default Apt2;
