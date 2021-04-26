import React, { useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { responsiveFontSizes } from '@material-ui/core';
import GlobalStyles from './styles/global';
import Home from './pages/home';
import baseThemeProps from './styles/theme';


function App() {
    const theme = useMemo(() => responsiveFontSizes(createMuiTheme({
        palette: {
            type: 'light',
            ...baseThemeProps
        }
    })), []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <GlobalStyles/>
            <div className="App">
                <Home/>
            </div>
        </ThemeProvider>
    );
}

export default App;