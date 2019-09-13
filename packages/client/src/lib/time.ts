export const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export const mkTime = (hour: number) => {
  return hour * 60;
}

export const dateToTime = (date: Date) => {
  const timeInSecs = ((date.getTime() / 1000) - (date.getTimezoneOffset() * 60)) % ONE_DAY_IN_SECONDS;
  const timeInMins = Math.floor(timeInSecs / 60);
  return timeInMins;
};

const pad = (n: number) => {
  return n >= 10 ? n.toString() : `0${n}`;
}

export const formatTime = (time: number) => {
  const minute = time % 60;
  const hour = (time - minute) / 60;
  return `${pad(hour)}:${pad(minute)}`;
};
