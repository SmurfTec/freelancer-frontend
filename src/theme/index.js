/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyles from 'theme/GlobalStyles';
import breakpoints from './breakpoints';
import typography from 'theme/typography';

const Theme = ({ children }) => {
  const themeOptions = useMemo(() => {
    return {
      palette: {
        primary: {
          // main: '#1ab6bfe6',
          main: '#00AB55',
        },
        hover: {
          main: '#02c2a9',
        },
        text: {
          primary: '#000',
          secondary: '#7a7d85',
          disabled: '#637381',
        },
      },
      breakpoints,
      typography,
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
