
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DBService, SHEETS_NAMES } from './db';
import { InfraActions, TricksActions } from './redux/actions';
import './App.css';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme, { RTL } from './theme';
import AppLayout from './layouts/appLayout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TrickListPage from './pages/trickListPage';
import HomePage from './pages/homePage';
import TrickPage from './pages/trickPage';
import Store from './redux/store';

function App() {

  const dispatch = useDispatch();

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
          <Router>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/trickList' component={TrickListPage} />
              <Route path='/trick/:id' component={TrickPage} />
            </Switch>
          </Router>
        </AppLayout>
      </RTL>
    </ThemeProvider>
  );
}

export default App;
