
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DBService } from './db';
import HomePage from './pages/homePage';
import { DBActions, InfraActions } from './redux/actions';
import './App.css';
import { REDUCERS_NAMES } from './redux/reducers';
import { CircularProgress } from '@material-ui/core';

function App() {

  const dispatch = useDispatch();

  const { isFinishLoading } = useSelector(state => ({ isFinishLoading: state[REDUCERS_NAMES.infra].isFinishLoading }))

  useEffect(() => {
    const fetchGoogleSheetsData = async () => {
      try {
        const googleSheetsData = await DBService.init()
        dispatch(DBActions.init.initDB(googleSheetsData))
        dispatch(InfraActions.finishLoading.setIsDBFinishLoading(true))
      }
      catch (err) {
        console.log(err);
        dispatch(InfraActions.finishLoading.setIsDBFinishLoading(false))
      }
    }
    fetchGoogleSheetsData();
  }, [])


  return (
    <div>
      {isFinishLoading ? < HomePage /> : <CircularProgress />}
    </div>
  );
}

export default App;
