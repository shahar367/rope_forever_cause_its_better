import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    direction: 'rtl',
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