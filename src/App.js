
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DBService, SHEETS_NAMES } from './db';
import { InfraActions, TricksActions } from './redux/actions';
import './App.css';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme, { RTL } from './theme';
import AppLayout from './layouts/appLayout';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import TrickListPage from './pages/trickListPage';
import HomePage from './pages/homePage';
import TrickPage from './pages/trickPage';

function App() {

  const alphaVersion = true;

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
  }, [dispatch])


  return (
    <ThemeProvider theme={theme}>
      <RTL>
        <CssBaseline />
        <AppLayout>
          <Router basename="/">
            <Switch>
              <Route exact path='/' component={HomePage}>
                {alphaVersion ? <Redirect to="/trickList" /> : null}
              </Route>
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
