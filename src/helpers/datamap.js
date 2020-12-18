const dataMap = (value, fromLow, fromHigh, toLow, toHigh) => {
  let fromSpan = fromHigh - fromLow;
  let toSpan = toHigh - toLow;

  let valueScaled = (value - fromLow) / fromSpan;
  return toLow + valueScaled * toSpan;
};

export default dataMap;
