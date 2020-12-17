import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loading: {
    marginTop: theme.spacing(1),
    width: "100%",
    textAlign: "center",
  },
  loading_container: {
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center",
  },
  loading_item: {
    width: 400,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#eaeaea",
  },
  loading_item_header: {
    display: "flex",
  },
  loading_item_title: {
    width: 100,
    height: 23,
    marginLeft: 10,
    backgroundColor: "#c1c1c1",
  },
  loading_item_icon: {
    width: 35,
    height: 23,
    marginRight: 10,
    backgroundColor: "#c1c1c1",
  },
  loading_item_divider: {
    flex: 1,
  },
  loading_item_bar: {
    margin: 10,
    height: 85,
    backgroundColor: "#c1c1c1",
  },
}));
export default function LoadingChart() {
  const classes = useStyles();

  return (
    <div className={classes.loading_container}>
      <div className={classes.loading_item}>
        <div className={classes.loading_item_header}>
          <div className={classes.loading_item_title}></div>
          <div className={classes.loading_item_divider}></div>
          <div className={classes.loading_item_icon}></div>
          <div className={classes.loading_item_icon}></div>
        </div>
        <div className={classes.loading_item_bar}></div>
        <div className={classes.loading_item_bar}></div>
      </div>
      <div className={classes.loading_item}>
        <div className={classes.loading_item_header}>
          <div className={classes.loading_item_title}></div>
          <div className={classes.loading_item_divider}></div>
          <div className={classes.loading_item_icon}></div>
          <div className={classes.loading_item_icon}></div>
        </div>
        <div className={classes.loading_item_bar}></div>
        <div className={classes.loading_item_bar}></div>
      </div>
      <div className={classes.loading_item}>
        <div className={classes.loading_item_header}>
          <div className={classes.loading_item_title}></div>
          <div className={classes.loading_item_divider}></div>
          <div className={classes.loading_item_icon}></div>
          <div className={classes.loading_item_icon}></div>
        </div>
        <div className={classes.loading_item_bar}></div>
        <div className={classes.loading_item_bar}></div>
      </div>
    </div>
  );
}
