import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/PagesHandler/App';

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import common_fr from './translations/fr/common.json';
import common_en from './translations/en/common.json';
import 'rc-slider/assets/index.css';

i18next.init({
	interpolation: { escapeValue: false }, // React already does escaping
	lng: 'fr', // language to use
	resources: {
		en: {
			common: common_en, // 'common' is our custom namespace
		},
		fr: {
			common: common_fr,
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<I18nextProvider i18n={i18next}>
			<App />
		</I18nextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
