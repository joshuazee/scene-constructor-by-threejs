export enum Theme {
  Light,
  Dark,
  Other,
  Default
}

export const changeTheme = (type: Theme, color: string = '') => {
  switch (type) {
    case Theme.Light:
      document.getElementById('app')!.className = 'light-theme';
      break;
    case Theme.Dark:
      document.getElementById('app')!.className = 'dark-theme';
      break;
    default:
      document.getElementById('app')!.className = 'default-theme';
      break;
  }
};
