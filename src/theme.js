import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#23C9FF",
    },
    secondary: {
      main: "#7CC6FE",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
      // default: "#CCD5FF",
    },
  },
});

export default theme;
