/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyles from 'theme/GlobalStyles';
import breakpoints from './breakpoints';

const Theme = ({ children }) => {
  const themeOptions = useMemo(() => {
    return {
      palette: {
        primary: {
          main: '#00AB55',
        },
        text: {
          primary: '#161C24',
          secondary: '#919EAB',
          disabled: '#637381',
        },
      },
      breakpoints,
    };
  }, []);

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
