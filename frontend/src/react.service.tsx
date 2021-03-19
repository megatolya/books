import { Injectable } from '@nestjs/common';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import App from './components/App';
import { create } from './utils/context';

import type {AppState} from './client';

interface IReactAppTemplateData {
  reactApp: string;
  initialState: string;
};

export enum Page {
  main,
  book
};

interface IPageParams {
  initialState: AppState;
}

@Injectable()
export class ReactService {
  renderApp(params: IPageParams): IReactAppTemplateData {
    const {Provider} = create(params.initialState);
    return {
      reactApp: ReactDOMServer.renderToString(
        <Provider initialState={params.initialState}>
          <App />
        </Provider>
      ),
      initialState: JSON.stringify(params.initialState)
    };
  }
}
