import { alpha } from '@material-ui/core/styles';

export const changePalette = () => {
  const palette = {
    primary: { ...PRIMARY, ...SECONDARY, ...WARNING, ...ERROR, ...INFO },

    background: {
      // paper: theme ? themeColors['dark'][0] : themeColors['light'][0],
      default: '#F7F9FC',
    },
    text: {
      primary: GREY[900],
      secondary: GREY[600],
      disabled: GREY[500],
    },

    grey: GREY,
    divider: '#EDEDEF',
    // divider: theme ? '#384150' : GREY[500],
    action: { ...actions },
  };

  return palette;
};

const PRIMARY = {
  // ? Color Selected
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249',
  contrastText: '#fff',
};

const SECONDARY = {
  main: '#46B9F6',
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800],
};
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
};

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB', // input button for back color
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381', // input svg color
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  10_5: alpha('#FFFFFF', 0.05),
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8), //#5a6169
};

const actions = {
  active: GREY[600],
  hover: GREY[500_8],
  selected: GREY[500_16],
  disabled: GREY[500_80],
  disabledBackground: GREY[500_24],
  focus: GREY[500_24],
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};
