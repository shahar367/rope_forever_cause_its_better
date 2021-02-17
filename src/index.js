import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next'
import Store from './redux/store';
import i18next from 'i18next';
import { common_en, common_he } from './translations';

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'he',                              // language to use
  resources: {
    en: {
      common: common_en               // 'common' is our custom namespace
    },
    he: {
      common: common_he
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
