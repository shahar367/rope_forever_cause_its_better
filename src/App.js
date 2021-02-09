
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DBService, SHEETS_NAMES } from './db';
import HomePage from './pages/homePage';
import { InfraActions, TricksActions } from './redux/actions';
import './App.css';
import { REDUCERS_NAMES } from './redux/reducers';
import { Box, CircularProgress, CssBaseline, ThemeProvider } from '@material-ui/core';
import theme, { RTL } from './theme';
import AppLayout from './layouts/appLayout';

function App() {

  const dispatch = useDispatch();

  const { isFinishFetching } = useSelector(state => ({ isFinishFetching: state[REDUCERS_NAMES.infra].isFinishFetching }))

  useEffect(() => {
    const fetchGoogleSheetsData = async () => {
      try {
        const googleSheetsData = await DBService.init()
        dispatch(TricksActions.init.initTricksList(googleSheetsData[SHEETS_NAMES.tricks]))
        dispatch(InfraActions.onInit.dbFetching.setIsDBFinishFetching(true))
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchGoogleSheetsData();
  }, [])


  return (
    <ThemeProvider theme={theme}>
      <RTL>
        <CssBaseline />
        <AppLayout>
          {isFinishFetching ?
            < HomePage /> :
            (
              <Box className='progressWrapper'>
                <CircularProgress size={100} />
              </Box>
            )}
        </AppLayout>
      </RTL>
    </ThemeProvider>
  );
}

export default App;
