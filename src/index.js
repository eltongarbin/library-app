import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';

import './index.css';
import App from './App';
import messages from './messages';
import { flattenMessages } from './utils';

if (!window.Intl) {
  // eslint-disable-next-line
  require.ensure(
    [
      'intl',
      'intl/locale-data/jsonp/en.js',
      'intl/locale-data/jsonp/es.js',
      'intl/locale-data/jsonp/fr.js'
    ],
    (require) => {
      require('intl');
      require('intl/locale-data/jsonp/en.js');
      require('intl/locale-data/jsonp/es.js');
      require('intl/locale-data/jsonp/fr.js');
    }
  );

  runApp();
} else {
  runApp();
}

function runApp() {
  addLocaleData([...en, ...es, ...fr]);

  const locale =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage ||
    'en-US';

  ReactDOM.render(
    <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
      <App />
    </IntlProvider>,
    document.getElementById('root')
  );
}
