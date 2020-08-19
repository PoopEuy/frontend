export const useDarkMode = (mode) => mode;

export const setDarkModeLocalStorage = (state) => {
  return window.localStorage.setItem("darkmode", JSON.stringify(state));
};

export const readDarkModeLocalStorage = () => {
  return JSON.parse(window.localStorage.getItem("darkmode")) || false;
};
