import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {},
};

const AddNojs = ({ classes }) => {
  const handleClick = () => {
    console.log("Add Nojs");
  };

  return (
    <React.Fragment>
      <Tooltip title={"Add Data"}>
        <IconButton className={classes.iconButton} onClick={handleClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};

export default withStyles(defaultToolbarStyles, { name: "AddNojs" })(AddNojs);
