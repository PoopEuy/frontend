import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const TooltipComponent = ({ title, onClick, color, children }) => {
  return (
    <>
      <Tooltip title={title}>
        <IconButton onClick={onClick} color={color}>
          {children}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default TooltipComponent;
