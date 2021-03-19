import * as React from 'react';
import { AppState } from 'src/client';
// import { AppState } from 'src/client';

import Header from '../Header';
import BookSnippet from '../BookSnippet';
import Book from '../Book';
import { get } from '../../utils/context';
import './styles.scss';

interface AppProps {
  // initialState: AppState;
}

export default class App extends React.Component<AppProps> {
  render() {
    const { Context } = get();
    return (
      <Context.Consumer>
        {(context) => (
          <div className="app">
            <Header />
            <div className="app__books-container">
              {context.page === 'main'
                ? this.renderBooks(context.books)
                : this.renderBook(context.book)}
            </div>
          </div>
        )}
      </Context.Consumer>
    );
  }

  renderBooks(books) {
    return books.map((book) => <BookSnippet key={book.id} book={book} />);
  }

  renderBook(book) {
    return <Book book={book} />;
  }
}
