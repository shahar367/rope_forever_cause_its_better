
import { useCallback, useEffect } from 'react';
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
import { useTranslation } from 'react-i18next';

const bodyStyleCodedFunc = (i18n) => {
  vhFunc();
  document.body.style.direction = i18n.language === 'he' ? 'rtl' : 'ltr';
}

const vhFunc = () => {
  let vh = window.innerHeight * 0.01
  // Then we set the value in the --vh custom property to the root of the document
  document.body.style.setProperty('--vh', `${vh}px`)
}

function App() {

  const { i18n } = useTranslation();

  const dispatch = useDispatch();

  const fetchGoogleSheetsData = useCallback(async () => {
    try {
      const googleSheetsData = await DBService.init()
      dispatch(TricksActions.init.initTricksList(googleSheetsData[SHEETS_NAMES.tricks]))
      dispatch(InfraActions.onInit.dbFetching.setIsDBFinishFetching(true))
    }
    catch (err) {
      console.log(err);
    }
  },[])

  useEffect(() => {
    bodyStyleCodedFunc(i18n);
    fetchGoogleSheetsData();
  }, [dispatch, i18n,fetchGoogleSheetsData])


  return (
    <ThemeProvider theme={theme}>
      <Router basename="/">
        <RTL>
          <CssBaseline />
          <AppLayout>
            <Switch>
              <Route exact path='/' component={HomePage}>
                {process.env.NODE_ENV === 'production' ? <Redirect to="/trickList" /> : null}
              </Route>              
              <Route path='/trickList' component={TrickListPage} />
              <Route path='/trick/:id' component={TrickPage} />
            </Switch>
          </AppLayout>
        </RTL>
      </Router>
    </ThemeProvider>
  );
}

export default App;
