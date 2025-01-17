import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { messages as footerMessages } from '@uarcl/frontend-component-footer-uar';
import { messages as headerMessages } from '@uarcl/frontend-component-header-uar';
import {
  APP_INIT_ERROR, APP_READY, initialize, mergeConfig,
  subscribe,
  getConfig 
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import { messages as paragonMessages } from '@edx/paragon';

import { DiscussionsHome } from './discussions';
import appMessages from './i18n';
import store from './store';

import './index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={store}>
      <Helmet>
        <link rel="shortcut icon" href={getConfig().FAVICON_URL} type="image/x-icon" />
      </Helmet>
      <DiscussionsHome />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  requireAuthenticatedUser: true,
  messages: [
    headerMessages,
    footerMessages,
    appMessages,
    paragonMessages,
  ],
  handlers: {
    config: () => {
      mergeConfig({
        LEARNING_BASE_URL: process.env.LEARNING_BASE_URL,
        DISPLAY_FEEDBACK_BANNER: process.env.DISPLAY_FEEDBACK_BANNER || 'false',
      }, 'DiscussionsConfig');
    },
  },
});
