import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Main } from './components/Main';
import { List } from './components/List';
import Question from './components/Question';
import { NotFound } from './components/NotFound';
import { Navbar } from './components/Navbar';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';

import commonRu from './translate/ru.json';
import commonEn from './translate/en.json';

i18next
  .use(LngDetector)
  .init({
    detection: {
      // order and from where user language should be detected
      order: ['customDetector', 'querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      caches: ['localStorage', 'cookie'],
      excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
    },
    interpolation: { escapeValue: false }, // React already does escaping
    resources: {
      en: {
        common: commonEn, // "common" is our custom namespace
      },
      ru: {
        common: commonRu,
      },
    },
  });

const Layout = () => (
  <div style={{ height: '100%' }}>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/list" component={List} />
      <Route exact path="/question" component={Question} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

class App extends Component {
  render() {
    return (
      <I18nextProvider i18n={i18next}>
        <Navbar />
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </I18nextProvider>
    );
  }
}

export default App;
