
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DBService, SHEETS_NAMES } from './db';
import TrickListPage from './pages/trickListPage';
import { InfraActions, TricksActions } from './redux/actions';
import './App.css';
import { REDUCERS_NAMES } from './redux/reducers';
import { Box, CircularProgress, CssBaseline, ThemeProvider } from '@material-ui/core';
import theme, { RTL } from './theme';
import AppLayout from './layouts/appLayout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/homePage';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const vhFunc = () => {
      let vh = window.innerHeight * 0.01
      // Then we set the value in the --vh custom property to the root of the document
      document.body.style.setProperty('--vh', `${vh}px`)
    }
    vhFunc();
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
          <Router>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/trickList' component={TrickListPage} />
            </Switch>
          </Router>
        </AppLayout>
      </RTL>
    </ThemeProvider>
  );
}

export default App;
