import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

// Define a custom theme
const customTheme = {
  ...DefaultTheme,
  fonts: {
    regular: { fontFamily: 'Poppins-Regular' },
    medium: { fontFamily: 'Poppins-Medium' },
    light: { fontFamily: 'Poppins-Light' },
    thin: { fontFamily: 'Poppins-Thin' },
  },
  colors: {
    ...DefaultTheme.colors,
    primary: 'grey',
    background: '#FFFFFF',
    placeholder: 'grey',
  },
};

const AppWrapper = ({ children }) => (
  <PaperProvider theme={customTheme}>{children}</PaperProvider>
);

export default AppWrapper;
