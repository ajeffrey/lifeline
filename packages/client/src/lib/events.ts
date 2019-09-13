export const prevent = <T, E extends React.SyntheticEvent<T>>(e: E) => {
  e.preventDefault();
  return e;
};

export const stop = <T, E extends React.SyntheticEvent<T>>(e: E) => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
  return e;
};

export const value = <T, E extends React.SyntheticEvent<T>>(e: E): string => {
  const target = e.currentTarget as {};
  if(!('value' in target && typeof target['value'] === 'string')) {
    throw new Error('missing value');
  }

  return target['value'];
};

export const ctrlKey = <T, E extends React.MouseEvent<T>>(e: E) => {
  return navigator.platform.match(/mac/i) ? e.metaKey : e.ctrlKey;
};
