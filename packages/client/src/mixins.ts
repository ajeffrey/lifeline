export const elevation = (level: number) => {
  switch(level) {
    case 1:
      return 'box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);';
    case 2:
      return 'box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);';
    case 3:
      return 'box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);';
    case 4:
      return 'box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);';
    case 5:
      return 'box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);';
  }
}

export const inline = (height: string) => `
height: ${height};
line-height: ${height};
white-space: nowrap;
`;

export const row = () => `
  display: flex;
  flex-direction: row;
`;

export const raisedControl = () => `
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.75);
`;

export const loweredControl = () => `
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.75);
`;

export const fixed = (width: number) => `
  width: 100%;
  max-width: ${width}px;
  margin: 0 auto;
`;
