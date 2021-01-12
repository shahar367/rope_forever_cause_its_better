
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import DBService from './db/dbService';
import { DBActions } from './redux/actions';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGoogleSheetsData = async () => {
      try {
        const googleSheetsData = await DBService.init()
        dispatch(DBActions.initDB(googleSheetsData))
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchGoogleSheetsData();
  }, [])


  return (
    <div className="App">
      
    </div>
  );
}

export default App;
