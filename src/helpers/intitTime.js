export const initTime = () => {
  let time = { date: new Date(), minute: 0, second: 0 };
  const timeVal = time.date.getMinutes() % 5;
  time.second = 60 - time.date.getSeconds();
  time.minute =
    timeVal == 1
      ? 4
      : timeVal == 2
      ? 3
      : timeVal == 3
      ? 2
      : timeVal == 4
      ? 1
      : 0;
  return (time.second += 60 * time.minute);
};
