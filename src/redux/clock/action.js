export const tickActionTypes = {
  TICK: "TICK",
};

export const startClock = () => (dispatch) => {
  return setInterval(
    () => dispatch({ type: tickActionTypes.TICK, clock: Date.now() }),
    1000
  );
};
