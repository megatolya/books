import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { create } from './utils/context';
import App from './components/App';

import { IBookFull, IBookShort } from './grpc.interface';

export enum Page {
    main,
    book,
    error
};

export interface AppState {
    page: Page;
    books?: IBookShort[];
    book?: IBookFull;
};

document.addEventListener('DOMContentLoaded', () => {
    let initialState: AppState = {
        page: 'main' as unknown as Page,
        books: [],
    };

    try {
        initialState = JSON.parse(document.getElementById('initialState').innerHTML) as AppState;
    } catch (err) {
        console.error('Failed to parse initial data (TODO: add escaping), full error:', err);
    }
    const {Provider} = create(initialState);
    
    ReactDOM.hydrate(
        (
            <Provider initialState={initialState}>
                <App />
            </Provider>
        ),
        document.getElementById('app')
    )
});