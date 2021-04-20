import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: 'rgb(0, 138, 252)'
        },
        secondary: {
            main: 'rgb(236, 52, 98)'//236, 52, 98 - pinkRed // 173,241,212 - lightgreen
        }, 
    },
    typography: {
        fontFamily: 'sans-serif'
    }
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const RTL = (props) => {
    return (
        <StylesProvider jss={jss}>
            {props.children}
        </StylesProvider>
    );
}

export { RTL }
export default theme;