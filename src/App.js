
import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import './App.css';
import { DBService } from './db';
import { DBActions } from './redux/actions';

function App() {

  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    const fetchGoogleSheetsData = async () => {
      try {
        const googleSheetsData = await DBService.init()
        dispatch(DBActions.init.initDB(googleSheetsData))
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchGoogleSheetsData();
  }, [dispatch, store])


  return (
    <div className="App">
      <iframe
        title='טיפוס רוסי'
        width="560"
        height="315"
        src="https://www.youtube.com/embed/hTg5Ez3lIHs"
        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  );
}

export default App;
