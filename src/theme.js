import { createMuiTheme } from "@material-ui/core/styles";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
  red,
} from "@material-ui/core/colors";
// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#556cd6",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

const coreThemeObj = {
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    palette: {
      error: {
        main: red.A400,
      },
      primary: {
        main: lightBlue[500],
      },
      background: {
        default: "#fff",
      },
    },
  },
};

export const themeConfig = (darkState) => {
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? lightBlue[900] : orange[500];
  const palletType = darkState ? "dark" : "light";

  return createMuiTheme({
    ...coreThemeObj,
    palette: {
      ...coreThemeObj.palette,
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });
};
